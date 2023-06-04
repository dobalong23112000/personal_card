import React from 'react'
import styles from '@pages/Bio/styleNewBio.module.scss'
import classNames from 'classnames/bind'
import { Button } from 'antd';

import * as Icons from "react-icons/fa";


const cx = classNames.bind(styles)


const ButtonMail = ({ email, name, icon,content }) => {
    let IconComponent = null;
    if (icon) {
        IconComponent = Icons[icon];
    }
    return (
        <div className={cx('button')}>
            <a href={`mailto:${email}?subject=${content}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                <Button className={cx('button-network')}>
                    <div className={cx('button-icon')}>
                        {IconComponent ? <IconComponent style={{ fontSize: '30px' }} /> : null}
                    </div>
                    <div><b style={{fontSize:"18px"}}>{name}</b></div>
                </Button>
            </a>
        </div>
    )
}

export default ButtonMail