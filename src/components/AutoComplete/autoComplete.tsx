import React, { FC, useState, useEffect, useRef, ChangeEvent, ReactElement, KeyboardEvent } from 'react'
import classNames from 'classnames'
import Input, { InputProps } from '../Input/input'
import Icon from '../Icon/icon'
import Transition from '../Transition/transition'
import useDebounce from '../../hooks/useDebounce'
import useClickOutside from '../../hooks/useClickOutside'


interface DataSourceObject {
    value: string;
}

export type DataSourceType<T = {}> = T & DataSourceObject

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
    onSelect?: (item: DataSourceType) => void;
    renderOption?: (item: DataSourceType) => ReactElement;
}

export const AutoComplete: FC<AutoCompleteProps> = props => {
    const {
        fetchSuggestions,
        onSelect,
        renderOption,
        value,
        ...resProps
    } = props

    const [ inputValue, setInputValue ] = useState(value as string)
    const [ suggestions, setSuggestions ] = useState<DataSourceType[]>([])
    const [ loading, setLoading ] = useState(false)

    const [ highlightIndex, setHighlightIndex ] = useState(-1)
    const triggerSearch = useRef(false)
    const componentRef = useRef<HTMLDivElement>(null)
    const debouncedValue = useDebounce(inputValue, 500)
    const handleClickOutside = () => {
        setSuggestions([])
        setLoading(false)
    }
    useClickOutside(componentRef, handleClickOutside)
    useEffect(() => {
        if (debouncedValue && triggerSearch.current) {
            const results = fetchSuggestions(debouncedValue)
            if (results instanceof Promise) {
                console.log(results)
                setLoading(true)
                setSuggestions([])
                results.then(data => {
                    setLoading(false)
                    setSuggestions(data)
                   
                })
            } else {
                setSuggestions(results)
            }
            
        } else {
            setSuggestions([])
        }
        
    }, [debouncedValue])

    const highlight = (index: number) => {
        if (index < 0) index = 0
        if (index >= suggestions.length) {
            index = suggestions.length - 1
        }
        setHighlightIndex(index)
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        switch (e.keyCode) {
            case 13:
                if (suggestions[highlightIndex]) {
                    handleSelect(suggestions[highlightIndex])
                }
                break
            case 38:
                highlight(highlightIndex - 1)
                break
            case 40:
                highlight(highlightIndex + 1)
                break
            case 27:
                setSuggestions([])
                break
            default:
                break
        }
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim()
        setInputValue(value)
        triggerSearch.current = true
    }
    const handleSelect = (item: DataSourceType) => {
        setInputValue(item.value)
        setSuggestions([])
        setHighlightIndex(-1)
        if (onSelect) {
            onSelect(item)
        }
        triggerSearch.current = false
    }
    const renderTemplate = (item: DataSourceType) => {
        return renderOption ? renderOption(item) : item.value
    }
    const generateDropdown = () => {
        return (
            <Transition
                in={suggestions.length > 0 || loading}
                animation="zoom-in-top"
                timeout={300}
            >

                <ul className="al-suggestion-list">
                    {loading && <li className="al-suggestion-loading-icon">
                        <Icon icon="spinner" spin />    
                    </li>}
                    {suggestions.map((item, index) => {
                        const cls = classNames('al-suggestion-item', {
                            'al-suggestion-item-lighted': index === highlightIndex
                        })
                        return (
                            <li key={index} className={cls} onClick={() => handleSelect(item)}>
                                {renderTemplate(item)}
                            </li>
                        )
                    })}
                </ul>
            </Transition>
           
        )
    }
    return (
        <div className="al-auto-complete" ref={componentRef}>
            <Input 
                value={inputValue} 
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                {...resProps}
            />
            
            {generateDropdown()}
            
        </div>
        
    )
}

export default AutoComplete;