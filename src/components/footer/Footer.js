import React from 'react'
import classNames from 'classnames/bind'
import styles from '@pages/Bio/styleNewBio.module.scss'
const cx = classNames.bind(styles)
const Footer = () => {
    return (
        <div className={cx('footer_container')}>
            <div>Contact & Support: <a href={`tel:0332627663`} target="_blank" rel="noopener noreferrer" style={{ color: "white" }}>0332627663</a></div>
            <div><a href='http://liamtap.site' style={{ color: "white" }}>http://liamtap.site</a></div>
            <div><i>Copyright © 2023 liamtap.site - All right reserved</i></div>
        </div>
    )
}

export default Footer