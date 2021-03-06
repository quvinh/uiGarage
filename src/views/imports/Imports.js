/* eslint-disable react/jsx-key */
/* eslint-disable prettier/prettier */
import { cilDelete } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CButton, CCard,
  CCardBody, CCol, CFormInput, CFormSelect, CInputGroup,
  CInputGroupText, CRow, CTable, CTableBody,
  CTableDataCell, CTableHead, CTableHeaderCell, CTableRow
} from '@coreui/react'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import DateTimePicker from '@mui/lab/DateTimePicker'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import React, { useEffect, useState } from 'react'
import CurrencyFormat from 'react-currency-format'
import { useHistory } from 'react-router-dom'
import { getDataWarehouseID, getRoleNames, getToken, getUserID } from 'src/components/utils/Common'
import { getData } from '../api/Api'
import { ShowImport } from './ShowImport'
import Validator from './Validation'

const Imports = () => {
  const history = useHistory()
  const [item_id, setItemID] = useState('')
  const [batch_code, setBatchCode] = useState('')
  const [warehouse_id, setWarehouse] = useState('')
  const [supplier_id, setSuppliers] = useState()
  const [shelf_id, setShelf] = useState('')
  const [category_id, setCategory] = useState()
  const [name, setName] = useState('')
  const [unit, setUnit] = useState('')
  const [subUnit, setSubUnit] = useState('')
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
  const [dataItemName, setDataItemName] = useState([])
  const [dataWarehouse, setDataWarehouse] = useState([])
  const [dataSuppliers, setDataSuppliers] = useState([])
  const [dataShelf, setDataShelf] = useState([])
  const [dataCategory, setDataCategory] = useState([])
  const [dataUnit, setDataUnit] = useState([])
  // const [dataNameSelected, setDataNameSelected] = useState([])

  const [code, setCode] = useState('')
  // const simpleValidator = useRef(SimpleReactValidator())
  const [validator, showValidationMessage] = Validator()
  const [isWarehouseSelected, setIsWarehouseSelected] = useState(false)
  const [showWarehouse, setShowWarehouse] = useState(false)
  const [isItemSelected, setIsItemSelected] = useState(false)
  const [isUnitSelected, setIsUnitSelected] = useState(false)
  const [isCategorySelected, setIsCategorySelected] = useState(false)

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, dataTable.length - page * rowsPerPage);

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
    setIsWarehouseSelected(false)
    setIsCategorySelected(false)
    setDate(new Date())
  }

  const reset = () => {
    setNull()
    setIsCategorySelected(false)
    setIsItemSelected(false)
    setDataTable([])
  }

  const onChangeName = (e, newValue) => {
    setName(newValue)//)
    if (dataTable.length === 0) createCode()
    setIsItemSelected(false)

    dataItemName.map((item) => {
      if (item.name === newValue) {
        setNull()
        if (getRoleNames() !== 'admin') {
          getDataShelf(getDataWarehouseID()[0])
          setWarehouse(getDataWarehouseID()[0])
          setShowWarehouse(true)
        } else { setShowWarehouse(false) }
        setItemID(item.id)
        setCategory(item.category_id)
        setUnit(item.unit)
        setName(item.name)
        setIsWarehouseSelected(true)
        setIsItemSelected(true)
      }
    })

    dataItem.map((item) => {
      if (item.name_item === newValue) {
        getDataShelf(item.warehouse_id)
        setItemID(item.item_id)
        setBatchCode(item.batch_code)
        setCategory(item.category_id)
        setShelf(item.shelf_id)
        setAmount(item.amount)
        setUnit(item.unit)
        setWarehouse(item.warehouse_id)
        setNameWarehouse(item.name_warehouse)
        setPrice(item.price)
        setSuppliers(item.supplier_id)
        setName(item.name_item)
        setTotalPrice((item.amount) * (item.price))
        setIsItemSelected(true)
        setIsWarehouseSelected(true)
        // console.log(item.name_item)
      }
    })
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
  const onChangeCategory = (e, value) => {
    if (value) {
      let index = e.nativeEvent.target.selectedIndex;
      setCategory(e.target.value)
      setIsCategorySelected(true)
      console.log('category', e.target.value)
      Promise.all(
        [getData('http://127.0.0.1:8000/api/admin/category/itemCategory/' + e.target.value + '?token=' + getToken()),
        getData('http://127.0.0.1:8000/api/admin/category/unitCategory/' + e.target.value + '?token=' + getToken())],
      ).then(function (res) {
        setDataItem(res[0].data)
        setUnit(res[1].data[0].unit)
      })
        .catch(err => {
          console.log(err)
        })
    } else {
      setIsCategorySelected(false)
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
    Promise.all([getData('http://127.0.0.1:8000/api/admin/warehouse/shelfWarehouse/' + id + '?token=' + getToken())])
      .then(function (res) {
        console.log(res[0].data)
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
          if (item.item_id === item_id && item.batch_code === batch_code && item.supplier_id === supplier_id && item.shelf_id === shelf_id && item.warehouse_id === warehouse_id && item.price === price) {
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
          created_by: getUserID(),//USER
          amount: amountTotal,
          price: price,
          nameWarehouse: nameWarehouse,
          note: note,
          totalPrice: parseInt(amountTotal) * parseInt(price)
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
          created_by: getUserID(),//USER
          amount: amount,
          price: price,
          nameWarehouse: nameWarehouse,
          note: note,
          totalPrice: totalPrice
        }
        setDataTable([...dataTable, data])
        console.log(dataTable)
      }
    } else {
      showValidationMessage(true)
    }
  }

  const onRemoveRow = (e, index) => {
    var array = index > 0 ? [...dataTable.slice(0, index), ...dataTable.slice(index + 1, dataTable.length)] : [...dataTable.slice(1, dataTable.length)]
    setDataTable([...array])
  }

  // const getIdWarehouseRole = () => {
  //   var nameRole = ''
  //   getRoleNames().split(' ').map((item) => {
  //     if (!isNaN(item)) nameRole = item
  //   })
  //   return nameRole
  // }

  useEffect(() => {
    Promise.all([
      getData('http://127.0.0.1:8000/api/admin/warehouse?token=' + getToken()),
      getData('http://127.0.0.1:8000/api/admin/suppliers?token=' + getToken()),
      getData('http://127.0.0.1:8000/api/admin/category?token=' + getToken()),
      getData(getRoleNames() === 'admin' ?
        'http://127.0.0.1:8000/api/admin/items/itemInWarehouse?token=' + getToken() :
        'http://127.0.0.1:8000/api/admin/items/searchItem/' + getDataWarehouseID()[0] + '?token=' + getToken()),
      getData('http://127.0.0.1:8000/api/admin/shelf?token=' + getToken()),
      getData('http://127.0.0.1:8000/api/auth/get-user/' + getUserID() + '?token=' + getToken()),
      getData('http://127.0.0.1:8000/api/admin/items?token=' + getToken())
    ])
      .then(res => {

        console.log(res)
        setWarehouse(getDataWarehouseID())
        setDataWarehouse(res[0].data)
        setDataSuppliers(res[1].data)
        setDataCategory(res[2].data)
        setDataItem(res[3].data)
        setDataShelf(res[4].data)
        setUserProfile(res[5].data[0].fullname)
        setDataItemName(res[6].data)
        console.log(getDataWarehouseID())
        if (getRoleNames() !== 'admin') {
          setShowWarehouse(true)
        } else { setShowWarehouse(false) }
      })
      .catch(error => {
        console.log(error)
        if (error.response.status === 403) {
          history.push('/404')
        } else if (error.response.status === 401) {
          history.push('/login')
        }
      })
  }, [])

  return (
    <>
      <p style={{ fontWeight: "bold" }}>&gt;Nh???p v???t t?? - ph??? t??ng</p>
      <CCard>
        {/* <CCardHeader>
          <h6>Nh???p v???t t?? - ph??? t??ng</h6>
        </CCardHeader> */}
        <CCardBody>
          <CRow className="g-3">
            <CCol xs>
              <Autocomplete
                id="name_item"
                freeSolo
                size='small'
                options={dataItemName.map((option) => option.name)}
                // value={name}
                // onChange={(e, newValue) => onChangeName(e, newValue)}
                inputValue={name}
                onInputChange={(e, newValue) => {
                  onChangeName(e, newValue)
                }}
                renderInput={(params) => <TextField {...params} label="T??n v???t t??" />}
                disableClearable
              />
              <div style={{ color: "red", fontStyle: "italic" }}>
                {validator.message("name", name, "required", {
                  messages: {
                    required: "(*) Nh???p t??n v???t t??"
                  }
                })}
              </div>
              <br />
            </CCol>
            <CCol xs>
              <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    renderInput={(props) => <TextField size='small' {...props} />}
                    label="Ng??y nh???p"
                    value={date}
                    inputFormat={"dd/MM/yyyy hh:mm"}
                    onChange={(newValue) => {
                      setDate(newValue)
                    }}
                  />
                </LocalizationProvider>
                <CButton color="success" onClick={(e) => setNull()}>L??M M???I</CButton>
              </div>
            </CCol>
          </CRow>
          <CRow className="g-3">
            <CCol xs>
              <CInputGroup size="sm" >
                <CInputGroupText id="" style={{ width: "120px" }}>M?? v???t t??</CInputGroupText>
                <CFormInput placeholder="M?? v???t t??" name='item_id' value={item_id} onChange={(e) => setItemID(e.target.value)} />
              </CInputGroup>
              <div style={{ color: "red", fontStyle: "italic" }}>
                {validator.message("item_id", item_id, "required", {
                  messages: {
                    required: "(*) Nh???p m?? v???t t??"
                  }
                })}
              </div>
              <br />
            </CCol>
            <CCol xs>
              <CRow>
                <CCol xs={4}>
                  <CFormSelect size="sm" value={unit} onChange={
                    (e) => {
                      (e.target.value === 'L??') ? setIsUnitSelected(true) : setIsUnitSelected(false); setItemID(''); setCategory(''); setName(''); setIsItemSelected(false)
                      setUnit(e.target.value)
                    }
                  }>
                    <option value={'Chi???c'}>Chi???c</option>
                    <option value={'B???'}>B???</option>
                    <option value={'C??i'}>C??i</option>
                    <option value={'Can'}>Can</option>
                    <option value={'????i'}>????i</option>
                    <option value={'Lon'}>Lon</option>
                    <option value={'??ng'}>??ng</option>
                    <option value={'L??'}>L??</option>
                  </CFormSelect>
                </CCol>
                <CCol>
                  {
                    (isUnitSelected) ? (
                      <CRow>
                        <CCol xs>
                          <CInputGroup size="sm">
                            <CInputGroupText>SL/l??</CInputGroupText>
                            <CurrencyFormat className="form-control" type="text" placeholder="S??? l?????ng" value={subAmount} thousandSeparator={true} onValueChange={(values) => {
                              const { formattedValue, value } = values
                              setSubAmount(value)
                              setTotalPrice(value * amount * price)
                            }} />
                            {/* <CFormInput placeholder="SL v???t t??/l??" value={subAmount} onChange={
                              (e) => {
                                setSubAmount(e.target.value)
                                setTotalPrice(e.target.value * amount * price)
                              }} />*/}
                          </CInputGroup>
                        </CCol>
                        <CCol>
                          <CFormSelect disabled={isCategorySelected ? true : (isItemSelected ? true : false)} size="sm" value={unit} onChange={(e) => setSubUnit(e.target.value)}>
                            { }
                            <option value={'Chi???c'}>Chi???c</option>
                            <option value={'B???'}>B???</option>
                            <option value={'C??i'}>C??i</option>
                            <option value={'Can'}>Can</option>
                            <option value={'????i'}>????i</option>
                            <option value={'Lon'}>Lon</option>
                            <option value={'??ng'}>??ng</option>
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
              <CInputGroup size="sm">
                <CInputGroupText id="" style={{ width: "120px" }}>M?? s???n xu???t</CInputGroupText>
                <CFormInput placeholder="M?? s???n xu???t" name='batch_code' value={batch_code} onChange={(e) => setBatchCode(e.target.value)} />
              </CInputGroup>
              <div style={{ color: "red", fontStyle: "italic" }}>
                {validator.message("batch_code", batch_code, "required", {
                  messages: {
                    required: "(*) Nh???p m?? s???n xu???t"
                  }
                })}
              </div>
              <br />
            </CCol>
            <CCol xs>
              <CFormSelect disabled={isItemSelected} size="sm" name="category_id" value={category_id} onChange={
                (e) => {
                  (parseInt(e.target.value)) ? onChangeCategory(e, true) : onChangeCategory(e, false)
                }
              }>
                <option>Ch???n lo???i v???t t??</option>
                {dataCategory.map((item, index) => (
                  <option key={index} value={item.id}>{item.name}</option>
                ))}
              </CFormSelect>
              <div style={{ color: "red", fontStyle: "italic" }}>
                {validator.message("category_id", category_id, "required", {
                  messages: {
                    required: "(*) Ch???n lo???i v???t t??"
                  }
                })}
              </div>
              <br />
            </CCol>
          </CRow>
          <CRow className="g-3">
            <CCol xs>
              <CInputGroup size="sm">
                <CInputGroupText id="" style={{ width: "120px" }}>S??? l?????ng</CInputGroupText>
                <CurrencyFormat className="form-control" type="text" placeholder="S??? l?????ng" name="amount" value={amount} thousandSeparator={true} onValueChange={(values) => {
                  const { formattedValue, value } = values
                  setAmount(value)
                  setTotalPrice(value * price * subAmount)
                }} />
                {/* <CFormInput placeholder="0" name='amount' value={amount} onChange={(e) => {
                  setAmount(e.target.value)
                  setTotalPrice((e.target.value) * price * subAmount)
                }} /> */}
              </CInputGroup>
              <div style={{ color: "red", fontStyle: "italic" }}>
                {validator.message("amount", amount, "required|numberic|min:1,num", {
                  messages: {
                    required: "(*) Nh???p s??? l?????ng",
                    min: "(*) S??? l?????ng nh???p l???n h??n 0"
                  }
                })}
              </div>
              <br />
            </CCol>
            <CCol xs>
              <CFormSelect disabled={showWarehouse} size="sm" name="warehouse_id" value={warehouse_id} onChange={
                (e) => {
                  (parseInt(e.target.value)) ? onChangeWarehouse(e, true) : onChangeWarehouse(e, false)
                }
              }>
                <option>Ch???n nh?? kho</option>
                {dataWarehouse.map((item, index) => (
                  <option key={index} value={item.id}>{item.name}</option>
                ))}
              </CFormSelect>
              <div style={{ color: "red", fontStyle: "italic" }}>
                {validator.message("warehouse_id", warehouse_id, "required", {
                  messages: {
                    required: "(*) Ch???n nh?? nh?? kho",
                  }
                })}
              </div>
              <br />
            </CCol>
          </CRow>
          <CRow className="g-3">
            <CCol xs>
              <CInputGroup size="sm">
                <CInputGroupText id="" style={{ width: "120px" }}>????n gi??</CInputGroupText>
                {/* <CFormInput placeholder="Nh???p ????n gi??" name='price' value={price.toLocaleString('it-IT')} onChange={(e) => {
                  setPrice(e.target.value)
                  setTotalPrice((e.target.value) * amount * subAmount)
                }} /> */}
                <CurrencyFormat className="form-control" type="text" placeholder="Nh???p ????n gi??" name="price" value={price} thousandSeparator={true} prefix={'VND '} onValueChange={(values) => {
                  const { formattedValue, value } = values
                  setPrice(value)
                  setTotalPrice(value * amount * subAmount)
                }} />
              </CInputGroup>
              <div style={{ color: "red", fontStyle: "italic" }}>
                {validator.message("price", price, "required|numberic|min:1,num", {
                  messages: {
                    required: "(*) Nh???p ????n gi??",
                    min: "(*) Nh???p ????n gi??"
                  }
                })}
              </div>
              <br />
            </CCol>
            <CCol xs>
              <CFormSelect size="sm" name="supplier_id" value={supplier_id} onChange={(e) => setSuppliers(e.target.value)}>
                <option>Ch???n nh?? cung c???p</option>
                {dataSuppliers.map((item, index) => (
                  <option key={index} value={item.id}>{item.name}</option>
                ))}
              </CFormSelect>
              <div style={{ color: "red", fontStyle: "italic" }}>
                {validator.message("supplier_id", supplier_id, "required", {
                  messages: {
                    required: "(*) Ch???n nh?? cung c???p",
                  }
                })}
              </div>
            </CCol>
          </CRow>
          <CRow className="g-3">
            <CCol xs>
              <CInputGroup size="sm">
                <CInputGroupText id="" style={{ width: "120px" }}>Th??nh ti???n</CInputGroupText>
                {/* <CFormInput placeholder="0" value={totalPrice.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })} readOnly /> */}
                <CurrencyFormat className="form-control" type="text" disabled value={totalPrice} thousandSeparator={true} prefix={'VND '} />
              </CInputGroup>
            </CCol>
            <CCol xs>
              {
                (isWarehouseSelected) ? (
                  <CFormSelect size="sm" name="shelf_id" value={shelf_id} onChange={(e) => setShelf(e.target.value)}>
                    <option>Ch???n gi??/k???</option>
                    {dataShelf.map((item, index) => (
                      <option key={index} value={item.shelf_id}>{item.shelf_name}</option>
                    ))}
                  </CFormSelect>
                ) : (
                  <CFormSelect size="sm" disabled>
                    <option>Ch???n gi??/k???</option>
                  </CFormSelect>
                )
              }
              <div style={{ color: "red", fontStyle: "italic" }}>
                {validator.message("shelf_id", shelf_id, "required", {
                  messages: {
                    required: "(*) Ch???n gi??/k??? ????? ch???a v???t t??/ph??? t??ng",
                  }
                })}
              </div>
              <br />
            </CCol>
          </CRow>
          <CRow className="g-3">
            <CCol xs>
              <CInputGroup size="sm">
                <CInputGroupText id="" style={{ width: "120px" }}>Ng?????i t???o</CInputGroupText>
                <CFormInput readOnly placeholder="H??? v?? t??n" name='created_by' value={userProfile} />
              </CInputGroup>
              <br />
            </CCol>
            <CCol xs>
              <CInputGroup size="sm">
                <CInputGroupText id="" style={{ width: "120px" }}>Ghi ch??</CInputGroupText>
                <CFormInput placeholder="Ghi ch??" name='note' value={note} onChange={(e) => setNote(e.target.value)} />
              </CInputGroup>
              <br />
            </CCol>
          </CRow>
          <div className="d-grid gap-2 d-md-flex justify-content-md-center">
            <CButton size="sm" color="success" onClick={(e) => onAddTable(e)}>TH??M V??O PHI???U</CButton>
            <ShowImport dataTable={dataTable} code={code} />
            <CButton size="sm" color="secondary" onClick={(e) => reset()}>RESET</CButton>
          </div>
        </CCardBody>
      </CCard>
      <CTable id='dataExport' striped hover responsive bordered borderColor="warning">
        <CTableHead color="warning">
          <CTableRow>
            <CTableHeaderCell className="text-center">STT</CTableHeaderCell>
            <CTableHeaderCell className="text-center">M?? v???t t??</CTableHeaderCell>
            <CTableHeaderCell className="text-center">M?? s???n xu???t</CTableHeaderCell>
            <CTableHeaderCell className="text-center">T??n v???t t??</CTableHeaderCell>
            <CTableHeaderCell className="text-center">??VT</CTableHeaderCell>
            <CTableHeaderCell className="text-center">S??? l?????ng</CTableHeaderCell>
            <CTableHeaderCell className="text-center">????n gi??</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Ti???n h??ng</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Kho</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Ghi ch??</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Thao t??c</CTableHeaderCell>
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
              <CTableDataCell className="text-center">{item.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</CTableDataCell>
              <CTableDataCell className="text-center">{item.totalPrice.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</CTableDataCell>
              <CTableDataCell className="text-center">{item.nameWarehouse}</CTableDataCell>
              <CTableDataCell className="text-center">{item.note}</CTableDataCell>
              <CTableHeaderCell className="text-center">
                <CButton size="sm" className="me-2" color='danger' onClick={(e) => {
                  onRemoveRow(e, index)
                }}>
                  <CIcon icon={cilDelete} />
                </CButton>
              </CTableHeaderCell>
            </CTableRow>
          ))}
          {emptyRows > 0 && (
              <CTableRow style={{ height: 20 * emptyRows }}>
                <CTableDataCell colSpan={11} />
              </CTableRow>
            )}
        </CTableBody>
      </CTable>
    </>
  )
}

export default Imports
