import React, { useContext } from 'react'
import styles from './styleHeader.module.scss'
import classNames from 'classnames/bind'
// import { IoHomeOutline, IoPersonOutline, IoColorPaletteOutline, IoInformationCircleOutline } from "react-icons/io5";
// import { useNavigate } from 'react-router-dom';
import { Dropdown } from 'antd';
import { AuthContext } from 'context/AuthContext';
import { CaretDownOutlined, LogoutOutlined,InfoCircleOutlined,MailOutlined,CommentOutlined  } from '@ant-design/icons';
import logo from 'assets/images/logo.png'
import avatar from "@assets/images/linhdu.png"

const cx = classNames.bind(styles)

const Header = () => {

  const { logoutUser, authState } = useContext(AuthContext)
  const items = [
    {
      label: <div className={cx('sub-avatar')}> <InfoCircleOutlined className='mr-1'/>Hướng dẫn sử dụng</div>,
      key: '0',
    },
    {
      type: 'divider',
    },
    {
      label: <div className={cx('sub-avatar')}> <CommentOutlined className='mr-1' /> Hỗ trợ 24/7</div>,
      key: '1',
    },
    {
      type: 'divider',
    },
    {
      label: <div className={cx('sub-avatar')}> <MailOutlined className='mr-1'/> Ý kiến đóng góp</div>,
      key: '2',
    },
    {
      type: 'divider',
    },
    {
      label: <div className={cx('sub-avatar')} style={{ color: '#B74141' }} onClick={() => {
        logoutUser()
      }} > <LogoutOutlined className='mr-1'/> Đăng xuất</div>,
      key: '3',
    },
  ];
  return (
    <div className={cx('container')}>
      <div className='d-flex align-center ml-5'>
        <img src={logo} alt='' width={120} height={32}></img>
      </div>
      <div className='mr-5'>
        {/* <Button type="primary" danger onClick={async (e) => {
          await logoutUser()
        }} style={{ fontWeight: "600", backgroundColor: "#B74141" }}>LOG OUT</Button> */}

        <Dropdown
          menu={{
            items,
          }}
          trigger={['click']}
        >
          <div onClick={(e) => e.preventDefault()} className='d-flex align-center'>
            <img src={authState?.user?.avatar ?? avatar} alt="Avatar" width={32} height={32} style={{ borderRadius: "50%", objectFit: "cover" }} className='mr-1' ></img>
            <CaretDownOutlined style={{ color: 'white' }} />
          </div>
        </Dropdown>
      </div>
    </div>
  )
}

export default Header