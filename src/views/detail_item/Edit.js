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
                    <h1>Ch???nh s???a v???t t??</h1>
                    <CInputGroup className="mb-3">
                      <CInputGroupText id="" style={{ width: "100px" }}>M?? V???t T??</CInputGroupText>
                      <CFormInput id='name' placeholder="T??n lo???i" onChange={handleItemIdChange} value={itemId} />
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
                      <CInputGroupText id="" style={{ width: "100px" }}>S??? l?????ng t???ng</CInputGroupText>
                      <CFormInput id='name' placeholder="T??n lo???i" onChange={handleAmountChange} value={amount} />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CFormSelect
                        onChange={(e) => setUnit(e.target.value)}
                        aria-label="????n v??? t??nh"
                        options={[
                          'Tr???ng th??i',
                          { label: 'C??i', value: 'C??i' },
                          { label: 'Chi???c', value: 'Chi???c' },
                          { label: 'Chi???c', value: 'Chi???c' },
                          { label: 'Chai', value: 'Chai' },
                          { label: 'B??nh', value: 'B??nh' },
                          { label: 'L???', value: 'L???' },
                          { label: 'Lon', value: 'Lon' }
                        ]}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText id="" style={{ width: "100px" }}>????n gi??</CInputGroupText>
                      <CFormInput id='name' placeholder="T??n lo???i" onChange={handlePriceChange} value={price} />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CFormSelect
                        onChange={(e) => setStatus(e.target.value)}
                        aria-label="Tr???ng th??i"
                        options={[
                          'Tr???ng th??i',
                          { label: 'C??n', value: '1' },
                          { label: 'H???t', value: '0' }
                        ]}
                      />
                    </CInputGroup>
                    <div className="d-grid">
                      <CButton color="warning" onClick={(e) => handleUpdate(e)}>L??u</CButton>
                      <br />
                      <CButton href='#/categories' color="secondary">Hu???</CButton>
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
