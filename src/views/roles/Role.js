/* eslint-disable prettier/prettier */
import { CCard, CCardBody, CCardHeader, CFormCheck, CFormInput, CInputGroup, CInputGroupText, CRow } from '@coreui/react'
import React from 'react'

const Role = () => {


  return (
    <>
      {/* <p style={{ fontWeight: "bold" }}>&gt;Quản lý phân quyền</p> */}
      <CCard>
        <CCardHeader>Quản lý phân quyền</CCardHeader>
        <CCardBody>
          <CRow xs={{ gutter: 2 }}>
            {/* {
              dataPermission && dataPermission.map((item, index) => (
                <>
                  <CInputGroup>
                    <CInputGroupText>
                      <CFormCheck type="checkbox" value={item.id} />
                    </CInputGroupText>
                    <CFormInput value={item.name} disabled />
                  </CInputGroup>
                </>
              ))
            } */}
          </CRow>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Role
