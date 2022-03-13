/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import { getData, putData } from '../api/Api';
import { useHistory } from 'react-router-dom';
import {
  CButton,
  CCol,
  CContainer,
  CRow,
  CForm,
  CFormInput,
  CFormTextarea,
  CInputGroup,
  CInputGroupText,
  CCard,
  CCardBody,
  CFormSelect,
} from '@coreui/react'

import CIcon from '@coreui/icons-react';
import { cilX, cilCheckAlt } from '@coreui/icons';
import { getToken } from 'src/components/utils/Common';

const Edit = (props) => {

  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [warehouse_id, setWarehouse_id] = useState('');
  const [status, setStatus] = useState('');
  const history = useHistory();
  const handleName = (e) => {
    setName(e.target.value);
  }
  const handlePosition = (e) => {
    setPosition(e.target.value);
  }

  const handleUpdate = (e) => {
    const shelf = {
      name: name,
      position: position,
      warehouse_id: warehouse_id,
      status: status,
    }
    console.log(props.match.params.id)
    Promise.all([putData('http://127.0.0.1:8000/api/admin/shelf/update/' + props.match.params.id + '?token=' + getToken(), shelf)])
      .then(response => {
        console.log(response)
        console.log('Edited successfully ^^')
        history.goBack()
        // history.push('/warehouses-shelf/' +)
      }).catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    Promise.all([getData('http://127.0.0.1:8000/api/admin/shelf/show/' + props.match.params.id + '?token=' + getToken())])
      .then(response => {
        setName(response[0].data.name)
        setPosition(response[0].data.position)
        setStatus(response[0].data.status)
        // setDataWarehouse(response[1].data)
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
                  <h1>Chỉnh sửa giá</h1>
                  <CInputGroup className="mb-3">
                    <CInputGroupText id="" style={{ width: "100px" }}>Tên giá</CInputGroupText>
                    <CFormInput id='name' placeholder="Tên loại" onChange={handleName} value={name} />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText id="" style={{ width: "100px" }}>Vị trí</CInputGroupText>
                    <CFormTextarea id="note" rows="2" onChange={handlePosition} value={position} ></CFormTextarea>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                  <CFormSelect
                    aria-label="Default select example"
                    options={[
                      'Trạng thái',
                      { label: 'Đầy', value: '1' },
                      { label: 'Còn Chỗ', value: '0' }
                    ]}
                  />
                  </CInputGroup>
                  <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <CButton color="warning" onClick={(e) => handleUpdate(e)}><CIcon icon={cilCheckAlt}/></CButton>
                    <CButton onClick={(e) => history.goBack()} color="danger"><CIcon icon={cilX}/></CButton>
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
