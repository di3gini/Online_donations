import React, { useEffect, useState } from 'react'
import { Card, Layout, Table, Typography } from 'antd'
import './Donation.scss'
import SweetAlert from 'react-bootstrap-sweetalert/dist'
import { useDispatch, useSelector } from 'react-redux'
import { getDonationsByUser } from '../../store/donations/donations.actions'
import { selectIsLogout, selectCurrentUser, selectAccessToken } from '../../store/auth/auth.selectors'
import { UNEXPECTED_OOPS } from '../../utils/messages.utils'
import { useHasErrors } from '../../store/app/error/error.hooks'
import { actionTypes } from '../../store/donations/donations.types'
import { hideLogout } from '../../store/auth/auth.actions'
import { selectDonations } from '../../store/donations/donations.selectors'
import { useHistory } from 'react-router-dom'

const { Content } = Layout
const { Title } = Typography

const Report = () => {
  const [showError, setShowError] = useState(false)
  const dispatch = useDispatch()
  const toggleError = () => setShowError(!showError)
  const token = useSelector(selectAccessToken)
  const isLogout = useSelector(selectIsLogout)
  const [APIError] = useHasErrors([actionTypes.DONATE])

  const user = useSelector(selectCurrentUser)

  const [showSuccess, setShowSuccess] = useState(false)
  const donations = useSelector(selectDonations)
  const init = () => {
    dispatch(getDonationsByUser(user.idUser))
  }
  const history = useHistory()

  useEffect(() => {
    if (!token) {
      history.replace('/login')
    }
  }, [history, token])
  const columns = [
    {
      title: 'Institution',
      dataIndex: 'institution',
      key: 'id'
    },
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'id'
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'id'
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'id'
    }
  ]

  useEffect(
    init, [dispatch]
  )

  return (
    <Layout>
      <Content className='login-content'>
        <Card>
          <img src='/images/donate.svg' alt='logo' className='login-logo' />
          <Title level={4}>Thanks for donating!</Title>
          <p>Here you will see all the donations you have done</p>
          <div layout='vertical'>
            <Table striped hover dataSource={donations} columns={columns} />
          </div>
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
          title='Session expired'
          onConfirm={() => dispatch(hideLogout())}
        />
      </Content>

      <SweetAlert
        success
        show={showSuccess}
        onConfirm={() => setShowSuccess(false)}
        title='Thanks for your donation!'
      />
    </Layout>
  )
}
export default Report
