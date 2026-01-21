import { useState, useEffect } from "react";

const useDragItems = () => {

    const [draggedItem, setDraggedItem] = useState(null)
    const [overItem, setOverItem] = useState(null)

    useEffect(() => {
        console.log(draggedItem)
        console.log(overItem )
    }, [overItem, draggedItem])


    return {
        draggedItem, setDraggedItem, overItem, setOverItem
    }
}

export default useDragItems