import React from 'react'
import {
    GlobalOutlined
} from '@ant-design/icons';
import styles from '@pages/Display/styleDisplay.module.scss'
import classNames from 'classnames/bind'
import { Button } from 'antd';
const cx = classNames.bind(styles)


const ButtonCustom = ({ link, name }) => {
    return (
        <div className={cx('button')}>
            <div >
                <Button className={cx('button-network')}>
                    <div className={cx('button-icon')}>
                        <GlobalOutlined style={{ fontSize: '30px'}}/>
                    </div>
                    <div><b>{name}</b></div>
                </Button>
            </div>
        </div>
    )
}

export default ButtonCustom