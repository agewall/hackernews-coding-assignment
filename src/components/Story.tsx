import useSWR from 'swr'

const fetcher = async ({ url, args }: { url: string; args: string }) =>
  await (await fetch(`${url}${args}.json`)).json()

export const Story = ({ id }: { id: string }) => {
  const { data, error } = useSWR(
    {
      url: 'https://hacker-news.firebaseio.com/v0/item/',
      args: id
    },
    fetcher
  )

  if (error) return <div>failed to load</div>

  if (!data) return <div>loading</div>

  console.log(data)

  return (
    <div>
      <span>{id}</span>
    </div>
  )
}
