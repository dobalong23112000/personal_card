import React, { useContext, useState } from 'react'
import classNames from 'classnames/bind'
import styles from './styleRegister.module.scss'
import { Button, Form, Input } from 'antd'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import AuthServices from 'services/auth-service/AuthService'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from 'components/loading/Loader'
import { AuthContext } from 'context/AuthContext'
const cx = classNames.bind(styles)
const Register = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { authState } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false)
  if (authState.isAuthenticated) {
    return <Navigate to='/' replace={true} />
  }
  const onFinish = async (values) => {
    const { email, password, nickname, phone } = values
    setIsLoading(true);
    try {
      const response = await AuthServices.register({
        email: email,
        passWord: password,
        nickName: nickname,
        uuid: state?.uuid,
        telephone: phone
      });
      if (response.data.status === 200) {
        toast.success('Đăng ký thành công', {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          onClose: () => {
            navigate('/login')
          }
        });
      } else {
        toast.error('Bạn chưa được cấp mã thẻ!', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (e) {
      toast.error('Có lỗi xảy ra', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    setIsLoading(false);

  };

  const onFinishFailed = (errorInfo) => {
  };
  return (
    <>
      {(authState.isLoading || isLoading) && <Loader />}
      <div className={cx('container')}>
        <div className={cx('form')}>
          <div className={cx('header')}>
            <div className={cx('text-header')}>
              Liam
            </div>
            <div className={cx('text-content-header')}>
              Bạn chưa có mã thẻ? <br></br>
              Đăng ký mở tài khoản mới tại <span href='' className='link_custom'>đây</span>
            </div>
            <div className={cx('underline-header')}></div>
          </div>
          <div className={cx('content')}>
            <Form
              name="basic"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              layout="vertical"
              initialValues={{ size: 'large' }}
              size={'large'}
            >
              <Form.Item
                label="Số điện thoại"
                name="phone"
                rules={[{ required: true, message: 'Số điện thoại không được bỏ trống' }, {
                  validator: (_, value) => {
                    if (value) {
                      let check = new RegExp(/(84|0[3|5|7|8|9])+([0-9]{8})\b/).test(value)
                      if (check) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Số điện thoại nhập không đúng định dạng'));
                    }
                    return Promise.resolve();
                  },
                }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Email không được bỏ trống' }, { type: 'email', message: 'Email không đúng định dạng' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="NICK NAME"
                name="nickname"
                rules={[{ required: true, message: 'Nickname không được bỏ trống' }, { type: 'string', min: 5, message: 'Nickname sai định dạng' }, {
                  validator: (_, value) => {
                    if (value && value.length >= 5) {
                      let check = new RegExp(/^[a-zA-Z0-9]+$/).test(value)
                      if (check) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Nickname sai định dạng'));
                    }
                    return Promise.resolve();
                  },
                }]}
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
              <Form.Item
                label="Nhập lại mật khẩu"
                name="confirm_password"
                rules={[{ required: true, message: 'Nhập lại mật khẩu không được bỏ trống' }, ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Nhập lại mật khẩu không chính xác'));
                  },
                }),]}
              >
                <Input.Password />
              </Form.Item>
              <div className={cx('underline-footer')}></div>
              <Form.Item className='mt-3'>
                <Button type="primary" htmlType="submit" style={{ width: "100%", height: "45px" }}>
                  Tạo tài khoản
                </Button>
              </Form.Item>
            </Form>

          </div>


        </div>
        <div className={cx('form-footer')}>
          <div className={cx('content-footer')}>Bạn đã có tài khoản? <span className='link_custom' onClick={(e) => {
            navigate('/login')
          }}>Quay lại trang đăng nhập</span></div>
        </div>
        <ToastContainer />
      </div>
    </>

  )
}

export default Register