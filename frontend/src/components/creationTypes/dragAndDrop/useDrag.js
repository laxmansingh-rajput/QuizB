import { useState, useEffect } from "react";
const useDrag = () => {
    const [verticalLayout, setVerticalLayout] = useState(['top', 'bottom'])
    const [horizontalLayout, setHorizontalLayout] = useState(['left', 'right'])
    const [layout, setlayout] = useState(['box1', 'box2'])
    const [draggedItem, setDraggedItem] = useState(null)
    const [x, setx] = useState(null)
    const [y, sety] = useState(null)
    const [Visible, setVisible] = useState(false)
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