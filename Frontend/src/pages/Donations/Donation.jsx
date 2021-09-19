import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Input, Layout, Row } from 'antd'
import './Login.scss'
import { dpi, inputRequired, min8, typeEmail } from '../../utils/forms.utils'
import SweetAlert from 'react-bootstrap-sweetalert/dist'
import { useDispatch, useSelector } from 'react-redux'
import { hideLogout, register } from '../../store/auth/auth.actions'
import { UNEXPECTED_OOPS } from '../../utils/messages.utils'
import { useHasErrors } from '../../store/app/error/error.hooks'
import { useIsLoading } from '../../store/app/loading/loading.hooks'
import { actionTypes } from '../../store/auth/auth.types'
import { selectIsLogout } from '../../store/auth/auth.selectors'
import { Link } from 'react-router-dom'

const { Content } = Layout

const Donation = ({ history }) => {
  const [showError, setShowError] = useState(false)
  const dispatch = useDispatch()
  const toggleError = () => setShowError(!showError)

  const [loading, finished] = useIsLoading([actionTypes.REGISTER])
  const [APIError, hasError] = useHasErrors([actionTypes.REGISTER])
  const isLogout = useSelector(selectIsLogout)

  const onSubmit = ({ email, firstName, lastName, DPI, address, password }) => {
    dispatch(register({ email, firstName, lastName, DPI, address, password }))
  }

  useEffect(() => {
    if (finished) {
      if (hasError) {
        setShowError(true)
      } else {
        history.replace('/')
      }
    }
  }, [APIError, finished, hasError, history])

  return (
    <Layout>
      <Content className='login-content'>
        <Card>
          <img src='/public/images/donation.svg' alt='logo' className='login-logo' />
          <Form layout='vertical' onFinish={onSubmit}>
            <Form.Item
              label='Correo'
              name='email'
              rules={[inputRequired, typeEmail]}
            >
              <Input />
            </Form.Item>

            <Row>
              <Col span={12}>
                <Form.Item
                  label='Nombres'
                  name='firstName'
                  rules={[inputRequired]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label='Apellidos'
                  name='lastName'
                  rules={[inputRequired]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              label='DPI'
              name='DPI'
              rules={[inputRequired, dpi]}
            >
              <Input maxLength={13} />
            </Form.Item>

            <Form.Item
              label='Dirección'
              name='address'
              rules={[inputRequired]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label='Contraseña'
              name='password'
              rules={[inputRequired, min8]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item className='login-input'>
              <Button type='primary' size='large' shape='round' htmlType='submit' className='login-submit' loading={loading}>
                Registrarse
              </Button>
              <br />
              <span>¿Ya tienes una cuenta?</span> <Link to='/login'> Ve al login</Link>
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
export default Register