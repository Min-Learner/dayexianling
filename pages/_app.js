import '../styles/globals.css'
import { useState, useEffect, createContext } from 'react'
import io from 'socket.io-client'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import 'animate.css'

let socket = null
export const animateContext = createContext()

function MyApp({ Component, pageProps }) {

  let players = ['仲', '高', '宇', '敏', '霞', '炜'];
  let [playerSlect, setPlayerSlect] = useState(players);
  let [playerList, setPlayerList] = useState([]);
  let [dieOne, setDieOne] = useState(2);
  let [dieTwo, setDieTwo] = useState(3);
  let [dieThree, setDiceThree] = useState(0);
  let [round, setRound] = useState(0);
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
  const router = useRouter()

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
  }, [socket])

  useEffect(() => {

    let audio = playList[Math.floor(Math.random()*playList.length)]
    let daaije = Math.random() > 0.5 ? "/music/yyds.m4a" : "/music/daaije.m4a" 
    if(audio) {
      let line = new Audio(`https://liar-dice-server.herokuapp.com/uploads/${audio}`)
    }
    let sound = new Audio(daaije);

    setTimeout(() => {
        setAnimation(false)
    }, 1500);

    if (dieOne + dieTwo == 0 || dieOne + dieTwo == 10) sound.play();
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
        router.push('/Main');
      } else {
        let defaultArray = Array(playerList.length).fill(0);
        router.push('/Knight');
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
      if (dieThree < 3 && re) {
        pirate ? setPirate(pre => pre - 1) : setPirate(5);
      }
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


  return (

    <animateContext.Provider value={{animation, dieOne, dieTwo, dieThree, setCurrentPlayer, roll, round, currentPlayer}}>
      <Layout>
        <Component
          playerSlect={playerSlect} 
          playerList={playerList} 
          playerListHandler={playerListHandler} 
          playerSelectHandler={playerSelectHandler} 
          set={set} 
          reset={reset} 
          selected={selected} 
          isBasic={isBasic} 
          setIsBasic={setIsBasic}
          pirate={pirate} 
          cardHint={cardHint} 
          trade={trade} setTrade={setTrade} 
          politic={politic} 
          setPolitic={setPolitic} 
          science={science} 
          setScience={setScience}
          list={list} 
          playList={playList} 
          setPlayList={setPlayList}
          startIndex={startIndex}
          diceData={diceData}
          diceRecord={diceRecord}
          {...pageProps} 
        />
      </Layout>
    </animateContext.Provider>

  )

}

export default MyApp
