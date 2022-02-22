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
  const [password, setPassword] = useState('')
  const [password_confirmation, setPasswordConfirmation] = useState('')
  const [fullname, setFullname] = useState('')
  const [phone, setPhone] = useState('')
  // const [birthday, setBirthday] = useState('')
  // const [address, setAddress] = useState('')
  // const [gender, setGender] = useState('')

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
      // birthday: birthday,
      // address: address,
      // gender: gender,
    }
    console.log(data)
    Promise.all([postData('http://127.0.0.1:8000/api/auth/register', data)])
      .then(function(res) {
        console.log("Successfully")
        history.push("/login")
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
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Đăng kí</h1>
                    <p className="text-medium-emphasis">Tạo tài khoản</p>
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
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                      />
                    </CInputGroup>
                    <div className="d-grid">
                      <CButton color="warning" onClick={(e) => onRegister(e)}>Tạo tài khoản</CButton>
                      <br />
                      {/* <Link to={"/login"}> */}
                      <CButton href='#/login' color="secondary">Đăng nhập</CButton>
                      {/* </Link> */}
                    </div>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-warning py-5">

              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
