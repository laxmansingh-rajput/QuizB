import React from 'react'
import Icons from './icons'
import lightMultiple from '../../../assets/lightMultiple.svg'
import darkMultiple from '../../../assets/darkMultiple.svg'
import lightSingle from '../../../assets/lightSingle.svg'
import darkSingle from '../../../assets/darkSingle.svg'
import lightEye from '../../../assets/lightEye.svg'
import darkEye from '../../../assets/darkEye.svg'
import lightUpload from '../../../assets/lightUpload.svg'
import darkUpload from '../../../assets/darkUpload.svg'
import Delete from '../../../assets/Delete.svg'
import darkDelete from '../../../assets/darkDelete.svg'
import lightSave from '../../../assets/lightSave.svg'
import darkSave from '../../../assets/darkSave.svg'
const toolBar = ({ questionList, setQuestionList, type, qno, settype, setqno, setLeft }) => {
    const handelAddSingle = () => {
        const updatedList = [...questionList]
        updatedList.push({ question: "", option: ["", "", ""], correct_option: [], question_type: "Single" })
        settype(true)
        setQuestionList(updatedList)
        setqno(questionList.length + 1)
        setLeft('questionbar')
    }
    const handelAddMultipe = () => {
        const updatedList = [...questionList]
        updatedList.push({ question: "", option: ["", "", ""], correct_option: [], question_type: "Multiple" })
        settype(false)
        setQuestionList(updatedList)
        setqno(questionList.length + 1)
        setLeft('questionbar')
    }
    const handelDelete = () => {
        if (qno > 1) {
            const updatedList = [...questionList]
            updatedList.pop()
            setQuestionList(updatedList)
            setqno(qno - 1)
        } else if (qno == 1 && questionList.length == 1) {
            setQuestionList([{ question: "", option: ["", "", ""], correct_option: [], question_type: "Single" }])
        } else {
            const updatedList = [...questionList]
            updatedList.slice(0, 1)
            setQuestionList(updatedList)
        }
    }

    return (
        <div className='h-full w-full text-foreground flex flex-row md:flex-col gap-3 md:gap-5 items-center justify-center md:justify-start overflow-x-auto md:overflow-x-visible py-2 md:py-0'>
            <div className='font-bold underline hidden md:block'>Tools</div>
            <Icons name="Add Single" svg={lightSingle} dark={darkSingle} onClick={() => { handelAddSingle() }} />
            <Icons name="Add Multiple" svg={lightMultiple} dark={darkMultiple} onClick={() => { handelAddMultipe() }} />
            <Icons name="View" svg={lightEye} dark={darkEye} onClick={() => { setLeft('view') }} />
            <Icons name="Delete" svg={Delete} dark={darkDelete} onClick={() => { handelDelete() }} />
            <Icons name="Share" svg={lightUpload} dark={darkUpload} onClick={() => { setLeft('share') }}/>
            <Icons name="Save" svg={lightSave} dark={darkSave} onClick={() => { setLeft('save') }} />
        </div>
    )
}

export default toolBar