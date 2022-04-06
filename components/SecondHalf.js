import Image from 'next/image'

export default function SecondHalf({setCurrentPlayer, setView, roll, round, currentPlayer}) {

    return(

        <>
            <p id="total">第 <span style={{fontWeight: 'bold'}}>{round}</span> 次，下一个: <span style={{fontWeight: 'bold'}}>{currentPlayer}</span></p>
            <p className="hint">老点大爷帅气头像摇骰子</p>
            <button onClick={() => roll(false)}
                style={{
                    padding: 0,
                    height: '97px',
                    overflow: 'hidden'
                }}
            >
                <Image src="/yyds.jpg" alt="zhongge" width={111} height={97} />
            </button>
            <div className='button-wrapper'>
                <button onClick={() => {setView('setting'); setCurrentPlayer('')}} className="reset">设定</button>
                <button onClick={() => roll(true)} className="reset" style={{backgroundColor: '#d00000'}} disabled={round ? false : true}>重摇</button>
                <button onClick={() => setView('dice')} className="reset" style={{backgroundColor: '#606c38'}}>次数记录</button>
                <button onClick={() => setView('player')} style={{backgroundColor: '#2ec4b6'}} className="reset">玩家记录</button>
            </div>
        </>

    )

}