import { useRef, useState, useLayoutEffect, useEffect } from 'react';
import { useDrag } from '@use-gesture/react'
import { a, useSpring, config } from '@react-spring/web'
import modal from '../styles/Modal.module.scss'
import typo from '../styles/Typography.module.scss'

export default function Modal(props) {
    const modalRef = useRef(null);
    const [height, setHeight] = useState(1000);
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [{ y }, api] = useSpring(() => ({ y: height }))

    useLayoutEffect(() => {
        const { height } = modalRef.current.getBoundingClientRect();
        setHeight(height);
    }, [modalIsOpen]);

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
        props.setAddTodoModalVisible(false)
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
        my > height * 0.2 || (vy > 0.3 && dy > 0) ? close(vy) : open({ canceled })
        }
        // when the user keeps dragging, we just move the sheet according to
        // the cursor position
        else api.start({ y: my, immediate: true })
    },
    { from: () => [0, y.get()], filterTaps: true, bounds: { top: 0 }, rubberband: true }
    )

    const bgStyle = {
    '--opacity': y.to([0, height], [0.3, 0], 'clamp'),
    '--blur': y.to([0, height], [3, 0], 'clamp')
    }

    useEffect(() => {
        if (props.addTodoModalVisible === true) {
            open(false)
        }
        if (props.addTodoModalVisible === false) {
            close()
        }
    },[props.addTodoModalVisible, open, close])

    return (  
      <>
        <a.div onClick={() => close()} className={`${modal.overlay} ${!modalIsOpen && modal.hide}`} style={bgStyle}></a.div>

        <a.div style={{ bottom: `calc(-100% + ${height - 100}px)`, y }} className={`${modal.drag}`}>
            <div className={`${modal.container}`} ref={modalRef}>
                <header className={modal.header}>
                    <div {...bind()} className={modal.top}></div>
                    <h2 className={`${modal.title} ${typo.heading3}`}>{props.title}</h2>
                </header>
                <main className={modal.main}>
                    {props.children}
                </main>
            </div>
        </a.div>
      </>
    )
}
