export const cls = (...args: ReadonlyArray<string>): string => args.join(' ').trim()

export const fetcher = async (url: string) => await (await fetch(url)).json()
