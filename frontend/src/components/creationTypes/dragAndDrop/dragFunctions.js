
export const handleDragStart1 = (e, boxName, setDraggedItem, setVisible, setanimate) => {
    setDraggedItem(boxName);
    e.dataTransfer.effectAllowed = 'move';
    const img = document.createElement("img");
    img.src =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==";
    e.dataTransfer.setDragImage(img, 0, 0);
    setVisible(boxName)
    setanimate(0)
}

export const handleDragOver1 = (e, block, setadjustment, draggedItem, file, animate, setanimate) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (file == 'quiz') {
        if (block == 'horizontal' && draggedItem == 'right') {
            setadjustment('horizontal')
        }
        if (block == 'vertical' && draggedItem) {
            setadjustment('vertical')
        }
    }
    if (file == 'questionBar') {
        if (draggedItem && draggedItem != block) {

        }
    }
}
export const handleDrop1 = (e, dropTarget, draggedItem, dI, state, setstate, setDraggedItem, setadjustment, setVisible) => {
    e.preventDefault();
    if (draggedItem == dI) {
        const copy = [...state]
        let ind1 = copy.indexOf(dropTarget)
        let ind2 = copy.indexOf(draggedItem)
        let temp = copy[ind1]
        copy[ind1] = copy[ind2]
        copy[ind2] = temp
        setstate(copy)
    }
    setDraggedItem(null);
    setadjustment(null)
    setVisible(null)

}

export const handleDragEnd1 = (setDraggedItem, setadjustment, setVisible, setanimate) => {
    setDraggedItem(null);
    setadjustment(null)
    setVisible(null)
}