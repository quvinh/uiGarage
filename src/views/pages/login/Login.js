/* eslint-disable prettier/prettier */
import React, { useState, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { postData } from 'src/views/api/Api'
import isEmpty from 'validator/lib/isEmpty'
import { setUserSession } from 'src/components/utils/Common'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [validationMsg, setValidationMsg] = useState('')
  const history = useHistory()

  const inputPassword = useRef(null)

  const handleUsername = (e) => {
    setUsername(e.target.value)
  }
  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleLogin = () => {
    const data = {
      username: username,
      password: password
    }
    console.log(data)
    Promise.all([postData("http://127.0.0.1:8000/api/auth/login", data)])
      .then(function (res) {
        console.log(res[0].data.warehouse_id)
        setUserSession(res[0].data.access_token, res[0].data.user.id, res[0].data.user.roles[0].name, res[0].data.role, res[0].data.warehouse_id)
        console.log("login")
        history.push("/dashboard")
      })
      .catch(error => {
        validatorAll()
        console.log(error)
      })

  }

  const validatorAll = () => {
    const msg = {}
    if (isEmpty(username)) {
      msg.username = '(*) Nhập tên đăng nhập'
    }

    if (isEmpty(password)) {
      msg.password = '(*) Nhập mật khẩu'
    }

    setValidationMsg(msg)
    if (Object.keys(msg).length > 0) return false
    return true
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Đăng nhập</h1>
                    <p className="text-medium-emphasis">Đăng nhập vào tài khoản của bạn</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="Tên đăng nhập"
                        autoComplete="username"
                        value={username}
                        onChange={handleUsername}
                        onKeyDown={(e) => { e.key === "Enter" && inputPassword.current.focus() }}
                      />
                    </CInputGroup>
                    <p className='text-danger' style={{ fontStyle: 'italic' }}>{validationMsg.username}</p>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        ref={inputPassword}
                        type="password"
                        placeholder="Mật khẩu"
                        autoComplete="current-password"
                        value={password}
                        onChange={handlePassword}
                        onKeyDown={(e) => { e.key === "Enter" && handleLogin() }}
                      />
                    </CInputGroup>
                    <p className='text-danger' style={{ fontStyle: 'italic' }}>{validationMsg.password}</p>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="warning" className="px-4" onClick={handleLogin}>
                          Đăng nhập
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Quên mật khẩu?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-warning py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  {/* <div>
                      <h2>Sign up</h2>
                      <p>

                      </p>
                      <Link to="/register">
                        <CButton color="primary" className="mt-3" active tabIndex={-1}>
                          Đăng kí
                        </CButton>
                      </Link>
                    </div> */}
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
