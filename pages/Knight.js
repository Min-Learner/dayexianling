import Pirate from '../components/Pirate'
import Politic from '../components/Politic'
import Science from '../components/Science'
import Skull from '../components/Skull'
import Trade from '../components/Trade'
import YellowDice from '../components/YelloDice'
import RedDice from '../components/RedDice'
import SecondHalf from '../components/SecondHalf'
import Image from 'next/image'
import Total from '../components/Total'
import { useRouter } from 'next/router'

export default function Knight({dieOne, dieTwo, round, currentPlayer, animation, roll, dieThree, pirate, cardHint, setCurrentPlayer}) {
    
    let x = (pirate % 7 * 39 + 21) + 'px'
    let y = ((pirate % 7) % 2) ? '40%' : '0'
    const router = useRouter()

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
                <span style={{border: 'none'}} onClick={() => router.push('/Progress')}><Image src='/daye.png' width={35} height={35} /></span>
            </div>
            <p className='message'>{cardHint}</p>
            <Total dieOne={dieOne} dieTwo={dieTwo} animation={animation} />
            <div className="dice-wrapper" style={{width: '100%'}}>
                <YellowDice dieOne={dieOne} animation={animation} />
                <RedDice dieTwo={dieTwo} animation={animation} />
                <div style={{width: '100px'}}>
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
            <SecondHalf setCurrentPlayer={setCurrentPlayer} roll={roll} round={round} currentPlayer={currentPlayer} />
        </div>
    )

}