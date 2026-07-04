import { useEffect, useState } from "react";

const arrChange = (qno, questionList) => {
    let arr = []
    let size = questionList.length
    if (size <= 5) {
        for (let i = 1; i <= questionList.length; i++) {
            arr.push(i);
        }
    } else {
        if (qno + 2 <= questionList.length && qno - 2 > 0) {
            arr = [qno - 2, qno - 1, qno, qno + 1, qno + 2]
        } else if (qno - 2 <= 0) {
            for (let i = 1; i <= Math.min(questionList.length, 5); i++) {
                arr.push(i);
            }
        } else {
            let remaining = size - qno
            let need = 2 - remaining;
            for (let i = qno - 2 - need; i <= qno + remaining ; i++) {
                arr.push(i)
            }
        }
    }
    return arr;
}

const useRenderQuestion = (qno, questionList) => {
    const [RenderQuestion, setRenderQuestion] = useState(arrChange(qno, questionList));
    useEffect(() => {
        setRenderQuestion(arrChange(qno, questionList));
        setTimeout(() => {
        }, 200);
    }, [qno, questionList]);
    return RenderQuestion;
};

export default useRenderQuestion