import {
    useEffect, useState, useRef
} from "react";

const useQuizState = () => {
    const [questionList, setQuestionList] = useState(() => {
        let lista = localStorage.getItem('question_list');
        const oldLista = localStorage.getItem('list');
        if (!lista && oldLista) {
            lista = oldLista;
            localStorage.setItem('question_list', oldLista);
            localStorage.removeItem('list');
        }
        if (lista) {
            try {
                const parsed = JSON.parse(lista);
                return parsed.map(q => {
                    // Migrate old format if encountered
                    if (q.options !== undefined && q.option === undefined) {
                        const optionList = q.options;
                        const correctList = q.correct || [];
                        const correctOptionList = optionList.filter((_, idx) => correctList[idx]);
                        return {
                            question: q.question || "",
                            option: optionList,
                            correct_option: correctOptionList,
                            question_type: q.type ? "Single" : "Multiple"
                        };
                    }
                    return q;
                });
            } catch (err) {
                console.error("Error parsing list from localStorage", err);
            }
        }
        return [{ question: "", option: ["", "", ""], correct_option: [], question_type: "Single" }]
    });
    const [err, seterr] = useState("")
    const [qno, setqno] = useState(questionList.length > 2 ? questionList.length : 1);
    const [type, settype] = useState(questionList[qno - 1] ? (questionList[qno - 1].question_type === 'Single') : true);
    const Arr = ['A', 'B', 'C', 'D']
    const [height, setheight] = useState(null)
    const blockRef = useRef(null);

    useEffect(() => {
        localStorage.setItem('question_list', JSON.stringify(questionList))
    }, [questionList])

    useEffect(() => {
        if (questionList[qno - 1]) {
            settype(questionList[qno - 1].question_type === 'Single');
        }
    }, [qno, questionList])

    useEffect(() => {
        const handleResize = () => {
            if (blockRef.current) {
                setheight(blockRef.current.offsetHeight);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    return {
        questionList, setQuestionList,
        err, seterr, qno, setqno, type, settype, Arr, height, setheight, blockRef
    }
}

export default useQuizState