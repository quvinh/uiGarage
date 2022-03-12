/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'

import CIcon from '@coreui/icons-react';
import { cilX, cilCheckAlt } from '@coreui/icons';
import { postData } from '../api/Api';
import { useHistory } from 'react-router-dom';
import { getToken } from 'src/components/utils/Common';

const Add = (props) => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const history = useHistory()

  const handleName = (e) => {
    setName(e.target.value);
  }
  const handlePosition = (e) => {
    setPosition(e.target.value);
  }
  const handleAdd = () => {
    const data = {
      name: name,
      position: position,
      warehouse_id: props.props,
    }
    console.log(data);
    Promise.all([postData('http://127.0.0.1:8000/api/admin/shelf/store/' + props.match.params.id + '?token=' + getToken(), data)])
      .then(res => {
        console.log('Added succesfully', res)
        history.goBack()
        // setDataTable([...dataTable, data])
      }).catch(error => {
        console.log(error)
      })

  }
  return (
    <>
      <div className="bg-light d-flex flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md={9} lg={9} xl={9}>
              <CCard className="mx-4">
                <CCardBody className="p-4">
                  <CForm>
                    <h1>Tạo giá</h1>
                    {/* <p className="text-medium-emphasis"></p> */}
                    <CInputGroup className="mb-3">
                      <CInputGroupText id="" style={{ width: "100px" }}>Tên giá</CInputGroupText>
                      <CFormInput id='name' placeholder="Nhập tên" onChange={handleName} value={name} />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText id="" style={{ width: "100px" }}>Vị trí</CInputGroupText>
                      <CFormInput id="position" placeholder='Nhập vị trí' onChange={handlePosition} value={position}></CFormInput>
                    </CInputGroup>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                      <CButton color="warning" onClick={(e)=>handleAdd(e)}><CIcon icon={cilCheckAlt}/></CButton>
                      <CButton href={'#/warehouses-shelf/' + props.match.params.id} color="danger"><CIcon icon={cilX}/></CButton>
                    </div>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </>
  )
}

export default Add
