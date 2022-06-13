import { useMemo } from 'react'
import useSWR from 'swr'

import { fetcher } from 'utils'

export interface StoryValues {
  readonly id: string
  readonly by: string
  readonly url?: URL
  readonly title: string
  readonly time: Date
  readonly score: number
}

interface ParseValues extends Omit<StoryValues, 'time'> {
  time: number
}

const parseStory = ({
  id,
  by,
  url,
  title,
  time,
  score
}: ParseValues): StoryValues => ({
  id,
  by,
  title,
  score,
  url: url ? new URL(url) : undefined,
  time: new Date(time * 1000)
})

const storyFetcher = async ({ url, args }: { url: string; args: string }) =>
  parseStory(await fetcher(`${url}${args}.json`))

const storiesFetcher = ({
  url,
  args
}: {
  url: string
  args: ReadonlyArray<string>
}) => Promise.all(args.map((id) => storyFetcher({ url, args: id })))

export const useStories = () => {
  const { data: topStoryIds, error: topStoriesError } = useSWR<
    ReadonlyArray<string>
  >('https://hacker-news.firebaseio.com/v0/topstories.json')

  const randomTopStoriesIds = useMemo(() => {
    if (!topStoryIds) return null

    return Array.from(
      { length: 10 },
      () => topStoryIds[Math.round(Math.random() * topStoryIds.length)]
    )
  }, [topStoryIds])

  const { data: stories, error: storiesError } = useSWR<
    ReadonlyArray<StoryValues>
  >(
    randomTopStoriesIds !== null
      ? {
          url: 'https://hacker-news.firebaseio.com/v0/item/',
          args: randomTopStoriesIds
        }
      : null,
    storiesFetcher
  )

  return {
    data: stories,
    error: topStoriesError || storiesError
  }
}
