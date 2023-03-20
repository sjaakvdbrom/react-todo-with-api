import styles from '../styles/LargeCard.module.scss'
import typo from '../styles/Typography.module.scss'
import { format, parseISO } from 'date-fns'

export default function LargeCard({ title, categoryId, categories, date, description }) {
    const getCategory = (array, id) => {
        return array.find((element) => element.id === id)
    }

    console.log(parseISO("2022-07-23"))

    return (  
      <div className={styles.container} style={{'--color-category': getCategory(categories, categoryId).color}}>
        <header className={styles.top}>
          <div className={styles.title}>
            {title}
          </div>
          <date className={styles.date}>
            {date}
          </date>
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
      </div>
    )
}
