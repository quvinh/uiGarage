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
    CRow,
    CCol,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CTableFoot,
} from '@coreui/react';
import { delData, getData } from '../api/Api';
import CIcon from '@coreui/icons-react';
import { cilPlus, cilFile, cilDelete } from '@coreui/icons';
import { getToken } from 'src/components/utils/Common';
import TablePagination from '@mui/material/TablePagination';

const Suppliers = () => {

    const [dataTable, setDataTable] = useState([])
    const [dataImport, setDataImport] = useState([])
    const [visible, setVisible] = useState(false)
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);

    const [code, setCode] = useState('')
    const [name, setName] = useState('')
    const [contactPerson, setContactPerson] = useState('')
    const [phone, setPhone] = useState('')
    const [supplierInitials, setSupplierInitials] = useState('');
    const [address, setAddress] = useState('');
    const [note, setNote] = useState('');
    const [email, setEmail] = useState('');

    const handleReload = () => {
        Promise.all([getData('http://127.0.0.1:8000/api/admin/suppliers?token=' + getToken())])
            .then(function (response) {
                setDataTable(response[0].data)
            })
    }
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSuppliers = (id) => {
        Promise.all([getData('http://127.0.0.1:8000/api/admin/suppliers/show/' + id + '?token=' + getToken()),
        getData('http://127.0.0.1:8000/api/admin/suppliers/listImport/' + id + '?token=' + getToken())]
        )
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
                console.log(res[1].list)
                setDataImport(res[1].list)
            })
    }

    const handleDelete = (e, id) => {
        console.log(id)
        Promise.all([delData('http://127.0.0.1:8000/api/admin/suppliers/delete/' + id + '?token=' + getToken())])
            .then(function (res) {
                handleReload()
                // eClick.closest('tr').remove();
            })
            .catch(error => {
                console.log(error)
            })
    }

    useEffect(() => {
        Promise.all([getData('http://127.0.0.1:8000/api/admin/suppliers?token=' + getToken())])
            .then(function (res) {
                // console.log(res[0].data)
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
                            <h5>Qu???n l?? nh?? cung c???p</h5>
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
                                <CTableDataCell>M?? nh?? cung c???p</CTableDataCell>
                                <CTableDataCell>T??n nh?? cung c???p</CTableDataCell>
                                <CTableDataCell>Email</CTableDataCell>
                                <CTableDataCell>??i???n tho???i</CTableDataCell>
                                <CTableDataCell>?????a ch???</CTableDataCell>
                                <CTableDataCell>Ch?? th??ch</CTableDataCell>
                                <CTableDataCell>Thao t??c</CTableDataCell>
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
                <CModalHeader style={{ backgroundColor: "#ffa64d" }}>
                    <CModalTitle >CHI TI???T NH?? CUNG C???P</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CCard >
                        <CCardHeader><h5>Th??ng tin nh?? cung c???p</h5></CCardHeader>
                        <CCardBody>
                            <CRow>
                                <CCol lg={2}>
                                    <CRow className='m-2'>
                                        Nh?? cung c???p:
                                    </CRow>
                                    <CRow className='m-2'>
                                        M?? nh?? cung c???p:
                                    </CRow>
                                    <CRow className='m-2'>
                                        T??n vi???t t???t:
                                    </CRow>
                                    <CRow className='m-2'>
                                        ?????a ch???:
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
                                        Ng?????i li??n h???:
                                    </CRow>
                                    <CRow className='m-2'>
                                        S??? ??i???n tho???i:
                                    </CRow>
                                    <CRow className='m-2'>
                                        Email:
                                    </CRow>
                                    <CRow className='m-2'>
                                        M?? t???:
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
                    <CCard style={{ marginTop: "20px" }} >
                        <CCardHeader color='w'><h5>Danh s??ch phi???u nh???p</h5></CCardHeader>
                        <CCardBody>
                            <CTable>
                                <CTableHead>
                                    <CTableRow>
                                        <CTableHeaderCell>STT</CTableHeaderCell>
                                        <CTableHeaderCell>M?? Phi???u</CTableHeaderCell>
                                        <CTableHeaderCell>M?? t???</CTableHeaderCell>
                                        <CTableHeaderCell>Ng??y t???o</CTableHeaderCell>
                                        <CTableHeaderCell>Ng?????i t???o</CTableHeaderCell>
                                        <CTableHeaderCell>Tr???ng th??i</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {dataImport
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((item, index) => (
                                        <CTableRow key={index}>
                                            <CTableDataCell>{index + 1}</CTableDataCell>
                                            <CTableDataCell>{item.code}</CTableDataCell>
                                            <CTableDataCell>{item.note}</CTableDataCell>
                                            <CTableDataCell>{item.created_at}</CTableDataCell>
                                            <CTableDataCell>{item.created_by}</CTableDataCell>
                                            <CTableDataCell>{item.status === '2' ? '???? duy???t' : (item.status === '1' ? 'Giao h??ng' : 'Ch??a duy???t')}</CTableDataCell>
                                        </CTableRow>
                                    ))}
                                </CTableBody>
                                <CTableFoot>
                                    <CTableRow>
                                        <TablePagination
                                            rowsPerPageOptions={[5, 10, 25]}
                                            count={dataImport.length}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            onPageChange={handleChangePage}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                        />
                                    </CTableRow>
                                </CTableFoot>
                            </CTable>
                        </CCardBody>
                    </CCard>
                </CModalBody>
            </CModal>
        </>
    )

}

export default Suppliers
