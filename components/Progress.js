import styles from '../styles/Progress.module.css';
import DataHandle from './DataHandle';


export default function Progress({playerList, trade, setTrade, politic, setPolitic, science, setScience, setView}) {

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.fields}></div>
                <div className={styles.fields} style={{backgroundColor: 'rgb(250, 163, 7)'}}>贸易-布</div>
                <div className={styles.fields} style={{backgroundColor: 'rgb(0, 119, 182)'}}>政治-币</div>
                <div className={styles.fields} style={{backgroundColor: 'rgb(64, 145, 108)'}}>科技-纸</div>
            </div>
            <div className={styles.secondWrapper}>
                <div style={{flex: 1}}>
                    {playerList.map(p => {
                        return <div className={styles.listCell} key={Math.random()}>{p}</div>
                    })}
                </div>
                <div className={styles.dataWrapper}>
                    {trade.map((data, index) => {
                        return <DataHandle  key={Math.random() * Math.random()} field={trade} setField={setTrade} index={index} data={data} />
                    })}
                </div>
                <div className={styles.dataWrapper}>
                    {politic.map((data, index) => {
                        return <DataHandle  key={Math.random() * Math.random()} field={politic} setField={setPolitic} index={index} data={data} />
                    })}
                </div>
                <div className={styles.dataWrapper}>
                    {science.map((data, index) => {
                        return <DataHandle  key={Math.random() * Math.random()} field={science} setField={setScience} index={index} data={data} />
                    })}
                </div>
            </div>
            <button className={styles.confirm} onClick={() => setView('knight')}>確定</button>   
        </div>
    )

}