import logo from './logo.svg'
import styles from './App.module.sass'

function App() {
  return (
    <div className={styles.container}>
      <img src={logo} className={styles.logo} alt='logo' />
    </div>
  )
}

export default App
