import React, { useContext} from 'react'
import styles from './styleHeader.module.scss'
import classNames from 'classnames/bind'
// import { IoHomeOutline, IoPersonOutline, IoColorPaletteOutline, IoInformationCircleOutline } from "react-icons/io5";
// import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { AuthContext } from 'context/AuthContext';
const cx = classNames.bind(styles)

const Header = () => {

  const {logoutUser} = useContext(AuthContext)

  return (
    <div className={cx('container')}>
      <div> <span style={{ fontSize: "40px", marginLeft: "15px", fontFamily: 'Dancing Script', color:"white" }}>Liam</span></div>
      <div className='mr-5'>
        <Button type="primary" danger onClick={async (e)=>{
          await logoutUser()
        }} style={{fontWeight:"600", backgroundColor:"#B74141"}}>LOG OUT</Button>
      </div>
    </div>
  )
}

export default Header