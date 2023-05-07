import Loader from 'components/loading/Loader';
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import AuthServices from 'services/auth-service/AuthService'

const Home = () => {
  const navigate = useNavigate();
  const { uuid } = useParams()

  const checkUser = async () => {
    try {
      const response = await AuthServices.checkUser({ uuid: uuid })
      console.log(response.data)
      if (response.data.status === 200) {
        if (response.data.data.email) {
          navigate(`/profile/${response.data.data.nickName}`)
        } else {
          navigate('/register', {
            state: {
              uuid: uuid
            }
          })
        }

      } else {
        navigate(`/error`)
      }
    } catch (e) {
      navigate(`/error`)

    }

  }
  useEffect(() => {
    checkUser();
    // eslint-disable-next-line
  }, [])
  return (
    <div>
      <Loader />
    </div>
  )
}

export default Home