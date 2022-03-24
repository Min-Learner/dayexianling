import Image from 'next/image'

export default function Main({dieOne, dieTwo, setDieOne, setDieTwo, round, setRound, playerList, setView, index, setIndex, currentPlayer, setCurrentPlayer, animation, setAnimation, setCount}) {

    let roll = () => {

        setDieOne(Math.floor(Math.random()*6));
        setDieTwo(Math.floor(Math.random()*6));
        setRound(pre => pre + 1);
        setCount(pre => pre + 1);
        setAnimation(true);

        if (index < playerList.length - 1){
            setIndex(pre => pre + 1);
            setCurrentPlayer(playerList[index + 1]);
        } else {
            setIndex(0);
            setCurrentPlayer(playerList[0]);
        };

    }

    return (
        <div className="container">
            <p className="bottom-line">去到菉塘,记得naam虾酱哇!</p>
            <div className="img-wrapper">
                <p className="test">{dieOne + dieTwo + 2}</p>
            </div>
            <div className="dice-wrapper">
                <div>
                    <div className={6 - dieOne === 1 ? animation ? "dice first six shake" : "dice first six" : "opacity"}>
                        <span></span><span></span><span></span><span></span><span></span><span></span>
                    </div>
                    <div className={6 - dieOne === 2 ? animation ? "dice first five shake" : "dice first five" : "opacity"}>
                        <span></span><span></span><span></span><span></span><span></span>
                    </div>
                    <div className={6 - dieOne === 3 ? animation ? "dice first four shake" : "dice first four" : "opacity"}>
                        <span></span><span></span><span></span><span></span>
                    </div>
                    <div className={6 - dieOne === 4 ? animation ? "dice first three shake" : "dice first three" : "opacity"}>
                        <span></span><span></span><span></span>
                    </div>
                    <div className={6 - dieOne === 5 ? animation ? "dice first two shake" : "dice first two" : "opacity"}>
                        <span></span><span></span>
                    </div>
                    <div className={6 - dieOne === 6 ? animation ? "dice first one shake" : "dice first one" : "opacity"}>
                        <span></span>
                    </div>
                </div>
                <div>
                    <div className={6 - dieTwo === 1 ? animation ? "dice second six shake" : "dice second six" : "opacity"}>
                        <span></span><span></span><span></span><span></span><span></span><span></span>
                    </div>
                    <div className={6 - dieTwo === 2 ? animation ? "dice second five shake" : "dice second five" : "opacity"}>
                        <span></span><span></span><span></span><span></span><span></span>
                    </div>
                    <div className={6 - dieTwo === 3 ? animation ? "dice second four shake" : "dice second four" : "opacity"}>
                        <span></span><span></span><span></span><span></span>
                    </div>
                    <div className={6 - dieTwo === 4 ? animation ? "dice second three shake" : "dice second three" : "opacity"}>
                        <span></span><span></span><span></span>
                    </div>
                    <div className={6 - dieTwo === 5 ? animation ? "dice second two shake" : "dice second two" : "opacity"}>
                        <span></span><span></span>
                    </div>
                    <div className={6 - dieTwo === 6 ? animation ? "dice second one shake" : "dice second one" : "opacity"}>
                        <span></span>
                    </div>
                </div>
            </div>
            <p id="total">第 <span>{round}</span> 次，下一个: <span>{currentPlayer}</span></p>
            <p className="hint">老点大爷帅气头像摇骰子</p>
            <button onClick={roll}><Image src="/yyds.jpg" alt="zhongge" width={111} height={97} /></button>
            <div className='button-wrapper'>
                <button onClick={() => setView('setting')} className="reset">设定</button>
                <button onClick={() => setView('dice')} className="reset" style={{backgroundColor: '#606c38'}}>次数记录</button>
                <button onClick={() => setView('player')} style={{backgroundColor: '#2ec4b6'}} className="reset">玩家记录</button>
            </div>
        </div>
    )

}