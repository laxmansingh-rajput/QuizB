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
const toolBar = () => {
    return (
        <div className='  h-auto w-full  text-black flex flex-col gap-5 items-center justify-center'>
            <div draggable className='font-bold underline'>Tools</div>
            <Icons  name="Add Single" svg={lightSingle} dark={darkSingle} />
            <Icons name="Add Multiple" svg={lightMultiple} dark={darkMultiple} />
            <Icons name="View" svg={lightEye} dark={darkEye} />
            <Icons name="Delete" svg={Delete} dark={darkDelete} />
            <Icons name="Share" svg={lightUpload} dark={darkUpload} />
        </div>
    )
}

export default toolBar