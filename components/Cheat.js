import { useState } from "react"

export default function Cheat({setView, setDieOne, setDieTwo, setRound, setCount, index, setIndex, playerList, setCurrentPlayer}) {

    let [rightClicked, setRightClicked] = useState(Array(6).fill(false))
    let [leftClicked, setLeftClicked] = useState(Array(6).fill(false))
    let [leftDie, setLeftDie] = useState()
    let [rightDie, setRightDie] = useState()

    let clickHandle = (index, which, side) => {

        let array = Array(6).fill(false)
        array[index] = true
        which(array)

        if (side) setLeftDie(index)
        else setRightDie(index)

    }

    let cheat = () => {

        if (leftDie != null && rightDie != null) {
            setDieOne(leftDie)
            setDieTwo(rightDie)
            setCount(pre => pre + 1)
            setRound(pre => pre + 1)
            setView('main')
            setIndex(pre => pre +1)
            setCurrentPlayer(playerList[(index + 1) % playerList.length])
        }

    }

    return (
        <div className="container">
            <div style={{display: 'flex', justifyContent: 'space-around', width: '90%'}}>
                <div>
                    <div onClick={() => clickHandle(5, setRightClicked, true)} className={rightClicked[5] ? "cheat-dice right six clicked" : "cheat-dice right six"}>
                        <span></span><span></span><span></span><span></span><span></span><span></span>
                    </div>
                    <div onClick={() => clickHandle(4, setRightClicked, true)} className={rightClicked[4] ? "cheat-dice right five clicked" : "cheat-dice right five"}>
                        <span></span><span></span><span></span><span></span><span></span>
                    </div>
                    <div onClick={() => clickHandle(3, setRightClicked, true)} className={rightClicked[3] ? "cheat-dice right four clicked" : "cheat-dice right four"}>
                        <span></span><span></span><span></span><span></span>
                    </div>
                    <div onClick={() => clickHandle(2, setRightClicked, true)} className={rightClicked[2] ? "cheat-dice right three clicked" : "cheat-dice right three"}>
                        <span></span><span></span><span></span>
                    </div>
                    <div onClick={() => clickHandle(1, setRightClicked, true)} className={rightClicked[1] ? "cheat-dice right two clicked" : "cheat-dice right two"}>
                        <span></span><span></span>
                    </div>
                    <div onClick={() => clickHandle(0, setRightClicked, true)} className={rightClicked[0] ? "cheat-dice right one clicked" : "cheat-dice right one"}>
                        <span></span>
                    </div>
                </div>
                <div>
                    <div onClick={() => clickHandle(5, setLeftClicked, false)} className={leftClicked[5] ? "cheat-dice left six clicked" : "cheat-dice left six"}>
                        <span></span><span></span><span></span><span></span><span></span><span></span>
                    </div>
                    <div onClick={() => clickHandle(4, setLeftClicked, false)} className={leftClicked[4] ? "cheat-dice left five clicked" : "cheat-dice left five"}>
                        <span></span><span></span><span></span><span></span><span></span>
                    </div>
                    <div onClick={() => clickHandle(3, setLeftClicked, false)} className={leftClicked[3] ? "cheat-dice left four clicked" : "cheat-dice left four"}>
                        <span></span><span></span><span></span><span></span>
                    </div>
                    <div onClick={() => clickHandle(2, setLeftClicked, false)} className={leftClicked[2] ? "cheat-dice left three clicked" : "cheat-dice left three"}>
                        <span></span><span></span><span></span>
                    </div>
                    <div onClick={() => clickHandle(1, setLeftClicked, false)} className={leftClicked[1] ? "cheat-dice left two clicked" : "cheat-dice left two"}>
                        <span></span><span></span>
                    </div>
                    <div onClick={() => clickHandle(0, setLeftClicked, false)} className={leftClicked[0] ? "cheat-dice left one clicked" : "cheat-dice left one"}>
                        <span></span>
                    </div>
                </div>
            </div>
            <div style={{display: 'flex', width: '60%', justifyContent: 'space-around'}}>
            <button className="reset" style={{backgroundColor: '#52b788'}} onClick={cheat}>确定</button>
            <button className="reset" onClick={() => setView('main')}>返回</button>
            </div>
        </div>
    )

}