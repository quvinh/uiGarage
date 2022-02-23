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
  CFormSelect,
} from '@coreui/react'
import { postData } from '../api/Api';
import { getData } from '../api/Api';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Add = () => {
  const [dataTable, setDataWarehouse] = useState([])
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [warehouse_id, setWarehouse_id] = useState('');
  const history = useHistory()
  const handleNameChange = (e) => {
    setName(e.target.value);
  }
  const handlePositionChange = (e) => {
    setPosition(e.target.value);
  }
  const handleWarehouse_idChange = (e) => {
    setWarehouse_id(e.target.value);
  }

  const handleAddForm = () => {
    const data = {
      name: name,
      position: position,
      warehouse_id: warehouse_id
    }
    console.log(data);
    Promise.all([postData('http://127.0.0.1:8000/api/admin/shelf/store', data)])
      .then(res => {
        console.log('Added succesfully', res)
        history.push('/shelf')
      }).catch(error => {
        // validatorAll()
        console.log(':(((')
        console.log(error)
      })
  
  }
  useEffect(() => {
    Promise.all([getData('http://127.0.0.1:8000/api/admin/warehouse')])
      .then(function (res) {
        console.log(res)
        setDataWarehouse(res[0].data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])
  


  return (
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
                    <CFormInput id='name' placeholder="Tên" onChange={handleNameChange} value={name} />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText id="" style={{ width: "100px" }}>Vị trí</CInputGroupText>
                    <CFormTextarea id="position" onChange={handlePositionChange} value={position}></CFormTextarea>
                  </CInputGroup>
                  <CCol xs>
                    <CFormSelect size="sm" className="mb-3" value={warehouse_id} onChange={(e) => setWarehouse_id(e.target.value)}>
                      <option>Chọn kho</option>
                      {dataTable.map((item, index) => (
                        <option key={index} value={item.id}>{item.name}</option>
                      ))}
                    </CFormSelect>
                  </CCol>
                  <div className="d-grid">
                    <CButton color="warning" onClick={handleAddForm}>Lưu</CButton>
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

export default Add
