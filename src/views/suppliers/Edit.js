/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
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
} from '@coreui/react'
import { postData, putData, getData } from '../api/Api';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { id } from 'date-fns/locale';
import { cilCheckAlt } from '@coreui/icons';
import CIcon from '@coreui/icons-react';

const Edit = (props) => {
    const [code, setCode] = useState('');
    const [name, setName] = useState('');
    const [supplierInitials, setSupplierInitials] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [contactPerson, setContactPerson] = useState('');
    const [phone, setPhone] = useState('');
    const [note, setNote] = useState('');
    const history = useHistory()

    const handleCodeChange = (e) => {
        setCode(e.target.value);
    }

    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const handleSupplierInitialsChange = (e) => {
        setSupplierInitials(e.target.value);
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handleAddress = (e) => {
        setAddress(e.target.value);
    }

    const handleContactPerson = (e) => {
        setContactPerson(e.target.value);
    }

    const handlePhone = (e) => {
        setPhone(e.target.value);
    }

    const handleNoteChange = (e) => {
        setNote(e.target.value);
    }

    const handleUpdateForm = (e) => {
        const data = {
            code: code,
            name: name,
            supplier_initials: supplierInitials,
            email: email,
            address: address,
            contact_person: contactPerson,
            phone: phone,
            note: note
        }
        console.log(props.match.params.id);
        Promise.all([putData('http://127.0.0.1:8000/api/admin/suppliers/update/' + props.match.params.id, data)])
            .then(function (res){
                console.log('Added succesfully', res)
                history.goBack()
            }).catch(error => {
                console.log(data)
                // validatorAll()
                console.log(':(((')
                console.log(error)
            })
        
    }
    useEffect(() => {
        Promise.all([getData('http://127.0.0.1:8000/api/admin/suppliers/show/' + props.match.params.id)])
            .then(function (res) {
                console.log(res[0].data)
                setCode(res[0].data.code)
                setName(res[0].data.name)
                setSupplierInitials(res[0].data.supplier_initials)
                setEmail(res[0].data.email)
                setAddress(res[0].data.address)
                setContactPerson(res[0].data.contact_person)
                setPhone(res[0].data.phone)
                setNote(res[0].data.note)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    return (
        <CCard>
            <CCardHeader><h5>Chỉnh sửa thông tin nhà cung cấp</h5></CCardHeader>
            <CCardBody>
                <CRow>
                    <CCol>
                        <CInputGroup className="mb-3">
                            <CInputGroupText id="" style={{ width: "150px" }}>Mã nhà cung cấp*</CInputGroupText>
                            <CFormInput id='id' placeholder="Mã nhà cung cấp" onChange={handleCodeChange} value={code} />
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                            <CInputGroupText id="" style={{ width: "150px" }}>Tên nhà cung cấp*</CInputGroupText>
                            <CFormInput id='name' placeholder="Tên nhà cung cấp" onChange={handleNameChange} value={name} />
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                            <CInputGroupText id="" style={{ width: "150px" }}>Tên viết tắt</CInputGroupText>
                            <CFormInput id='supplier_initials' placeholder="Tên viết tắt nhà cung cấp" onChange={handleSupplierInitialsChange} value={supplierInitials} />
                        </CInputGroup>
                    </CCol>
                    <CCol>
                        <CInputGroup className="mb-3">
                            <CInputGroupText id="" style={{ width: "150px" }}>Người liên hệ*</CInputGroupText>
                            <CFormInput id='contact_person' placeholder="Người liên hệ" onChange={handleContactPerson} value={contactPerson} />
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                            <CInputGroupText id="" style={{ width: "150px" }}>Email*</CInputGroupText>
                            <CFormInput id='email' placeholder="Example@gmail.com" onChange={handleEmailChange} value={email} />
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                            <CInputGroupText id="" style={{ width: "150px" }}>Số điện thoại*</CInputGroupText>
                            <CFormInput id='phone' placeholder="Số điện thoại" onChange={handlePhone} value={phone} />
                        </CInputGroup>
                    </CCol>
                </CRow>
                <CInputGroup className="mb-3">
                    <CInputGroupText id="" style={{ width: "150px", height: "50px" }}>Địa chỉ*</CInputGroupText>
                    <CFormInput id='address' placeholder="Địa chỉ nhà cung cấp" onChange={handleAddress} value={address} />
                </CInputGroup>
                <CInputGroup className="mb-3">
                    <CInputGroupText id="" style={{ width: "150px" }}>Chú thích</CInputGroupText>
                    <CFormTextarea id="note" rows="3" onChange={handleNoteChange} value={note}></CFormTextarea>
                </CInputGroup>
                <CButton onClick={(e) => handleUpdateForm()} style={{backgroundColor: "#ffa64d",borderColor: "#ffa64d",color: "#0d0d0d" , width: "100px"}}><CIcon icon={cilCheckAlt} /></CButton>
            </CCardBody>
        </CCard>
    )
}

export default Edit
