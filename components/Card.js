import styles from '../styles/Card.module.scss'
import { FiCheck } from 'react-icons/fi';
import { format, parseISO, parse, isToday } from 'date-fns'
import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function Card({ title, completed, description, categoryId, categories, date, time }) {
    const { data, error } = useSWR(`https://my-json-server.typicode.com/sjaakvdbrom/react-todo-with-api/categories/${categoryId}`, fetcher)

    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>

    return (  
        <article className={`${styles.container} ${completed ? styles.completed : styles.uncompleted}`} style={{'--color-category': data.color}}>
            <div className={styles.top}>
                <div className={styles.topText}>
                    <div className={styles.title}>{title}</div>
                    <div className={styles.description}>{description}</div>
                </div>
                {completed ? 
                <div className={styles.icon}>
                    <FiCheck />
                </div> : 
                <div className={styles.circle}></div>}
            </div>
            <div className={styles.bottom}>
                <div className={styles.dateTime}>
                    {date && <div className={styles.date}>{isToday(parseISO(date)) ? 'Today' : format(parseISO(date), 'ee LLLL')}</div>}
                    {time && <time className={styles.time}>{format(parse(time, 'HH:mm', new Date()), 'p')}</time>}
                </div>
            </div>
        </article>
    )
}
