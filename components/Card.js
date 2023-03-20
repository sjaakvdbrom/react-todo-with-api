import { useState, useEffect } from 'react'
import styles from '../styles/Card.module.scss'
import { FiCheck } from 'react-icons/fi';

export default function Card({ title, completed, description, categoryId }) {
    const [category, setCategory] = useState(null)
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        fetch(`https://my-json-server.typicode.com/sjaakvdbrom/react-todo-with-api/categories/${categoryId}`)
        .then((res) => res.json())
        .then((data) => {
            setCategory(data)
            setLoading(false)
        })
    }, [categoryId])

    return (  
      <>
        <div className={`${styles.container} ${completed ? styles.completed : styles.uncompleted}`} style={{'--color-category': category ? category.color : 'transparent'}}>
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
                {category && category.title}
            </div>
        </div>
      </>
    )
}
