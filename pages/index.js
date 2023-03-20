import Head from 'next/head'
import 'swiper/css';
import button from '../styles/Buttons.module.scss'
import styles from '../styles/Home.module.scss'
import { getAllTodos, getAllCategories } from '../lib/todos';
import Card from '../components/Card';
import LargeCard from '../components/LargeCard';
import { HiPlus } from 'react-icons/hi';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function Home({ allTodos, allCategories }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Todo App</title>
        <meta name="description" content="React Todo app using https://my-json-server.typicode.com/" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
      <h2 className={styles.title}>In Progress<span className={styles.amount}>{allTodos.length}</span></h2>
      <Swiper
        className={styles.swiper}
        spaceBetween={30}
        slidesPerView={1.1}
        wrapperClass={styles.swiperWrapper}
      >
        {allTodos
        .filter((item) => !item.completed)
        .map(({ id, title }) => (
          <SwiperSlide className={styles.swiperSlide}>
            <div className={styles.swiperSlideInner}>
              <LargeCard 
                key={id} 
                title={title} 
              />
            </div>
          </SwiperSlide>
        ))}
        
      </Swiper>
        
      <h2 className={styles.title}>Completed</h2>
      {allTodos
        .filter((item) => item.completed).slice(0, 5)
        .map(({ id, title, description, date, completed, categoryId }) => (
          <Card 
            key={id} 
            title={title} 
            description={description} 
            completed={completed} 
            date={date} 
            categoryId={categoryId} 
            categories={allCategories} 
          />
        ))}
      <button className={`${styles.button} ${button.button} ${button.xl} ${button.iconBefore}`}><HiPlus />Create New</button>
      </main>
    </div>
  )
}

export async function getStaticProps() {
  const allTodos = await getAllTodos();
  const allCategories = await getAllCategories();
  return {
    props: {
      allTodos,
      allCategories
    },
  };
}
