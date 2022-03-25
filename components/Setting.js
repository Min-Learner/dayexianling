import styles from '../styles/Setting.module.css';

export default function Setting({playerSlect, playerList, playerListHandler, playerSelectHandler, set, reset, selected}) {

    return (
        <div className={styles.wrapper}>
            <p className={styles.text}>按座位顺序选择玩家</p>
            <div className={styles.playerSlectWrapper}>
                {playerSlect.map((player, index) => {
                return (
                    <p key={index} className={styles.player} onClick={() => playerSelectHandler(player)}>
                    {player}
                    </p>
                );
                })}
            </div>
            <p className={styles.text}>选择开始玩家</p>
            <div className={styles.playerSlectWrapper}>
                {playerList.map((player, index) => {
                return (
                    <p key={Math.random()} onClick={() => {playerListHandler(player, index)}} className={selected[index] ? `${styles.player} ${styles.transform}` : `${styles.player} ${styles.opacity}`}>
                    {player}
                    </p>
                )
                })}
            </div>
            <div className={styles.buttonWrapper}>
                <button className={styles.button} style={{backgroundColor: '#52b788'}} onClick={set}>确定</button>
                <button className={styles.button} style={{backgroundColor: '#fca311'}} onClick={reset}>重置</button>
            </div>
        </div>
    )
}