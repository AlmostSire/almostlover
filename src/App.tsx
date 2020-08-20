import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Upload from './components/Upload/upload'
import { action } from '@storybook/addon-actions'



const App: React.FC = () => {
    const [ title, setTitle ] = useState()
  
    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (files) {
            const uploadedFile = files[0]
            const formData = new FormData()
            formData.append(uploadedFile.name, uploadedFile)
            axios.post('https://jsonplaceholder.typicode.com/posts', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(res => {
                console.log(res)
            })
        }
    }
    return (
        <div style={{ margin: '10px'}}>
          
            {/* <input type="file" name="myFile" onChange={handleFile}/> */}
            <Upload
                action="https://jsonplaceholder.typicode.com/posts"
                onProgress={(data) => console.log(data, 'progress')}
                onSuccess={(data) => console.log(data, 'success')}
                onError={(data) => console.log(data, 'error')}
            />
        </div>
    )
    
}

export default App