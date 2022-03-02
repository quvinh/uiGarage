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
import CurrencyFormat from 'react-currency-format';
import CIcon from '@coreui/icons-react';
import { cilDelete } from '@coreui/icons';
import { getToken } from 'src/components/utils/Common';


const Exports = (props) => {

  const [item_id, setItemID] = useState('')
  const [batch_code, setBatchCode] = useState('')
  const [warehouse_id, setWarehouse] = useState('')
  const [suppliers_id, setSuppliers] = useState()
  const [shelf_id, setShelfID] = useState('')
  const [category_id, setCategory] = useState()
  const [name, setName] = useState('')
  const [shelf_name, setShelfName] = useState('')
  const [unit, setUnit] = useState('')
  const [created_by, setCreatedBy] = useState('')
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
        setShelfID(item.shelf_id)
        setShelfName(item.shelf_name)
        setUnit(item.unit)
        setWarehouse(item.warehouse_id)
        setPrice(item.price)
        setName(item.name_item)
        setNameWarehouse(item.name_warehouse)
        getDataShelf(item.warehouse_id)
        setIsWarehouseSelected(true)
        checked = true
      }
    })
    if (amount > 0) {
      setIsAmountSelected(true)
      if (dataTable.length === 0) createCode()
    }
    if (!checked) setIsAmountSelected(false)
  }

  const onChangeAmount = (e) => {
    (e.target.value > 0 && name.length > 0) ? setIsAmountSelected(true) : setIsAmountSelected(false)
    if (dataTable.length === 0) createCode()
    console.log(shelf_id)
    console.log(name)
  }

  const setNull = () => {
    setName('')
    setAmount('')
    setWarehouse('')
    setDate(new Date())
    setIsAmountSelected(false)
    setDataWarehouse([])
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
    Promise.all([getData('http://127.0.0.1:8000/api/admin/items/searchItem/' + e.target.value)])
      .then(function (res) {
        setDataItem(res[0].data)
      })
      .catch(err => {
        console.log(err)
      })

    setName('')
    setShelfID(null)
    setIsAmountSelected(false)
  }

  const onChangeShelf = (e) => {
    const index = e.nativeEvent.target.selectedIndex
    if (index === 0) {
      setIsAmountSelected(false)
    } else {
      setIsAmountSelected(true)
      setShelfName(e.nativeEvent.target[index].text)
    }
  }

  const onRemoveRow = (e, index) => {
    console.log(index)
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
        created_by: created_by,//USER
        amount: amount,
        price: price,
        nameWarehouse: nameWarehouse,
        nameShelf: shelf_name,
        note: note,
        totalPrice: totalPrice
      }
      setDataTable([...dataTable, data])
      console.log(dataTable)
    } else {
      showValidationMessage(true)
    }
  }


  useEffect(() => {
    Promise.all([getData('http://127.0.0.1:8000/api/admin/items/searchItem/1'),
      getData('http://127.0.0.1:8000/api/admin/warehouse'),
      getData('http://127.0.0.1:8000/api/auth/user-profile?token=' + getToken())
    ])
      .then(res => {
        console.log(res[1].data)
        setDataItem(res[0].data)
        setDataWarehouse(res[1].data)
        setCreatedBy(res[2].data.fullname)
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
                      setDate(newValue)
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
              {validator.message("name", name, "required", {
                messages: {
                  required: "(*) Nhập tên vật tư"
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
                  <br />
                  {validator.message("amount", amount, "required", {
                    messages: {
                      required: "(*) Nhập số lượng"
                    }
                  })}
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
                      <CFormSelect size="md" className="mb-3" value={shelf_id} onChange={
                        (e) => {
                          onChangeShelf(e)
                          setShelfID(e.target.value)
                        }}>
                        <option>Giá/kệ</option>
                        {
                          dataShelf.map((item, index) => (
                            <option key={index} value={item.shelf_id} >{item.shelf_name}</option>
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
      <CTable id='dataExport' striped hover responsive bordered borderColor="warning" >
        <CTableHead color="warning">
          <CTableRow>
            <CTableHeaderCell className="text-center">STT</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Mã vật tư</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Mã sản xuất</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Tên vật tư</CTableHeaderCell>
            <CTableHeaderCell className="text-center">ĐVT</CTableHeaderCell>
            <CTableHeaderCell className="text-center">SL</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Đơn giá</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Giá/kệ</CTableHeaderCell>
            <CTableHeaderCell className="text-center">#</CTableHeaderCell>
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
              <CTableDataCell className="text-center">{(item.price).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</CTableDataCell>
              <CTableDataCell className="text-center">{item.nameShelf}</CTableDataCell>
              <CTableDataCell className="text-center">
                <CButton size="sm" className="me-2" color='danger' onClick={(e) => {
                  onRemoveRow(e, index)
                }}>
                  <CIcon icon={cilDelete} />
                </CButton>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </>
  )
}

export default Exports
