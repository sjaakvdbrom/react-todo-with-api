import { useState } from 'react';
import page from '../styles/Page.module.scss'
import Link from 'next/link'
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { HiOutlineChevronLeft } from 'react-icons/hi';
import { TbDotsVertical } from 'react-icons/tb';
import { format, parse, startOfToday, eachDayOfInterval, endOfMonth, isToday, isEqual, getDate } from 'date-fns'
import { v4 as uuidv4 } from 'uuid';
import button from '../styles/Buttons.module.scss'
import typo from '../styles/Typography.module.scss'
import styles from '../styles/Calendar.module.scss'
import swiper from '../styles/Swiper.module.scss'

export default function Calendar() {
    let today = startOfToday()
    let [selectedDay, setSelectedDay] = useState(today)
    let [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'))
    let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date())
    let days = eachDayOfInterval({
        start: firstDayCurrentMonth,
        end: endOfMonth(firstDayCurrentMonth),
    })

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
                            className={swiper.swiper}
                            spaceBetween={18}
                            slidesPerView={4.5}
                            initialSlide={getDate(today) - 1}
                        >
                            {days.map((day) => (
                                <SwiperSlide
                                key={day.toString()}
                                onClick={() => setSelectedDay(day)}
                                >
                        
                                    <time className={`
                                    ${styles.dayBox}
                                    ${isEqual(day, selectedDay) && styles.today}
                                    `} dateTime={format(day, 'yyyy-MM-dd')}>
                                        <div className={styles.number}>{format(day, 'd')}</div>
                                        <div className={styles.day}>{format(day, 'E')}</div>
                                        
                                    </time>
                                
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </main>
                </div>
            </div>
        </>
    )
}
