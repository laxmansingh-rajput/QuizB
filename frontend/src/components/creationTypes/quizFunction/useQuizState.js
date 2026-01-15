import { useEffect, useState } from "react";

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
    const [adjustment, setadjustment] = useState(null)
    const [type, settype] = useState(list[qno - 1].type);
    const [verticalLayout, setVerticalLayout] = useState(['top', 'bottom'])
    const [horizontalLayout, setHorizontalLayout] = useState(['left', 'right'])
    const [draggedItem, setDraggedItem] = useState(null)
    const Arr = ['A', 'B', 'C', 'D']
    const [height, setheight] = useState(null)
    const [x, setx] = useState(null)
    const [y, sety] = useState(null)
    const [Visible, setVisible] = useState(false)
    const [animate, setanimate] = useState(false)
    useEffect(() => {
     localStorage.setItem('list',JSON.stringify(list))
    }, [list])
    
    return {
        list, setlist,
        err, seterr, qno, setqno, adjustment, setadjustment, type, settype, verticalLayout, setVerticalLayout, horizontalLayout, setHorizontalLayout, draggedItem, setDraggedItem, Arr, height, setheight, x, setx, y, sety, Visible, setVisible, animate, setanimate
    }
}

export default useQuizState