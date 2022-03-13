/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
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
import { cilLockLocked, cilPeople, cilPhone, cilUser } from '@coreui/icons'
import { postData } from 'src/views/api/Api'
import { useHistory } from 'react-router-dom'

const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('123456')
  const [password_confirmation, setPasswordConfirmation] = useState('123456')
  const [fullname, setFullname] = useState('')
  const [phone, setPhone] = useState('')

  const history = useHistory()

  const onRegister = () => {
    console.log("button clicked")
    const data = {
      username: username,
      email: email,
      password: password,
      password_confirmation: password_confirmation,
      fullname: fullname,
      phone: phone,
    }
    console.log(data)
    Promise.all([postData('http://127.0.0.1:8000/api/auth/register', data)])
      .then(function (res) {
        console.log("Successfully")
        // history.push("/login")
        history.push("/account")
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9}>
            <CCardGroup>
              <CCard className="text-white bg-warning py-5">

              </CCard>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Cấp tài khoản</h1>
                    <p className="text-medium-emphasis"></p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="Tên đăng nhập" autoComplete="username" onChange={(e) => setUsername(e.target.value)} />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>@</CInputGroupText>
                      <CFormInput placeholder="Email" autoComplete="email" onChange={(e) => setEmail(e.target.value)} />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilPeople} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Họ và tên"
                        autoComplete="fullname"
                        onChange={(e) => setFullname(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilPhone} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Số điện thoại"
                        autoComplete="phone"
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Mật khẩu"
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Nhập lại mật khẩu"
                        autoComplete="new-password"
                        value={password_confirmation}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                      />
                    </CInputGroup>
                    <div className="d-grid">
                      <CButton color="warning" onClick={(e) => onRegister(e)}>Tạo tài khoản</CButton>
                      <br />
                      <CButton onClick={(e) => {history.goBack()}} color="secondary">Huỷ</CButton>
                    </div>
                  </CForm>
                </CCardBody>
              </CCard>

            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
