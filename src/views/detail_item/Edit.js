/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { getData, putData, delData } from '../api/Api';
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

const Edit = (props) => {
  const [open, setOpen] = React.useState(false);

  const [itemId, setItemId] = useState([]);
  const [categoryId, setCategoryId] = useState([]);
  const [shelfId, setShelfId] = useState([]);
  const [amount, setAmount] = useState([]);
  const [unit, setUnit] = useState([]);
  const [price, setPrice] = useState([]);
  const [status, setStatus] = useState([]);
  const [dataShelf, setDataShelf] = useState([]);
  const [dataCategory, setDataCategory] = useState([]);
  // const history = useHistory();

  const handleItemIdChange = (e) => {
    setItemId(e.target.value);
  }
  const handleCategoryIdChange = (e) => {
    setCategoryId(e.target.value);
  }
  const handleShelfIdChange = (e) => {
    setShelfId(e.target.value);
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


  const handleUpdate = (e) => {
    const data = {
      item_id: itemId,
      category_id: categoryId,
      shelf_id: shelfId,
      amount: amount,
      unit: unit,
      price: price,
      status: status,
    }
    Promise.all([putData('http://127.0.0.1:8000/api/admin/detail_item/update/' + props.match.params.id, data)])
      .then(response => {
        console.log('Edited successfully ^^')
        // history.push('/detail_item')
      }).catch((err) => {
        console.log(err)
      })
    // window.location.reload(false);
  }
  console.log(props.match.params.id)
  useEffect(() => {
    Promise.all([getData('http://127.0.0.1:8000/api/admin/detail_item/show/' + props.match.params.id),
    // getData('http://127.0.0.1:8000/api/admin/warehouse'),
    getData('http://127.0.0.1:8000/api/admin/category'),
    getData('http://127.0.0.1:8000/api/admin/shelf')
    ])
      .then(response => {
        console.log(response[2].data)
        setItemId(response[0].data.item_id)
        setCategoryId(response[0].data.category_id)
        setShelfId(response[0].data.shelf_id)
        setAmount(response[0].data.amount)
        setUnit(response[0].data.unit)
        setPrice(response[0].data.price)
        setStatus(response[0].data.status)
        setDataCategory(response[1].data)
        setDataShelf(response[2].data)
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
                    <h1>Chỉnh sửa vật tư</h1>
                    <CInputGroup className="mb-3">
                      <CInputGroupText id="" style={{ width: "100px" }}>Mã Vật Tư</CInputGroupText>
                      <CFormInput id='name' placeholder="Tên loại" onChange={handleItemIdChange} value={itemId} />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CFormSelect aria-label="Default select example" value={categoryId} onChange={(e) => handleCategoryIdChange(e)}>
                      {dataCategory.map((item, index) =>(
                        <option key={index} value={item.id}>{item.name}</option>
                      ))}
                      </CFormSelect>
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CFormSelect aria-label="Default select example" value={shelfId} onChange={(e) => handleShelfIdChange(e)}>
                      {dataShelf.map((item, index) =>(
                        <option key={index} value={item.id}>{item.name}</option>
                      ))}
                      </CFormSelect>
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText id="" style={{ width: "100px" }}>Số lượng tổng</CInputGroupText>
                      <CFormInput id='name' placeholder="Tên loại" onChange={handleAmountChange} value={amount} />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CFormSelect
                        onChange={(e) => setUnit(e.target.value)}
                        aria-label="Đơn vị tính"
                        options={[
                          'Trạng thái',
                          { label: 'Cái', value: 'Cái' },
                          { label: 'Chiếc', value: 'Chiếc' },
                          { label: 'Chiếc', value: 'Chiếc' },
                          { label: 'Chai', value: 'Chai' },
                          { label: 'Bình', value: 'Bình' },
                          { label: 'Lọ', value: 'Lọ' },
                          { label: 'Lon', value: 'Lon' }
                        ]}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText id="" style={{ width: "100px" }}>Đơn giá</CInputGroupText>
                      <CFormInput id='name' placeholder="Tên loại" onChange={handlePriceChange} value={price} />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CFormSelect
                        onChange={(e) => setStatus(e.target.value)}
                        aria-label="Trạng thái"
                        options={[
                          'Trạng thái',
                          { label: 'Còn', value: '1' },
                          { label: 'Hết', value: '0' }
                        ]}
                      />
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
    </>
  )
}

export default Edit
