import Plus from './Plus'
import { useState, useRef } from 'react'

export default function List({list, setView, playList}) {

    // let [files, setFiles] = useState([])
    // let [uploadInfo, setUploadInfo] = useState('')
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

    let fetchData = async (e) => {

        let res = await fetch(process.env.NEXT_PUBLIC_URL + "lpush/redisList/" + e, {
            headers: {
              Authorization: process.env.NEXT_PUBLIC_TOKEN
            }
        })
        let data = await res.json()
        data && setResponse('添加成功！')

    }

    let handdleAdd = async (e) => {

        if (playList.indexOf(e) < 0) {
            await fetchData(e)
        } else {setResponse('已在播放列表中！')}

        setTimeout(() => {
            setResponse('')
        }, 700);

        // fetch('http://localhost:8000/add_list', {
        //     method: 'post',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({data: e})
        // })
        // .then(res => res.json())
        // .then(res => {
        //     setResponse(res.message)
        //     setTimeout(() => {
        //         setResponse('')
        //     }, 700);
        // })
        // .catch(err => ('Error occurred', err))

    }
    // let handdleDelete = (e) => {

    //     fetch('https://liar-dice-server.herokuapp.com/delete_file', {
    //         method: 'post',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({data: e})
    //     })
    //     .then(res => res.json())
    //     .then((res) => {
    //         let copy = [...list]
    //         copy = copy.filter(item => {return item !== e})
    //         setList(copy)
    //     })
    //     .catch((err) => ('Error occurred', err))

    // }

    // let handleInput = (e) => {

    //     let arrayFiles = e.target.files
    //     setFiles(arrayFiles)
    //     setUploadInfo(arrayFiles.length + '个文件已选择')
    
    // }

    // let handleUpload = () => {

    //     const formData = new FormData()
    //     for(let i =0; i < files.length; i++) {
    //         formData.append("files", files[i]);
    //     }

    //     fetch('https://liar-dice-server.herokuapp.com/upload_files', {
    //         method: 'post',
    //         body: formData,
    //     })
    //     .then((res) => res.json())
    //     .then((data) => setUploadInfo(data.message))
    //     .catch((err) => ('Error occurred', err))

    // }

    let handlePlay = (e) => {

        let url = 'https://liar-dice-server.herokuapp.com/uploads/' + e
        let audio = new Audio(url)
        audio.play()

    }

    return(
        <div className="table-wrapper" style={{color: 'white'}}>
            <div style={{position: 'fixed',
                         top: '50%',
                         left: '50%',
                         transform: 'translate(-50%, -50%)',
                         fontSize: '25px',
                         color: 'white',
                         backgroundColor: 'rgba(0, 0, 0, 0.7)',
                         display: response ? 'block' : 'none',
                         width: '250px',
                         height: '150px',
                         textAlign: 'center',
                         lineHeight: '150px',
                         borderRadius: '10px'
                        }}
            >
                {response}
            </div>
            <div className='search-bar'>
                <input type={'text'} className='input-search' placeholder='输入关键字' onChange={e => handleSearch(e)} />
                <button type='button' onClick={toBottom} className='to-bottom'>↓</button>
            </div>
            <div style={{width: '100%', padding: '25px 10px 0px 10px'}}>
                {copy.map(item => {
                    return(
                        <div key={Math.random()} className='line-wrapper'>
                            <span className='text' onClick={() => handlePlay(item)}>
                                {item}
                            </span>
                            <span className='close' onClick={() => handdleAdd(item)}>
                                <Plus />
                            </span>
                        </div>
                    )
                })}
            </div>
            {/* <div className='upload-wrapper'>
                <p className='input-hint'>{uploadInfo}</p>
                <label htmlFor="files" className="label">选择文件</label>
                <input id="files" type="file" name="file" multiple style={{display: 'none'}} onChange={(e) => handleInput(e)} />
                <button type="button" className='upload' onClick={handleUpload}>上传</button>
            </div> */}
            <button ref={bottomRef} className='buttons' onClick={() => setView('setting')}>返回</button>
        </div>
    )

}