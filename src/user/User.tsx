import useSWR from 'swr'

import { Loader } from '../components/Loader'

const fetcher = async ({ url, args }: { url: string; args: string }) => {
  const data = await (await fetch(`${url}${args}.json`)).json()

  return data
}

export const User = ({ id }: { id: string }) => {
  const { data, error } = useSWR(
    {
      url: 'https://hacker-news.firebaseio.com/v0/user/',
      args: id
    },
    fetcher
  )

  if (error) return <div>failed to load</div>

  if (!data) <Loader />

  console.log(data)

  return null
}
