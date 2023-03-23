import { useState, useEffect, useRef } from 'react';
import page from '../styles/Page.module.scss'
import Link from 'next/link'
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { HiOutlineChevronLeft } from 'react-icons/hi';
import { TbDotsVertical } from 'react-icons/tb';
import { HiOutlineChevronDown } from 'react-icons/hi';
import { format, parse, startOfToday, eachDayOfInterval, endOfMonth, eachHourOfInterval, isEqual, getDate, endOfToday, roundToNearestMinutes, eachMonthOfInterval, startOfYear, endOfYear, getYear, getMonth } from 'date-fns'
import { v4 as uuidv4 } from 'uuid';
import button from '../styles/Buttons.module.scss'
import typo from '../styles/Typography.module.scss'
import styles from '../styles/Calendar.module.scss'
import swiper from '../styles/Swiper.module.scss'

export default function Calendar() {
    const cloneRef = useRef()
    const [todos, setTodos] = useState(null)
    const [categories, setCategories] = useState(null)
    let today = startOfToday()
    let [selectedDay, setSelectedDay] = useState(today)
    let [selectedMonth, setSelectedMonth] = useState(getMonth(today))
    let [selectedYear, setSelectedYear] = useState(getYear(today))
    let [todosToday, setTodosToday] = useState(null)
    let [cloneSelect, setCloneSelect] = useState(format(parse(selectedMonth + 1, 'M', new Date()), 'MMMM'))
    let [cloneWidth, setCLoneWidth] = useState(0)
    let days = eachDayOfInterval({ // TODO: include the selectedYear aswell
        start: parse(selectedMonth + 1, 'M', new Date()),
        end: endOfMonth(parse(selectedMonth + 1, 'M', new Date())),
    })
    const timeline = eachHourOfInterval({
        start: startOfToday(),
        end: endOfToday()
    })

    const months = eachMonthOfInterval({
        start: startOfYear(selectedYear),
        end: endOfYear(selectedYear)
    })

    const handleMonthSelect = (e) => {
        setSelectedDay(today)
        setSelectedMonth(Number(e.target.value))
        setCloneSelect(format(parse(Number(e.target.value) + 1, 'M', new Date()), 'MMMM'))
    }

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

    useEffect(() => {
        if (cloneRef.current) {
            const { clientWidth } = cloneRef.current;
            setCLoneWidth(clientWidth)
        }
    }, [selectedMonth])

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
                        <div className={`${styles.select}`}>
                            <select value={selectedMonth} onChange={handleMonthSelect} className={styles.selecter} style={{width: cloneWidth}}>
                                {months.map((month, index) => (
                                    <option key={uuidv4()} value={index}>{format(month, 'LLLL')}</option>
                                ))}
                            </select>
                            <HiOutlineChevronDown />
                        </div>
                        <select className={`${styles.selecter} ${styles.clone}`} ref={cloneRef}>
                            <option>{cloneSelect}</option>
                        </select>
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
                        <h2 className={`${typo.heading3} mb-4`}>Timeline</h2>
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
