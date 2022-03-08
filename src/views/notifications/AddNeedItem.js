/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CContainer,
    CForm,
    CFormInput,
    CFormTextarea,
    CInputGroup,
    CInputGroupText,
    CRow,
    CModal,
    CModalHeader,
    CModalBody,
    CModalTitle,
    CFormFloating,
    CFormLabel,
    CTable,
    CTableHead,
    CTableRow,
    CTableBody,
    CTableHeaderCell,
    CTableDataCell,
    CFormSelect,

} from '@coreui/react'
import { postData, getData } from '../api/Api';
import TextField from '@mui/material/TextField'
import { useHistory } from 'react-router-dom';
import { cilDelete, cilX, cilCheckAlt } from '@coreui/icons';
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DateTimePicker from '@mui/lab/DateTimePicker'
import CIcon from '@coreui/icons-react';
import { Card } from '@mui/material';
import Validator from './Validation';

const Add = () => {
    // const [open, setOpen] = React.useState(false);
    const [visibleLg, setVisibleLg] = useState(false)
    const [detailItemId, setDetailItemId] = useState([])
    const [itemId, setItemId] = useState('')
    const [itemName, setItemName] = useState('')
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [amount, setAmount] = useState('')
    const [unit, setUnit] = useState('')
    const [createdBy, setCreatedBy] = useState('')
    const [warehouseId, setWarehouseId] = useState('')
    const [code, setCode] = useState('')
    const [createdAt, setCreatedAt] = useState(new Date)
    const [validator, showValidationMessage] = Validator()
    const [isUnitSelected, setIsUnitSelected] = useState(false)
    const [isSave, setIsSave] = React.useState(false)
    const [dataWarehouse, setDataWarehouses] = useState([])


    const [dataTable, setDataTable] = useState([])

    const history = useHistory()
    const setNull = () => {
        setItemId('')
        setItemName('')
        setTitle('')
        setContent('')
        setAmount(0)
        setUnit('')
        // setCreatedBy('')
        // setIsItemSelected(false)
        // setIsWarehouseSelected(false)
        setCreatedAt(new Date())
    }
    const reset = () => {
        setNull()
        setDataTable([])
    }
    const createCode = () => {
        const time = new Date()
        const date = time.getDate() + "" + (time.getMonth() + 1) + "" + time.getFullYear() + "" +
            time.getHours() + "" + time.getMinutes() + "" + time.getSeconds()
        const code = "NH_" + date
        setCode(code)
        console.log('CREATED: ' + code)
    }
    const handleDetailItemId = (e) => {
        setDetailItemId(e.target.value);
    }
    const handleItemId = (e) => {
        setItemId(e.target.value);
    }
    const handleName = (e) => {
        setItemName(e.target.value)
    }
    const handleTitle = (e) => {
        setTitle(e.target.value);
    }
    const handleContent = (e) => {
        setContent(e.target.value);
    }
    const handleAmount = (e) => {
        setAmount(e.target.value);
    }
    const handleUnit = (e) => {
        setUnit(e.target.value);
    }
    const handleCreatedBy = (e) => {
        setCreatedBy(e.target.value);
    }
    const handleCreatedAt = (e) => {
        setCreatedAt(e.target.value);
    }
    const onChangeWarehouse = (e) => {
        setDataWarehouses(e.target.value);
    }

    // setWarehouseId(1)

    const onAddTable = (e) => {//Button click, add data table

        if (validator.allValid() && amount > 0) {
            createCode()
            if (dataTable.length > 0) {
                let amountTotal = 0
                let array = []
                dataTable.map((item, index) => {
                    if (item.item_id === itemId) {
                        amountTotal = parseInt(item.amount) + parseInt(amount)
                        array = index > 0 ? [...dataTable.slice(0, index), ...dataTable.slice(index + 1, dataTable.length)] : [...dataTable.slice(1, dataTable.length)]
                    }
                })
                amountTotal > 0 ? amountTotal = amountTotal : amountTotal = amount
                const data = {
                    item_id: itemId,
                    item_name: itemName,
                    code: code,
                    title: title,
                    content: content,
                    warehouse_id: warehouseId,
                    //   amount: amount,
                    unit: unit,
                    created_by: 1,
                    //   created_by: getUserID(),//USER
                    amount: amountTotal,
                }
                console.log(dataTable)
                array.length > 0 ? setDataTable([...array, data]) : (dataTable.length === 1 && dataTable[0].item_id === itemId ? setDataTable([data]) : setDataTable([...dataTable, data]))
                console.log(dataTable)
            } else {
                const data = {
                    item_id: itemId,
                    item_name: itemName,
                    code: code,
                    title: title,
                    content: content,
                    warehouse_id: warehouseId,
                    //   amount: amount,
                    unit: unit,
                    created_by: 1,
                    //   created_by: getUserID(),//USER
                    amount: amount,
                }
                setDataTable([...dataTable, data])
                console.log(dataTable)
            }
        } else {
            showValidationMessage(true)
        }
        console.log(dataTable)
    }
    // setWarehouseId(1)

    const handlAddNotification = () => {
        // const data = {
        //     detail_item_id: detailItemId,
        //     item_id: itemId,
        //     item_name: itemName,
        //     title: title,
        //     content: content,
        //     amount: amount,
        //     unit: unit,
        //     warehouse_id: 1,
        //     created_by: createdBy,
        //     created_at: createdAt,
        // }console.log(data);
        if (dataTable.length > 0) {
            console.log(dataTable)
            createCode()
            dataTable.map((item, index) => {
                {item.code = code}
                console.log(item.code)
                Promise.all([postData('http://127.0.0.1:8000/api/admin/notification/store', item)])
                    .then(res => {
                        setIsSave(true)
                    }).catch(error => {
                        console.log(':(((')
                        console.log(error)
                    })
            })
        }
    }
    const onRemoveRow = (e, index) => {
        var array = index > 0 ? [...dataTable.slice(0, index), ...dataTable.slice(index + 1, dataTable.length)] : [...dataTable.slice(1, dataTable.length)]
        setDataTable([...array])
    }

    useEffect(() => {
        Promise.all([getData('http://127.0.0.1:8000/api/admin/warehouse')])
            .then(function (response) {
                console.log(response[0].data)
                setDataWarehouses(response[0].data)
                console.log(dataWarehouse);
            })

    }, []);
    return (
        <>
            {/* <CButton onClick={() => setVisibleLg(!visibleLg)}><img src="https://img.icons8.com/ios/50/000000/plus--v2.png" /></CButton> */}
            {/* <CModal size="lg" visible={visibleLg} onClose={() => setVisibleLg(false)}>
                <CModalHeader>
                    <CModalTitle>Tạo thông báo</CModalTitle>
                </CModalHeader>
                <CModalBody> */}
            <CCard>
                <CCardHeader><h5>Tạo thông báo</h5></CCardHeader>
                <CCardBody>
                    <CForm>
                        <CCard>
                            <CCardBody>
                                <CFormFloating className="mb-3">
                                    <CFormInput onChange={(e) => setTitle(e.target.value)} value={title} type="text" id="title" placeholder="Chủ đề" />
                                    <CFormLabel htmlFor="title">Chủ đề</CFormLabel>
                                </CFormFloating>
                                <CFormFloating className="mb-3">
                                    <CFormTextarea value={content} style={{ height: '100px' }} type="text" id="content" placeholder="Nội dung" onChange={(e) => setContent(e.target.value)} />
                                    <CFormLabel htmlFor="content">Nội dung</CFormLabel>
                                </CFormFloating>
                                <CRow>
                                    <CCol sm={6} lg={6}>
                                        <CFormFloating value={createdBy} className="mb-3">
                                            <CFormInput onChange={(e) => setCreatedBy(e.target.value)} type="text" id="created_by" placeholder="Vui nhập id kiểu số" />
                                            <CFormLabel htmlFor="created_by">Người tạo - Vui nhập id kiểu số hiện tại đang lỗi</CFormLabel>
                                        </CFormFloating>
                                    </CCol>
                                    <CCol sm={6} lg={6}>
                                        {/* <CFormFloating className="mb-3">
                                            <CFormInput onChange={(newValue) => {
                                                setCreatedAt(newValue)
                                            }} value={createdAt} type="date" id="date" placeholder="Ngày tạo" />
                                            <CFormLabel htmlFor="date">Ngày tạo</CFormLabel>
                                        </CFormFloating> */}
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DateTimePicker
                                                renderInput={(props) => <TextField size='medium' {...props} />}
                                                label="Ngày tạo"
                                                value={createdAt}
                                                inputFormat={"dd/MM/yyyy hh:mm"}
                                                onChange={(newValue) => {
                                                    setCreatedAt(newValue)
                                                }}
                                            />
                                        </LocalizationProvider>
                                        {/* <CButton color="success" onClick={(e) => setNull()}>LÀM MỚI</CButton> */}
                                    </CCol>
                                </CRow>
                                {/* <CFormFloating> */}
                                <CFormSelect size="sm" name="warehouse_id" value={warehouseId} onChange={
                                    (e) =>
                                        setWarehouseId(e.target.value)
                                    // (parseInt(e.target.value)) ? onChangeWarehouse(e, true) : onChangeWarehouse(e, false)
                                }>
                                    <option>Chọn nhà kho</option>
                                    {dataWarehouse.map((item, index) => (
                                        <option key={index} value={item.id}>{item.name}</option>
                                    ))}
                                </CFormSelect>
                                {/* </CFormFloating> */}
                            </CCardBody>
                        </CCard>
                        <br />
                        <CCard>
                            <CCardBody>
                                <CRow>
                                    <CCol sm={6} lg={6}>
                                        <CFormFloating className="mb-3">
                                            <CFormInput onChange={(e) => setItemId(e.target.value)} value={itemId} type="text" id="itemid" placeholder="Mã vật tư" />
                                            <CFormLabel htmlFor="itemid">Mã vật tư</CFormLabel>
                                        </CFormFloating>
                                        <CFormFloating className="mb-3">
                                            <CFormInput onChange={(e) => setItemName(e.target.value)} value={itemName} type="text" id="itemname" placeholder="Tên vật tư" />
                                            <CFormLabel htmlFor="itemname">Tên vật tư</CFormLabel>
                                        </CFormFloating>
                                    </CCol>
                                    <CCol sm={6} lg={6}>
                                        <CFormFloating value={amount} className="mb-3">
                                            <CFormInput onChange={(e) => setAmount(e.target.value)} type="text" id="amount" placeholder="Số lượng" />
                                            <CFormLabel htmlFor="amount">Số lượng</CFormLabel>
                                        </CFormFloating>
                                        <CFormFloating className="mb-3">
                                            <CFormSelect size="sm" value={unit} onChange={
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
                                            {/* <CFormInput onChange={(e) => setUnit(e.target.value)} value={unit} type="text" id="unit" placeholder="Đơn vị tính" />
                                            <CFormLabel htmlFor="unit">Đơn vị tính</CFormLabel> */}
                                        </CFormFloating>
                                        {/* <CFormFloating className="mb-3">
                                            <CFormInput value={createdAt} type="date" id="date" placeholder="Ngày tạo" />
                                            <CFormLabel htmlFor="date">Ngày tạo</CFormLabel>
                                        </CFormFloating> */}
                                    </CCol>
                                </CRow>
                            </CCardBody>

                            <div className="d-grid gap-2 d-md-flex justify-content-md-center mb-3">
                                <CButton onClick={(e) => {
                                    // createCode()
                                    onAddTable(e)
                                }} size="sm" color="success" >THÊM VÀO PHIẾU</CButton>
                                <CButton onClick={(e) => { handlAddNotification() }} color="warning">Thông báo</CButton> {/**/}
                                {/* <ShowImport dataTable={dataTable} code={code} /> */}
                                {/* <CButton size="sm" color="secondary" onClick={(e) => reset()}>RESET</CButton> */}
                            </div>
                        </CCard>
                    </CForm>

                </CCardBody>
            </CCard>
            <br />
            <CCard>
                <CCardBody>
                    <CTable>
                        <CTableHead>
                            <CTableRow>
                                <CTableHeaderCell>Mã vật tư</CTableHeaderCell>
                                <CTableHeaderCell>Tên vật tư</CTableHeaderCell>
                                <CTableHeaderCell>Số lượng</CTableHeaderCell>
                                <CTableHeaderCell>Đơn vị tính</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {dataTable.map((item, index) => (
                                <CTableRow key={index}>
                                    <CTableDataCell>{item.item_id}</CTableDataCell>
                                    <CTableDataCell>{item.item_name}</CTableDataCell>
                                    <CTableDataCell>{item.amount}</CTableDataCell>
                                    <CTableDataCell>{item.unit}</CTableDataCell>
                                    <CButton size="sm" className="me-2" color='danger' onClick={(e) => {
                                        onRemoveRow(e, index)
                                    }}>
                                        <CIcon icon={cilDelete} />
                                    </CButton>
                                </CTableRow>
                            ))}
                        </CTableBody>
                    </CTable>
                </CCardBody>
            </CCard>
            {/* </CModalBody>
            </CModal> */}
        </>
    )
}

export default Add