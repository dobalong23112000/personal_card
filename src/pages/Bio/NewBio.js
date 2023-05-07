import React, { useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import styles from './styleNewBio.module.scss'
import { useNavigate, useParams } from 'react-router-dom';
import ButtonLink from 'components/button/ButtonLink';
import ButtonPhone from 'components/button/ButtonPhone';
import ButtonMail from 'components/button/ButtonMail';
import ButtonSaveContact from 'components/button/ButtonSaveContact';
import defaultavatar from "@assets/images/linhdu.png"
import AuthServices from 'services/auth-service/AuthService';
import Loader from 'components/loading/Loader';
import ButtonSendSMS from 'components/button/ButtonSendSMS';
import Footer from 'components/footer/Footer';
import ButtonBank from 'components/button/ButtonBank';
import { ToastContainer } from 'react-toastify';
import { templates as listTemplate } from 'utils/template';

const cx = classNames.bind(styles)

const NewBio = () => {
    const { nickName } = useParams()
    const [isLoading, setIsLoading] = useState(false)
    const [user, setUser] = useState({
        avatar: "",
        description: "",
        content: [],
        template: null, 
        name: ""
    })
    const navigate = useNavigate()
    const { avatar, description, content, template, name } = user
    const loadUser = async () => {
        setIsLoading(true);
        try {
            const response = await AuthServices.getUserByNickName({ nickName });
            if (response.data.status === 200) {
                const { avatar, content, description, templates } = response.data.data;
                let name = response.data.data.nickName;
                console.log(response.data.data)
                // eslint-disable-next-line
                const dataTemp = listTemplate.find(item => item.id == templates)

                setUser({
                    avatar,
                    content: JSON.parse(content),
                    description,
                    template: dataTemp,
                    name: name
                })
            } else {
                navigate('/error')
            }
        } catch (e) {
            navigate('/error')
        }
        setIsLoading(false);

    }
    useEffect(() => {
        loadUser()
        // eslint-disable-next-line 
    }, [])

    return (
        <>
            {isLoading && <Loader />}

            <div className={cx("container")} style={{ backgroundColor: `${template?.color}`, backgroundImage: `${template?.src ? `url(${template?.src})` : ""}` }}>
                <div className={cx("header")}>
                    <div>
                        <div className={cx('avatar')}>
                            <img src={avatar ? avatar : defaultavatar} alt="Avatar" style={{ width: "150px", height: "150px", borderRadius: "50%", border: "10px solid white", objectFit: "cover" }}></img>
                        </div>
                    </div>
                    <div className={cx('name')}><b >{name}</b></div>
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
                    })}

                </div>
                <Footer />
            </div>
            <ToastContainer />

        </>

    );
}

export default NewBio