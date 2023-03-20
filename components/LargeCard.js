import styles from '../styles/LargeCard.module.scss'

export default function LargeCard({ title }) {
    return (  
      <div className={styles.container}>
        {title}
      </div>
    )
}