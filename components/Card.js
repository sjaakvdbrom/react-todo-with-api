import styles from '../styles/Card.module.scss'
import { FiCheck } from 'react-icons/fi';

export default function Card({ title, completed, description, categoryId, categories, onClick }) {
    const getCategory = (array, id) => {
        return array.find((element) => element.id === id)
    }

    return (  
      <>
        <div onClick={onClick} className={`${styles.container} ${completed ? styles.completed : styles.uncompleted}`} style={{'--color-category': getCategory(categories, categoryId).color}}>
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
                Category: {getCategory(categories, categoryId).title}
            </div>
        </div>
      </>
    )
}
