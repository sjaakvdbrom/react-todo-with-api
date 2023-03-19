import styles from '../styles/Card.module.scss'
import { FiCheck } from 'react-icons/fi';

export default function Card({ title, completed, description, date }) {
    return (
      <div className={`${styles.container} ${completed ? styles.completed : styles.uncompleted}`}>
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
            {date}
        </div>
      </div>
    )
  }