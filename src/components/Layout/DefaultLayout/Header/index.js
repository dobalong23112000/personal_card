import React, { useContext} from 'react'
import styles from './styleHeader.module.scss'
import classNames from 'classnames/bind'
// import { IoHomeOutline, IoPersonOutline, IoColorPaletteOutline, IoInformationCircleOutline } from "react-icons/io5";
// import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { AuthContext } from 'context/AuthContext';
import logo from 'assets/images/logo.png'
const cx = classNames.bind(styles)

const Header = () => {

  const {logoutUser} = useContext(AuthContext)

  return (
    <div className={cx('container')}>
      <div className='d-flex align-items-center ml-5'> 
        <img src={logo} alt='' width={150} height={40}></img>
      </div>
      <div className='mr-5'>
        <Button type="primary" danger onClick={async (e)=>{
          await logoutUser()
        }} style={{fontWeight:"600", backgroundColor:"#B74141"}}>LOG OUT</Button>
      </div>
    </div>
  )
}

export default Header