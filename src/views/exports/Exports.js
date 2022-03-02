/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
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
  CListGroupItem,
  CFormSelect,
  CListGroup
} from '@coreui/react';
import { getData, postData } from '../api/Api';
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import Autocomplete from '@mui/material/Autocomplete'
import Validator from './Validation';
// import { ShowImport } from './ShowImport';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { DataExportTable } from './DataExports';
import { ShowExport } from './ShowExport';


const Exports = (props) => {

  const [item_id, setItemID] = useState('')
  const [batch_code, setBatchCode] = useState('')
  const [warehouse_id, setWarehouse] = useState('')
  const [suppliers_id, setSuppliers] = useState()
  const [shelf_id, setShelf] = useState('')
  const [category_id, setCategory] = useState()
  const [name, setName] = useState('')
  const [unit, setUnit] = useState('')
  const [created_by, setCreatedBy] = useState('Nguyễn Thị T')
  const [amount, setAmount] = useState('')
  const [price, setPrice] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
  const [nameWarehouse, setNameWarehouse] = useState('')
  const [date, setDate] = useState(new Date)
  const [note, setNote] = useState('')

  const [dataTable, setDataTable] = useState([])
  const [dataItem, setDataItem] = useState([])
  const [dataWarehouse, setDataWarehouse] = useState([])
  const [dataSuppliers, setDataSuppliers] = useState([])
  const [dataShelf, setDataShelf] = useState([])
  const [dataCategory, setDataCategory] = useState([])
  const [code, setCode] = useState('')

  const [validator, showValidationMessage] = Validator()

  const [isAmountSelected, setIsAmountSelected] = useState(false)
  const [isWarehouseSelected, setIsWarehouseSelected] = useState(false)
  const [isItemSelected, setIsItemSelected] = useState(false)

  const onChangeName = (e, newValue) => {
    setName(e.target.value)
    var checked = false
    dataItem.map((item) => {
      if (item.name_item === newValue) {
        setItemID(item.item_id)
        setBatchCode(item.batch_code)
        setCategory(item.category_id)
        setShelf(item.shelf_id)
        setUnit(item.unit)
        setWarehouse(item.warehouse_id)
        setPrice(item.price)
        // setName(item.name)
        // setSuppliers("NO1")
        setName(item.name_item)
        setNameWarehouse(item.name_warehouse)
        // setTotalPrice((item.amount) * (item.price))
        // console.log(item)
        getDataShelf(item.warehouse_id)
        setIsWarehouseSelected(true)
        checked = true
      }
    })
    if (amount > 0) {
      setIsAmountSelected(true)
      if (dataTable.length === 0) createCode()
      // if (name.length !== 0) setIsAmountSelected(false)

      // console.log(name.length)
    }
    // setIsWarehouseSelected(true)
    if (!checked) setIsAmountSelected(false)
  }

  const onChangeAmount = (e) => {
    (e.target.value > 0) ? setIsAmountSelected(true) : setIsAmountSelected(false)
    if (dataTable.length === 0) createCode()
  }

  const setNull = () => {
    setName('')
    setAmount('')
    setDate(new Date())
    setIsAmountSelected(false)
  }

  const createCode = () => {
    const time = new Date()
    const date = time.getDate() + "" + (time.getMonth() + 1) + "" + time.getFullYear() + "" +
      time.getHours() + "" + time.getMinutes() + "" + time.getSeconds()
    const code = "EX_" + date
    console.log('CREATED: ' + code)
    setCode(code)
  }

  const onChangeWarehouse = (e, value) => {
    console.log(value)
    if (value) {
      setIsWarehouseSelected(true)
      setWarehouse(e.target.value)
      getDataShelf(e.target.value)
    } else {
      setIsWarehouseSelected(false)
      setWarehouse(null)
    }
  }

  const onChangeShelf = (e) => {
    console.log(e.target.value)
  }

  const getDataShelf = (id) => {
    Promise.all([getData('http://127.0.0.1:8000/api/admin/warehouse/shelfWarehouse/' + id)])
      .then(function (res) {
        setDataShelf(res[0].data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const onAddTable = (e) => {//Button click, add data table
    // console.log(dataTable.length)
    if (validator.allValid()) {
      const data = {
        item_id: item_id,
        code: code,
        batch_code: batch_code,
        warehouse_id: warehouse_id,
        shelf_id: shelf_id,
        suppliers_id: suppliers_id,
        category_id: category_id,
        name: name,
        unit: unit,
        created_by: 1,//USER
        amount: amount,
        price: price,
        nameWarehouse: nameWarehouse,
        note: note,
        totalPrice: totalPrice
      }
      setDataTable([...dataTable, data])
      // setCode(code)
      console.log(dataTable)
    } else {
      showValidationMessage(true)
    }
  }


  useEffect(() => {
    Promise.all([getData('http://127.0.0.1:8000/api/admin/items/searchItem/1'),
    getData('http://127.0.0.1:8000/api/admin/warehouse')])
      .then(res => {
        console.log(res[1].data)
        setDataItem(res[0].data)
        setDataWarehouse(res[1].data)
      })
  }, [])

  return (
    <>
      <p style={{ fontWeight: "bold" }}>&gt;Xuất vật tư - phụ tùng</p>
      <CCard>
        <CCardBody>
          <CRow className="g-3">
            <CCol xs>
              <div className="d-grid gap-2 d-md-flex">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    renderInput={(props) => <TextField size='small' {...props} />}
                    label="Ngày nhập"
                    value={date}
                    inputFormat={"dd/MM/yyyy hh:mm"}
                    onChange={(newValue) => {
                      setDate(newValue);
                    }}
                  />
                </LocalizationProvider>
                <CButton color="secondary" onClick={(e) => setNull()}>LÀM MỚI</CButton>
              </div>
            </CCol>
            <CCol xs>

            </CCol>
          </CRow>
          <br />
          <CRow className="g-3">
            <CCol xs>
              <Autocomplete
                id="name_item"
                freeSolo
                size='small'
                options={dataItem.map((option) => option.name_item)}
                inputValue={name}
                onInputChange={(e, newValue) => onChangeName(e, newValue)}
                renderInput={(params) => <TextField {...params} label="Tên vật tư" />}
                disableClearable
              />
              <br />
              {validator.message("name", name, "required", {
                messages: {
                  required: "Nhập tên vật tư"
                }
              })}
            </CCol>
            <CCol xs>
              <CRow className="g-3">
                <CCol xs>
                  <TextField id=""
                    size='small'
                    label="Số lượng"
                    value={amount}
                    onChange={(e) => {
                      onChangeAmount(e)
                      setAmount(e.target.value)
                    }}
                    variant="outlined" />
                </CCol>
                <CCol xs>
                  <CFormSelect size="md" className="mb-3" value={warehouse_id} onChange={
                    (e) => {
                      (parseInt(e.target.value)) ? onChangeWarehouse(e, true) : onChangeWarehouse(e, false)
                    }
                  } >
                    <option>TẠI KHO</option>
                    {
                      dataWarehouse.map((item, index) => (
                        <option key={index} value={item.id}>{item.name}</option>
                      ))
                    }
                  </CFormSelect>
                </CCol>
                <CCol xs>
                  {
                    (isWarehouseSelected) ? (
                      <CFormSelect size="md" className="mb-3" value={shelf_id}>
                        <option>Giá/kệ</option>
                        {
                          dataShelf.map((item, index) => (
                            <option key={index} value={item.shelf_id} onChange={(e) => onChangeShelf(e)}>{item.shelf_name}</option>
                          ))
                        }
                      </CFormSelect>
                    ) : (
                      <></>
                    )
                  }
                </CCol>
              </CRow>
            </CCol>
          </CRow>
          <div className="d-grid gap-2 d-md-flex justify-content-md-center">
            {
              (isAmountSelected) ? (
                <>
                  <CButton size="sm" color="success" onClick={(e) => onAddTable(e)}>THÊM VÀO PHIẾU</CButton>
                  <ShowExport dataTable={dataTable} code={code} />
                </>
              ) : (
                <CButton size="sm" color="secondary">THÊM VÀO PHIẾU</CButton>
              )
            }
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
            <CTableHeaderCell className="text-center">SL</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Đơn giá</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Kho</CTableHeaderCell>
            {/* <CTableHeaderCell className="text-center">Ghi chú</CTableHeaderCell> */}
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
              <CTableDataCell className="text-center">{item.amount}</CTableDataCell>
              <CTableDataCell className="text-center">{item.price}</CTableDataCell>
              <CTableDataCell className="text-center">{item.nameWarehouse}</CTableDataCell>
              {/* <CTableDataCell className="text-center">{item.note}</CTableDataCell> */}
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </>
  )
}

export default Exports
