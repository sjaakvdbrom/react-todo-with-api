import { useRef, useState, useEffect } from 'react';
import Head from 'next/head'
import 'swiper/css';
import typo from '../styles/Typography.module.scss'
import styles from '../styles/Home.module.scss'
import Card from '../components/Card';
import LargeCard from '../components/LargeCard';
import Modal from '../components/Modal';
import button from '../styles/Buttons.module.scss'
import { BiCalendar, BiBell } from 'react-icons/bi';
import { Swiper, SwiperSlide } from 'swiper/react';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns'

export default function Home() {
  const listInnerRef = useRef();
  const [isBottom, setIsBottom] = useState(false)
  const [todos, setTodos] = useState(null)
  const [todoLoading, setTodoLoading] = useState(false)
  const [categories, setCategories] = useState(null)
  const [categoryLoading, setCategoryLoading] = useState(false)
  const [formTitle, setFormTitle] = useState('')
  const [formDescription, setFormDescription] = useState('')

  useEffect(() => {
    setTodoLoading(true)
    fetch('https://my-json-server.typicode.com/sjaakvdbrom/react-todo-with-api/todos')
      .then((res) => res.json())
      .then((data) => {
        setTodos(data)
        setTodoLoading(false)
      });
      setCategoryLoading(true)
    fetch('https://my-json-server.typicode.com/sjaakvdbrom/react-todo-with-api/categories')
      .then((res) => res.json())
      .then((data) => {
        setCategories(data)
        setCategoryLoading(false)
      })
  }, [])

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

  const handleAddTodo= (event) => {
    event.preventDefault();

    setTodos(oldArray => [...oldArray,{
      id: uuidv4(),
      title: formTitle,
      description: formDescription,
      date: format(new Date, 'yyyy-MM-d'),
      time: format(new Date, 'HH:mm'),
      completed: false,
      categoryId: 1
    }])

    setFormTitle('')
    setFormDescription('')
  }

  if (todoLoading) return <p>Loading...</p>
  if (!todos) return <p>No todos</p>
  if (categoryLoading) return <p>Loading...</p>
  if (!categories) return <p>No todos</p>

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
          <h2 className={`${typo.heading3} ${styles.title}`}>In Progress<span className={styles.amount}>{todos.length}</span></h2>
          <Swiper
            className={styles.swiper}
            spaceBetween={30}
            slidesPerView={1.13}
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
            
          </Swiper>
            
          <h2 className={`${typo.heading3} ${styles.title}`}>Completed</h2>
          {todos
            .filter((item) => item.completed)
            .reverse()
            .slice(0, 5)
            .map(({ id, title, description, date, time, completed, categoryId }) => (
              <Card 
                key={id} 
                title={title} 
                description={description} 
                completed={completed} 
                date={date}
                time={time}
                categoryId={categoryId}
                categories={categories}
              />
            ))}
        </main>
      </div>

      <Modal title={'Test modal'}>
        test
      </Modal>
      
      <Modal title={'Add new ToDo'}>
        <form onSubmit={handleAddTodo}>
          <div className='form-inputs'>
            <div className='form-control'>
              <label htmlFor='add-title'>Title</label>
              <input type='text' value={formTitle} onChange={(e) => setFormTitle(e.target.value)} placeholder='Task name' id='add-title' />
            </div>
            <div className='form-control'>
              <label htmlFor='add-description'>Description</label>
              <textarea value={formDescription} onChange={(e) => setFormDescription(e.target.value)} placeholder='Description text' id='add-description' rows='5' />
            </div>
          </div>
          <button className={`${button.button} ${button.full}`}>Create</button>
        </form>
      </Modal>
    </div>
  )
}
