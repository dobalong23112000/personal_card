import React from 'react'
import { templates } from 'utils/template'

const CardTemplate = ({ previewTemplate, setPreviewTemplate }) => {
    const handleClick = (item) => {
        setPreviewTemplate(item)
    }
    return (
        <div className='d-flex flex-wrap justify-space-between' style={{ height: "550px", overflow: "auto" }}>
            {templates.map(item => (
                <div key={item.id} style={{ width: "160px", height: "300px", backgroundColor: `${item.color}`, border: "2px solid #d1d1d1" }} className={`mb-2 ${previewTemplate?.id === item.id ? "active-item" : ""}`} onClick={() => {
                    handleClick(item)
                }}>
                    <div style={{ height: "50%" }}>
                        <img src={`${item.src}`} alt='' width={'100%'} height={'100%'}></img>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default CardTemplate