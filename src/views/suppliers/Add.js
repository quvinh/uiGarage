/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CFormInput,
    CFormTextarea,
    CInputGroup,
    CInputGroupText,
    CRow,
} from '@coreui/react'
import { postData } from '../api/Api';
import { useHistory } from 'react-router-dom';
import { getToken } from 'src/components/utils/Common';

const Add = () => {
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

    const handleAddForm = () => {
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
        console.log(data);
        Promise.all([postData('http://127.0.0.1:8000/api/admin/suppliers/store?token=' + getToken(), data)])
            .then(function (res){
                console.log('Added succesfully', res)
                history.push('/supplier')
            }).catch(error => {
                console.log(data)
                // validatorAll()
                console.log(':(((')
                console.log(error)
            })
    }

    return (
        <CCard>
            <CCardHeader><h5>T???o m???i nh?? cung c???p</h5></CCardHeader>
            <CCardBody>
                <CRow>
                    <CCol>
                        <CInputGroup className="mb-3">
                            <CInputGroupText id="" style={{ width: "150px" }}>M?? nh?? cung c???p*</CInputGroupText>
                            <CFormInput id='id' placeholder="M?? nh?? cung c???p" onChange={handleCodeChange} value={code} required/>
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                            <CInputGroupText id="" style={{ width: "150px" }}>T??n nh?? cung c???p*</CInputGroupText>
                            <CFormInput id='name' placeholder="T??n nh?? cung c???p" onChange={handleNameChange} value={name} required/>
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                            <CInputGroupText id="" style={{ width: "150px" }}>T??n vi???t t???t</CInputGroupText>
                            <CFormInput id='supplier_initials' placeholder="T??n vi???t t???t nh?? cung c???p" onChange={handleSupplierInitialsChange} value={supplierInitials} />
                        </CInputGroup>
                    </CCol>
                    <CCol>
                        <CInputGroup className="mb-3">
                            <CInputGroupText id="" style={{ width: "150px" }}>Ng?????i li??n h???*</CInputGroupText>
                            <CFormInput id='contact_person' placeholder="Ng?????i li??n h???" onChange={handleContactPerson} value={contactPerson} required/>
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                            <CInputGroupText id="" style={{ width: "150px" }}>Email*</CInputGroupText>
                            <CFormInput id='email' placeholder="Example@gmail.com" onChange={handleEmailChange} value={email} required/>
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                            <CInputGroupText id="" style={{ width: "150px" }}>S??? ??i???n tho???i*</CInputGroupText>
                            <CFormInput id='phone' placeholder="S??? ??i???n tho???i" onChange={handlePhone} value={phone} required/>
                        </CInputGroup>
                    </CCol>
                </CRow>
                <CInputGroup className="mb-3">
                    <CInputGroupText id="" style={{ width: "150px", height: "50px" }}>?????a ch???*</CInputGroupText>
                    <CFormInput id='address' placeholder="?????a ch??? nh?? cung c???p" onChange={handleAddress} value={address} required/>
                </CInputGroup>
                <CInputGroup className="mb-3">
                    <CInputGroupText id="" style={{ width: "150px" }}>Ch?? th??ch</CInputGroupText>
                    <CFormTextarea id="note" rows="3" onChange={handleNoteChange} value={note}></CFormTextarea>
                </CInputGroup>
                <CButton onClick={(e) => handleAddForm()} style={{backgroundColor: "#ffa64d",borderColor: "#ffa64d",color: "#0d0d0d" , width: "100px"}}>Th??m</CButton>
            </CCardBody>
        </CCard>
    )
}

export default Add
