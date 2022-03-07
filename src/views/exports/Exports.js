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
  CCard,
  CCardBody,
  CRow,
  CCol,
  CButton,
  CFormSelect,
} from '@coreui/react'
import { getData } from '../api/Api'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import Validator from './Validation'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DateTimePicker from '@mui/lab/DateTimePicker'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { ShowExport } from './ShowExport'
import CIcon from '@coreui/icons-react'
import { cilDelete } from '@coreui/icons'
import { getToken } from 'src/components/utils/Common'
import { useHistory } from 'react-router-dom'

const Exports = (props) => {

  const [item_id, setItemID] = useState('')
  const [batch_code, setBatchCode] = useState('')
  const [warehouse_id, setWarehouse] = useState('')
  const [supplier_id, setSuppliers] = useState()
  const [shelf_id, setShelfID] = useState('')
  const [category_id, setCategory] = useState()
  const [name, setName] = useState('')
  const [shelf_name, setShelfName] = useState('')
  const [unit, setUnit] = useState('')
  const [created_by, setCreatedBy] = useState('')
  const [amount, setAmount] = useState('')
  const [amountCurrent, setAmountCurrent] = useState(0)
  const [price, setPrice] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
  const [nameWarehouse, setNameWarehouse] = useState('')
  const [date, setDate] = useState(new Date)
  const [note, setNote] = useState('')

  const [dataTable, setDataTable] = useState([])
  const [dataItem, setDataItem] = useState([])
  const [dataWarehouse, setDataWarehouse] = useState([])
  // const [dataSuppliers, setDataSuppliers] = useState([])
  const [dataShelf, setDataShelf] = useState([])
  // const [dataCategory, setDataCategory] = useState([])
  const [code, setCode] = useState('')

  const [validator, showValidationMessage] = Validator()

  const [isAmountSelected, setIsAmountSelected] = useState(false)
  const [isWarehouseSelected, setIsWarehouseSelected] = useState(false)

  const history = useHistory()
  // const [isItemSelected, setIsItemSelected] = useState(false)

  const onChangeName = (e, newValue) => {
    setName(e.target.value)
    console.log(dataItem)
    var checked = false
    dataItem.map((item) => {
      if (item.name_item === newValue) {
        setItemID(item.item_id)
        setBatchCode(item.batch_code)
        setCategory(item.category_id)
        setShelfID(item.shelf_id)
        setShelfName(item.shelf_name)
        setSuppliers(item.supplier_id)
        setUnit(item.unit)
        setWarehouse(item.warehouse_id)
        setPrice(item.price)
        setName(item.name_item)
        setNameWarehouse(item.name_warehouse)
        setAmountCurrent(item.amount)
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
    console.log(dataItem.length)
    setAmount(0)
  }

  const onChangeAmount = (e) => {
    (e.target.value > 0 && name.length > 0) ? setIsAmountSelected(true) : setIsAmountSelected(false)
    if (dataTable.length === 0) createCode()
    console.log(shelf_id)
    console.log(name)
  }

  const setNull = () => {
    setName('')
    setAmount(0)
    setAmountCurrent(0)
    setWarehouse('')
    setDate(new Date())
    setIsAmountSelected(false)
    // setDataWarehouse([])
  }

  const reset = () => {
    setNull()
    setDataTable([])
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
    console.log(e)
    if (value) {
      setIsWarehouseSelected(true)
      setWarehouse(e.target.value)
      getDataShelf(e.target.value)
      Promise.all([getData('http://127.0.0.1:8000/api/admin/items/searchItem/' + e.target.value + '?token=' + getToken())])
        .then(function (res) {
          setDataItem(res[0].data)
          console.log(res[0].data)
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      setIsWarehouseSelected(false)
      setWarehouse(null)
    }
    setAmount(0)
    setAmountCurrent(0)
    setName('')
    setShelfID(null)
    setIsAmountSelected(false)
  }

  const onChangeShelf = (e) => {
    const index = e.nativeEvent.target.selectedIndex //using coreui
    if (index === 0) {
      setIsAmountSelected(false)
    } else {
      setIsAmountSelected(true)
      setShelfName(e.nativeEvent.target[index].text)

      Promise.all([
        getData('http://127.0.0.1:8000/api/admin/warehouse/itemShelf/' + warehouse_id + '/' + e.target.value + '?token=' + getToken())
      ])
        .then(function (res) {
          console.log(res[0].data)
          setDataItem(res[0].data)
        })
        .catch(error => {
          if (error.response.status === 403) {
            history.push('/404')
          } else if(error.response.status === 401) {
            history.push('/login')
          }
        })
    }
    setName('')
    setAmount(0)
    setAmountCurrent(0)
  }

  const onRemoveRow = (e, index) => {
    var array = index > 0 ? [...dataTable.slice(0, index), ...dataTable.slice(index + 1, dataTable.length)] : [...dataTable.slice(1, dataTable.length)]
    setDataTable([...array])
  }

  const getDataShelf = (id) => {
    Promise.all([getData('http://127.0.0.1:8000/api/admin/warehouse/shelfWarehouse/' + id + '?token=' + getToken())])
      .then(function (res) {
        setDataShelf(res[0].data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const onAddTable = (e) => {//Button click, add data table
    if (validator.allValid() && amount > 0) {
      if (dataTable.length > 0) {
        let amountTotal = 0
        let array = []
        dataTable.map((item, index) => {
          if (item.item_id === item_id) {
            amountTotal = parseInt(item.amount) + parseInt(amount)
            array = index > 0 ? [...dataTable.slice(0, index), ...dataTable.slice(index + 1, dataTable.length)] : [...dataTable.slice(1, dataTable.length)]
          }
        })
        amountTotal > 0 ? amountTotal = amountTotal : amountTotal = amount
        const data = {
          item_id: item_id,
          code: code,
          batch_code: batch_code,
          warehouse_id: warehouse_id,
          shelf_id: shelf_id,
          supplier_id: supplier_id,
          category_id: category_id,
          name: name,
          unit: unit,
          created_by: created_by,//USER
          amount: amountTotal,
          price: price,
          nameWarehouse: nameWarehouse,
          nameShelf: shelf_name,
          note: note,
          totalPrice: totalPrice
        }
        console.log(dataTable)
        array.length > 0 ? setDataTable([...array, data]) : (dataTable.length === 1 && dataTable[0].item_id === item_id ? setDataTable([data]) : setDataTable([...dataTable, data]))
        console.log(dataTable)
      } else {
        const data = {
          item_id: item_id,
          code: code,
          batch_code: batch_code,
          warehouse_id: warehouse_id,
          shelf_id: shelf_id,
          supplier_id: supplier_id,
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
        console.log(amount)
      }
      setAmount(0)
      // setAmountCurrent(0)
    } else {
      showValidationMessage(true)
      setAmount(0)
      // setAmountCurrent(0)
    }
  }


  useEffect(() => {
    Promise.all([getData('http://127.0.0.1:8000/api/admin/items/searchItem/1?token=' + getToken()),
    getData('http://127.0.0.1:8000/api/admin/warehouse?token=' + getToken()),
    getData('http://127.0.0.1:8000/api/auth/user-profile?token=' + getToken())
    ])
      .then(res => {
        console.log(res[0].data)
        setDataItem(res[0].data)
        setDataWarehouse(res[1].data)
        setCreatedBy(res[2].data.id)
      })
      .catch(error => {
        if (error.response.status === 403) {
          history.push('/404')
        }
      })
  }, [])

  return (
    <>
      <p style={{ fontWeight: "bold" }}>&gt;Xuất vật tư - phụ tùng</p>
      <CCard>
        <CCardBody>
          <CRow className="g-3">
            <CCol xs>
              <CRow>
                <CCol sm={4}>
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
                <CCol sm={2}>
                  <TextField
                    fullWidth
                    type={'number'}
                    inputProps={{ min: 0, max: amountCurrent, type: 'number' }}
                    size='small'
                    label="Số lượng"
                    value={amount}
                    onChange={(e) => {
                      onChangeAmount(e)
                      setAmount(parseInt(e.target.value) > amountCurrent ? amountCurrent : parseInt(e.target.value))
                    }}
                    variant="outlined"
                  />
                  <br />
                  {validator.message("amount", amount, "required", {
                    messages: {
                      required: "(*) Nhập số lượng"
                    }
                  })}
                </CCol>
                <CCol xs>
                  <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <LocalizationProvider fullWidth dateAdapter={AdapterDateFns}>
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
              </CRow>
            </CCol>

          </CRow>
          <br />
          <CRow className="g-3">
            <CCol xs>
              <CFormSelect size="sm" className="mb-3" value={warehouse_id} onChange={
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
                  <CFormSelect size="sm" className="mb-3" value={shelf_id} onChange={
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
          <br />
          <div className="d-grid gap-2 d-md-flex justify-content-md-center">
            {
              (isAmountSelected) ? (
                <>
                  <CButton size="sm" color="success" onClick={(e) => onAddTable(e)}>THÊM VÀO PHIẾU</CButton>
                  <ShowExport dataTable={dataTable} code={code} />
                  <CButton size="sm" color="secondary" onClick={(e) => reset()}>RESET</CButton>
                </>
              ) : (
                <>
                  <CButton size="sm" color="secondary">THÊM VÀO PHIẾU</CButton>
                  <CButton size="sm" color="secondary" onClick={(e) => reset()}>RESET</CButton>
                </>
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
            <CTableHeaderCell className="text-center">Thao tac</CTableHeaderCell>
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
