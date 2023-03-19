import styles from '../styles/Card.module.css'

export default function Card({ title, completed }) {
    return (
      <div className={`${styles.container} ${completed ? 'completed' : 'uncompleted'}`}>
        {title}
      </div>
    )
  }