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
  const [item_id, setItem_id] = useState('');
  const [category_id, setCategory_id] = useState('');
  const [warehouse_id, setWarehouse_id] = useState('');
  const [shelf_id, setShelf_id] = useState('');
  const [batch_code, setBatch_code] = useState('');
  // const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [unit, setUnit] = useState('');
  const [price, setPrice] = useState('');
  const [status, setStatus] = useState('');
  const history = useHistory()
  // const handleNameChange = (e) => {
  //   setName(e.target.value);
  // }
  const handleItem_idChange = (e) => {
    setItem_id(e.target.value);
  }
  const handleCategory_idChange = (e) => {
    setCategory_id(e.target.value);
  }
  const handleWarehouse_idChange = (e) => {
    setWarehouse_id(e.target.value);
  }
  const handleShelf_idChange = (e) => {
    setShelf_id(e.target.value);
  }
  const handleBatch_codeChange = (e) => {
    setBatch_code(e.target.value);
  }
  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  }
  const handleUnitChange = (e) => {
    setUnit(e.target.value);
  }
  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  }
  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  }

  const handleAddForm = () => {
    const data = {
      item_id: item_id,
      category_id: category_id,
      warehouse_id: warehouse_id,
      shelf_id: shelf_id,
      batch_code: batch_code,
      amount: amount,
      unit: unit,
      price: price,
      status: status,

    }
    console.log(data);
    Promise.all([postData('http://127.0.0.1:8000/api/admin/detail_item/store', data)])
      .then(res => {
        console.log('Added succesfully', res)
        history.push('/shelf')
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
                  <h1>Tạo giá</h1>
                  {/* <p className="text-medium-emphasis"></p> */}
                  <CInputGroup className="mb-3">
                    <CInputGroupText id="" style={{ width: "100px" }}>Tên loại phụ tùng</CInputGroupText>
                    <CFormInput id='name' placeholder="Tên" onChange={handleNameChange} value={name} />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText id="" style={{ width: "100px" }}>Ghi chú</CInputGroupText>
                    <CFormTextarea id="position"  onChange={handlePositionChange} value={position}></CFormTextarea>
                  </CInputGroup>
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
