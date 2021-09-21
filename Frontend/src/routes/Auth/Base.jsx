import React from 'react'
import { LogoutOutlined, FileTextOutlined, UserOutlined } from '@ant-design/icons'
import { Link, useHistory } from 'react-router-dom'
import { Button, Layout, Row, Tooltip } from 'antd'
import './Base.scss'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../store/auth/logout.actions'
import { selectAccessToken } from '../../store/auth/auth.selectors'

const { Header, Content } = Layout

const Base = ({ Component }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const token = useSelector(selectAccessToken)
  const toReport = () => history.push('/report')
  const doLogout = () => dispatch(logout())

  return (
    <Layout>
      <Header className='dashboard-header'>
        <Row justify='space-between' style={{ width: '100%' }}>
          <Link to='/'>
            <img src='/images/donate.svg' alt='logo' className='dashboard-logo' />
            <span className='dashboard-title'>Online Donations</span>
          </Link>
          <div>
            {
              token &&
                <Tooltip title='Log out' placement='bottomLeft'>
                  <Button type='text' size='large' icon={<LogoutOutlined style={{ color: '#FFFFFF' }} />} onClick={doLogout} />
                </Tooltip>
            }
            {
              !token &&
                <Tooltip title='Login' placement='bottomLeft'>
                  <Button type='text' size='large' icon={<UserOutlined style={{ color: '#FFFFFF' }} />} onClick={toReport} />
                </Tooltip>
            }
            <Tooltip title='See donations' placement='bottomLeft'>
              <Button type='text' size='large' icon={<FileTextOutlined style={{ color: '#FFFFFF' }} />} />
            </Tooltip>
          </div>
        </Row>
      </Header>
      <Content>
        <div className='dashboard-content'>
          <Component />
        </div>
      </Content>
    </Layout>
  )
}
export default Base
