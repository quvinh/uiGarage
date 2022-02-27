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
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const history = useHistory();
  const handleNameChange = (e) => {
    setName(e.target.value);
  }
  const handlePositionChange = (e) => {
    setPosition(e.target.value);
  }
  const handleUpdate = (e) => {
    const data = {
      name: name,
      position: position
    }
    Promise.all([putData('http://127.0.0.1:8000/api/admin/shelf/update/' + props.match.params.id, data)])
      .then(response => {
        console.log('Edited successfully ^^')
        history.push('/shelf')
      }).catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    Promise.all([getData('http://127.0.0.1:8000/api/admin/shelf/show/' + props.match.params.id)])
      .then(response => {
        setName(response[0].data.name)
        setPosition(response[0].data.position)
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
                  <h1>Chỉnh sửa tên loại phụ tùng</h1>
                  <CInputGroup className="mb-3">
                    <CInputGroupText id="" style={{ width: "100px" }}>Tên loại phụ tùng</CInputGroupText>
                    <CFormInput id='name' placeholder="Tên giá" onChange={handleNameChange} value={name} />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText id="" style={{ width: "100px" }}>Ghi chú</CInputGroupText>
                    <CFormTextarea id="position"  onChange={handlePositionChange} value={position} ></CFormTextarea>
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton color="warning" onClick={(e) => handleUpdate(e)}>Lưu</CButton>
                    <br />
                    <CButton href='#/shelf' color="secondary">Huỷ</CButton>
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