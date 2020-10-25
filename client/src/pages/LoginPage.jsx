import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'
import { loadUserLogin } from '../actions/app'
import styled from 'styled-components'
import loginBg from '../assets/Background.svg'
import Logo from '../assets/FwdSec_logo.png'
import { Layout, Row, Col, Form, Input, Button, Typography } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { mobileL } from '../components/devices'

const { Title } = Typography;
const LoginContent = styled.div`
  margin-left: auto;
  margin-right: auto;
  padding:50px 0;
  width: 60%;
  ${mobileL`
    width: 80%;
    `}
`

class LoginPage extends Component {
  state = {
    email: '',
    password: ''
  }

  userLogin = e => {
    e.preventDefault()
    const { email, password } = this.state
    this.props.loadUserLogin({ email, password })
  }

  handleChangeEmail = event => {
    this.setState({ email: event.target.value })
  }

  handleChangePassword = event => {
    this.setState({ password: event.target.value })
  }

  render() {
    const { app } = this.props
    if (false) {
      return <Redirect to='/' />
    }
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Layout.Content
          style={{
            background: `url(${loginBg}) #1D3378`,
            backgroundSize: 'cover',
            position: 'sticky',
            left: 0,
            top: 0
          }}
        ></Layout.Content>
        <Layout.Sider collapsedWidth='100%' width='60%' vCenterChild breakpoint='lg'>
          <LoginContent>
            <Row>
              <Col style={{ width: '100%' }}>
                <Form className='login-form' onSubmit={this.userLogin}>
                  <img src={Logo} alt="logo"/>
                  <br />
                  <br />
                  <Title level={3} style={{color: '#fff'}}>LOGIN</Title>
                  <Form.Item>
                    <Input
                      placeholder='Email'
                      onChange={this.handleChangeEmail}
                      value={this.state.email}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Input
                      type='password'
                      placeholder='Password'
                      onChange={this.handleChangePassword}
                      value={this.state.password}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      background='mmoser'
                      as='button'
                      size='lg'
                      type='primary'
                      htmlType='submit'
                      className='login-form-button'
                      style={{ width: '100%' }}
                    >
                      {false ? (
                        <LoadingOutlined />
                      ) : (
                        'Login'
                      )}
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </LoginContent>
        </Layout.Sider>
      </Layout>
    )
  }
}

LoginPage.propTypes = {
  app: PropTypes.object.isRequired,
  loadUserLogin: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { app } = state
  return { app }
}

export default connect(mapStateToProps, { loadUserLogin })(LoginPage)
