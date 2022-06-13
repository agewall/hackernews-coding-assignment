import { useMemo } from 'react'
import useSWR from 'swr'

import { Story } from './Story'
import { Loader } from '../components/Loader'

import styles from './Stories.module.sass'

export const Stories = () => {
  const { data, error } = useSWR<ReadonlyArray<string>>(
    'https://hacker-news.firebaseio.com/v0/topstories.json'
  )

  const randomTopStoriesIds = useMemo(() => {
    if (!data) return null

    return Array.from(
      { length: 10 },
      () => data[Math.round(Math.random() * data.length)]
    )
  }, [data])

  if (error) return <div>failed to load</div>

  if (!randomTopStoriesIds) return <Loader />

  return (
    <div className={styles.container}>
      {randomTopStoriesIds.map((id) => (
        <Story id={id} key={id} />
      ))}
    </div>
  )
}
