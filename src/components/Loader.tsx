import styles from './Loader.module.sass'

export const Loader = () => (
  <div className={styles.container}>
    <span className={styles.dotOne}></span>
    <span className={styles.dotTwo}></span>
    <span className={styles.dotThree}></span>
  </div>
)
