import React, { useState } from 'react'
import styles from '@pages/Bio/styleNewBio.module.scss'
import classNames from 'classnames/bind'
import { Button, Modal } from 'antd';
import * as Icons from "react-icons/fa";
// ngân hàng
import VIETCOMBANKIMG from "@assets/images/VIETCOMBANK.png"
import VIETTINBANKIMG from "@assets/images/VIETTINBANK.png"
import BIDVIMG from "@assets/images/BIDV.png"
import TECHCOMBANKIMG from "@assets/images/TECHCOMBANK.png"
import ANGRIBANKIMG from "@assets/images/ANGRIBANK.png"
import MBBANKIMG from "@assets/images/MBBANK.png"
import MSBBANKIMG from "@assets/images/MSBBANK.png"
import ACBBANKIMG from "@assets/images/ACBBANK.png"
import SACOMBANKIMG from "@assets/images/SACOMBANK.png"
import TPBANKIMG from "@assets/images/TPBANK.png"
import VPBANKIMG from "@assets/images/VPBANK.png"
import VIBBANKIMG from "@assets/images/VIBBANK.png"
//
import {
    CopyOutlined
} from '@ant-design/icons';
import copyToClipboard from 'helpers/copyToClipboard';
import { toast } from 'react-toastify';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const cx = classNames.bind(styles)


const ButtonBank = ({ link, name, icon, bank_number, bank_type }) => {
    let IconComponent = null;
    if (icon) {
        IconComponent = Icons[icon];
    }
    const [isShow, setIsShow] = useState(false)
    return (
        <div className={cx('button')}>
            <div onClick={(e) => {
                setIsShow(true)
            }}
                style={{ textDecoration: 'none' }}>
                <Button className={cx('button-network')}>
                    <div className={cx('button-icon')}>
                        {/* <FontAwesomeIcon icon="fa-brands fa-facebook" /> */}
                        {IconComponent ? <IconComponent style={{ fontSize: '35px' }} /> : null}
                        {(bank_type === 'VIETCOMBANK') && (<img src={VIETCOMBANKIMG} alt='' className={cx('img-bank-render')}></img>)}
                        {(bank_type === 'VIETTINBANK') && (<img src={VIETTINBANKIMG} alt='' className={cx('img-bank-render')}></img>)}
                        {(bank_type === 'TECHCOMBANK') && (<img src={TECHCOMBANKIMG} alt='' className={cx('img-bank-render')}></img>)}
                        {(bank_type === 'ANGRIBANK') && (<img src={ANGRIBANKIMG} alt='' className={cx('img-bank-render')}></img>)}
                        {(bank_type === 'BIDV') && (<img src={BIDVIMG} alt='' className={cx('img-bank-render')}></img>)}



                        {(bank_type === 'MBBANK') && (<img src={MBBANKIMG} alt='' className={cx('img-bank-render')}></img>)}
                        {(bank_type === 'MSBBANK') && (<img src={MSBBANKIMG} alt='' className={cx('img-bank-render')}></img>)}
                        {(bank_type === 'VPBANK') && (<img src={VPBANKIMG} alt='' className={cx('img-bank-render')}></img>)}
                        {(bank_type === 'VIBBANK') && (<img src={VIBBANKIMG} alt='' className={cx('img-bank-render')}></img>)}
                        {(bank_type === 'TPBANK') && (<img src={TPBANKIMG} alt='' className={cx('img-bank-render')}></img>)}
                        {(bank_type === 'SACOMBANK') && (<img src={SACOMBANKIMG} alt='' className={cx('img-bank-render')}></img>)}
                        {(bank_type === 'ACBBANK') && (<img src={ACBBANKIMG} alt='' className={cx('img-bank-render')}></img>)}

                    </div>
                    <div><b style={{ fontSize: "18px" }}>{name}</b></div>
                </Button>
            </div>
            <Modal
                title="Thông tin ngân hàng"
                open={isShow}
                onCancel={() => {
                    setIsShow(false)
                }}
                footer={null}
            >
                <div>
                    <div className='mt-2'>Tên ngân hàng: <b>{bank_type}</b></div>
                    <div className='mt-2'>Số tài khoản ngân hàng </div>
                    <div className='w-100 mt-2' >
                        <Button className='w-100' style={{ height: "50px", fontSize: "25px", position: "relative" }} onClick={() => {
                            copyToClipboard(bank_number)
                            toast.success('Copy thành công', {
                                position: "top-center",
                                autoClose: 2000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "light"
                            });
                        }}>
                            {bank_number}
                            <CopyOutlined style={{ fontSize: "30px", position: "absolute", right: "10px", top: "10px", color: '#d1d1d1' }} />

                        </Button>

                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default ButtonBank