import Image from 'next/image'
import Pirate from './Pirate'
import Politic from './Politic'
import Science from './Science'
import Skull from './Skull'
import Trade from './Trade'

export default function Knight({dieOne, dieTwo, round, setView, currentPlayer, animation, reroll, roll, dieThree, pirate, cardHint}) {
    
    let x = (pirate % 7 * 39 + 21) + 'px'
    let y = ((pirate % 7) % 2) ? '40%' : '0'

    return (
        <div className="container">
            <div className='progress'>
                <div style={{transform: `translate(${x}, ${y})`, zIndex: 999}}><Pirate /></div>
                <span>大</span>
                <span>爷</span>
                <span>世</span>
                <span>界</span>
                <span>最</span>
                <span>威</span>
                <span>武</span>
                <span style={{border: 'none'}} onClick={() => setView('progress')}><Image src='/daye.png' width={35} height={35} /></span>
            </div>
            <p className='message'>{cardHint}</p>
            <div className="img-wrapper">
                <p className="test">{dieOne + dieTwo + 2}</p>
            </div>
            <div className="dice-wrapper" style={{width: '100%'}}>
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
                <div style={{width: '100px', margin: 'auto'}}>
                    <div className={dieThree < 3 ? animation ? 'dice-card shake' : 'dice-card' : 'opacity'}>
                        <Skull />
                    </div>
                    <div className={dieThree === 3 ? animation ? 'dice-card shake' : 'dice-card' : 'opacity'}>
                        <Trade />
                    </div>
                    <div className={dieThree === 4 ? animation ? 'dice-card shake' : 'dice-card' : 'opacity'}>
                        <Politic />
                    </div>
                    <div className={dieThree === 5 ? animation ? 'dice-card shake' : 'dice-card' : 'opacity'}>
                        <Science />
                    </div>
                </div>
            </div>
            <p id="total">第 <span style={{fontWeight: 'bold'}}>{round}</span> 次，下一个: <span style={{fontWeight: 'bold'}}>{currentPlayer}</span></p>
            <p className="hint">老点大爷帅气头像摇骰子</p>
            <button onClick={roll}
                style={{
                    padding: 0,
                    height: '97px',
                    overflow: 'hidden'
                }}
            >
                <Image src="/yyds.jpg" alt="zhongge" width={111} height={97} />
            </button>
            <div className='button-wrapper'>
                <button onClick={() => setView('setting')} className="reset">设定</button>
                <button onClick={reroll} className="reset" style={{backgroundColor: '#d00000'}}>重摇</button>
                <button onClick={() => setView('dice')} className="reset" style={{backgroundColor: '#606c38'}}>次数记录</button>
                <button onClick={() => setView('player')} style={{backgroundColor: '#2ec4b6'}} className="reset">玩家记录</button>
            </div>
        </div>
    )

}