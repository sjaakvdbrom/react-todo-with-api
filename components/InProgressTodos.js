import { Swiper, SwiperSlide } from 'swiper/react';
import LargeCard from '../components/LargeCard';
import { BiLoaderAlt } from 'react-icons/bi';
import typo from '../styles/Typography.module.scss'
import styles from '../styles/Home.module.scss'
import swiper from '../styles/Swiper.module.scss'

export default function InProgressTodos({ todos, categories, todoLoading }) {

    return (  
        <>
            <h2 className={`${typo.heading3} ${styles.title}`}>In Progress{todos && <span className={styles.amount}>{todos.filter((item) => !item.completed).length}</span>}</h2>
            {todoLoading && <div className={styles.loading}><BiLoaderAlt /></div>}
            {todos && 
            <Swiper
                className={swiper.swiper}
                spaceBetween={30}
                slidesPerView={1.13}
                touchEventsTarget='container'
                wrapperClass={styles.swiperWrapper}
            >
                {todos
                .filter((item) => !item.completed)
                .reverse()
                .map(({ id, title, categoryId, date, description }) => (
                <SwiperSlide key={id} className={styles.swiperSlide}>
                    <div className={styles.swiperSlideInner}>
                    <LargeCard 
                        title={title}
                        categoryId={categoryId} 
                        date={date}
                        description={description}
                        categories={categories}
                    />
                    </div>
                </SwiperSlide>
                ))}
            </Swiper>}
        </>
    )
}
