import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Button, { ButtonProps } from './button'

const defaultProps = {
    onClick: jest.fn()
}

const testProps: ButtonProps = {
    btnType: "primary",
    size: 'lg',
    className: 'test',
}

const linkProps: ButtonProps = {
    btnType: 'link'
}

const disabledProps: ButtonProps = {
    disabled: true,
    onClick: jest.fn()
}

describe('test Button component', () => {
    it('should render the correct default button', () => {
        const wrapper = render(<Button {...defaultProps}>Nice</Button>)
        const ele = wrapper.getByText('Nice') as HTMLButtonElement
        expect(ele).toBeInTheDocument()
        expect(ele.tagName).toEqual('BUTTON')
        expect(ele).toHaveClass('al-btn')
        expect(ele.disabled).toBeFalsy()
        fireEvent.click(ele)
        expect(defaultProps.onClick).toHaveBeenCalled()
    })
    it('should render the correct button based on different props', () => {
        const wrapper = render(<Button {...testProps}>Nice</Button>)
        const ele = wrapper.getByText('Nice')
        expect(ele).toBeInTheDocument()
        expect(ele).toHaveClass('al-btn-primary al-btn-lg al-btn')
    })
    it('should render a link when btnType equals link', () => {
        const wrapper = render(<Button {...linkProps}>Link</Button>)
        const ele = wrapper.getByText('Link')
        expect(ele).toBeInTheDocument()
        expect(ele.tagName).toEqual('A')
        expect(ele).toHaveClass('al-btn al-btn-link')
    })
    it('should render disabled button when disabled set to true', () => {
        const wrapper = render(<Button {...disabledProps}>disabled</Button>)
        const ele = wrapper.getByText('disabled') as HTMLButtonElement
        expect(ele).toBeInTheDocument()
        expect(ele).toHaveClass('al-btn')
        expect(ele.disabled).toBeTruthy()
        fireEvent.click(ele)
        expect(disabledProps.onClick).not.toHaveBeenCalled()
    })
})

