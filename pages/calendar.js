import { useState, useEffect } from 'react';
import page from '../styles/Page.module.scss'
import Link from 'next/link'
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { HiOutlineChevronLeft } from 'react-icons/hi';
import { TbDotsVertical } from 'react-icons/tb';
import { format, parse, startOfToday, eachDayOfInterval, endOfMonth, eachHourOfInterval, isEqual, getDate, endOfToday, roundToNearestMinutes } from 'date-fns'
import { v4 as uuidv4 } from 'uuid';
import button from '../styles/Buttons.module.scss'
import typo from '../styles/Typography.module.scss'
import styles from '../styles/Calendar.module.scss'
import swiper from '../styles/Swiper.module.scss'

export default function Calendar() {
    const [todos, setTodos] = useState(null)
    const [categories, setCategories] = useState(null)
    let today = startOfToday()
    let [selectedDay, setSelectedDay] = useState(today)
    let [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'))
    let [todosToday, setTodosToday] = useState(null)
    let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date())
    let days = eachDayOfInterval({
        start: firstDayCurrentMonth,
        end: endOfMonth(firstDayCurrentMonth),
    })
    const timeline = eachHourOfInterval({
        start: startOfToday(),
        end: endOfToday()
    })
    useEffect(() => {
    fetch('https://my-json-server.typicode.com/sjaakvdbrom/react-todo-with-api/todos')
        .then((res) => res.json())
        .then((data) => {
        setTodos(data)
        });
    fetch('https://my-json-server.typicode.com/sjaakvdbrom/react-todo-with-api/categories')
        .then((res) => res.json())
        .then((data) => {
        setCategories(data)
        })
    }, [])
    useEffect(() => {
        if (!todos) return
        setTodosToday(todos.filter((item) => item.date === format(selectedDay, 'yyyy-MM-dd')))
    }, [todos, selectedDay])

    return (
        <>
            <div className={`${page.wrapper}`}>
                <div className={page.container}>
                    <header className={page.header}>
                        <Link href="/"><button className={button.icon} title='Go back'><HiOutlineChevronLeft /></button></Link>
                        <h1 className={typo.heading3}>Calendar</h1>
                        <button className={button.icon} title='Go back'><TbDotsVertical /></button>
                    </header>
                    <main>
                        <Swiper
                            className={`${styles.swiper} ${swiper.swiper}`}
                            slidesPerView={4.25}
                            initialSlide={getDate(today) - 1}
                        >
                            {days.map((day) => (
                                <SwiperSlide
                                className={styles.slide}
                                key={day.toString()}
                                >
                                    <time onClick={() => setSelectedDay(day)} className={`
                                    ${styles.dayBox}
                                    ${isEqual(day, selectedDay) && styles.today}
                                    `} dateTime={format(day, 'yyyy-MM-dd')}>
                                        {todos && todos.filter((item) => item.date === format(day, 'yyyy-MM-dd')).length ? <div className={styles.bubble} /> : '' }
                                        <div className={styles.number}>{format(day, 'd')}</div>
                                        <div className={styles.day}>{format(day, 'E')}</div>
                                        
                                    </time>
                                
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <h2 className={`${typo.heading3} mb-3`}>Timeline</h2>
                        <div className={styles.timeline}>
                            {timeline.map((hour) => (
                                <div key={hour.toString()} className={styles.hour}>
                                    <div className={styles.hourText}>{format(hour, 'hh:mm a')}</div>
                                    <div className={styles.spot}>
                                        {todosToday && todosToday.filter((item) => format(roundToNearestMinutes(parse(item.time, 'HH:mm', new Date()), { nearestTo: 30 }), 'HH:mm') === format(hour, 'HH:mm')).map(item => <div key={uuidv4()} className={styles.hourCard}>{item.title}</div>)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}
