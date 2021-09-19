import React, { useEffect, useState } from 'react'
import { Button, Card, Form, Input, Layout, Typography } from 'antd'
import './Login.scss'
import { inputRequired, typeEmail } from '../../utils/forms.utils'
import SweetAlert from 'react-bootstrap-sweetalert/dist'
import { useDispatch, useSelector } from 'react-redux'
import { hideLogout, login } from '../../store/auth/auth.actions'
import { UNEXPECTED_OOPS } from '../../utils/messages.utils'
import { useHasErrors } from '../../store/app/error/error.hooks'
import { useIsLoading } from '../../store/app/loading/loading.hooks'
import { actionTypes } from '../../store/auth/auth.types'
import { selectIsLogout } from '../../store/auth/auth.selectors'
import { Link } from 'react-router-dom'

const { Content } = Layout
const { Title } = Typography

const Login = ({ history }) => {
  const [showError, setShowError] = useState(false)
  const dispatch = useDispatch()
  const toggleError = () => setShowError(!showError)

  const [loading, finished] = useIsLoading([actionTypes.LOGIN])
  const [APIError, hasError] = useHasErrors([actionTypes.LOGIN])
  const isLogout = useSelector(selectIsLogout)

  const onSubmit = ({ email, password }) => {
    if (email !== '' && password !== '') {
      dispatch(login({ email, password }))
    }
  }

  useEffect(() => {
    if (finished) {
      if (hasError) {
        setShowError(true)
      } else {
        history.replace('')
      }
    }
  }, [APIError, finished, hasError, history])

  return (
    <Layout>
      <Content className='login-content'>
        <Card>
          <img src='/images/donate.svg' alt='logo' className='login-logo' />
          <div className='login-title'>
            <Title level={4}>Welcome!</Title>
            <p>Please, sign up to continue</p>
          </div>
          <Form layout='vertical' onFinish={onSubmit}>
            <Form.Item
              label='Email'
              name='email'
              rules={[inputRequired, typeEmail]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label='Password'
              name='password'
              rules={[inputRequired]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item className='login-input'>
              <Button type='primary' size='large' shape='round' htmlType='submit' className='login-submit' loading={loading}>
                Ingresar
              </Button>
              <br />
              <span>No account yet?</span> <Link to='/register'> Register!</Link>
            </Form.Item>
          </Form>
        </Card>

        <SweetAlert
          error
          show={showError}
          title={APIError.message || UNEXPECTED_OOPS}
          onConfirm={toggleError}
        />

        <SweetAlert
          error
          show={isLogout}
          title='La sesión ha expirado'
          onConfirm={() => dispatch(hideLogout())}
        />
      </Content>
    </Layout>
  )
}
export default Login
