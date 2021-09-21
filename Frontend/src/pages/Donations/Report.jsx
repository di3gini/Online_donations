import React, { useEffect, useState } from 'react'
import { Card, Layout, Table, Typography } from 'antd'
import './Donation.scss'
import SweetAlert from 'react-bootstrap-sweetalert/dist'

// import { selectCurrentUser, selectAccessToken, selectIsLogout } from '../../store/auth/auth.selectors'
import { useDispatch, useSelector } from 'react-redux'
import { getDonationsByUser } from '../../store/donations/donations.actions'
import { selectIsLogout, selectCurrentUser } from '../../store/auth/auth.selectors'
import { UNEXPECTED_OOPS } from '../../utils/messages.utils'
import { useHasErrors } from '../../store/app/error/error.hooks'
import { actionTypes } from '../../store/donations/donations.types'

// import { useHistory } from 'react-router-dom'
import { hideLogout } from '../../store/auth/auth.actions'
import { selectDonations } from '../../store/donations/donations.selectors'
// import isCreditCard from 'validator/es'

const { Content } = Layout
const { Title } = Typography

const Report = () => {
  const [showError, setShowError] = useState(false)
  // const [showSucces, setShowSucces] = useState(false)
  const dispatch = useDispatch()
  const toggleError = () => setShowError(!showError)
  // const token = useSelector(selectAccessToken)
  const isLogout = useSelector(selectIsLogout)
  const [APIError] = useHasErrors([actionTypes.DONATE])
  // const history = useHistory()
  const user = useSelector(selectCurrentUser)
  // const [modal, contextHolder] = Modal.useModal()
  const [showSuccess, setShowSuccess] = useState(false)
  const donations = useSelector(selectDonations)
  const init = () => {
    dispatch(getDonationsByUser(user.idUser))
    console.log(donations)
    console.log(columns)
  }
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
