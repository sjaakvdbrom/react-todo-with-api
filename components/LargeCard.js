import styles from '../styles/LargeCard.module.scss'
import typo from '../styles/Typography.module.scss'
import { format, parseISO } from 'date-fns'

export default function LargeCard({ title, categoryId, categories, date, description }) {
    if (!categories) return

    const getCategory = (array, id) => {
        return array.find((element) => element.id === id)
    }

    return (  
      <article className={styles.container} style={{'--color-category': getCategory(categories, categoryId).color}}>
        <header className={styles.top}>
          <div className={styles.title}>
            {title}
          </div>
          <div className={styles.date}>
            {date && format(parseISO(date), 'cccc, dd LLLL yyyy')}
          </div>
        </header>
        <main>
          {description && 
          <>
            <h4 className={`${typo.smallLabel} ${styles.smallTitle}`}>Description:</h4>
            <p className={styles.description}>
              {description}
            </p>
          </>}
        </main>
      </article>
    )
}
