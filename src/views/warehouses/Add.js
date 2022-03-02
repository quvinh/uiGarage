/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CContainer,
    CForm,
    CFormInput,
    CFormTextarea,
    CInputGroup,
    CInputGroupText,
    CRow,
    
} from '@coreui/react'
import { postData } from '../api/Api';
import { useHistory } from 'react-router-dom';
import { cilX, cilCheckAlt } from '@coreui/icons';
import CIcon from '@coreui/icons-react';

const Add = () => {
    const [open, setOpen] = React.useState(false);
    // const [visible, setVisible] = useState(false)
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [note, setNote] = useState('');
    const history = useHistory()

    const handleName = (e) => {
        setName(e.target.value);
    }
    const handleLocation = (e) => {
        setLocation(e.target.value);
    }
    const handleNote = (e) => {
        setNote(e.target.value);
    }
    const [dataTable, setDataTable] = useState([])

    const handleAddWarehouse = () => {
        const data = {
            name: name,
            location: location,
            note: note
        }
        console.log(data);
        Promise.all([postData('http://127.0.0.1:8000/api/admin/warehouse/store', data)])
            .then(res => {
                console.log('Added succesfully', res)
                // history.push('/warehouses')
                history.goBack()
            }).catch(error => {
                // validatorAll()
                console.log(':(((')
                console.log(error)
            })
        // window.location.reload(false);
    }
    return (
        <>
            <div className="bg-light d-flex flex-row align-items-center">
                <CContainer>
                    <CRow className="justify-content-center">
                        <CCol md={9} lg={9} xl={9}>
                            <CCard className="mx-4">
                                <CCardBody className="p-4">
                                    <CForm>
                                        <h1>Tạo Kho</h1>
                                        {/* <p className="text-medium-emphasis"></p> */}
                                        <CInputGroup className="mb-3">
                                            <CInputGroupText id="" style={{ width: "100px" }}>Tên kho</CInputGroupText>
                                            <CFormInput id='name' placeholder="Tên" onChange={(e)=>handleName(e)} value={name} />
                                        </CInputGroup>
                                        <CInputGroup className="mb-3">
                                            <CInputGroupText id="" style={{ width: "100px" }}>Địa chỉ</CInputGroupText>
                                            <CFormInput id="location" onChange={(e)=>handleLocation(e)} value={location}></CFormInput>
                                        </CInputGroup>
                                        <CInputGroup className="mb-3">
                                            <CInputGroupText id="" style={{ width: "100px" }}>Ghi chú</CInputGroupText>
                                            <CFormTextarea id="note" rows="2" onChange={(e)=>handleNote(e)} value={note}></CFormTextarea>
                                        </CInputGroup>
                                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                            <CButton color="warning" onClick={(e)=>handleAddWarehouse(e)}><CIcon icon={cilCheckAlt}/></CButton>
                                            <CButton href='#/warehouses' color="danger"><CIcon icon={cilX}/></CButton>
                                        </div>
                                    </CForm>
                                </CCardBody>
                            </CCard>
                        </CCol>
                    </CRow>
                </CContainer>
            </div>
        </>
    )
}

export default Add