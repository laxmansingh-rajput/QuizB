export const QuestionHandeler1 = (e, list, setlist, qno) => {
    const updatedList = [...list];
    updatedList[qno - 1].question = e.target.value;
    setlist(updatedList)
}
export const optionHandeler1 = (e, index, list, setlist, qno) => {
    const updatedList = [...list];
    updatedList[qno - 1].options[index] = e.target.value;
    setlist(updatedList);
}
export const generateErr1 = (txt, seterr) => {
    seterr(txt);
    setTimeout(() => {
        seterr("")
    }, 3000);
}
export const handelRemoveOption1 = (i, list, generateErr, setlist, qno) => {
    const updatedList = [...list];
    if (updatedList[qno - 1].options.length <= 2) {
        generateErr('Question should have minimum two options')
    } else {
        updatedList[qno - 1].options.splice(i, 1)
        updatedList[qno - 1].correct.splice(i, 1)
        setlist(updatedList)
    }
}
export const handelAddOption1 = (i, list, setlist, generateErr, qno) => {
    const updatedList = [...list];
    if (updatedList[qno - 1].options.length == 4) {
        generateErr('Max options created')
    } else {
        updatedList[qno - 1].options.push("")
        updatedList[qno - 1].correct.push(false)
        setlist(updatedList)
    }
}
export const handelCorrect1 = (e, list, qno, setlist,type) => {
    console.log(e.target.value)
    const correct = list[qno - 1].correct;
    if (type) {
        correct.forEach((value, index) => {
            if (index == e.target.value) {
                correct[index] = !value;
                console.log(!value)
            } else { correct[index] = false; }
        });
    } else {
        correct.forEach((value, index) => {
            if (index == e.target.value) {
                correct[index] = !value;
                console.log(!value)
            }
        });
    }
    const updatedList = [...list]
    updatedList[qno - 1].correct = [...correct];
    setlist(updatedList)
}