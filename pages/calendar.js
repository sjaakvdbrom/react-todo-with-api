import page from '../styles/Page.module.scss'
import Link from 'next/link'
import { HiOutlineChevronLeft } from 'react-icons/hi';
import { TbDotsVertical } from 'react-icons/tb';
import button from '../styles/Buttons.module.scss'
import typo from '../styles/Typography.module.scss'

export default function Calendar() {
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
                        Test
                    </main>
                </div>
            </div>
        </>
    )
}
