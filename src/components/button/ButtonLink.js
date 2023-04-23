import React from 'react'
import styles from '@pages/Bio/styleNewBio.module.scss'
import classNames from 'classnames/bind'
import { Button } from 'antd';
import * as AntdIcons from '@ant-design/icons';

const cx = classNames.bind(styles)


const ButtonLink = ({ link, name, icon }) => {
    let IconComponent = null;
    if (icon) {
        IconComponent = AntdIcons[icon];
    }
    return (
        <div className={cx('button')}>
            <a href={link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
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

export default ButtonLink