import styles from '../styles/Select.module.scss'
import { HiOutlineChevronDown } from 'react-icons/hi';

export default function Select({ value, onChange, className, selectClassName, children }) {
    return (  
        <div className={`${styles.container} ${className}`}>
            <select value={value} onChange={onChange} className={`${styles.select} ${selectClassName}`} required>
                {children}
            </select>
            <HiOutlineChevronDown />
        </div>
    )
}
