import styles from '../styles/LargeCard.module.scss'

export default function LargeCard({ title, categoryId, categories }) {
    const getCategory = (array, id) => {
        return array.find((element) => element.id === id)
    }

    return (  
      <div className={styles.container} style={{'--color-category': getCategory(categories, categoryId).color}}>
        {title}
      </div>
    )
}
