import { useRef, useState, useEffect } from 'react';
import Link from 'next/link'
import Head from 'next/head'
import 'swiper/css';
import page from '../styles/Page.module.scss'
import styles from '../styles/Home.module.scss'
import Modal from '../components/Modal';
import AddTodo from '../components/AddTodo';
import { BiCalendar, BiBell } from 'react-icons/bi';
import button from '../styles/Buttons.module.scss'
import { HiPlus } from 'react-icons/hi';
import CompletedTodos from '../components/CompletedTodos';
import InProgressTodos from '../components/InProgressTodos';

export default function Home() {
  const listInnerRef = useRef();
  const [isBottom, setIsBottom] = useState(false)
  const [todos, setTodos] = useState(null)
  const [todoLoading, setTodoLoading] = useState(false)
  const [categories, setCategories] = useState(null)
  const [categoryLoading, setCategoryLoading] = useState(false)
  const [addTodoModalVisible, setAddTodoModalVisible] = useState(false)

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

  return (
    <>
      <Head>
        <title>Todo App</title>
        <meta name="description" content="React Todo app using https://my-json-server.typicode.com/" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`${page.wrapper} ${styles.wrapper} ${!isBottom && styles.notBottom}`}>
        <div className={page.container} onScroll={() => onScroll()} ref={listInnerRef}>
          

          <header className={styles.header}>
            <div className={styles.intro}>
              <div className={styles.avatar}></div>
              <div>
                <div className={styles.greeting}>Hello,</div>
                <div className={styles.name}>Sjaak</div>
              </div>
            </div>
            <div className={styles.buttons}>
              <Link href="/calendar"><button className={button.icon}><BiCalendar /></button></Link>
              <button className={button.icon}><BiBell /></button>
            </div>
          </header>
          <main>
            <InProgressTodos todos={todos} categories={categories} todoLoading={todoLoading} />
            <CompletedTodos todos={todos} setTodos={setTodos} categories={categories} todoLoading={todoLoading} />
          </main>
        </div>

        <button onClick={() => setAddTodoModalVisible(true)} className={`${styles.create} ${button.button} ${button.xl} ${button.iconBefore}`}><HiPlus />Create New</button>

        <Modal title={'Test modal'}>
          test
        </Modal>
        
        <Modal title={'Add new ToDo'} addTodoModalVisible={addTodoModalVisible} setAddTodoModalVisible={setAddTodoModalVisible}>
          <AddTodo 
          setTodos={setTodos}
          categories={categories}
          setAddTodoModalVisible={setAddTodoModalVisible}
          />
        </Modal>
      </div>
    </>
  )
}
