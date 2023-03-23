import Card from '../components/Card';
import { BiLoaderAlt } from 'react-icons/bi';
import typo from '../styles/Typography.module.scss'
import styles from '../styles/Home.module.scss'

export default function CompletedTodos({ todos, categories, todoLoading, setTodos }) {

    return (  
        <>
            <h2 className={`${typo.heading3} ${styles.title}`}>Completed</h2>
            {todoLoading && <div className={styles.loading}><BiLoaderAlt /></div>}
            {todos && todos
                .filter((item) => item.completed)
                .reverse()
                .slice(0, 5)
                .map(({ id, title, description, date, time, completed, categoryId }) => (
                <Card 
                    key={id} 
                    id={id}
                    title={title} 
                    description={description} 
                    completed={completed} 
                    date={date}
                    time={time}
                    categoryId={categoryId}
                    categories={categories}
                    todos={todos}
                    setTodos={setTodos}
                />
                ))}
        </>
    )
}
