import { useState, useEffect } from "react";
const useDrag = () => {
    // const [verticalLayout, setVerticalLayout] = useState(['top', 'bottom'])
    const [verticalLayout, setVerticalLayout] = useState(() => {
        let a = localStorage.getItem('verticalLayout')
        if (a) {
            return a.split(',')
        } else {
            return ['top', 'bottom']
        }
    })
    const [horizontalLayout, setHorizontalLayout] = useState(() => {
        let a = localStorage.getItem('horizontalLayout')
        if (a) {
            return a.split(',')
        } else {
            return ['left', 'right']
        }
    })
    const [layout, setlayout] = useState(() => {
        let a = localStorage.getItem('layout')
        if (a) {
            return a.split(',')
        } else {
            return ['box1', 'box2']
        }
    })

    useEffect(() => {
        localStorage.setItem('horizontalLayout', horizontalLayout)
    }, [horizontalLayout])

    useEffect(() => {
        localStorage.setItem('verticalLayout', verticalLayout)
    }, [verticalLayout])

    useEffect(() => {
        localStorage.setItem('layout', layout)
    }, [layout])

    const [draggedItem, setDraggedItem] = useState(null)
    const [x, setx] = useState(null)
    const [y, sety] = useState(null)
    const [Visible, setVisible] = useState(null)
    const [animate, setanimate] = useState(0)
    const [adjustment, setadjustment] = useState(null)
    return {
        verticalLayout, setVerticalLayout,
        horizontalLayout, setHorizontalLayout,
        layout, setlayout,
        draggedItem, setDraggedItem,
        x, setx, y, sety,
        Visible, setVisible,
        animate, setanimate, adjustment, setadjustment
    }
}
export default useDrag