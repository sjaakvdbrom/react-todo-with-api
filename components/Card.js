import styles from '../styles/Card.module.scss'

export default function Card({ title, completed, description }) {
    return (
      <div className={`${styles.container} ${completed ? styles.completed : styles.uncompleted}`}>
        <div className={styles.title}>{title}</div>
        <div className={styles.description}>{description}</div>
      </div>
    )
  }