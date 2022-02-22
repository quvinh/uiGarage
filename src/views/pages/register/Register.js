/* eslint-disable prettier/prettier */
import React from 'react'
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
import { Link } from 'react-router-dom'

const Register = () => {
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
                      <CFormInput placeholder="Tên đăng nhập" autoComplete="username" />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>@</CInputGroupText>
                      <CFormInput placeholder="Email" autoComplete="email" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilPeople} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Họ và tên"
                        autoComplete="fullname"
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilPhone} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Số điện thoại"
                        autoComplete="phone"
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
                      />
                    </CInputGroup>
                    <div className="d-grid">
                      <CButton color="warning">Tạo tài khoản</CButton>
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
