import Close from './Close'
import { useState } from 'react'

export default function List({list, setList, setView}) {

    let [files, setFiles] = useState([])
    let [uploadInfo, setUploadInfo] = useState('')

    let handdleDelete = (e) => {

        fetch('https://liar-dice-server.herokuapp.com/delete_file', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({data: e})
        })
        .then(res => res.json())
        .then((res) => {
            let copy = [...list]
            copy = copy.filter(item => {return item !== e})
            setList(copy)
        })
        .catch((err) => ('Error occurred', err))

    }

    let handleInput = (e) => {

        let arrayFiles = e.target.files
        setFiles(arrayFiles)
        setUploadInfo(arrayFiles.length + '个文件已选择')
    
    }

    let handleUpload = () => {

        const formData = new FormData()
        for(let i =0; i < files.length; i++) {
            formData.append("files", files[i]);
        }

        fetch('https://liar-dice-server.herokuapp.com/upload_files', {
            method: 'post',
            body: formData,
        })
        .then((res) => res.json())
        .then((data) => setUploadInfo(data.message))
        .catch((err) => ('Error occurred', err))

    }

    return(
        <div className="table-wrapper" style={{color: 'white'}}>
            <div style={{width: '100%', padding: '25px 10px 0px 10px'}}>
                {list.map(item => {
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
            <div className='upload-wrapper'>
                <p className='input-hint'>{uploadInfo}</p>
                <label htmlFor="files" className="label">选择文件</label>
                <input id="files" type="file" name="file" multiple style={{display: 'none'}} onChange={(e) => handleInput(e)} />
                <button type="button" className='upload' onClick={handleUpload}>上传</button>
            </div>
            <button className='buttons' onClick={() => setView('setting')}>返回</button>
        </div>
    )

}