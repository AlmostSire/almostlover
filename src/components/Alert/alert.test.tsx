import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Alert, { AlertProps } from './alert'
import { config } from 'react-transition-group'

config.disabled = true

jest.mock('../Icon/icon', () => {
    return (props: any) => <span>{props.icon}</span>
})

const testProps: AlertProps = {
    title: 'title',
    onClose: jest.fn()
}

const typeProps: AlertProps = {
    ...testProps,
    type: 'success',
    desc: 'desc',
    closable: false
}

describe('test Alert component', () => {
    it('should render the correct default Alert', () => {
        const { getByText, container, queryByText } = render(<Alert {...testProps}/>)
        expect(queryByText('title')).toBeInTheDocument()
        expect(container.querySelector('.al-alert')).toHaveClass('al-alert-default')
        fireEvent.click(getByText('times'))
        expect(testProps.onClose).toHaveBeenCalled()
        expect(queryByText('title')).not.toBeInTheDocument()
    })
    it('should render the correct Alert based on different type and description', () => {
        const { container, queryByText } = render(<Alert {...typeProps}/>)
        expect(queryByText('title')).toHaveClass('al-alert-bold-title')
        expect(container.querySelector('.al-alert')).toHaveClass('al-alert-success')
        expect(queryByText('desc')).toBeInTheDocument()
        expect(queryByText('times')).not.toBeInTheDocument()
    })
})