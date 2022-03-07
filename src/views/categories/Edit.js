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
import { getToken } from 'src/components/utils/Common.js'

const Edit = (props) => {
  const [name, setName] = useState('');
  const [note, setNote] = useState('');
  const history = useHistory();
  const handleNameChange = (e) => {
    setName(e.target.value);
  }
  const handleNoteChange = (e) => {
    setNote(e.target.value);
  }
  const handleUpdate = (e) => {
    const data = {
      name: name,
      note: note
    }
    Promise.all([putData('http://127.0.0.1:8000/api/admin/category/update/' + props.match.params.id + '?token=' + getToken(), data)])
      .then(response => {
        console.log('Edited successfully ^^')
        history.push('/categories')
      }).catch((error) => {
        console.log(error)
        if(error.response.status === 403) {
          history.push('/403')
        } else if(error.response.status === 401) {
          history.push('/login')
        }
      })
  }

  useEffect(() => {
    Promise.all([getData('http://127.0.0.1:8000/api/admin/category/show/' + props.match.params.id)])
      .then(response => {
        setName(response[0].data.name)
        setNote(response[0].data.note)
      })
      .catch(error => {
        if (error.response.status === 403) {
          history.push('/404')
        } else if(error.response.status === 401) {
          history.push('/login')
        }
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
                    <CFormInput id='name' placeholder="Tên loại" onChange={handleNameChange} value={name} />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText id="" style={{ width: "100px" }}>Ghi chú</CInputGroupText>
                    <CFormTextarea id="note" rows="2" onChange={handleNoteChange} value={note} ></CFormTextarea>
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton color="warning" onClick={(e) => handleUpdate(e)}>Lưu</CButton>
                    <br />
                    <CButton href='#/categories' color="secondary">Huỷ</CButton>
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
