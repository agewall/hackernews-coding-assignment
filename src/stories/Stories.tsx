import { Loader } from 'components'
import { Story, useStories } from 'stories'
import styles from './Stories.module.sass'

export const Stories = () => {
  const { data, error } = useStories()

  if (error) return <div>failed to load</div>

  if (!data) return <Loader />

  return (
    <div className={styles.container}>
      {[...data]
        .sort((a, b) => b.score - a.score)
        .map((story) => (
          <Story key={story.id} {...story} />
        ))}
    </div>
  )
}
