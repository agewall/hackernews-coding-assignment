import { SWRConfig } from 'swr'

import { Stories } from 'stories'
import { Background } from 'background/Background'
import { fetcher } from 'utils'

export const App = () => (
  <SWRConfig
    value={{
      revalidateOnFocus: false,
      fetcher
    }}
  >
    <Background>
      <Stories />
    </Background>
  </SWRConfig>
)
