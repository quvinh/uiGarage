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
    CCardHeader,
    CCardBody,
    CButton,
    CButtonGroup,
    CRow,
    CCol,
    CLink,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
} from '@coreui/react';
import { delData, getData } from '../api/Api';
import CIcon from '@coreui/icons-react';
import { cilPlus, cilFile, cilDelete } from '@coreui/icons';
const Suppliers = () => {

    const [dataTable, setDataTable] = useState([])
    const [visible, setVisible] = useState(false)

    const [code, setCode] = useState('')
    const [name, setName] = useState('')
    const [contactPerson, setContactPerson] = useState('')
    const [phone, setPhone] = useState('')
    const [supplierInitials, setSupplierInitials] = useState('');
    const [address, setAddress] = useState('');
    const [note, setNote] = useState('');
    const [email, setEmail] = useState('');

    const handleReload = () => {
        Promise.all([getData('http://127.0.0.1:8000/api/admin/suppliers')])
            .then(function (response) {
                setDataTable(response[0].data)
            })
    }

    const handleSuppliers = (id) => {
        Promise.all([getData('http://127.0.0.1:8000/api/admin/suppliers/show/' + id)])
            .then(function (res) {
                console.log(res[0].data)
                setName(res[0].data.name)
                setContactPerson(res[0].data.contact_person)
                setPhone(res[0].data.phone)
                setCode(res[0].data.code)
                setEmail(res[0].data.email)
                setSupplierInitials(res[0].data.supplier_initials)
                setAddress(res[0].data.address)
                setNote(res[0].data.note)
            })
    }

    const handleDelete = (e, id) => {
        console.log(id)
        Promise.all([delData('http://127.0.0.1:8000/api/admin/suppliers/delete/' + id)])
            .then(function (res) {
                handleReload()
                // eClick.closest('tr').remove();
            })
            .catch(error => {
                console.log(error)
            })
    }

    useEffect(() => {
        Promise.all([getData('http://127.0.0.1:8000/api/admin/suppliers')])
            .then(function (res) {
                console.log(res[0].data)
                setDataTable(res[0].data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])
    return (
        <>
            <CCard>
                <CCardHeader>
                    <CRow>
                        <CCol>
                            <h5>Quản lý nhà cung cấp</h5>
                        </CCol>
                        <CCol>
                            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                <CButton href='#/supplier-add' color='success' className="me-md-2"><CIcon style={{ color: "white" }} icon={cilPlus} /></CButton>
                            </div>
                        </CCol>
                    </CRow>
                </CCardHeader>
                <CCardBody>
                    {/* <CCard>
                        <CCardBody> */}
                    <CTable>
                        <CTableHead color="warning">
                            <CTableRow>
                                <CTableDataCell>STT</CTableDataCell>
                                <CTableDataCell>Mã nhà cung cấp</CTableDataCell>
                                <CTableDataCell>Tên nhà cung cấp</CTableDataCell>
                                <CTableDataCell>Email</CTableDataCell>
                                <CTableDataCell>Điện thoại</CTableDataCell>
                                <CTableDataCell>Địa chỉ</CTableDataCell>
                                <CTableDataCell>Chú thích</CTableDataCell>
                                <CTableDataCell>Thao tác</CTableDataCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {dataTable.map((item, index) => (
                                <CTableRow key={index} style={{ color: "#ff9900" }} onClick={(e) => {
                                    setVisible(!visible)
                                    handleSuppliers(item.id)
                                }}>
                                    <CTableDataCell>{index + 1}</CTableDataCell>
                                    <CTableDataCell>{item.code}</CTableDataCell>
                                    <CTableDataCell>{item.name}
                                    </CTableDataCell>
                                    <CTableDataCell>{item.email}</CTableDataCell>
                                    <CTableDataCell>{item.phone}</CTableDataCell>
                                    <CTableDataCell>{item.address}</CTableDataCell>
                                    <CTableDataCell>{item.note}</CTableDataCell>
                                    <CTableDataCell>
                                        {/* <div className="d-grid gap-2 d-md-block"> */}
                                        <CButton href={'#/supplier-edit/' + item.id} className='m-2' color="warning"><CIcon icon={cilFile} /></CButton>
                                        <CButton onClick={(e) => handleDelete(e, item.id)} color="danger"><CIcon icon={cilDelete} /></CButton>
                                        {/* </div> */}
                                    </CTableDataCell>
                                </CTableRow>
                            ))}
                        </CTableBody>
                    </CTable>
                    {/* </CCardBody>
                    </CCard> */}

                </CCardBody>
            </CCard>
            <CModal scrollable fullscreen visible={visible} onClose={() => setVisible(false)}>
                <CModalHeader style={{backgroundColor: "#ffa64d"}}>
                    <CModalTitle >CHI TIẾT NHÀ CUNG CẤP</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CCard >
                        <CCardHeader><h5>Thông tin nhà cung cấp</h5></CCardHeader>
                        <CCardBody>
                            <CRow>
                                <CCol lg={2}>
                                    <CRow className='m-2'>
                                        Nhà cung cấp:
                                    </CRow>
                                    <CRow className='m-2'>
                                        Mã nhà cung cấp:
                                    </CRow>
                                    <CRow className='m-2'>
                                        Tên viết tắt:
                                    </CRow>
                                    <CRow className='m-2'>
                                        Địa chỉ:
                                    </CRow>
                                </CCol>
                                <CCol lg={4}>
                                    <CRow className='m-2'>
                                        {name}
                                    </CRow>
                                    <CRow className='m-2'>
                                        {code}
                                    </CRow>
                                    <CRow className='m-2'>
                                        {supplierInitials}
                                    </CRow>
                                    <CRow className='m-2'>
                                        {address}
                                    </CRow>
                                </CCol>
                                <CCol lg={2}>
                                    <CRow className='m-2'>
                                        Người liên hệ:
                                    </CRow>
                                    <CRow className='m-2'>
                                        Số điện thoại:
                                    </CRow>
                                    <CRow className='m-2'>
                                        Email:
                                    </CRow>
                                    <CRow className='m-2'>
                                        Mô tả:
                                    </CRow>
                                </CCol>
                                <CCol lg={4}>
                                    <CRow className='m-2'>
                                        {contactPerson}
                                    </CRow>
                                    <CRow className='m-2'>
                                        {phone}
                                    </CRow>
                                    <CRow className='m-2'>
                                        {email}
                                    </CRow>
                                    <CRow className='m-2'>
                                        {note}
                                    </CRow>
                                </CCol>
                            </CRow>
                        </CCardBody>
                    </CCard>
                    <CCard style={{marginTop: "20px"}} >
                        <CCardHeader color='w'><h5>Danh sách phiếu nhập</h5></CCardHeader>
                        <CCardBody>
                            
                        </CCardBody>
                    </CCard>
                </CModalBody>
            </CModal>
        </>
    )

}

export default Suppliers
