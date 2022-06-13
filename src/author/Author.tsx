import useSWR from 'swr'

import styles from './Author.module.sass'

const fetcher = async ({ url, args }: { url: string; args: string }) => {
  const data = await (await fetch(`${url}${args}.json`)).json()

  return data
}

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
    fetcher
  )

  if (error) return <div>failed to load</div>

  if (!data) return null

  return (
    <span className={styles.author}>
      by {data.id} ({data.karma})
    </span>
  )
}
