import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Upload, UploadFile } from './upload'
import Icon from '../Icon/icon'

const defaultFileList: UploadFile[] = [
    { uid: '1', size: 1234, name: 'hello.md', status: 'uploading', percent: 30 },
    { uid: '2', size: 1234, name: 'xyz.md', status: 'success', percent: 30 },
    { uid: '3', size: 1234, name: 'eyiha.md', status: 'error', percent: 30 },
]

const checkFileSize = (file: File) => {
    if (Math.round(file.size / 1024) > 20) {
        alert('file too big')
        return false
    }
    return true
}

const filePromise = (file: File) => {
    const newFile = new File([file], 'new_name.docx', { type: file.type })
    return Promise.resolve(newFile)
}

const SimpleUpload = () => {
    return (
        <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            // onProgress={action('progress')}
            // onSuccess={action('success')}
            // onError={action('error')}
            defaultFileList={defaultFileList}
            onChange={action('changed')}
            //beforeUpload={filePromise}
            name="fileName"
            data={{ "key": "value" }}
            headers={{ 'X-Powered-By': 'almostlover' }}
            accept=".jfif"
            multiple
            drag
        >
            <Icon icon="upload" size="5x" theme="secondary"/>
            <br/>
            <p>Drag file over to upload</p>
        </Upload>
    )
}

storiesOf('Upload component', module)
    .add('Upload', SimpleUpload)