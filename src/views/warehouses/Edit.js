/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
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
import { getData, putData } from '../api/Api';
import { useHistory } from 'react-router-dom';

const Edit = (props) => {
  console.log(props)
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
  const handleUpdate = (e) => {
    const data = {
      name: name,
      location: location,
      note: note
    }
    Promise.all([putData('http://127.0.0.1:8000/api/admin/warehouse/update/' + props.match.params.id, data)])
      .then(response => {
        console.log('Edited successfully ^^')
        history.push('/warehouses')
      }).catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    Promise.all([getData('http://127.0.0.1:8000/api/admin/warehouse/show/' + props.match.params.id)])
      .then(response => {
        // console.log(response.data)
        setName(response[0].data.name)
        setLocation(response[0].data.location)
        setNote(response[0].data.note)
      })
  }, []);
  return (
    <div className="bg-light d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={9} xl={9}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Chỉnh sửa kho</h1>
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
                    <CFormTextarea id="note" rows="2" onChange={handleNoteChange} value={note} ></CFormTextarea>
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton color="warning" onClick={(e) => handleUpdate(e)}>Lưu</CButton>
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

export default Edit
