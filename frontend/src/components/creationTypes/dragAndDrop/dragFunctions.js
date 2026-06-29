const helper = {
    'top': 'Questions',
    'right': 'Tools',
    'box1': 'Navigation',
    'box2': 'Indexer',
}

export const handleDragStart1 = (
  e,
  boxName,
  setDraggedItem,
  setVisible
) => {
  setDraggedItem(boxName);
  e.dataTransfer.effectAllowed = 'move';

  const dragImage = document.createElement('div');
  dragImage.innerText = helper[boxName];
  dragImage.style.position = 'absolute';
  dragImage.style.top = '-1000px';
  dragImage.style.left = '-1000px';
  dragImage.style.padding = '4px 8px';
  dragImage.style.border = '1px solid #888';
  dragImage.style.borderRadius = '6px';
  dragImage.style.background = '#111';
  dragImage.style.color = '#fff';
  dragImage.style.fontSize = '12px';
  dragImage.style.pointerEvents = 'none';
  document.body.appendChild(dragImage);
  e.dataTransfer.setDragImage(dragImage, 0, 0)
  setVisible(helper[boxName]);
};


export const handleDragOver1 = (e, block, setadjustment, draggedItem, file, animate, setanimate) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (file == 'quiz') {
        if (draggedItem == 'box1' || draggedItem == 'box2') {
            setanimate(0)
        }
        if (draggedItem == 'top' && (block == 'top' || block == 'right')) {
            setanimate(0)
        }
        if (draggedItem == 'right' && block == 'right') {
            setanimate(0)
        }
        if (draggedItem == 'right' && block == 'top') {
            setadjustment('horizontal')
            setTimeout(() => {
                setanimate(2)
            }, 100);
        }
    }
    if (file == 'questionBar') {
        if (draggedItem == 'top' || draggedItem == 'right') {
            if (draggedItem == 'top') {
                setadjustment('vertical')
                setTimeout(() => {
                    setanimate(1)
                }, 100);
            }
            if (draggedItem == 'right') {
                setadjustment('horizontal')
                setTimeout(() => {
                    setanimate(2)
                }, 100);
            }
        }
        else if ((draggedItem == 'box1' || draggedItem == 'box2') && draggedItem != block) {
            setTimeout(() => {
                setanimate(3)
            }, 100);
            setadjustment(block)
        } else {
            setanimate(0)
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
