import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'
import * as actions from '../actions/app'
import styled from 'styled-components'
import loginBg from '../assets/Background.svg'
import Logo from '../assets/FwdSec_logo.png'
import { Layout, Row, Col, Form, Input, Button, Typography } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { mobileL } from '../components/devices'

const { Title, Text} = Typography;
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
    email: 'a.bidva@gmail.com',
    password: '123Abc,./',
    isSignUp: false,
  }

  onSubmit = (e,type) => {
    e.preventDefault()
    const {isSignUp} = this.state;
    const { email, password } = this.state
    if(isSignUp){
      this.props.userSignup({ email, password })
    } else {
      this.props.userLogin({ email, password })
    }
  }

  handleChangeEmail = event => {
    this.setState({ email: event.target.value })
  }

  handleChangePassword = event => {
    this.setState({ password: event.target.value })
  }

  toggleSignup = (e) => {
    const {isSignUp} = this.state;
    this.setState({isSignUp: !isSignUp})
  }

  render() {
    const {isSignUp} = this.state;
    const { listStore } = this.props;
    const {loadingUserLogin, loadingUserSignup, userConfirmation} = listStore
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
                  {
                    isSignUp?
                    <Title level={3} style={{color: '#fff'}}>SIGNUP</Title>:
                    <Title level={3} style={{color: '#fff'}}>LOGIN</Title>
                  }
                  
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
                    {
                      isSignUp?
                      <Text style={{'color':'#fff'}}>if you already have an account <a href="#" onClick={this.toggleSignup}>login</a></Text>:
                      <Text style={{'color':'#fff'}}>if you don't have an account <a href="#" onClick={this.toggleSignup}>signup</a></Text>
                    }

                    {
                      userConfirmation ? 
                      <Text style={{'color':'#fff'}}>Please make a contact with your administrator to he confirms your registratiopn.</Text>:
                      null
                    }
                  

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
                      disabled={loadingUserLogin||loadingUserSignup}
                      onClick={this.onSubmit}
                    >
                      {false ? (
                        <LoadingOutlined />
                      ) : (
                        isSignUp? 'Signup' : 'Login'
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
  userLogin: PropTypes.func.isRequired,
  userSignup: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { listStore } = state
  return { listStore }
}

export default connect(mapStateToProps, { userLogin: actions.userLogin.login, userSignup: actions.userSignup.signup })(LoginPage)
