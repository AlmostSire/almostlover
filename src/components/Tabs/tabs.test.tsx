import React from 'react'
import { render, RenderResult, fireEvent } from '@testing-library/react'
import Tabs, { TabsProps } from './tabs'
import TabItem from './tabItem'

const testProps: TabsProps = {
  defaultIndex: 1,
  onSelect: jest.fn()
}
let wrapper: RenderResult

describe('test Tabs Component', () => {
    beforeEach(() => {
        wrapper = render(
            <Tabs {...testProps}>
                <TabItem label="tab1">content1</TabItem>
                <TabItem label="tab2">content2</TabItem>
                <TabItem label="disabled" disabled>content3</TabItem>
            </Tabs>
        )
    })
    afterEach(() => {
        jest.clearAllMocks()
    })
    it('should render the correct default Tabs', () => {
        const { queryByText, container } = wrapper
        expect(container.querySelector('.al-tabs')).toHaveClass('al-tabs-inline')
        const activeElement = queryByText('tab2')
        expect(activeElement).toBeInTheDocument()
        expect(activeElement).toHaveClass('al-tabs-bar-active')
        expect(queryByText('tab1')).not.toHaveClass('al-tabs-bar-active')
        expect(queryByText('content2')).toBeInTheDocument()
        expect(queryByText('content1')).not.toBeInTheDocument()
    })
    it('click tabItem should switch to content', () => {
        const { queryByText, getByText } = wrapper
        const clickedElement = getByText('tab1')
        fireEvent.click(clickedElement)
        expect(clickedElement).toHaveClass('al-tabs-bar-active')
        expect(queryByText('tab2')).not.toHaveClass('al-tabs-bar-active')
        expect(queryByText('content1')).toBeInTheDocument()
        expect(queryByText('content2')).not.toBeInTheDocument()
        expect(testProps.onSelect).toHaveBeenCalledWith(0)
    })
    it('click disabled tabItem should not works', () => {
        const { getByText } = wrapper
        const disableElement = getByText('disabled')
        expect(disableElement).toHaveClass('al-tabs-bar-disabled')
        fireEvent.click(disableElement)
        expect(disableElement).not.toHaveClass('al-tabs-bar-active')
        expect(testProps.onSelect).not.toHaveBeenCalled()
    })
})