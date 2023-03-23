import styles from '../styles/Select.module.scss'
import { HiOutlineChevronDown } from 'react-icons/hi';

export default function Select({ value, onChange, children }) {
    return (  
        <div className={styles.container}>
            <select value={value} onChange={onChange}>
                {children}
            </select>
            <HiOutlineChevronDown />
        </div>
    )
}
