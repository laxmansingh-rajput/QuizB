import { useEffect, useState } from "react";

const arrChange = (qno, list) => {
    let arr = []
    let size = list.length
    if (size <= 5) {
        for (let i = 1; i <= list.length; i++) {
            arr.push(i);
        }
    } else {
        if (qno + 2 <= list.length && qno - 2 > 0) {
            arr = [qno - 2, qno - 1, qno, qno + 1, qno + 2]
        } else if (qno - 2 <= 0) {
            for (let i = 1; i <= Math.min(list.length, 5); i++) {
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

const useRenderQuestion = (qno, list) => {
    const [RenderQuestion, setRenderQuestion] = useState(arrChange(qno, list));
    useEffect(() => {
        setRenderQuestion(arrChange(qno, list));
        setTimeout(() => {
        }, 200);
    }, [qno, list]);
    return RenderQuestion;
};

export default useRenderQuestion