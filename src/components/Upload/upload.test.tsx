import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render, RenderResult, fireEvent, wait, act } from '@testing-library/react'
import { Upload, UploadProps } from './upload'
import axios from 'axios'

jest.setTimeout(30000)

jest.mock('../Icon/icon', () => {
    return (props: any) => {
        return <span onClick={props.onClick}>{props.icon}</span>
    }
})

jest.mock('axios')

const mockedAxios = axios as jest.Mocked<typeof axios>

const testProps: UploadProps = {
    action: 'fakeurl.com',
    onSuccess: jest.fn(),
    onChange: jest.fn(),
    onRemove: jest.fn()
}

let wrapper: RenderResult, fileInput: HTMLInputElement, uploadArea: HTMLElement
const testFile = new File(['xyz'], 'test.png', { type: 'image/png' })

describe('test upload component', () => {
    beforeEach(() => {
        wrapper = render(<Upload {...testProps}>Click to upload</Upload>)
        fileInput = wrapper.container.querySelector('.al-file-input') as HTMLInputElement
        uploadArea = wrapper.queryByText('Click to upload') as HTMLElement
    })

    it('upload process should works fine', async () => {
        const { queryByText, getByText } = wrapper
        // mockedAxios.post.mockImplementation(() => {
        //     return Promise.resolve({ 'data': 'cool' })
        // })
        mockedAxios.post.mockResolvedValue({ 'data': 'cool' })
        expect(uploadArea).toBeInTheDocument()
        expect(fileInput).not.toBeVisible()
        await act(async () => {
           fireEvent.change(fileInput, { target: { files: [testFile] }})
        })
        
        expect(queryByText('test.png')).toBeInTheDocument()
       
        // expect(queryByText('check-circle')).toBeInTheDocument()
        // expect(testProps.onSuccess).toHaveBeenCalledWith('cool', testFile)
        // expect(testProps.onChange).toHaveBeenCalledWith(testFile)
     
    })
})