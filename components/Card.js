import styles from '../styles/Card.module.scss'
import { FiCheck } from 'react-icons/fi';
import { format, parseISO, parse, isToday } from 'date-fns'

export default function Card({ title, completed, description, categoryId, categories, date, time }) {
    const getCategory = (array, id) => {
        return array.find((element) => element.id === id)
    }

    return (  
        <article className={`${styles.container} ${completed ? styles.completed : styles.uncompleted}`} style={{'--color-category': getCategory(categories, categoryId).color}}>
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
