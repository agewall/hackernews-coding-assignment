import { SWRConfig } from 'swr'

import styles from './App.module.sass'
import { Stories } from './components/Stories'

const fetcher = async (url: string) => await (await fetch(url)).json()

export const App = () => (
  <SWRConfig
    value={{
      revalidateOnFocus: false,
      fetcher
    }}
  >
    <div className={styles.container}>
      <Stories />
    </div>
  </SWRConfig>
)

export default App
