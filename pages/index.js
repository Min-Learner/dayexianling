import Head from 'next/head'
import Setting from '../components/Setting'
import { useState, useEffect } from 'react'
import Main from '../components/Main'
import Dice from '../components/Dice'
import Player from '../components/Player'
import Knight from '../components/Knight'
import Progress from '../components/Progress'
import Cheat from '../components/Cheat'

export default function Home() {

  let players = ['仲', '高', '宇', '敏', '霞', '炜'];
  let [playerSlect, setPlayerSlect] = useState(players);
  let [playerList, setPlayerList] = useState([]);
  let [dieOne, setDieOne] = useState(2);
  let [dieTwo, setDieTwo] = useState(3);
  let [dieThree, setDiceThree] = useState(0);
  let [round, setRound] = useState(0);
  let [view, setView] = useState('setting');
  let [diceRecord, setDiceRecord] = useState(Array(11).fill(0)); 
  let [index, setIndex] = useState();
  let [currentPlayer, setCurrentPlayer] = useState();
  let [animation, setAnimation] = useState(false);
  let [count, setCount] = useState(0);
  let [diceData, setDiceData] = useState([]);
  let [selected, setSelected] = useState(Array(6).fill(false));
  let [isBasic, setIsBasic] = useState(true);
  let [pirate, setPirate] = useState(0);
  let [trade, setTrade] = useState([]);
  let [politic, setPolitic] = useState([]);
  let [science, setScience] = useState([]);
  let [cardHint, setCardHint] = useState('');

  useEffect(() => {

    const sound = new Audio("yyds.m4a");

    setTimeout(() => {
        setAnimation(false)
    }, 600);

    if (dieOne + dieTwo == 0 || dieOne + dieTwo == 10) {
        sound.play();
    }

    if (round !== 0) {

        let clone = diceRecord;
        clone[dieOne + dieTwo]++;
        setDiceRecord(clone);

        let dataClone = diceData;
        dataClone.push(dieOne + dieTwo + 2);
        setDiceData(dataClone);

    }

    if (!isBasic) {

      if (dieThree < 3) {
        setPirate(pre => pre + 1);
        setCardHint('无卡攞！')
      } else if (dieThree === 3) cardHandle(trade, dieOne, "贸易");
      else if (dieThree === 4) cardHandle(politic, dieOne, "政治");
      else if (dieThree === 5) cardHandle(science, dieOne, "科技");

    }

  }, [count])

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
    setSelected(clone);

  }

  let reset = () => {

    setPlayerList([]);
    setPlayerSlect(players);
    setCurrentPlayer();
    setSelected(Array(6).fill(false))

  }

  let set = () => {  

    if (playerList.length && currentPlayer) {
      if (isBasic) {
        setView('main');
      } else {
        setView('knight');
        setPirate(0);
        setTrade(Array(playerList.length).fill(0));
        setPolitic(Array(playerList.length).fill(0));
        setScience(Array(playerList.length).fill(0));
      }
  
      setRound(0);
      setDiceRecord(Array(11).fill(0));
      setIndex(playerList.indexOf(currentPlayer));
      setDiceData([]);
      setSelected(Array(6).fill(false));
    }

  }

  let reroll = () => {

    if (round !== 0) {

      if (!isBasic) {

        if (dieThree < 3) pirate ? setPirate(pre => pre - 1) : setPirate(5);
        setDiceThree(Math.floor(Math.random()*6));

      }

      setDieOne(Math.floor(Math.random()*6));
      setDieTwo(Math.floor(Math.random()*6));
      setCount(pre => pre + 1);
      setAnimation(true);

      let clone = diceRecord;
      clone[dieOne + dieTwo]--;
      setDiceRecord(clone);

      let dataClone = diceData;
      dataClone.pop();
      setDiceData(dataClone);

    }

  }

  let roll = () => {

    setDieOne(Math.floor(Math.random()*6));
    setDieTwo(Math.floor(Math.random()*6));
    setRound(pre => pre + 1);
    setCount(pre => pre + 1);
    setAnimation(true);
    setIndex(pre => pre +1);
    setCurrentPlayer(playerList[(index + 1) % playerList.length]);
    
    if (!isBasic) {
      setDiceThree(Math.floor(Math.random()*6));
    }

  }

  let cardHandle = (field, redDice, which) => {

    let copy = [...field];
    let list = [];
    let words = "攞" + which + "卡";

    for (let i = 0; i < copy.length; i++) {
      if (copy[i] !== 0 && copy[i] >= redDice) list.push(playerList[i]);
    }

    if (!list.length) setCardHint('无人可以攞卡！');
    else {

      for (let j = 0; j < list.length; j++) {
        if (!j) words = list[j] + words;
        else words = list[j] + "、" + words;
      }
      setCardHint(words);

    }

  }

  let views = (view) => {
    switch (view) {
      case 'setting':
        return <Setting playerSlect={playerSlect} playerList={playerList} playerListHandler={playerListHandler} playerSelectHandler={playerSelectHandler} set={set} reset={reset} selected={selected} setView={setView} isBasic={isBasic} setIsBasic={setIsBasic} />;

      case 'main':
        return <Main dieOne={dieOne} dieTwo={dieTwo} round={round} setView={setView} animation={animation} roll={roll} reroll={reroll} currentPlayer={currentPlayer} setCurrentPlayer={setCurrentPlayer} />;

      case 'knight':
        return <Knight dieOne={dieOne} dieTwo={dieTwo} round={round} setView={setView} animation={animation} roll={roll} reroll={reroll} currentPlayer={currentPlayer} dieThree={dieThree} pirate={pirate} cardHint={cardHint} setCurrentPlayer={setCurrentPlayer} />;

      case 'dice':
        return <Dice diceRecord={diceRecord} setView={setView} isBasic={isBasic} />;

      case 'player':
        return <Player diceData={diceData} setView={setView} isBasic={isBasic} />;

      case 'progress':
        return <Progress playerList={playerList} trade={trade} setTrade={setTrade} politic={politic} setPolitic={setPolitic} science={science} setScience={setScience} setView={setView} />
        
      case 'cheat':
        return <Cheat setView={setView} setDieOne={setDieOne} setDieTwo={setDieTwo} setRound={setRound} setCount={setCount} index={index} setIndex={setIndex} playerList={playerList} setCurrentPlayer={setCurrentPlayer} />
    
      default:
        break;
    }
  }

  return (
    <div style={{maxWidth: '360px', margin: 'auto'}}>
      <Head>
        <title>大爷显灵</title>
        <meta name="description" content="Generated by create next app" />
        {/* 没有下面这条代码的话好像有些字体不能正常显示，有待验证 */}
        <meta charset="UTF-8" />
        <link rel="icon" href="/yyds.jpg" />
      </Head>
      {views(view)}
    </div>
  )
}


