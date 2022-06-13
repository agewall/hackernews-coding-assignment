import useSWR from 'swr'

import { fetcher } from 'utils'
import styles from './Author.module.sass'

const authorFetcher = ({ url, args }: { url: string; args: string }) =>
  fetcher(`${url}${args}.json`)

interface AuthorValues {
  readonly id: string
  readonly karma: number
}

export const Author = ({ id }: { id: string }) => {
  const { data, error } = useSWR<AuthorValues>(
    {
      url: 'https://hacker-news.firebaseio.com/v0/user/',
      args: id
    },
    authorFetcher
  )

  if (error) return <div>failed to load</div>

  if (!data) return null

  return (
    <span className={styles.author}>
      by {data.id} ({data.karma})
    </span>
  )
}
