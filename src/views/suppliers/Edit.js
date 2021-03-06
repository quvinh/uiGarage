/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
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
import { putData, getData } from '../api/Api';
import { useHistory } from 'react-router-dom';
import { cilCheckAlt } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { getToken } from 'src/components/utils/Common';

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
        Promise.all([putData('http://127.0.0.1:8000/api/admin/suppliers/update/' + props.match.params.id + '?token=' + getToken(), data)])
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
        Promise.all([getData('http://127.0.0.1:8000/api/admin/suppliers/show/' + props.match.params.id + '?token=' + getToken())])
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
            <CCardHeader><h5>Ch???nh s???a th??ng tin nh?? cung c???p</h5></CCardHeader>
            <CCardBody>
                <CRow>
                    <CCol>
                        <CInputGroup className="mb-3">
                            <CInputGroupText id="" style={{ width: "150px" }}>M?? nh?? cung c???p*</CInputGroupText>
                            <CFormInput id='id' placeholder="M?? nh?? cung c???p" onChange={handleCodeChange} value={code} />
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                            <CInputGroupText id="" style={{ width: "150px" }}>T??n nh?? cung c???p*</CInputGroupText>
                            <CFormInput id='name' placeholder="T??n nh?? cung c???p" onChange={handleNameChange} value={name} />
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                            <CInputGroupText id="" style={{ width: "150px" }}>T??n vi???t t???t</CInputGroupText>
                            <CFormInput id='supplier_initials' placeholder="T??n vi???t t???t nh?? cung c???p" onChange={handleSupplierInitialsChange} value={supplierInitials} />
                        </CInputGroup>
                    </CCol>
                    <CCol>
                        <CInputGroup className="mb-3">
                            <CInputGroupText id="" style={{ width: "150px" }}>Ng?????i li??n h???*</CInputGroupText>
                            <CFormInput id='contact_person' placeholder="Ng?????i li??n h???" onChange={handleContactPerson} value={contactPerson} />
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                            <CInputGroupText id="" style={{ width: "150px" }}>Email*</CInputGroupText>
                            <CFormInput id='email' placeholder="Example@gmail.com" onChange={handleEmailChange} value={email} />
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                            <CInputGroupText id="" style={{ width: "150px" }}>S??? ??i???n tho???i*</CInputGroupText>
                            <CFormInput id='phone' placeholder="S??? ??i???n tho???i" onChange={handlePhone} value={phone} />
                        </CInputGroup>
                    </CCol>
                </CRow>
                <CInputGroup className="mb-3">
                    <CInputGroupText id="" style={{ width: "150px", height: "50px" }}>?????a ch???*</CInputGroupText>
                    <CFormInput id='address' placeholder="?????a ch??? nh?? cung c???p" onChange={handleAddress} value={address} />
                </CInputGroup>
                <CInputGroup className="mb-3">
                    <CInputGroupText id="" style={{ width: "150px" }}>Ch?? th??ch</CInputGroupText>
                    <CFormTextarea id="note" rows="3" onChange={handleNoteChange} value={note}></CFormTextarea>
                </CInputGroup>
                <CButton onClick={(e) => handleUpdateForm()} style={{backgroundColor: "#ffa64d",borderColor: "#ffa64d",color: "#0d0d0d" , width: "100px"}}><CIcon icon={cilCheckAlt} /></CButton>
            </CCardBody>
        </CCard>
    )
}

export default Edit
