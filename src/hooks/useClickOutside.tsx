import { useEffect, RefObject } from 'react'

const useClickOutside = (ref: RefObject<HTMLElement>, handler: Function) => {
    useEffect(() => {
        
        const listener = (event: MouseEvent) => {
           
            if (!ref.current || ref.current.contains(event.target as HTMLElement)) {
                return
            }
            // console.log(!ref.current)
            // console.log(ref.current.contains(event.target as HTMLElement))
            
            handler(event)
        }
        document.addEventListener('click', listener)
        return () => {
            document.removeEventListener('click', listener)
        }
    }, [ref, handler])
}

export default useClickOutside