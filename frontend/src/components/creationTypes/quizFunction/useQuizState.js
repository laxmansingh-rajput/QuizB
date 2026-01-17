import {
    useEffect, useState, useRef
} from "react";

const useQuizState = () => {
    const [list, setlist] = useState(() => {
        const lista = localStorage.getItem('list');
        if (lista) {
            try {
                return JSON.parse(lista);
            } catch (err) {
                console.error("Error parsing list from localStorage", err);
            }
        }
        return [{ question: "", options: ["", "", ""], correct: [false, false, false], type: true }]
    });
    const [err, seterr] = useState("")
    const [qno, setqno] = useState(list.length > 2 ? list.length : 1);
    const [type, settype] = useState(list[qno - 1].type);
    const Arr = ['A', 'B', 'C', 'D']
    const [height, setheight] = useState(null)
    const blockRef = useRef(null);

    useEffect(() => {
        localStorage.setItem('list', JSON.stringify(list))
    }, [list])

    useEffect(() => {
        const handleResize = () => {
            if (blockRef.current) {
                console.log('hi')
                setheight(blockRef.current.offsetHeight);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    return {
        list, setlist,
        err, seterr, qno, setqno, type, settype, Arr, height, setheight, blockRef
    }
}

export default useQuizState