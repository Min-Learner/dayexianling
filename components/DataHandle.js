import styles from '../styles/Progress.module.css';

export default function DataHandle({field, setField, index, data}) {

    let dataHandle = (or, index) => {

        let clone = [...field]; //关键一步，不解构复制的话，React视原state没有发生变化！！
        if (or && clone[index] < 5) clone[index]++;
        if (!or && clone[index] > 0) clone[index]--;
        setField(clone);
    }

    return (
        <div className={styles.dataCell}>
            <button className={styles.buttons} onClick={() => dataHandle(false, index)}>-</button>
            <p className={styles.data}>{data}</p>
            <button className={styles.buttons} onClick={() => dataHandle(true, index)}>+</button>
        </div>
    )

}