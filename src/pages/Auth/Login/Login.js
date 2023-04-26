import React, { useContext, useState } from 'react'
import { Button, Form, Input } from 'antd'
import styles from './styleLogin.module.scss'
import classNames from 'classnames/bind'
import phone from '@assets/images/phonenfc.png'
import nfc_phone from '@assets/images/nfc_phone.png'
import { Navigate, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from 'context/AuthContext'
import Loader from 'components/loading/Loader'
import logo from 'assets/images/logo_login.png'
const cx = classNames.bind(styles)

const Login = () => {
  const navigate = useNavigate();
  const { loginUser, authState } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false)
  if (authState.isAuthenticated) {
    return <Navigate to='/' replace={true} />
  }
  const onFinish = async (values) => {
    setIsLoading(true)
    const { email, password } = values
    try {
      const response = await loginUser({ email, password })
      setIsLoading(false)

      if (response.data.status) {
        navigate('/')
      } else {
        toast.error('Email hoặc mật khẩu không chính xác', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (e) {
      toast.error('Email hoặc mật khẩu không chính xác', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }


  };

  const onFinishFailed = (errorInfo) => {
    toast.error('Email hoặc mật khẩu sai định dạng', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <>
      {(authState.isLoading || isLoading) && <Loader />}
      <div className={cx('container')}>
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
          <div className={cx('content-left')}>
            <div style={{ position: "relative" }}>
              <img src={phone} alt='#'></img>
              <img src={nfc_phone} alt='#' style={{ width: "250px", height: "480px", left: "158px", top: "60px", position: "absolute" }} />
            </div>

          </div>
          <div className={cx('content-right')}  >
            <div className={cx('form')}>
              <div className={cx('header')}>
                <div className={cx('text-header')}>
                  <img src={logo} alt='' width={200}/>
                </div>
                <div className={cx('underline-header')}></div>
              </div>
              <div className={cx('content')}>
                <Form
                  name="form-login"
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  layout="vertical"
                  initialValues={{ size: 'large' }}
                  size={'large'}
                  autoComplete="off"
                >
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Email không được bỏ trống' }, { type: 'email', message: 'Email không đúng định dạng' }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Mật khẩu"
                    name="password"
                    rules={[{ required: true, message: 'Mật khẩu không được bỏ trống' }, { type: 'string', min: 8, message: 'Mật khẩu tối thiểu 8 ký tự' }]}
                  >
                    <Input.Password />
                  </Form.Item>

                  <div className={cx('underline-footer')}></div>
                  <Form.Item className='mt-3'>
                    <Button type="primary" htmlType="submit" style={{ width: "100%", height: "45px" }}>
                      Đăng nhập
                    </Button>
                  </Form.Item>
                </Form>

              </div>


            </div>
            <div className={cx('form-footer')}>
              <div className={cx('content-footer')}>Bạn chưa có tài khoản? <span className='link_custom' onClick={(e) => {
                navigate('/register')
              }}>Đăng ký</span></div>
            </div>
          </div>
        </div>
        <ToastContainer />

      </div>
    </>

  )
}

export default Login