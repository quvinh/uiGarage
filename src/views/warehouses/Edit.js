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
import { cilX, cilCheckAlt } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { getToken } from 'src/components/utils/Common';


const Edit = (props) => {

  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [note, setNote] = useState('');
  const history = useHistory()
  const handleName = (e) => {
    setName(e.target.value);
  }
  const handleLocation = (e) => {
    setLocation(e.target.value);
  }
  const handleNote = (e) => {
    setNote(e.target.value);
  }


  const handleUpdate = (e) => {
    const warehouse = {
      name: name,
      location: location,
      note: note
    }
    console.log(warehouse)
    console.log(props)
    Promise.all([putData('http://127.0.0.1:8000/api/admin/warehouse/update/' + props.match.params.id + '?token=' + getToken(), warehouse)])
      .then(response => {
        // console.log(data)
        console.log('Edited successfully ^^')
        // history.push('/warehouses')
        history.goBack()
      }).catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    console.log(props)
    Promise.all([getData('http://127.0.0.1:8000/api/admin/warehouse/show/' + props.match.params.id + '?token=' + getToken())])
      .then(response => {
        setName(response[0].data.name)
        setLocation(response[0].data.location)
        setNote(response[0].data.note)
      })
  }, []);
  return (
    <>
      <div className="bg-light d-flex flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md={9} lg={9} xl={9}>
              <CCard className="mx-4">
                <CCardBody className="p-4">
                  <CForm>
                    <h1>Chỉnh sửa kho</h1>
                    <CInputGroup className="mb-3">
                      <CInputGroupText id="" style={{ width: "100px" }}>Tên kho</CInputGroupText>
                      <CFormInput id='name' placeholder="Tên loại" onChange={handleName} value={name} />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText id="" style={{ width: "100px" }}>Địa chỉ</CInputGroupText>
                      <CFormTextarea id="note" rows="2" onChange={handleLocation} value={location} ></CFormTextarea>
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText id="" style={{ width: "100px" }}>Địa chỉ</CInputGroupText>
                      <CFormTextarea id="note" rows="2" onChange={handleNote} value={note} ></CFormTextarea>
                    </CInputGroup>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                      <CButton color="warning" onClick={(e) => handleUpdate(e)}><CIcon icon={cilCheckAlt}/></CButton>
                      <CButton href='#/warehouses' color="danger"><CIcon icon={cilX}/></CButton>
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

export default Edit
