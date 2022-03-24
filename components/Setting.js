import styles from '../styles/Setting.module.css';
import { useState } from 'react';

export default function Setting({playerSlect, playerList, setIndex, currentPlayer, setPlayerList, setPlayerSlect, setCurrentPlayer, setDiceRecord, setView, setRound, setDiceData}) {

    let [animation, setAnimation] = useState(Array(6).fill(false));

    let playerSelectHandler = (e) => {

        let array = [];
        let clone = playerList;
    
        clone.push(e);
    
        for (let i = 0; i < playerSlect.length; i++) {
          if (playerSlect[i] !== e) {
            array.push(playerSlect[i]);
          }
        }
    
        setPlayerSlect(array);
        setPlayerList(clone);
    }

    let playerListHandler = (v, i) => {

        setCurrentPlayer(v);
        let clone = Array(playerList.length).fill(false);
        clone[i] = !clone[i];
        setAnimation(clone);

    }

    let reset = () => {

        setPlayerList([]);
        setPlayerSlect(['仲', '高', '宇', '敏', '霞', '炜']);
    
    }

    let set = () => {

        setView('main');
        setRound(0);
        setDiceRecord(Array(11).fill(0));
        setIndex(playerList.indexOf(currentPlayer));
        setDiceData([]);

    }

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
                    <p key={Math.random()} onClick={() => {playerListHandler(player, index)}} className={animation[index] ? `${styles.player} ${styles.transform}` : `${styles.player} ${styles.opacity}`}>
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