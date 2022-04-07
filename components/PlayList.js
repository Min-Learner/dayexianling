import Close from './Close'
import Inform from './Inform'
import { useState } from 'react'

export default function PlayList({setView, playList, setPlayList}) {

    let [display, setDisplay] = useState('')

    let handdleDelete = e => {

        setDisplay('处理中...')
        fetch('https://liar-dice-server.herokuapp.com/delete_list', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({data: e})
        })
        .then(res => {

            let copy = [...playList]
            copy = copy.filter(item => {
                return item !== e
            })
            setPlayList(copy)
            setDisplay('')

        })
        .catch(err => ('Error occurred', err))

    }

    return(
        <div className="table-wrapper" style={{color: 'white'}}>
            <Inform message={display} />
            <div style={{width: '100%', padding: '10px 10px 0px 10px'}}>
                {playList.map(item => {
                    return(
                        <div key={Math.random()} className='line-wrapper'>
                            <span className='text'>
                                {item.replace('-原版-', '').replace('.mp3', '')}
                            </span>
                            <span className='close' onClick={() => handdleDelete(item)}>
                                <Close />
                            </span>
                        </div>
                    )
                })}
            </div>
            <button className='buttons' onClick={() => setView('setting')}>返回</button>
        </div>
    )

}