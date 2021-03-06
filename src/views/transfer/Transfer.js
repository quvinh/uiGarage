/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable prettier/prettier */
import { cilDelete } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import {
  CButton, CCard,
  CCardBody, CCol, CFormSelect, CRow, CTable, CTableBody,
  CTableDataCell, CTableHead, CTableHeaderCell, CTableRow
} from '@coreui/react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DateTimePicker from '@mui/lab/DateTimePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getRoleNames, getToken, getUserID } from 'src/components/utils/Common';
import { getData } from '../api/Api';
import { ShowTransfer } from './ShowTransfer';
import Validator from './Validation';

const Transfer = (props) => {
  const history = useHistory()
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
  const [amountCurrent, setAmountCurrent] = useState(0)
  const [price, setPrice] = useState(0)
  const [date, setDate] = useState(new Date)
  const [note, setNote] = useState('')
  const [kd, setKD] = useState('')

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
  const [code, setCode] = useState('')

  const [validator, showValidationMessage] = Validator()

  const [isAmountSelected, setIsAmountSelected] = useState(false)
  const [isFromWarehouseSelected, setIsFromWarehouseSelected] = useState(false)
  const [isToWarehouseSelected, setIsToWarehouseSelected] = useState(false)
  const [showWarehouse, setShowWarehouse] = useState(false)

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

  const createCode = () => {
    const time = new Date()
    const date = time.getDate() + "" + (time.getMonth() + 1) + "" + time.getFullYear() + "" +
      time.getHours() + "" + time.getMinutes() + "" + time.getSeconds()
    const code = "TF_" + date
    console.log('CREATED: ' + code)
    setCode(code)
  }
  const onChangeFromWarehouse = (e, value) => {
    if (value) {
      setIsFromWarehouseSelected(true)
      setFromWarehouse(e.target.value)
      getDataFromShelf(e.target.value)
      Promise.all([getData('http://127.0.0.1:8000/api/admin/items/searchItem/' + e.target.value + '?token=' + getToken())])
        .then(function (res) {
          setDataItem(res[0].data)
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      setIsFromWarehouseSelected(false)
      setFromWarehouse(null)
    }
    setKD('')
    setAmount(0)
    setAmountCurrent(0)
    setName('')
    setFromShelf(null)
    setIsAmountSelected(false)
  }
  const getDataFromShelf = (id) => {
    Promise.all([getData('http://127.0.0.1:8000/api/admin/warehouse/shelfWarehouse/' + id + '?token=' + getToken())])
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
      setFromShelf(e.target.value)
      Promise.all([
        getData('http://127.0.0.1:8000/api/admin/warehouse/itemShelf/' + fromWarehouse + '/' + e.target.value + '?token=' + getToken())
      ])
        .then(function (res) {
          console.log(res[0].data)
          setDataItem(res[0].data)
        })
        .catch(error => {
          if (error.response.status === 403) {
            history.push('/404')
          }
          else if (error.response.status === 401) {
            history.push('/login')
          }
        })
    }
    setName('')
    setAmount(0)
    setAmountCurrent(0)
    setKD(0)
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
    Promise.all([getData('http://127.0.0.1:8000/api/admin/warehouse/shelfWarehouse/' + id + '?token=' + getToken())])
      .then(function (res) {
        setDataToShelf(res[0].data)
      })
      .catch(err => {
        if (err.response.status === 403) {
          history.push('/404')
        } else if (err.response.status === 401) {
          history.push('/login')
        }
      })
  }
  const onChangeToShelf = (e) => {
    const index = e.nativeEvent.target.selectedIndex
    if (index !== 0 && fromShelf !== null && fromShelf !== 'Gi??/k???' && index.toString() !== fromShelf.toString()) {
      setNameToShelf(e.nativeEvent.target[index].text)
    } else {
      setIsAmountSelected(false)
    }
  }

  const onChangeName = (e, newValue) => {
    setName(e.target.value)
    if (dataTable.length === 0) createCode()
    setIsAmountSelected(false)
    setAmount(0)

    dataItem.map((item) => {
      if (item.name_item === newValue) {
        setItemID(item.item_id)
        setBatchCode(item.batch_code)
        setCategory(item.category_id)
        setSupplier(item.supplier_id)
        setFromWarehouse(item.warehouse_id)
        setNameFromWarehouse(item.name_warehouse)
        setFromShelf(item.shelf_id)
        setNameFromShelf(item.shelf_name)
        getDataFromShelf(item.warehouse_id)
        setUnit(item.unit)
        setPrice(item.price)
        setName(item.name_item)
        setAmountCurrent(item.amount)
        setIsFromWarehouseSelected(true)
        Promise.all([getData('http://127.0.0.1:8000/api/admin/warehouse/kd/' + item.item_id + '/' + item.warehouse_id + '/' + item.shelf_id + '?token=' + getToken())])
          .then(function (res) {
            setKD(res[0].data)
          })
      }
    })
  }

  const onChangeAmount = (e) => {
    (e.target.value > 0 && name.length > 0 &&
      toWarehouse !== '' && toWarehouse !== null &&
      toShelf !== '' && toShelf !== 'Gi??/k???' && toShelf.toString() !== fromShelf.toString()) ? setIsAmountSelected(true) : setIsAmountSelected(false)
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
    setKD('')
  }

  const reset = () => {
    setNull()
    setDataTable([])
  }

  const onRemoveRow = (e, index) => {
    var array = index > 0 ? [...dataTable.slice(0, index), ...dataTable.slice(index + 1, dataTable.length)] : [...dataTable.slice(1, dataTable.length)]
    setDataTable([...array])
  }



  const onAddTable = (e) => {//Button click, add data table
    if (validator.allValid() && amount > 0) {
      if (dataTable.length > 0) {
        let amountTotal = 0
        let array = []
        dataTable.map((item, index) => {
          if (item.item_id === item_id && item.fromWarehouse === fromWarehouse && item.fromShelf === fromShelf && item.toWarehouse === toWarehouse && item.toShelf === toShelf) {
            amountTotal = parseInt(item.amount) + parseInt(amount)
            array = index > 0 ? [...dataTable.slice(0, index), ...dataTable.slice(index + 1, dataTable.length)] : [...dataTable.slice(1, dataTable.length)]
          }
        })
        amountTotal > 0 ? amountTotal = amountTotal : amountTotal = amount
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
          created_by: getUserID(),//USER
          amount: amountTotal,
          price: price,
          toWarehouse: toWarehouse,
          toShelf: toShelf,
          nameToWarehouse: nameToWarehouse,
          nameToShelf: nameToShelf,
          note: note,
        }
        console.log(dataTable)
        array.length > 0 ? setDataTable([...array, data]) : (dataTable.length === 1 && dataTable[0].item_id === item_id ? setDataTable([data]) : setDataTable([...dataTable, data]))
        console.log(dataTable)
      } else {
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
          created_by: getUserID(),//USER
          amount: amount,
          price: price,
          toWarehouse: toWarehouse,
          toShelf: toShelf,
          nameToWarehouse: nameToWarehouse,
          nameToShelf: nameToShelf,
          note: note,
        }
        setDataTable([...dataTable, data])
      }
      setAmount(0)
    } else {
      showValidationMessage(true)
      setAmount(0)
    }
  }
  const getIdWarehouseRole = () => {
    var nameRole = ''
    getRoleNames().split(' ').map((item) => {
      if (!isNaN(item)) nameRole = item
    })
    return nameRole
  }


  useEffect(() => {
    Promise.all([
      getData(getRoleNames() === 'admin' ?
        'http://127.0.0.1:8000/api/admin/items/itemInWarehouse?token=' + getToken() :
        'http://127.0.0.1:8000/api/admin/items/searchItem/' + getIdWarehouseRole() + '?token=' + getToken()),
      getData('http://127.0.0.1:8000/api/admin/warehouse?token=' + getToken()),
      getData('http://127.0.0.1:8000/api/auth/user-profile?token=' + getToken())
    ])
      .then(res => {
        setDataItem(res[0].data)
        setDataFromWarehouse(res[1].data)
        setDataToWarehouse(res[1].data)
        setCreatedBy(res[2].data[0].fullname)
        if (getRoleNames() !== 'admin') {
          setFromWarehouse(getIdWarehouseRole())
          // getDataShelf(getIdWarehouseRole())
          setIsFromWarehouseSelected(true)
          setShowWarehouse(true)
        } else { setShowWarehouse(false) }
      })
      .catch(error => {
        if (error.response.status === 403) {
          history.push('/404')
        }
      })
  }, [])

  return (
    <>
      <p style={{ fontWeight: "bold" }}>&gt;Chuy???n Kho</p>
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
                    renderInput={(params) => <TextField {...params} label="T??n v???t t??" />}
                    disableClearable
                  />
                  {validator.message("name", name, "required", {
                    messages: {
                      required: "(*) Nh???p t??n v???t t??"
                    }
                  })}
                </CCol>
                <CCol xs={3}>
                  <TextField id=""
                    fullWidth
                    size='small'
                    label="S??? l?????ng"
                    type={'number'}
                    inputProps={{ min: 0, max: kd, type: 'number' }}
                    value={amount}
                    onChange={(e) => {
                      onChangeAmount(e)
                      setAmount(e.target.value)
                    }}
                    variant="outlined" />
                  <div style={{ color: 'red', fontStyle: 'italic' }}>
                    {validator.message("amount", amount, "required", {
                      messages: {
                        required: "(*) Nh???p s??? l?????ng",
                      }
                    })}
                  </div>
                </CCol>
                <CCol xs={3}>
                  <TextField
                    fullWidth
                    disabled
                    type={'number'}
                    size='small'
                    label="SL kh??? d???ng"
                    value={kd}
                    variant="outlined"
                  />
                </CCol>
              </CRow>
              <br />
              <CRow sm >
                <CCol>
                  <CFormSelect size="sm" disabled={showWarehouse} className="mb-3" value={fromWarehouse} onChange={
                    (e) => {
                      (parseInt(e.target.value)) ? onChangeFromWarehouse(e, true) : onChangeFromWarehouse(e, false)
                    }
                  } >
                    <option>Chuy???n t??? kho</option>
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
                        <option>Gi??/k???</option>
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
                      label="Ng??y nh???p"
                      value={date}
                      inputFormat={"dd/MM/yyyy hh:mm"}
                      onChange={(newValue) => {
                        setDate(newValue)
                      }}
                    />
                  </LocalizationProvider>
                  <CButton color="secondary" onClick={(e) => setNull()}>L??M M???I</CButton>
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
                    <option>Chuy???n ?????n kho</option>
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
                        <option>Gi??/k???</option>
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
                  <CButton size="sm" color="success" onClick={(e) => {
                    onAddTable(e)
                    setKD(parseInt(kd) - parseInt(amount))
                  }}>TH??M V??O PHI???U</CButton>
                  <ShowTransfer dataTable={dataTable} code={code} />
                </>
              ) : (
                <CButton size="sm" color="secondary">TH??M V??O PHI???U</CButton>
              )
            }
              <CButton size='sm' color='secondary' onClick={(e) => reset()}>Reset</CButton>
          </div>
        </CCardBody>
      </CCard>
      <CTable id='dataTransfer' striped hover responsive bordered borderColor="warning" >
        <CTableHead color="warning">
          <CTableRow>
            <CTableHeaderCell className="text-center">STT</CTableHeaderCell>
            <CTableHeaderCell className="text-center">M?? v???t t??</CTableHeaderCell>
            <CTableHeaderCell className="text-center">T??n v???t t??</CTableHeaderCell>
            <CTableHeaderCell className="text-center">??VT</CTableHeaderCell>
            <CTableHeaderCell className="text-center">SL</CTableHeaderCell>
            <CTableHeaderCell className="text-center">T??? kho</CTableHeaderCell>
            <CTableHeaderCell className="text-center">T???i Gi??/k???</CTableHeaderCell>
            <CTableHeaderCell className="text-center">?????n kho</CTableHeaderCell>
            <CTableHeaderCell className="text-center">T???i Gi??/k???</CTableHeaderCell>
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
                <CButton size="sm" className="me-2" color='danger' onClick={(e) => {
                  onRemoveRow(e, index)
                  setKD(parseInt(kd) + parseInt(item.amount))
                }}>
                  <CIcon icon={cilDelete} />
                </CButton>
              </CTableDataCell>
            </CTableRow>
          ))}
          {emptyRows > 0 && (
              <CTableRow style={{ height: 40 * emptyRows }}>
                <CTableDataCell colSpan={10} />
              </CTableRow>
            )}
        </CTableBody>
      </CTable>
    </>
  )
}

export default Transfer
