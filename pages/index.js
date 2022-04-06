import Head from 'next/head'
import Setting from '../components/Setting'
import { useState, useEffect } from 'react'
import Main from '../components/Main'
import Dice from '../components/Dice'
import Player from '../components/Player'
import Knight from '../components/Knight'
import Progress from '../components/Progress'
import List from '../components/List'
import io from 'socket.io-client'
import PlayList from '../components/PlayList'

let socket = null;

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
  let [startIndex, setStartIndex] = useState();
  let [cheatOne, setCheatOne] = useState();
  let [cheatTwo, setCheatTwo] = useState();
  let [list, setList] = useState([])
  let [playList, setPlayList] = useState([])

  useEffect(() => {

    if(!socket) socket = io('https://liar-dice-server.herokuapp.com/')

    fetch('https://liar-dice-server.herokuapp.com/get_whole_list')
    .then((res) => res.json())
    .then((data) => setList(data.list))
    .catch((err) => ('Error occurred', err))

    fetch('https://liar-dice-server.herokuapp.com/get_list')
    .then((res) => res.json())
    .then((data) => setPlayList(data.data))
    .catch((err) => ('Error occurred', err))

  }, [])

  useEffect(() => {
    socket?.on('liar', ({liarOne, liarTwo}) => {
      setCheatOne(liarOne)
      setCheatTwo(liarTwo)
    })
  }, [cheatOne, socket])

  useEffect(() => {

    let audio = playList[Math.floor(Math.random()*playList.length)]
    let line
    if(audio) line = new Audio(`https://liar-dice-server.herokuapp.com/uploads/${audio}`)
    let sound = new Audio("/music/yyds.m4a");

    setTimeout(() => {
        setAnimation(false)
    }, 600);

    if (dieOne + dieTwo == 5 && count) sound.play();
    else count && line && line.play();

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
      } else if (dieThree === 3) cardHandle(trade, "贸易");
      else if (dieThree === 4) cardHandle(politic, "政治");
      else if (dieThree === 5) cardHandle(science, "科技");

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
    setStartIndex(playerList.indexOf(v));
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
        let defaultArray = Array(playerList.length).fill(0);
        setView('knight');
        setPirate(0);
        setTrade(defaultArray);
        setPolitic(defaultArray);
        setScience(defaultArray);
      }
  
      setRound(0);
      setDiceRecord(Array(11).fill(0));
      setIndex(playerList.indexOf(currentPlayer));
      setDiceData([]);
      setSelected(Array(6).fill(false));
    }

  }

  let roll = (re) => {

    let a = cheatOne >= 0 ? cheatOne : Math.floor(Math.random()*6)
    let b = cheatTwo >= 0 ? cheatTwo : Math.floor(Math.random()*6)

    if (!re) {
      setRound(pre => pre + 1);
      setIndex(pre => pre +1);
      setCurrentPlayer(playerList[(index + 1) % playerList.length]);
    } else {
      let clone = diceRecord;
      clone[dieOne + dieTwo]--;
      setDiceRecord(clone);

      let dataClone = diceData;
      dataClone.pop();
      setDiceData(dataClone);
    }

    setDieOne(a);
    setDieTwo(b);
    setCount(pre => pre + 1);
    setAnimation(true);
    
    if (!isBasic) {
      if (dieThree < 3 && re) pirate ? setPirate(pre => pre - 1) : setPirate(5);
      setDiceThree(Math.floor(Math.random()*6));
    }

  }

  let cardHandle = (field, which) => {

    let copy = [...field];
    let list = [];
    let words = "攞" + which + "卡";

    for (let i = 0; i < copy.length; i++) {
      if (copy[i] !== 0 && copy[i] >= dieOne) list.push(playerList[i]);
    }

    if (!list.length) setCardHint('无人可以攞卡！');
    else {

      words = list.join('、') + words;
      setCardHint(words);

    }

  }

  let views = (view) => {
    switch (view) {
      case 'setting':
        return <Setting playerSlect={playerSlect} playerList={playerList} playerListHandler={playerListHandler} playerSelectHandler={playerSelectHandler} set={set} reset={reset} selected={selected} setView={setView} isBasic={isBasic} setIsBasic={setIsBasic} />;

      case 'main':
        return <Main dieOne={dieOne} dieTwo={dieTwo} round={round} setView={setView} animation={animation} roll={roll} currentPlayer={currentPlayer} setCurrentPlayer={setCurrentPlayer} />;

      case 'knight':
        return <Knight dieOne={dieOne} dieTwo={dieTwo} round={round} setView={setView} animation={animation} roll={roll} currentPlayer={currentPlayer} dieThree={dieThree} pirate={pirate} cardHint={cardHint} setCurrentPlayer={setCurrentPlayer} />;

      case 'dice':
        return <Dice diceRecord={diceRecord} setView={setView} isBasic={isBasic} />;

      case 'player':
        return <Player diceData={diceData} setView={setView} isBasic={isBasic} startIndex={startIndex} playerList={playerList} />;

      case 'progress':
        return <Progress playerList={playerList} trade={trade} setTrade={setTrade} politic={politic} setPolitic={setPolitic} science={science} setScience={setScience} setView={setView} />

      case 'list':
        return <List list={list} playList={playList} setView={setView} setPlayList={setPlayList} />

      case 'playlist':
        return <PlayList setView={setView} playList={playList} setPlayList={setPlayList} />
    
      default:
        break;
    }
  }

  return (
    <div style={{maxWidth: '360px', margin: 'auto'}}>
      <Head>
        <title>大爷显灵</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/daye.png" />
      </Head>
      {/* <div className='warning'>有人搞搞震，啡佢无用去！</div> */}
      {views(view)}
    </div>
  )
}


