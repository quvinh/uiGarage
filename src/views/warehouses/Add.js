/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormTextarea,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import { postData } from '../api/Api';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Add = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [note, setNote] = useState('');
  const history = useHistory()
  const handleNameChange = (e) => {
    setName(e.target.value);
  }
  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  }
  const handleNoteChange = (e) => {
    setNote(e.target.value);
  }

  const handleAddForm = () => {
    const data = {
      name: name,
      location: location,
      note: note
    }
    console.log(data);
    Promise.all([postData('http://127.0.0.1:8000/api/admin/warehouse/store', data)])
      .then(res => {
        console.log('Added succesfully', res)
        history.push('/warehouses')
      }).catch(error => {
        // validatorAll()
        console.log(':(((')
        console.log(error)
      })
  }

  return (
    <div className="bg-light d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={9} xl={9}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Tạo kho mới</h1>
                  {/* <p className="text-medium-emphasis"></p> */}
                  <CInputGroup className="mb-3">
                    <CInputGroupText id="" style={{ width: "100px" }}>Tên kho</CInputGroupText>
                    <CFormInput id='name' placeholder="Tên" onChange={handleNameChange} value={name} />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText id="" style={{ width: "100px" }}>Địa chỉ</CInputGroupText>
                    <CFormInput id='location' placeholder="Địa chỉ" onChange={handleLocationChange} value={location} />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText id="" style={{ width: "100px" }}>Ghi chú</CInputGroupText>
                    <CFormTextarea id="note" rows="2" onChange={handleNoteChange} value={note}></CFormTextarea>
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton color="warning" onClick={handleAddForm}>Lưu</CButton>
                    <br />
                    <CButton href='#/warehouses' color="secondary">Huỷ</CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Add
