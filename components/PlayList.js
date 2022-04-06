import Close from './Close'
import { useEffect } from 'react'

export default function PlayList({setView, playList}) {

    let handdleDelete = e => {
        // fetch('http://localhost:8000/delete_list', {
        //     method: 'post',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({data: e})
        // })
        // .then(res => {return})
        // .catch(err => ('Error occurred', err))
        fetch(process.env.NEXT_PUBLIC_URL + "lrem/redisList/1/" + e, {
            headers: {
                Authorization: process.env.NEXT_PUBLIC_TOKEN
            }
            })
        .then(response => response.json())
        .then(data => {return})

    }

    return(
        <div className="table-wrapper" style={{color: 'white'}}>
            <div style={{width: '100%', padding: '10px 10px 0px 10px'}}>
                {playList.map(item => {
                    return(
                        <div key={Math.random()} className='line-wrapper'>
                            <span className='text'>
                                {item}
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