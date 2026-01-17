import { useState, useEffect, useRef } from "react";
const useQuizBar = () => {
    const blockRef = useRef(null);
    const [width, setwidth] = useState(0)
    useEffect(() => {
        const measure = () => {
            if (blockRef.current) {
                setwidth(blockRef.current.offsetWidth)
            }
        }
        measure()
        window.addEventListener('resize', measure)
        return () => {
            window.removeEventListener('resize', measure)
        }
    }, [])

    function getwidth() {
        return (6 * width / 10) + 'px'
    }
    function getwidth2() {
        return (4 * width / 10) + 'px'
    }
    return {
        blockRef, width, getwidth, getwidth2
    }
}
export default useQuizBar