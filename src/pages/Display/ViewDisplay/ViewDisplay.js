import { Modal } from 'antd'
import React from 'react'
import classNames from 'classnames/bind'
import styles from './styleViewDisplay.module.scss'
import ButtonLink from 'components/button/ButtonLink'
import ButtonPhone from 'components/button/ButtonPhone'
import ButtonMail from 'components/button/ButtonMail'
import ButtonSaveContact from 'components/button/ButtonSaveContact'
import defaultavatar from "@assets/images/linhdu.png"
import ButtonSendSMS from 'components/button/ButtonSendSMS'
import Footer from 'components/footer/Footer'
import ButtonBank from 'components/button/ButtonBank'
import {
    CloseOutlined,
} from '@ant-design/icons';
const cx = classNames.bind(styles)
const ViewDisplay = (props) => {
    const { avatar, nickName, description, content, isModalOpen, handleShowModal,template } = props
    return (
        <Modal title=""
            open={isModalOpen}
            onOk={() => { }}
            onCancel={handleShowModal}
            footer={null}
            className={'ant-modal-custom'}
            closeIcon={<CloseOutlined style={{ color: "white" }} />}
        >
            <div className={cx("container")} style={{ backgroundColor: `${template?.color}`, backgroundImage: `${template?.src ? `url(${template?.src})` : ""}` }}>
                <div className={cx("header")}>
                    <div>
                        <div className={cx('avatar')}>
                            <img src={avatar ? avatar : defaultavatar} alt="Avatar" style={{ 
                                width: "150px",
                                 height: "150px", 
                                 borderRadius: "50%",
                                  border: "10px solid white", 
                                  objectFit: "cover" 
                                  }}></img>
                        </div>
                    </div>
                    <div className={cx('name')}><b>{nickName}</b></div>
                    <div className={cx('description')}>{description}</div>
                </div>
                <div className={cx('content')}>

                    {content?.map((item, index) => {
                        if (item?.typeBlock === 'website') {
                            return <ButtonLink key={index} link={item.link} name={item.name} icon={item.icon} />
                        } else if (item?.typeBlock === 'phone') {
                            return <ButtonPhone key={index} link={item.phone} name={item.name} icon={item.icon} />
                        } else if (item?.typeBlock === 'send_email') {
                            return <ButtonMail key={index} email={item.email} name={item.name} icon={item.icon} content={item.content} />
                        } else if (item?.typeBlock === 'save_contact') {
                            return <ButtonSaveContact key={index} name={item.name} icon={item.icon} personInfo={item.personInfo} orgInfo={item.orgInfo} />
                        } else if (item?.typeBlock === 'send_sms') {
                            return <ButtonSendSMS key={index} name={item.name} icon={item.icon} phone={item.phone} content={item.content} />
                        } else if (item?.typeBlock === 'bank') {
                            return <ButtonBank key={index} name={item.name} icon={item.icon} bank_type={item.bankType} bank_number={item.bankNumber} />
                        }
                        return false
                        // eslint-disable-next-line

                    })}
                    <Footer />
                </div>

            </div>
        </Modal>
    )
}

export default ViewDisplay