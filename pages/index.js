import { useRef, useState } from 'react';
import Head from 'next/head'
import 'swiper/css';
import button from '../styles/Buttons.module.scss'
import modal from '../styles/Modal.module.scss'
import styles from '../styles/Home.module.scss'
import { getAllTodos, getAllCategories } from '../lib/todos';
import Card from '../components/Card';
import LargeCard from '../components/LargeCard';
import { HiPlus } from 'react-icons/hi';
import { BiCalendar, BiBell } from 'react-icons/bi';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function Home({ allTodos, allCategories }) {
  const listInnerRef = useRef();
  const [isBottom, setIsBottom] = useState(false)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [isEditting, setIsEditting] = useState(false)
  const [isAdding, setIsAdding] = useState(false)

  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      // TODO: Find out why sometimes scrollHeight is 1px off when changing styles. For example changing body line-height.
      // For now it is fixed by subtracting 1 off the scrollHeight.
      if (scrollTop + clientHeight === scrollHeight) {
        setIsBottom(true)
      } else {
        setIsBottom(false)
      }
    }
  }

  const closeAllModals = () => {
    setModalIsOpen(false)
    setIsEditting(false)
    setIsAdding(false)
  }

  const handleEditModal = () => {
    setIsEditting(prev => !prev)
    setModalIsOpen(prev => !prev)
  }

  const handleAddModal = () => {
    setIsAdding(prev => !prev)
    setModalIsOpen(prev => !prev)
  }

  return (
    <div className={`${styles.wrapper} ${!isBottom && styles.notBottom}`}>
      <div className={styles.container} onScroll={() => onScroll()} ref={listInnerRef}>
        <Head>
          <title>Todo App</title>
          <meta name="description" content="React Todo app using https://my-json-server.typicode.com/" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <header className={styles.header}>
          <div className={styles.intro}>
            <div className={styles.avatar}></div>
            <div>
              <div className={styles.greeting}>Hello,</div>
              <div className={styles.name}>Sjaak</div>
            </div>
          </div>
          <div className={styles.buttons}>
            <button className={styles.button}><BiCalendar /></button>
            <button className={styles.button}><BiBell /></button>
          </div>
        </header>
        <main className={styles.main}>
          <h2 className={styles.title}>In Progress<span className={styles.amount}>{allTodos.length}</span></h2>
          <Swiper
            className={styles.swiper}
            spaceBetween={30}
            slidesPerView={1.13}
            wrapperClass={styles.swiperWrapper}
          >
            {allTodos
            .filter((item) => !item.completed)
            .map(({ id, title, categoryId }) => (
              <SwiperSlide key={id} className={styles.swiperSlide}>
                <div className={styles.swiperSlideInner}>
                  <LargeCard 
                    title={title}
                    categoryId={categoryId} 
                    categories={allCategories} 
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
                onClick={handleEditModal}
              />
            ))}
        </main>
      </div>
      <button onClick={handleAddModal} className={`${styles.create} ${button.button} ${button.xl} ${button.iconBefore}`}><HiPlus />Create New</button>
      {modalIsOpen && <div onClick={closeAllModals} className={modal.overlay}></div>}
      <div className={`${modal.container} ${isEditting && modal.active}`}>
        <header className={modal.header}>
          <div onClick={closeAllModals} className={modal.top}></div>
          Editting ToDo
        </header>
      </div>
      <div className={`${modal.container} ${isAdding && modal.active}`}>
        <header className={modal.header}>
          <div onClick={closeAllModals} className={modal.top}></div>
          <h2 className={modal.title}>Add new ToDo</h2>
        </header>
        <main className={modal.main}>
          <div className='form-inputs'>
            <div className='form-control'>
              <label htmlFor='add-title'>Title</label>
              <input type='text' placeholder='Task name' id='add-title' />
            </div>
            <div className='form-control'>
              <label htmlFor='add-description'>Description</label>
              <textarea placeholder='Description text' id='add-description' rows='5' />
            </div>
          </div>
          <button className={`${button.button} ${button.full}`}>Create</button>
        </main>
      </div>
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
