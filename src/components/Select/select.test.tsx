import React from 'react'
import { config } from 'react-transition-group'
import { render, fireEvent, wait } from '@testing-library/react'

import Select, { SelectProps } from './select'
import Option from './option'

config.disabled = true

jest.mock('../Icon/icon', () => {
    return (props: any) => {
        return <span onClick={props.onClick}>{props.icon}</span>
    }
})
  
const testProps: SelectProps = {
    defaultValue: 'id1',
    placeholder: 'test',
    onChange: jest.fn(),
    onVisibleChange: jest.fn(),
}
  
const multipleProps: SelectProps = {
    ...testProps,
    multiple: true,
    defaultValue: ['id1']
}
describe('test Select component', () => {
    it('should render the correct Select component', () => {
        const { getByPlaceholderText, getByText } = render(
            <Select {...testProps}>
                <Option value="id1" label="nihao"/>
                <Option value="id2" label="nihao2"/>
                <Option value="id3" disabled label="disabled"/>
            </Select>
        )
        const inputEle = getByPlaceholderText('test') as HTMLInputElement
        expect(inputEle).toBeInTheDocument()
        // click the input
        fireEvent.click(inputEle)
        expect(testProps.onVisibleChange).toHaveBeenCalledWith(true)
        
        const firstItem = getByText('nihao')
        const secondItem = getByText('nihao2')
        const disabledItem = getByText('disabled')

        expect(firstItem).toBeInTheDocument()

        expect(firstItem).toHaveClass('is-selected')
        expect(secondItem).not.toHaveClass('is-selected')
        expect(disabledItem).toHaveClass('is-disabled')
     
        // click disabled item should not working
        fireEvent.click(disabledItem)
        expect(disabledItem).toBeInTheDocument()

        // click the dropdown
        fireEvent.click(secondItem)
        expect(secondItem).not.toBeInTheDocument()
        
        // check  the events
        expect(testProps.onVisibleChange).toHaveBeenCalledWith(false)
        expect(testProps.onChange).toHaveBeenCalledWith('id2', ['id2'])
        expect(inputEle.value).toEqual('id2')

        // test focus
        expect(document.activeElement).toEqual(inputEle)
        
    })
    it('Select in multiple mode should works fine', () => {
        const { getAllByText, getByText, container } = render(
            <Select
                {...multipleProps}
            >
                <Option value="id1" label="first"/>
                <Option value="id2" label="second"/>
                <Option value="id3" label="third"/>
            </Select>
        )
        const inputEle = container.querySelector('.al-input-inner') as HTMLInputElement
        fireEvent.click(inputEle)
        const firstItem = getByText('first')
        expect(firstItem).toBeInTheDocument()
        expect(firstItem).toHaveClass('is-selected')
        expect(inputEle.placeholder).toEqual('')
        
        // add selected classname 
        const secondItem = getByText('second')
        fireEvent.click(secondItem)
        expect(secondItem).toHaveClass('is-selected')
        // add check icon
        expect(getAllByText('check').length).toEqual(2)
        // fire events
        expect(multipleProps.onChange).toHaveBeenCalledWith('id2', ['id1', 'id2'])
        // add tags
        expect(container.querySelectorAll('.al-tag').length).toEqual(2)
        
        //reclick 2nd item
        fireEvent.click(secondItem)
        // remove acitve class
        expect(secondItem).not.toHaveClass('is-selected')
        // remove tags
        expect(container.querySelectorAll('.al-tag').length).toEqual(1)
        expect(multipleProps.onChange).toHaveBeenLastCalledWith('id2', ['id1'])
        // click tag close
        fireEvent.click(getByText('times'))
        expect(multipleProps.onChange).toHaveBeenLastCalledWith('id1', [])
        //remove all tags
        expect(container.querySelectorAll('.al-tag').length).toEqual(0)
        //refill placeholder text
        expect(inputEle.placeholder).toEqual('test')
    })
    
})