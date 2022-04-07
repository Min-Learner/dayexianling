import Plus from './Plus'
import { useState, useRef } from 'react'
import Inform from './Inform'
import Arrow from './Arrow'

export default function List({list, setView, playList, setPlayList}) {

    let bottomRef = useRef(null)
    let [copy, setCopy] = useState([...list])
    let [response, setResponse] = useState('')

    let handleSearch = e => {

        let keyword = e.target.value
        if (keyword) {
            let filterList = [...list].filter(i =>{return i.indexOf(keyword) >= 0})
            setCopy(filterList)
        } else setCopy([...list])

    }

    let toBottom = () => {
        bottomRef.current.scrollIntoView()
    }

    let handdleAdd = (e) => {

        setResponse('处理中...')
        fetch('https://liar-dice-server.herokuapp.com/add_list', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({data: e})
        })
        .then(res => res.json())
        .then(res => {
            if (res.message !== '已在列表中！') {
                let copy = [...playList, e]
                setPlayList(copy)
            }
            setResponse(res.message)
            setTimeout(() => {
                setResponse('')
            }, 700);
        })
        .catch(err => ('Error occurred', err))

    }

    let handlePlay = (e) => {

        let url = 'https://liar-dice-server.herokuapp.com/uploads/' + e
        let audio = new Audio(url)
        audio.play()

    }

    return(
        <div className="table-wrapper" style={{color: 'white'}}>
            <Inform message={response} />
            <div className='search-bar'>
                <input type={'text'} className='input-search' placeholder='搜索' onChange={e => handleSearch(e)} />
                <div onClick={toBottom} className='to-bottom'><Arrow /></div>
            </div>
            <div style={{width: '100%', padding: '25px 10px 0px 10px'}}>
                {copy.map(item => {
                    return(
                        <div key={Math.random()} className='line-wrapper'>
                            <span className='text' onClick={() => handlePlay(item)}>
                                {item.replace('-原版-', '').replace('.mp3', '')}
                            </span>
                            <span className='close' onClick={() => handdleAdd(item)}>
                                <Plus />
                            </span>
                        </div>
                    )
                })}
            </div>
            <button ref={bottomRef} className='buttons' onClick={() => setView('setting')}>返回</button>
        </div>
    )

}