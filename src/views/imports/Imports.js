/* eslint-disable react/jsx-key */
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
} from '@coreui/react'
import { getData, postData } from '../api/Api'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import Autocomplete from '@mui/material/Autocomplete'
import Validator from './Validation'
import { ShowImport } from './ShowImport'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DateTimePicker from '@mui/lab/DateTimePicker'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { getToken, getUserID } from 'src/components/utils/Common'
import CurrencyFormat from 'react-currency-format'

const Imports = () => {
  const [item_id, setItemID] = useState('')
  const [batch_code, setBatchCode] = useState('')
  const [warehouse_id, setWarehouse] = useState('')
  const [suppliers_id, setSuppliers] = useState()
  const [shelf_id, setShelf] = useState('')
  const [category_id, setCategory] = useState()
  const [name, setName] = useState('')
  const [unit, setUnit] = useState('')
  const [subUnit, setSubUnit] = useState('')
  // const [created_by, setCreatedBy] = useState('Nguyễn Thị T')
  const [amount, setAmount] = useState(0)
  const [subAmount, setSubAmount] = useState(1)
  const [price, setPrice] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
  const [nameWarehouse, setNameWarehouse] = useState('')
  const [date, setDate] = useState(new Date)
  const [note, setNote] = useState('')

  const [userProfile, setUserProfile] = useState('')

  const [dataTable, setDataTable] = useState([])
  const [dataItem, setDataItem] = useState([])
  const [dataWarehouse, setDataWarehouse] = useState([])
  const [dataSuppliers, setDataSuppliers] = useState([])
  const [dataShelf, setDataShelf] = useState([])
  const [dataCategory, setDataCategory] = useState([])
  const [dataNameSelected, setDataNameSelected] = useState([])

  const [code, setCode] = useState('')
  // const simpleValidator = useRef(SimpleReactValidator())
  const [validator, showValidationMessage] = Validator()
  const [isWarehouseSelected, setIsWarehouseSelected] = useState(false)
  const [isItemSelected, setIsItemSelected] = useState(false)
  const [isUnitSelected, setIsUnitSelected] = useState(false)

  const setNull = () => {
    setName('')
    setItemID('')
    setBatchCode('')
    setAmount(0)
    setSubAmount(1)
    setPrice(0)
    setTotalPrice(0)
    setUnit('')
    setSubUnit('')
    setCategory('')
    setWarehouse('')
    setSuppliers('')
    setShelf('')
    setIsItemSelected(false)
    // setCreatedBy('Kế toán')
    setDate(new Date())
    // setDataTable([])
  }

  const reset = () => {
    setNull()
    setDataTable([])
  }
  // const onChangeName = (e) => {
  //   setName(e.target.value)
  //   Promise.all([getData('http://127.0.0.1:8000/api/admin/items/searchItem/' + e.target.value + '/1')])
  //     .then(function (res) {
  //       setDataItem(res[0].data)
  //     })
  //     .catch(err => {
  //       console.log("Error API get ITEM")
  //     })
  // }
  const onChangeName = (e, newValue) => {
    setName(e.target.value)
    if (dataTable.length === 0) createCode()
    setIsItemSelected(false)
    console.log(e.target.value)
    console.log(newValue)
    dataItem.map((item) => {
      if (item.name_item === newValue) {
        setItemID(item.item_id)
        setBatchCode(item.batch_code)
        setCategory(item.category_id)
        setShelf(item.shelf_id)
        setAmount(item.amount)
        setUnit(item.unit)
        setWarehouse(item.warehouse_id)
        setPrice(item.price)
        setSuppliers("NO1")
        setName(item.name_item)
        setTotalPrice((item.amount) * (item.price))
        setIsItemSelected(true)
        console.log(item.name_item)
      }
    })
    // console.log(arr)
  }

  const onChangeWarehouse = (e, value) => {
    if (value) {
      let index = e.nativeEvent.target.selectedIndex;
      setWarehouse(e.target.value)
      setNameWarehouse(e.nativeEvent.target[index].text)
      setIsWarehouseSelected(true)
      setWarehouse(e.target.value)
      getDataShelf(e.target.value)
    } else {
      setIsWarehouseSelected(false)
      setWarehouse(null)
    }

    // console.log(e.nativeEvent.target[index].text)
  }

  const createCode = () => {
    const time = new Date()
    const date = time.getDate() + "" + (time.getMonth() + 1) + "" + time.getFullYear() + "" +
      time.getHours() + "" + time.getMinutes() + "" + time.getSeconds()
    const code = "NH_" + date
    console.log('CREATED: ' + code)
    setCode(code)
  }
  // console.log(createCode())

  const getDataShelf = (id) => {
    Promise.all([getData('http://127.0.0.1:8000/api/admin/warehouse/shelfWarehouse/' + id)])
      .then(function (res) {
        console.log(res[0].data)
        setDataShelf(res[0].data)
      })
      .catch(err => {
        console.log(err)
      })
  }
  const onAddTable = (e) => {//Button click, add data table
    console.log(unit)
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
        created_by: getUserID(),//USER
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
    Promise.all([
      getData('http://127.0.0.1:8000/api/admin/warehouse'),
      getData('http://127.0.0.1:8000/api/admin/suppliers'),
      getData('http://127.0.0.1:8000/api/admin/category'),
      getData('http://127.0.0.1:8000/api/admin/shelf'),
      getData('http://127.0.0.1:8000/api/admin/items/searchItem/1'),
      getData('http://127.0.0.1:8000/api/auth/user-profile?token=' + getToken())
    ])
      .then(res => {
        console.log(res[1].data)
        setDataWarehouse(res[0].data)
        setDataSuppliers(res[1].data)
        setDataCategory(res[2].data)
        setDataShelf(res[3].data)
        setDataItem(res[4].data)
        setUserProfile(res[5].data.fullname)
        console.log(res[5].data.fullname)
      })
      .catch(err => { console.log(err)})
  }, [])

  return (
    <>
      <p style={{ fontWeight: "bold" }}>&gt;Nhập vật tư - phụ tùng</p>
      <CCard>
        {/* <CCardHeader>
          <h6>Nhập vật tư - phụ tùng</h6>
        </CCardHeader> */}
        <CCardBody>
          <CRow className="g-3">
            <CCol xs>
              <Autocomplete
                id="name_item"
                freeSolo
                size='small'
                options={dataItem.map((option) => option.name_item)}
                // value={name}
                // onChange={(e, newValue) => onChangeName(e, newValue)}
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
              <div className="d-grid gap-2 d-md-flex justify-content-md-start">
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
                <CButton color="success" onClick={(e) => setNull()}>LÀM MỚI</CButton>
              </div>
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
              <CRow>
                <CCol xs={4}>
                  <CFormSelect disabled={isItemSelected} size="sm" className="mb-3" value={unit} onChange={
                    (e) => {
                      // setUnit(e.target.value)
                      (e.target.value === 'Lô') ? setIsUnitSelected(true) : setIsUnitSelected(false)
                      setUnit(e.target.value)
                    }
                  }>
                    <option value={'Chiếc'}>Chiếc</option>
                    <option value={'Bộ'}>Bộ</option>
                    <option value={'Cái'}>Cái</option>
                    <option value={'Can'}>Can</option>
                    <option value={'Đôi'}>Đôi</option>
                    <option value={'Lon'}>Lon</option>
                    <option value={'Ông'}>Ông</option>
                    <option value={'Lô'}>LÔ</option>
                  </CFormSelect>
                </CCol>
                <CCol>
                  {
                    (isUnitSelected) ? (
                      <CRow>
                        <CCol xs>
                          <CInputGroup size="sm" className="mb-3">
                            <CInputGroupText>SL/lô</CInputGroupText>
                            <CurrencyFormat className="form-control" type="text" placeholder="Số lượng" value={subAmount} thousandSeparator={true} onValueChange={(values) => {
                              const { formattedValue, value } = values
                              setSubAmount(value)
                              setTotalPrice(value * amount * price)
                            }} />
                            {/* <CFormInput placeholder="SL vật tư/lô" value={subAmount} onChange={
                              (e) => {
                                setSubAmount(e.target.value)
                                setTotalPrice(e.target.value * amount * price)
                              }} /> */}
                          </CInputGroup>
                        </CCol>
                        <CCol>
                          <CFormSelect size="sm" className="mb-3" value={subUnit} onChange={(e) => setSubUnit(e.target.value)}>
                            <option value={'Chiếc'}>Chiếc</option>
                            <option value={'Bộ'}>Bộ</option>
                            <option value={'Cái'}>Cái</option>
                            <option value={'Can'}>Can</option>
                            <option value={'Đôi'}>Đôi</option>
                            <option value={'Lon'}>Lon</option>
                            <option value={'Ông'}>Ông</option>
                          </CFormSelect>
                        </CCol>
                      </CRow>
                    ) : (<></>)
                  }
                </CCol>
              </CRow>

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
              <CFormSelect disabled={isItemSelected} size="sm" className="mb-3" value={category_id} onChange={(e) => setCategory(e.target.value)}>
                <option>Chọn loại vật tư</option>
                {dataCategory.map((item, index) => (
                  <option key={index} value={item.id}>{item.name}</option>
                ))}
              </CFormSelect>
            </CCol>
          </CRow>
          <CRow className="g-3">
            <CCol xs>
              <CInputGroup size="sm" className="mb-3">
                <CInputGroupText id="" style={{ width: "120px" }}>Số lượng</CInputGroupText>
                <CurrencyFormat className="form-control" type="text" placeholder="Số lượng" value={amount} thousandSeparator={true} onValueChange={(values) => {
                  const { formattedValue, value } = values
                  setAmount(value)
                  setTotalPrice(value * price * subAmount)
                }} />
                {/* <CFormInput placeholder="0" name='amount' value={amount} onChange={(e) => {
                  setAmount(e.target.value)
                  setTotalPrice((e.target.value) * price * subAmount)
                }} /> */}
              </CInputGroup>
              {validator.message("amount", amount, "required", {
                messages: {
                  required: "Nhập số lượng"
                }
              })}
            </CCol>
            <CCol xs>
              <CFormSelect size="sm" className="mb-3" value={warehouse_id} onChange={
                (e) => {
                  (parseInt(e.target.value)) ? onChangeWarehouse(e, true) : onChangeWarehouse(e, false)
                }
              }>
                <option>Chọn nhà kho</option>
                {dataWarehouse.map((item, index) => (
                  <option key={index} value={item.id}>{item.name}</option>
                ))}
              </CFormSelect>
            </CCol>
          </CRow>
          <CRow className="g-3">
            <CCol xs>
              <CInputGroup size="sm" className="mb-3">
                <CInputGroupText id="" style={{ width: "120px" }}>Đơn giá</CInputGroupText>
                {/* <CFormInput placeholder="Nhập đơn giá" name='price' value={price.toLocaleString('it-IT')} onChange={(e) => {
                  setPrice(e.target.value)
                  setTotalPrice((e.target.value) * amount * subAmount)
                }} /> */}
                <CurrencyFormat className="form-control" type="text" placeholder="Nhập đơn giá" value={price} thousandSeparator={true} prefix={'VND '} onValueChange={(values) => {
                  const { formattedValue, value } = values
                  setPrice(value)
                  setTotalPrice(value * amount * subAmount)
                }} />
              </CInputGroup>
              {validator.message("price", price, "required", {
                messages: {
                  required: "Nhập đơn giá"
                }
              })}

            </CCol>
            <CCol xs>
              <CFormSelect size="sm" className="mb-3" value={suppliers_id} onChange={(e) => setSuppliers(e.target.value)}>
                <option>Chọn nhà cung cấp</option>
                {dataSuppliers.map((item, index) => (
                  <option key={index} value={item.id}>{item.name}</option>
                ))}
              </CFormSelect>
            </CCol>
          </CRow>
          <CRow className="g-3">
            <CCol xs>
              <CInputGroup size="sm" className="mb-3">
                <CInputGroupText id="" style={{ width: "120px" }}>Thành tiền</CInputGroupText>
                {/* <CFormInput placeholder="0" value={totalPrice.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })} readOnly /> */}
                <CurrencyFormat className="form-control" type="text" disabled value={totalPrice} thousandSeparator={true} prefix={'VND '} />
              </CInputGroup>
            </CCol>
            <CCol xs>
              {
                (isWarehouseSelected) ? (
                  <CFormSelect size="sm" className="mb-3" value={shelf_id} onChange={(e) => setShelf(e.target.value)}>
                    <option>Chọn giá/kệ</option>
                    {dataShelf.map((item, index) => (
                      <option key={index} value={item.shelf_id}>{item.shelf_name}</option>
                    ))}
                  </CFormSelect>
                ) : (
                  <CFormSelect size="sm" disabled>
                    <option>Chọn giá/kệ</option>
                  </CFormSelect>
                )
              }
            </CCol>
          </CRow>
          <CRow className="g-3">
            <CCol xs>
              <CInputGroup size="sm" className="mb-3">
                <CInputGroupText id="" style={{ width: "120px" }}>Người tạo</CInputGroupText>
                <CFormInput readOnly placeholder="Họ và tên" name='created_by' value={userProfile} />
              </CInputGroup>
            </CCol>
            <CCol xs>
              <CInputGroup size="sm" className="mb-3">
                <CInputGroupText id="" style={{ width: "120px" }}>Ghi chú</CInputGroupText>
                <CFormInput placeholder="Ghi chú" name='note' value={note} onChange={(e) => setNote(e.target.value)} />
              </CInputGroup>
            </CCol>
          </CRow>
          <div className="d-grid gap-2 d-md-flex justify-content-md-center">
            <CButton size="sm" color="success" onClick={(e) => onAddTable(e)}>THÊM VÀO PHIẾU</CButton>
            <ShowImport dataTable={dataTable} code={code} />
            <CButton size="sm" color="secondary" onClick={(e) => reset()}>RESET</CButton>
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
              <CTableDataCell className="text-center">{item.nameWarehouse}</CTableDataCell>
              <CTableDataCell className="text-center">{item.note}</CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </>
  )
}

export default Imports
