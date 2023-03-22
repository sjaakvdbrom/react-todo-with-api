import styles from '../styles/LargeCard.module.scss'
import typo from '../styles/Typography.module.scss'
import { format, parseISO } from 'date-fns'
import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function LargeCard({ title, categoryId, categories, date, description }) {
    const { data, error } = useSWR(`https://my-json-server.typicode.com/sjaakvdbrom/react-todo-with-api/categories/${categoryId}`, fetcher)

    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>

    return (  
      <article className={styles.container} style={{'--color-category': data.color}}>
        <header className={styles.top}>
          <div className={styles.title}>
            {title}
          </div>
          <div className={styles.date}>
            {date && format(parseISO(date), 'cccc, ee LLLL yyyy')}
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
