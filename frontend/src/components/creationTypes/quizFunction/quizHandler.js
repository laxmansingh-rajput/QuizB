export const QuestionHandeler1 = (e, questionList, setQuestionList, qno) => {
    const updatedList = [...questionList];
    updatedList[qno - 1].question = e.target.value;
    setQuestionList(updatedList)
}
export const optionHandeler1 = (e, index, questionList, setQuestionList, qno) => {
    const updatedList = [...questionList];
    const oldVal = updatedList[qno - 1].option[index];
    const newVal = e.target.value;
    updatedList[qno - 1].option[index] = newVal;
    const correctIndex = updatedList[qno - 1].correct_option.indexOf(oldVal);
    if (correctIndex !== -1) {
        updatedList[qno - 1].correct_option[correctIndex] = newVal;
    }
    setQuestionList(updatedList);
}
export const generateErr1 = (txt, seterr) => {
    seterr(txt);
    setTimeout(() => {
        seterr("")
    }, 3000);
}
export const handelRemoveOption1 = (i, questionList, generateErr, setQuestionList, qno) => {
    const updatedList = [...questionList];
    if (updatedList[qno - 1].option.length <= 2) {
        generateErr('Question should have minimum two options')
    } else {
        const removedVal = updatedList[qno - 1].option[i];
        updatedList[qno - 1].option.splice(i, 1);
        updatedList[qno - 1].correct_option = updatedList[qno - 1].correct_option.filter(val => val !== removedVal);
        setQuestionList(updatedList)
    }
}
export const handelAddOption1 = (i, questionList, setQuestionList, generateErr, qno) => {
    const updatedList = [...questionList];
    if (updatedList[qno - 1].option.length == 4) {
        generateErr('Max options created')
    } else {
        updatedList[qno - 1].option.push("")
        setQuestionList(updatedList)
    }
}
export const handelCorrect1 = (e, questionList, qno, setQuestionList, type) => {
    const updatedList = [...questionList];
    const q = updatedList[qno - 1];
    const optVal = q.option[Number(e.target.value)];
    if (type) {
        if (q.correct_option.includes(optVal)) {
            q.correct_option = [];
        } else {
            q.correct_option = [optVal];
        }
    } else {
        if (q.correct_option.includes(optVal)) {
            q.correct_option = q.correct_option.filter(val => val !== optVal);
        } else {
            q.correct_option.push(optVal);
        }
    }
    setQuestionList(updatedList)
}

export const animation = (animate) => {
    return (animate == 1) ? 'translate-y-0 scale-x-100' : "-translate-y-3  scale-x-0 ";
}
export const animation2 = (animate) => {
    return (animate == 1) ? 'translate-y-0 scale-x-100' : "translate-y-3  scale-x-0 ";
}
export const animation3 = (animate) => {
    return (animate == 2) ? 'translate-x-0 scale-100' : "translate-x-3  scale-0 ";
}
export const animation4 = (animate) => {
    return (animate == 2) ? 'translate-x-0 scale-100' : "-translate-x-3  scale-0 ";
}
export const animationBar = (animate) => {
    return (animate == 3) ? 'translate-y-0 scale-x-100' : "-translate-y-3  scale-x-0 ";
}
export const animationBar2 = (animate) => {
    return (animate == 3) ? ' translate-y-0 scale-x-100' : " translate-y-3  scale-x-0 ";
}