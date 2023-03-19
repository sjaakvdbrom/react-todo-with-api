import styles from '../styles/Card.module.scss'

export default function Card({ title, completed }) {
    return (
      <div className={`${styles.container} ${completed ? styles.completed : styles.uncompleted}`}>
        {title}
      </div>
    )
  }