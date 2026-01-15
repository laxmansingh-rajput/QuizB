import React from 'react'
import Icons from './icons'
import lightMultiple from '../../assets/lightMultiple.svg'
import darkMultiple from '../../assets/darkMultiple.svg'
import lightSingle from '../../assets/lightSingle.svg'
import darkSingle from '../../assets/darkSingle.svg'
import lightEye from '../../assets/lightEye.svg'
import darkEye from '../../assets/darkEye.svg'
import lightUpload from '../../assets/lightUpload.svg'
import darkUpload from '../../assets/darkUpload.svg'
import Delete from '../../assets/Delete.svg'
import darkDelete from '../../assets/darkDelete.svg'
const toolBar = ({ list, setlist, type, qno, settype, setqno }) => {
    const handelAddSingle = () => {
        const updatedList = [...list]
        updatedList.push({ question: "", options: ["", "", ""], correct: [false, false, false], type: true })
        settype(true)
        setlist(updatedList)
            setqno(list.length+1)
        
    }
    const handelAddMultipe = () => {
        const updatedList = [...list]
        updatedList.push({ question: "", options: ["", "", ""], correct: [false, false, false], type: false })
        settype(false)
        setlist(updatedList)
        setqno(list.length+1)
    }
    const handelDelete = () => {
        if (qno > 1) {
            const updatedList = [...list]
            updatedList.pop()
            setlist(updatedList)
            setqno(qno - 1)
        } else if (qno == 1 && list.length == 1) {
            setlist([{ question: "", options: ["", "", ""], correct: [false, false, false], type: true }])
        } else {
            const updatedList = [...list]
            updatedList.slice(0, 1)
            setlist(updatedList)
        }
    }

    return (
        <div className='  h-full w-full  text-primary-text dark:text-primary-dark-text flex flex-col gap-5 items-center '>
            <div className='font-bold underline'>Tools</div>
            <Icons name="Add Single" svg={lightSingle} dark={darkSingle} onClick={() => { handelAddSingle() }} />
            <Icons name="Add Multiple" svg={lightMultiple} dark={darkMultiple} onClick={() => { handelAddMultipe() }} />
            <Icons name="View" svg={lightEye} dark={darkEye} />
            <Icons name="Delete" svg={Delete} dark={darkDelete} onClick={() => { handelDelete() }} />
            <Icons name="Share" svg={lightUpload} dark={darkUpload} />
        </div>
    )
}

export default toolBar