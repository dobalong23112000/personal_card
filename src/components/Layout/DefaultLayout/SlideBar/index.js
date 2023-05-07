import React, { useEffect, useState } from 'react'
import styles from './styleSlidebar.module.scss'
import classNames from 'classnames/bind'
// import { IoHomeOutline, IoPersonOutline, IoColorPaletteOutline, IoInformationCircleOutline, IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles)
const SlideBar = () => {
    const [activeItem, setActiveItem] = useState("");
    const navigate = useNavigate()
    const onClickActive = (item) => {
        setActiveItem(item)
        navigate(`/${item}`)
    }
    useEffect(()=>{
        const item = (window.location.pathname.replace('/',''));
        setActiveItem(item)
    },[])
    return (
        <div className={cx('container')}>
            {/* <div className={cx('header')} >
                <div className={cx('text-header')}>
                    Liam
                </div>
            </div>
            <div className='content'>
                <div className={`${cx('content-item')} ${activeItem === "" ? cx('active-item') : ""}`} onClick={() => {
                    onClickActive('')
                }}>
                    <IoHomeOutline size={25} className={cx('icon-item')} />
                    <div>TRANG CHỦ</div>
                </div>
                <div className={`${cx('content-item')} ${activeItem === "display" ? cx('active-item') : ""}`} onClick={() => {
                    onClickActive('display')
                }}>
                    <IoColorPaletteOutline size={25} className={cx('icon-item')} />
                    <div>GIAO DIỆN</div>
                </div>
                <div className={`${cx('content-item')} ${activeItem === "profile" ? cx('active-item') : ""}`} onClick={() => {
                    onClickActive('profile')
                }}>
                    <IoPersonOutline size={25} className={cx('icon-item')} />
                    <div>TRANG CÁ NHÂN</div>
                </div>
                <div className={`${cx('content-item')} ${activeItem === "about" ? cx('active-item') : ""}`} onClick={() => {
                    onClickActive('about')
                }}>
                    <IoInformationCircleOutline size={25} className={cx('icon-item')} />
                    <div>GIỚI THIỆU</div>
                </div>
            </div>
            <div className={cx('footer')}>
                <div className={cx('content-item')}>
                    <IoLogOutOutline size={25} className={cx('icon-item')} />
                    <div onClick={(e) => {
                        navigate("/register")
                    }}>ĐĂNG XUẤT</div>
                </div>
            </div> */}
        </div>
    )
}

export default SlideBar