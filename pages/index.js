import { useRef, useState } from 'react';
import Head from 'next/head'
import 'swiper/css';
import button from '../styles/Buttons.module.scss'
import modal from '../styles/Modal.module.scss'
import typo from '../styles/Typography.module.scss'
import styles from '../styles/Home.module.scss'
import { getAllTodos, getAllCategories } from '../lib/todos';
import Card from '../components/Card';
import LargeCard from '../components/LargeCard';
import { HiPlus } from 'react-icons/hi';
import { BiCalendar, BiBell } from 'react-icons/bi';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useDrag } from '@use-gesture/react'
import { a, useSpring, config } from '@react-spring/web'

export default function Home({ allTodos, allCategories }) {
  const listInnerRef = useRef();
  const [isBottom, setIsBottom] = useState(false)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const height = 570
  const [{ y }, api] = useSpring(() => ({ y: height }))

  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, clientHeight, scrollHeight } = listInnerRef.current;
      // For some god forsaken reason the scrollHeight is off by 1. But only 'sometimes' like when the body has a certain line-height or in firefox.
      // I'm guessing something with rounding half pixels down or whatever.
      // To avoid any of that I subtract 1 from the scrollHeight to account for this.
      if (scrollTop + clientHeight >= scrollHeight - 1) {
        setIsBottom(true)
      } else {
        setIsBottom(false)
      }
    }
  }

  const open = ({ canceled }) => {
    // when cancel is true, it means that the user passed the upwards threshold
    // so we change the spring config to create a nice wobbly effect
    if (!canceled) {
      setModalIsOpen(true)
    }
    api.start({ y: 0, immediate: false, config: canceled ? config.wobbly : config.stiff })
  }

  const close = (velocity = 0) => {
    setModalIsOpen(false)
    api.start({ y: height, immediate: false, config: { ...config.stiff, velocity } })
  }

  const bind = useDrag(
    ({ last, velocity: [, vy], direction: [, dy], movement: [, my], cancel, canceled }) => {
      // if the user drags up passed a threshold, then we cancel
      // the drag so that the sheet resets to its open position
      if (my < -70) cancel()

      // when the user releases the sheet, we check whether it passed
      // the threshold for it to close, or if we reset it to its open positino
      if (last) {
        my > height * 0.5 || (vy > 0.5 && dy > 0) ? close(vy) : open({ canceled })
      }
      // when the user keeps dragging, we just move the sheet according to
      // the cursor position
      else api.start({ y: my, immediate: true })
    },
    { from: () => [0, y.get()], filterTaps: true, bounds: { top: 0 }, rubberband: true }
  )

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
          <h2 className={`${typo.heading3} ${styles.title}`}>In Progress<span className={styles.amount}>{allTodos.length}</span></h2>
          <Swiper
            className={styles.swiper}
            spaceBetween={30}
            slidesPerView={1.13}
            wrapperClass={styles.swiperWrapper}
          >
            {allTodos
            .filter((item) => !item.completed)
            .map(({ id, title, categoryId, date, description }) => (
              <SwiperSlide key={id} className={styles.swiperSlide}>
                <div className={styles.swiperSlideInner}>
                  <LargeCard 
                    title={title}
                    categoryId={categoryId} 
                    categories={allCategories}
                    date={date}
                    description={description}
                  />
                </div>
              </SwiperSlide>
            ))}
            
          </Swiper>
            
          <h2 className={`${typo.heading3} ${styles.title}`}>Completed</h2>
          {allTodos
            .filter((item) => item.completed).slice(0, 5)
            .map(({ id, title, description, date, time, completed, categoryId }) => (
              <Card 
                key={id} 
                title={title} 
                description={description} 
                completed={completed} 
                date={date}
                time={time}
                categoryId={categoryId} 
                categories={allCategories}
              />
            ))}
        </main>
      </div>
      <button onClick={open} className={`${styles.create} ${button.button} ${button.xl} ${button.iconBefore}`}><HiPlus />Create New</button>
      <div onClick={() => close()} className={`${modal.overlay} ${!modalIsOpen && modal.hide}`}></div>

      <a.div style={{ bottom: `calc(-100% + ${height - 100}px)`, y }} className={`${modal.drag}`}>
        <div className={`${modal.container}`}>
          <header className={modal.header}>
            <div {...bind()} className={modal.top}></div>
            <h2 className={`${modal.title} ${typo.heading3}`}>Add new ToDo</h2>
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
      </a.div>
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
