import { FC } from 'react'

import { Author } from 'author'
import { StoryValues } from 'stories'

import styles from './Story.module.sass'

export const Story: FC<StoryValues> = ({ by, url, title, time, score }) => (
  <div className={styles.container}>
    <div className={styles.score}>{score}</div>
    <div className={styles.content}>
      <a className={styles.link} href={url} target='_blank' rel='noreferrer'>
        <h3 className={styles.title}>{title}</h3>
      </a>
      <Author id={by} />
    </div>
    <div className={styles.timestamp}>
      <span>{time.toLocaleDateString()}</span>
    </div>
  </div>
)
