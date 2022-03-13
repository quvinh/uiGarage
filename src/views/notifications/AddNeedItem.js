/* eslint-disable prettier/prettier */
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol, CForm, CFormFloating, CFormInput, CFormLabel, CFormTextarea, CRow
} from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getToken, getUserID } from 'src/components/utils/Common';
import { getData, postData } from '../api/Api';
import { setTest } from './ListNotification';
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
    const [beginAt, setBeginAt] = useState('')
    const [endAt, setEndAt] = useState('')
    const [isUnitSelected, setIsUnitSelected] = useState(false)
    const [isSave, setIsSave] = React.useState(false)
    const [dataWarehouse, setDataWarehouses] = useState([])
    const [typeNotification, setTypeNotification] = useState(1)
    const [userProfile, setUserProfile] = useState('')
    const [userId, setUserId] = useState('')
    const [type, setTypeof] = useState('')
    const [checked, setChecked] = React.useState(true);
    console.log(typeNotification)
    const handleChange = (event) => {
        setChecked(event.target.checked)
    };



    const [dataTable, setDataTable] = useState([])

    const history = useHistory()
    const setNull = () => {
        setTitle('')
        setContent('')
        // setCreatedBy('')
        // setIsItemSelected(false)
        // setIsWarehouseSelected(false)
        setCreatedAt(new Date())
    }

    const handlAddNotification = () => {
        const data = {
            title: title,
            content: content,
            warehouse_id: 1,
            created_by: userId,
            // type: type,
        }
        setTest(5)
        console.log(data)
        Promise.all([postData('http://127.0.0.1:8000/api/admin/notification/store?token=' + getToken(), data)])
            .then(res => {
                setIsSave(true)
                history.goBack()
            }).catch(error => {
                console.log(':(((')
                console.log(error)
            })
            // window.location.reload();
    }

    useEffect(() => {
        Promise.all([
            // getData('http://127.0.0.1:8000/api/admin/warehouse?token=' + getToken()),
            getData('http://127.0.0.1:8000/api/auth/get-user/' + getUserID() + '?token=' + getToken()),
        ])
            .then(function (response) {
                // console.log(response[0].data)
                // setDataWarehouses(response[0].data)
                console.log(response[0].data[0].id)
                setUserId(response[0].data[0].id)
                setUserProfile(response[0].data[0].fullname)
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
                                    <CFormTextarea value={content} style={{ height: '200px' }} type="text" id="content" placeholder="Nội dung" onChange={(e) => setContent(e.target.value)} />
                                    <CFormLabel htmlFor="content">Nội dung</CFormLabel>
                                </CFormFloating>
                                <CRow>
                                    <CCol sm={4} lg={4}>

                                        <CFormFloating className="mb-3">
                                            <CFormInput onChange={(e) => setCreatedBy(e.target.value)} type="text" id="created_by" value={userProfile} placeholder="Vui nhập id kiểu số" disabled/>
                                            <CFormLabel htmlFor="created_by">Người tạo</CFormLabel>
                                        </CFormFloating>
                                        {/* <CFormLabel htmlFor="created_by">Người tạo:</CFormLabel>
                                        <CFormSelect id='created_by' aria-label="Disabled select example" disabled className='mb-3'>
                                            <option value="{userId}">{userProfile}</option>
                                        </CFormSelect> */}
                                    </CCol>
                                    {/* <CCol sm={4} lg={4}>
                                        <CFormFloating className="mb-3">
                                            <CFormSelect aria-label="Default select example">
                                            <option>Open this select menu</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                            </CFormSelect>
                                        </CFormFloating>
                                    </CCol> */}
                                    {/* <CCol sm={6} lg={6}>
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
                                    </CCol> */}
                                </CRow>

                                <div className="d-grid gap-2 d-md-flex justify-content-md-center mb-3">
                                    <CButton onClick={(e) => { handlAddNotification() }} color="warning">Thông báo</CButton> {/**/}
                                    <CButton onClick={(e) => { setNull() }} color="secondary">Reset</CButton>
                                    {/* <ShowImport dataTable={dataTable} code={code} /> */}
                                    {/* <CButton size="sm" color="secondary" onClick={(e) => reset()}>RESET</CButton> */}
                                </div>
                            </CCardBody>
                        </CCard>
                    </CForm>

                </CCardBody>
            </CCard>


            {/* </CModalBody>
            </CModal> */}
        </>
    )
}

export default Add
