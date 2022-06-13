import useSWR from 'swr'

import { User } from '../user/User'
import { Loader } from '../components/Loader'

import styles from './Story.module.sass'

const fetcher = async ({ url, args }: { url: string; args: string }) => {
  const {
    by,
    url: storyUrl,
    title,
    time,
    score
  } = await (await fetch(`${url}${args}.json`)).json()

  return {
    by,
    title,
    score,
    url: storyUrl,
    time: new Date(time * 1000)
  }
}

interface StoryValues {
  readonly by: string
  readonly url?: string
  readonly title: string
  readonly time: Date
  readonly score: number
}

export const Story = ({ id }: { id: string }) => {
  const { data, error } = useSWR<StoryValues>(
    {
      url: 'https://hacker-news.firebaseio.com/v0/item/',
      args: id
    },
    fetcher
  )

  if (error) return <div>failed to load</div>

  if (!data) {
    return (
      <div className={styles.container}>
        <Loader />
      </div>
    )
  }

  console.log(data)

  return (
    <div className={styles.container}>
      <a href={data?.url} target='_blank' rel='noreferrer'>
        {data.title}
      </a>
      <User id={data.by} />
    </div>
  )
}
