import React, { useEffect, useState } from 'react'
import { Button, Card, Col, DatePicker, Form, Input, Layout, Row, Select, Typography } from 'antd'
import './Donation.scss'
import { dpi, inputRequired } from '../../utils/forms.utils'
import SweetAlert from 'react-bootstrap-sweetalert/dist'
import { selectCountries, selectInstitutions } from '../../store/donations/donations.selectors'
import { useDispatch, useSelector } from 'react-redux'
import { getCountries, getInstitutions, donate } from '../../store/donations/donations.actions'
import { UNEXPECTED_OOPS } from '../../utils/messages.utils'
import { useHasErrors } from '../../store/app/error/error.hooks'
import { useIsLoading } from '../../store/app/loading/loading.hooks'
import { actionTypes } from '../../store/donations/donations.types'
import { selectIsLogout } from '../../store/auth/auth.selectors'
// import { useHistory } from 'react-router-dom'
import { hideLogout } from '../../store/auth/auth.actions'

const { Content } = Layout
const { Title } = Typography
const { Option } = Select

const Donation = () => {
  const [showError, setShowError] = useState(false)
  const dispatch = useDispatch()
  const toggleError = () => setShowError(!showError)

  const [loading] = useIsLoading([actionTypes.REGISTER])
  const isLogout = useSelector(selectIsLogout)
  const dateFormat = 'YYYY/MM'
  const [APIError] = useHasErrors([actionTypes.DONATE])
  // const history = useHistory()
  const countries = useSelector(selectCountries)
  const institutions = useSelector(selectInstitutions)
  // const [modal, contextHolder] = Modal.useModal()
  const [donateForm] = Form.useForm()
  const onSubmit = ({ email, firstName, lastName, DPI, address, password }) => {
    dispatch(donate())
    console.log(countries)
  }

  const init = () => {
    console.log('init')
    dispatch(getCountries())
    dispatch(getInstitutions({ idCountry: 35 }))
    console.log('after init ' + countries)
  }

  useEffect(
    init, [dispatch]
  )

  const onCountryChange = () => {
    dispatch(getInstitutions({ idCountry: donateForm.getFieldValue('country') }))
  }

  return (
    <Layout>
      <Content className='login-content'>
        <Card>
          <img src='/images/donate.svg' alt='logo' className='login-logo' />
          <Title level={4}>Thanks for donating!</Title>
          <p>Please, fill up the next form to fulfill your donation</p>
          <Form layout='vertical' onFinish={onSubmit} form={donateForm}>
            <Form.Item name='country' label='Country' initialValue={35}>
              <Select style={{ width: 250 }} onChange={onCountryChange}>
                {
                  countries.map((country) =>
                    <Option value={country.id} key={`${country.id}`}>{country.name}</Option>
                  )
                }
              </Select>
            </Form.Item>
            <Form.Item name='idInstitution' label='Institution'>
              <Select style={{ width: 250 }}>
                {
                  institutions.map((institution) =>
                    <Option value={institution.id} key={`${institution.id}`}>{institution.name}</Option>
                  )
                }
              </Select>
            </Form.Item>

            <Form.Item
              label='Credit Card number'
              name='cardNumber'
              rules={[inputRequired, dpi]}
            >
              <Input maxLength={13} />
            </Form.Item>
            <Row>
              <Col span={12}>
                <Form.Item label='Expiration date' name='expDate'>
                  <DatePicker format={dateFormat} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label='CVC'
                  name='lastName'
                  rules={[inputRequired]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              label='Amount'
              name='amount'
              rules={[inputRequired, dpi]}
            >
              <Input maxLength={13} />
            </Form.Item>

            <Form.Item className='login-input'>
              <Button type='primary' size='large' shape='round' htmlType='submit' className='login-submit' loading={loading}>
                Donate
              </Button>
              <br />
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
export default Donation
