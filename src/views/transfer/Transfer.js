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
import Autocomplete from '@mui/material/Autocomplete'
import Validator from './Validation';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import CIcon from '@coreui/icons-react';
import { cilDelete } from '@coreui/icons';
import DateFnsUtils from '@date-io/date-fns'
// import { getToken } from 'src/components/utils/Common';
import { ShowTransfer } from './ShowTransfer';

const Transfer = (props) => {

  const [item_id, setItemID] = useState('')
  const [batch_code, setBatchCode] = useState('')
  const [fromWarehouse, setFromWarehouse] = useState('')
  const [fromShelf, setFromShelf] = useState('')
  const [supplier_id, setSupplier] = useState()
  const [toWarehouse, setToWarehouse] = useState('')
  const [toShelf, setToShelf] = useState('')
  const [category_id, setCategory] = useState()
  const [name, setName] = useState('')
  const [unit, setUnit] = useState('')
  const [created_by, setCreatedBy] = useState('')
  const [amount, setAmount] = useState('')
  const [price, setPrice] = useState(0)
  const [date, setDate] = useState(new Date)
  const [note, setNote] = useState('')

  const [nameFromShelf, setNameFromShelf] = useState('')
  const [nameFromWarehouse, setNameFromWarehouse] = useState('')
  const [nameToShelf, setNameToShelf] = useState('')
  const [nameToWarehouse, setNameToWarehouse] = useState('')

  const [dataTable, setDataTable] = useState([])
  const [dataItem, setDataItem] = useState([])
  const [dataFromWarehouse, setDataFromWarehouse] = useState([])
  const [dataFromShelf, setDataFromShelf] = useState([])
  const [dataToWarehouse, setDataToWarehouse] = useState([])
  const [dataToShelf, setDataToShelf] = useState([])
  // const [dataSupplier, setDataSupplier] = useState([])
  const [dataCategory, setDataCategory] = useState([])
  const [code, setCode] = useState('')

  const [validator, showValidationMessage] = Validator()

  const [isAmountSelected, setIsAmountSelected] = useState(false)
  const [isFromWarehouseSelected, setIsFromWarehouseSelected] = useState(false)
  const [isToWarehouseSelected, setIsToWarehouseSelected] = useState(false)

  const createCode = () => {
    const time = new Date()
    const date = time.getDate() + "" + (time.getMonth() + 1) + "" + time.getFullYear() + "" +
      time.getHours() + "" + time.getMinutes() + "" + time.getSeconds()
    const code = "EX_" + date
    console.log('CREATED: ' + code)
    setCode(code)
  }
  const onChangeFromWarehouse = (e, value) => {
    if (value) {
      setIsFromWarehouseSelected(true)
      setFromWarehouse(e.target.value)
      getDataFromShelf(e.target.value)
    } else {
      setIsFromWarehouseSelected(false)
      setFromWarehouse(null)
    }
    Promise.all([getData('http://127.0.0.1:8000/api/admin/items/searchItem/' + e.target.value)])
      .then(function (res) {
        setDataItem(res[0].data)
      })
      .catch(err => {
        console.log(err)
      })

    setName('')
    setFromShelf(null)
    setIsAmountSelected(false)
  }
  const getDataFromShelf = (id) => {
    Promise.all([getData('http://127.0.0.1:8000/api/admin/warehouse/shelfWarehouse/' + id)])
      .then(function (res) {
        setDataFromShelf(res[0].data)
      })
      .catch(err => {
        console.log(err)
      })
  }
  const onChangeFromShelf = (e) => {
    const index = e.nativeEvent.target.selectedIndex
    if (index === 0) {
      setIsAmountSelected(false)
    } else {
      setNameFromShelf(e.nativeEvent.target[index].text)
    }
  }

  const onChangeToWarehouse = (e, value) => {
    const index = e.nativeEvent.target.selectedIndex
    if (value) {
      setIsToWarehouseSelected(true)
      setToWarehouse(e.target.value)
      getDataToShelf(e.target.value)
      setNameToWarehouse(e.nativeEvent.target[index].text)
    } else {
      setIsToWarehouseSelected(false)
      setToWarehouse(null)
    }
    setToShelf(null)
    setIsAmountSelected(false)
  }
  const getDataToShelf = (id) => {
    Promise.all([getData('http://127.0.0.1:8000/api/admin/warehouse/shelfWarehouse/' + id)])
      .then(function (res) {
        setDataToShelf(res[0].data)
      })
      .catch(err => {
        console.log(err)
      })
  }
  const onChangeToShelf = (e) => {
    const index = e.nativeEvent.target.selectedIndex
    if (index === 0) {
      setIsAmountSelected(false)
    } else {
      setIsAmountSelected(true)
      setNameToShelf(e.nativeEvent.target[index].text)
    }
  }

  const onChangeName = (e, newValue) => {
    setName(e.target.value)
    var checked = false
    dataItem.map((item) => {
      if (item.name_item === newValue) {
        setItemID(item.item_id)
        setBatchCode(item.batch_code)
        setCategory(item.category_id)
        setSupplier(item.supplier_id)
        setFromWarehouse(item.warehouse_id)
        setNameFromWarehouse(item.name_warehouse)
        setFromShelf(item.shelf_id)
        getDataFromShelf(item.warehouse_id)
        setCreatedBy(1)
        setUnit(item.unit)
        setPrice(item.price)
        setName(item.name_item)
        // setNameToWarehouse(item.name_warehouse)
        // setNameToShelf(item.nameToShelf)
        setIsFromWarehouseSelected(true)
        checked = true
      }
    })
    if (amount > 0) {
      if (dataTable.length === 0) createCode()
    }
    if (!checked) setIsAmountSelected(false)
  }

  const onChangeAmount = (e) => {
    (e.target.value > 0 && name.length > 0) ? setIsAmountSelected(true) : setIsAmountSelected(false)
    if (dataTable.length === 0) createCode()
  }

  const setNull = () => {
    setName('')
    setAmount('')
    setFromWarehouse('')
    setToWarehouse('')
    setDate(new Date())
    setIsAmountSelected(false)
    setFromShelf('')
    setToShelf('')
  }





  // const onRemoveRow = (e, index) => {
  //   console.log(index)
  // }



  const onAddTable = (e) => {//Button click, add data table
    if (validator.allValid()) {
      const data = {
        item_id: item_id,
        code: code,
        batch_code: batch_code,
        fromWarehouse: fromWarehouse,
        fromShelf: fromShelf,
        nameFromWarehouse: nameFromWarehouse,
        nameFromShelf: nameFromShelf,
        supplier_id: supplier_id,
        category_id: category_id,
        name: name,
        unit: unit,
        created_by: created_by,//USER
        amount: amount,
        price: price,
        toWarehouse: toWarehouse,
        toShelf: toShelf,
        nameToWarehouse: nameToWarehouse,
        nameToShelf: nameToShelf,
        note: note,
      }
      setDataTable([...dataTable, data])
      console.log('abc')
      console.log(dataTable)
    } else {
      showValidationMessage(true)
    }
  }


  useEffect(() => {
    Promise.all([
      getData('http://127.0.0.1:8000/api/admin/items/searchItem/1'),
      getData('http://127.0.0.1:8000/api/admin/warehouse'),
      // getData('http://127.0.0.1:8000/api/auth/user-profile?token=' + getToken())
    ])
      .then(res => {
        // console.log(res[1].data)
        setDataItem(res[0].data)
        setDataFromWarehouse(res[1].data)
        setDataToWarehouse(res[1].data)
        // setCreatedBy(res[2].data.fullname)
      })
  }, [])

  return (
    <>
      <p style={{ fontWeight: "bold" }}>&gt;Chuyển Kho</p>
      <CCard>
        <CCardBody>
          <CRow className="g-3">
            <CCol xs>
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
                  <div style={{ color: 'red' }}>
                    {validator.message("amount", amount, "required", {
                      messages: {
                        required: "(*) Nhập số lượng"
                      }
                    })}
                  </div>
                </CCol>
              </CRow>
              <br />
              <CRow sm >
                <CCol>
                  <CFormSelect size="sm" className="mb-3" value={fromWarehouse} onChange={
                    (e) => {
                      (parseInt(e.target.value)) ? onChangeFromWarehouse(e, true) : onChangeFromWarehouse(e, false)
                    }
                  } >
                    <option>Chuyển từ kho</option>
                    {
                      dataFromWarehouse.map((item, index) => (
                        <option key={index} value={item.id}>{item.name}</option>
                      ))
                    }
                  </CFormSelect>
                </CCol>
              </CRow>
              <CRow sm>
                <CCol>
                  {
                    (isFromWarehouseSelected) ? (
                      <CFormSelect size="sm" className="mb-3" value={fromShelf} onChange={
                        (e) => {
                          console.log(e.target.value)
                          onChangeFromShelf(e)
                          setFromShelf(e.target.value)
                        }}>
                        <option>Giá/kệ</option>
                        {
                          dataFromShelf.map((item, index) => (
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

            <CCol>
              <CRow className="g-3">
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
              </CRow>
              <br />
              <CRow className="g-3">
                <CCol>
                  <CFormSelect size="sm" className="mb-3" value={toWarehouse} onChange={
                    (e) => {
                      (parseInt(e.target.value)) ? onChangeToWarehouse(e, true) : onChangeToWarehouse(e, false)
                    }
                  } >
                    <option>Chuyển đến kho</option>
                    {
                      dataToWarehouse.map((item, index) => (
                        <option key={index} value={item.id}>{item.name}</option>
                      ))
                    }
                  </CFormSelect>
                </CCol>
              </CRow>

              <CRow className="g-3">
                <CCol>
                  {
                    (isToWarehouseSelected) ? (
                      <CFormSelect size="sm" className="mb-3" value={toShelf} onChange={
                        (e) => {
                          console.log(e.target.value)
                          onChangeToShelf(e)
                          setToShelf(e.target.value)
                        }}>
                        <option>Giá/kệ</option>
                        {
                          dataToShelf.map((item, index) => (
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
                  <ShowTransfer dataTable={dataTable} code={code} />
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
            <CTableHeaderCell className="text-center">Tên vật tư</CTableHeaderCell>
            <CTableHeaderCell className="text-center">ĐVT</CTableHeaderCell>
            <CTableHeaderCell className="text-center">SL</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Từ kho</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Tại Giá/kệ</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Đến kho</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Tại Giá/kệ</CTableHeaderCell>
            <CTableHeaderCell className="text-center">#</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody id="myTable">
          {dataTable.map((item, index) => (
            <CTableRow v-for="item in tableItems" key={index}>
              <CTableDataCell className="text-center">{String(index + 1)}</CTableDataCell>
              <CTableDataCell className="text-center">{item.item_id}</CTableDataCell>
              <CTableDataCell className="text-center">{item.name}</CTableDataCell>
              <CTableDataCell className="text-center">{item.unit}</CTableDataCell>
              <CTableDataCell className="text-center">{item.amount}</CTableDataCell>
              <CTableDataCell className="text-center">{item.nameFromWarehouse}</CTableDataCell>
              <CTableDataCell className="text-center">{item.nameFromShelf}</CTableDataCell>
              <CTableDataCell className="text-center">{item.nameToWarehouse}</CTableDataCell>
              <CTableDataCell className="text-center">{item.nameToShelf}</CTableDataCell>
              <CTableDataCell className="text-center">
                {/* <CButton size="sm" className="me-2" color='danger' onClick={(e) => {
                  onRemoveRow(e, index)
                }}>
                  <CIcon icon={cilDelete} />
                </CButton> */}
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </>
  )
}

export default Transfer
