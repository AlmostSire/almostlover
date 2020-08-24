import { useEffect } from 'react';
var useClickOutside = function (ref, handler) {
    useEffect(function () {
        var listener = function (event) {
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }
            // console.log(!ref.current)
            // console.log(ref.current.contains(event.target as HTMLElement))
            handler(event);
        };
        document.addEventListener('click', listener);
        return function () {
            document.removeEventListener('click', listener);
        };
    }, [ref, handler]);
};
export default useClickOutside;
