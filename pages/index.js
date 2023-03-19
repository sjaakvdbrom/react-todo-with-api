import Head from 'next/head'
import button from '../styles/Buttons.module.scss'
import styles from '../styles/Home.module.scss'
import { getAllTodos } from '../lib/posts';
import Card from '../components/Card';

export default function Home({ allTodos }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Todo App</title>
        <meta name="description" content="React Todo app using https://my-json-server.typicode.com/" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h2>Completed</h2>
        {allTodos.filter((item) => item.completed).slice(0, 5).map(({ id, title, description, completed }) => (
          <Card key={id} title={title} description={description} completed={completed} />
        ))}
      <button className={`${styles.button} ${button.button} ${button.xl}`}>Create New</button>
      </main>
    </div>
  )
}

export async function getStaticProps() {
  const allTodos = await getAllTodos();
  return {
    props: {
      allTodos,
    },
  };
}
