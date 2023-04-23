import { Button } from 'antd'
import React from 'react'
import fb_icon from '@assets/images/fb_icon.png'
import phone_icon from '@assets/images/telephone-call.png'

import tiktok_icon from '@assets/images/tiktok.png'
import instagram_icon from '@assets/images/instagram_icon.png'
import styles from '@pages/Bio/styleBio.module.scss'
import classNames from 'classnames/bind'
const cx = classNames.bind(styles)

export const ButtonCustom = (props) => {
    const { link, name } = props
    const ImageRender = () => {
        if (name === "FACEBOOK") {
            return (<img src={fb_icon} alt='#' style={{ width: "37px", height: "37px" }}></img>)
        }
        if (name === "INSTAGRAM") {
            return (<img src={instagram_icon} alt='#' style={{ width: "37px", height: "37px" }}></img>)
        }
        if (name === "TIKTOK") {
            return (<img src={tiktok_icon} alt='#' style={{ width: "37px", height: "37px" }}></img>)
        }
        if (name === "PHONE") {
            return (<img src={phone_icon} alt='#' style={{ width: "37px", height: "37px" }}></img>)
        }
    }
    return (
        <a href={name === "PHONE" ? `tel:${link}`: link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <Button className={cx('button-network')}>
                <div className={cx('button-icon')}>
                    <ImageRender />
                    {/* <img src={phone_icon} alt='#' style={{width:"37px", height:"37px"}}></img>

                    <img src={tiktok_icon} alt='#' style={{width:"37px", height:"37px"}}></img>

                    <img src={instagram_icon} alt='#' style={{width:"37px", height:"37px"}}></img> */}

                    {/* {icon} */}
                </div>
                <div><b>{name}</b></div>
            </Button>
        </a>
    )
}
