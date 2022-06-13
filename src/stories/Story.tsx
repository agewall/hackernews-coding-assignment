import { FC } from 'react'

import { Author } from 'author'
import { StoryValues } from 'stories'
import styles from './Story.module.sass'

export const Story: FC<StoryValues> = ({ by, url, title, time, score }) => (
  <div className={styles.container}>
    <div className={styles.score}>{score}</div>
    <div className={styles.content}>
      {url ? (
        <a
          className={styles.link}
          href={url.href}
          target='_blank'
          rel='noreferrer'
        >
          <h3 className={styles.title}>
            {title}
            <span className={styles.hostname}> ({url.hostname})</span>
          </h3>
        </a>
      ) : (
        <h3 className={styles.title}>{title}</h3>
      )}
      <Author id={by} />
    </div>
    <div className={styles.timestamp}>
      <span>{time.toLocaleDateString()}</span>
    </div>
  </div>
)
