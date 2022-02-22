/* eslint-disable react/jsx-key */
/* eslint-disable prettier/prettier */
import React, { useEffect, useRef, useState } from 'react'
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CInputGroup,
  CInputGroupText,
  CFormInput,
  CCard,
  CCardHeader,
  CCardBody,
  CRow,
  CCol,
  CButton,
  CFormTextarea,
  CListGroupItem,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CFormSelect,
  CListGroup
} from '@coreui/react';
import { getData, postData } from '../api/Api';
import Validator from './Validation';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
// import BootstrapTable from 'react-bootstrap-table-next';
// import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';

// const setDate = () => {
//   let today = new Date()
//   // let date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear()
//   let date = today.toLocaleDateString("en-US", { year: 'numeric', month: '2-digit', day: '2-digit' })
//   // document.getElementById("myDate").defaultValue = date
//   console.log(date)
// }


const Imports = () => {
  const [item_id, setItemID] = useState('')
  const [batch_code, setBatchCode] = useState('')
  const [warehouse_id, setWarehouse] = useState('1')
  const [suppliers_id, setSuppliers] = useState('1')
  const [shelf_id, setShelf] = useState('1')
  const [category_id, setCategory] = useState('1')
  const [name, setName] = useState('')
  const [unit, setUnit] = useState('Chiếc')
  const [created_by, setCreatedBy] = useState('')
  const [amount, setAmount] = useState('')
  const [price, setPrice] = useState('')
  const [totalPrice, setTotalPrice] = useState('')
  const [nameStore, setNameStore] = useState('')
  const [note, setNote] = useState('')

  const [dataTable, setDataTable] = useState([])
  const [dataItem, setDataItem] = useState([])
  const [dataWarehouse, setDataWarehouse] = useState([])
  const [dataSuppliers, setDataSuppliers] = useState([])
  const [dataShelf, setDataShelf] = useState([])
  const [dataCategory, setDataCategory] = useState([])
  const [dataNameSelected, setDataNameSelected] = useState([])

  // const simpleValidator = useRef(SimpleReactValidator())
  const [validator, showValidationMessage] = Validator()

  const setNull = () => {
    setName('')
    setItemID('')
    setBatchCode('')
    setAmount('0')
    setPrice('0')
    setTotalPrice('0')
    setUnit('')
    setCategory('')
    setWarehouse('')
    setSuppliers('')
    setShelf('')
    setCreatedBy('')
    setDataTable([])
  }

  const onChangeName = (e) => {
    setName(e.target.value)
    Promise.all([getData('http://127.0.0.1:8000/api/admin/items')])
      .then(function(res) {
        setDataItem(res[0])
      })
      .catch(err => {
        console.log("Error API get ITEM")
      })
  }

  const btnAddTable = (e) => {//Button click, add data table
    console.log(unit)
    if (validator.allValid()) {
      const data = {
        item_id: item_id,
        batch_code: batch_code,
        warehouse_id: warehouse_id,
        shelf_id: shelf_id,
        suppliers_id: suppliers_id,
        category_id: category_id,
        name: name,
        unit: unit,
        created_by: created_by,
        amount: amount,
        price: price,
        nameStore: nameStore,
        note: note
      }
      setDataTable([...dataTable, data])
    } else {
      showValidationMessage(true)
    }
  }

  const btnCreateImport = () => {
    console.log(unit)
    if (dataTable.length > 0) {
      dataTable.map((item, index) => {
        console.log(item)
        Promise.all([postData('http://127.0.0.1:8000/api/admin/import/store', item)])
          .then(function (res) {
            console.log(index)
          })
          .catch(err => {
            console.log(err)
          })
      })
      setNull()
    }
  }

  // const nameSelected = (id) => {
  //   Promise.all([])

  // }

  useEffect(() => {
    Promise.all([getData('http://127.0.0.1:8000/api/admin/warehouse'),
    getData('http://127.0.0.1:8000/api/admin/suppliers'),
    getData('http://127.0.0.1:8000/api/admin/category'),
    getData('http://127.0.0.1:8000/api/admin/items')])
      .then(res => {
        console.log(res[0])
        console.log(res[2])
        setDataWarehouse(res[0].data)
        setDataSuppliers(res[1])///YC sua API
        // setDataItem(res[3])
      })
  }, [])

  return (
    <>
      {/* <p style={{fontWeight: "bold"}}>&gt;Nhập vật tư - phụ tùng</p> */}
      <CCard>
        <CCardHeader>
          <h6>Nhập vật tư - phụ tùng</h6>
        </CCardHeader>
        <CCardBody>
          <CRow className="g-3">
            <CCol xs>
              <CInputGroup size="sm" className="mb-3">
                <CInputGroupText id="" style={{ width: "120px" }}>Tên vật tư</CInputGroupText>
                <CFormInput
                  placeholder="Nhập tên vật tư"
                  name='name'
                  value={name}
                  onChange={onChangeName} />
              </CInputGroup>
              <CListGroup>
                {
                  dataItem.slice(0,5).map((item, index) => (
                    <CListGroupItem component={"button"} color='warning' key={index}>{item.name}</CListGroupItem>
                  ))
                }
              </CListGroup>
              {validator.message("name", name, "required", {
                messages: {
                  required: "Nhập tên vật tư"
                }
              })}
            </CCol>
            <CCol xs>
            </CCol>
          </CRow>
          <CRow className="g-3">
            <CCol xs>
              <CInputGroup size="sm" className="mb-3">
                <CInputGroupText id="" style={{ width: "120px" }}>Mã vật tư</CInputGroupText>
                <CFormInput placeholder="Mã vật tư" name='item_id' value={item_id} onChange={(e) => setItemID(e.target.value)} />
              </CInputGroup>
              {validator.message("item_id", item_id, "required", {
                messages: {
                  required: "Nhập mã vật tư"
                }
              })}
            </CCol>
            <CCol xs>
              <CFormSelect size="sm" className="mb-3" defaultValue={unit} onChange={(e) => setUnit(e.target.value)}>
                <option value={'Bộ'}>Bộ</option>
                <option value={'Cái'}>Cái</option>
                <option value={'Can'}>Can</option>
                <option value={'Chiếc'}>Chiếc</option>
                <option value={'Đôi'}>Đôi</option>
                <option value={'Lon'}>Lon</option>
                <option value={'Ông'}>Ông</option>
              </CFormSelect>
            </CCol>
          </CRow>
          <CRow className="g-3">
            <CCol xs>
              <CInputGroup size="sm" className="mb-3">
                <CInputGroupText id="" style={{ width: "120px" }}>Mã sản xuất</CInputGroupText>
                <CFormInput placeholder="Mã sản xuất" name='batch_code' value={batch_code} onChange={(e) => setBatchCode(e.target.value)} />
              </CInputGroup>
              {validator.message("batch_code", batch_code, "required", {
                messages: {
                  required: "Nhập mã sản xuất"
                }
              })}
            </CCol>
            <CCol xs>
              <CFormSelect size="sm" className="mb-3" defaultValue={category_id} onChange={(e) => setCategory(e.target.value)}>
                <option>Chọn loại vật tư</option>
                {dataCategory.map((item, id) => (
                  <option value={id}>item.name</option>
                ))}
              </CFormSelect>
            </CCol>
          </CRow>
          <CRow className="g-3">
            <CCol xs>
              <CInputGroup size="sm" className="mb-3">
                <CInputGroupText id="" style={{ width: "120px" }}>Số lượng</CInputGroupText>
                <CFormInput placeholder="0" name='amount' value={amount} onChange={(e) => setAmount(e.target.value)} />
              </CInputGroup>
              {validator.message("amount", amount, "required", {
                messages: {
                  required: "Nhập số lượng"
                }
              })}
            </CCol>
            <CCol xs>
              <CFormSelect size="sm" className="mb-3" defaultValue={warehouse_id} onChange={(e) => setWarehouse(e.target.value)}>
                <option>Chọn nhà kho</option>
                {dataWarehouse.map((item, id) => (
                  <option value={id}>item.name</option>
                ))}
              </CFormSelect>
            </CCol>
          </CRow>
          <CRow className="g-3">
            <CCol xs>
              <CInputGroup size="sm" className="mb-3">
                <CInputGroupText id="" style={{ width: "120px" }}>Đơn giá</CInputGroupText>
                <CFormInput placeholder="Nhập đơn giá" name='price' value={price} onChange={(e) => setPrice(e.target.value)} />
              </CInputGroup>
              {validator.message("price", price, "required", {
                messages: {
                  required: "Nhập đơn giá"
                }
              })}

            </CCol>
            <CCol xs>
              <CFormSelect size="sm" className="mb-3" defaultValue={suppliers_id} onChange={(e) => setSuppliers(e.target.value)}>
                <option>Chọn nhà cung cấp</option>
                {dataSuppliers.map((item, id) => (
                  <option value={id}>item.name</option>
                ))}
              </CFormSelect>
            </CCol>
          </CRow>
          <CRow className="g-3">
            <CCol xs>
              <CInputGroup size="sm" className="mb-3">
                <CInputGroupText id="" style={{ width: "120px" }}>Thành tiền</CInputGroupText>
                <CFormInput placeholder="0" value={totalPrice} onChange={(e) => setTotalPrice(e.target.value)} />
              </CInputGroup>
            </CCol>
            <CCol xs>

              {/* <CInputGroupText id="" style={{ width: "120px" }}>Nhà kho</CInputGroupText> */}
              <CFormSelect size="sm" className="mb-3" defaultValue={shelf_id} onChange={(e) => setShelf(e.target.value)}>
                <option>Chọn nhà giá/kệ</option>
                {dataShelf.map((item, id) => (
                  <option value={id}>item.name</option>
                ))}
              </CFormSelect>
            </CCol>
          </CRow>
          <CRow className="g-3">
            <CCol xs>
              <CInputGroup size="sm" className="mb-3">
                <CInputGroupText id="" style={{ width: "120px" }}>Ngày nhập kho</CInputGroupText>
                <CFormInput id="myDate" type="date" />
              </CInputGroup>
            </CCol>
            <CCol xs>
              <CInputGroup size="sm" className="mb-3">
                <CInputGroupText id="" style={{ width: "120px" }}>Người tạo</CInputGroupText>
                <CFormInput placeholder="Họ và tên" name='created_by' value={created_by} onChange={(e) => setCreatedBy(e.target.value)} />
              </CInputGroup>
              {validator.message("created_by", created_by, "required", {
                messages: {
                  required: "Nhập người tạo"
                }
              })}
            </CCol>
          </CRow>
          <div className="d-grid gap-2 d-md-flex justify-content-md-center">
            <CButton size="sm" color="success" onClick={(e) => btnAddTable(e)}>THÊM VÀO PHIẾU</CButton>
            <CButton size="sm" color="warning" onClick={btnCreateImport}>TẠO PHIẾU</CButton>
          </div>
        </CCardBody>
      </CCard>
      <CTable id='dataExport' striped hover responsive bordered borderColor="warning">
        <CTableHead color="warning">
          <CTableRow>
            <CTableHeaderCell className="text-center">STT</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Mã vật tư</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Mã sản xuất</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Tên vật tư</CTableHeaderCell>
            <CTableHeaderCell className="text-center">ĐVT</CTableHeaderCell>
            <CTableHeaderCell className="text-center">SLYC</CTableHeaderCell>
            <CTableHeaderCell className="text-center">SL thực nhận</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Đơn giá</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Tiền hàng</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Kho</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Ghi chú</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody id="myTable">
          {dataTable.map((item, index) => (
            <CTableRow v-for="item in tableItems" key={index}>
              <CTableDataCell className="text-center">{String(index + 1)}</CTableDataCell>
              <CTableDataCell className="text-center">{item.item_id}</CTableDataCell>
              <CTableDataCell className="text-center">{item.batch_code}</CTableDataCell>
              <CTableDataCell className="text-center">{item.name}</CTableDataCell>
              <CTableDataCell className="text-center">{item.unit}</CTableDataCell>
              <CTableDataCell className="text-center">-</CTableDataCell>
              <CTableDataCell className="text-center">{item.amount}</CTableDataCell>
              <CTableDataCell className="text-center">{item.price}</CTableDataCell>
              <CTableDataCell className="text-center">...</CTableDataCell>
              <CTableDataCell className="text-center">K.LE HONG PHONG</CTableDataCell>
              <CTableDataCell className="text-center">{item.note}</CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </>
  )
}

export default Imports
