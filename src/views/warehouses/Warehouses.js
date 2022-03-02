/* eslint-disable prettier/prettier */

import React, { lazy, useEffect, useState } from 'react'

import {
  CButton,
  CButtonGroup,
  CCol,
  CRow,
  CCard,
  CCardBody,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CDropdownMenu,
  CDropdownItem,
  CDropdown,
  CDropdownDivider,
  CDropdownToggle,
  CCardHeader,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CInputGroup,
  CFormSelect,
  CFormInput,
  CFormTextarea,
  CInputGroupText,

} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilOptions } from '@coreui/icons'
import { getData, putData, delData,postData } from '../api/Api.js'
import { useHistory } from 'react-router-dom';
import '../../css/dropdown.css'

//const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown.js'))
const WidgetsBrand = lazy(() => import('../widgets/WidgetsBrand.js'))

const Warehouses = () => {

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

  const handleReload = () => {
    Promise.all([getData('http://127.0.0.1:8000/api/admin/warehouse')])
    .then(function (res) {
      setDataWarehouse(res[0].data)
    })
  }

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
      }).catch(error => {
        // validatorAll()
        console.log(':(((')
        console.log(error)
      })
      window.location.reload(false)
  }

  const handleDelete = (e, id) => {
    console.log(id)
    Promise.all([delData('http://127.0.0.1:8000/api/admin/warehouse/delete/' + id)])
      .then(function (response) {
        handleReload()
        // eClick.closest('tr').remove();
      })
      .catch(error => {
        console.log(error)
      })
  }
  const [visible, setVisible] = useState(false)
  // const [visible1, setVisible1] = useState(false)
  const [dataWarehouse, setDataWarehouse] = useState([])
  const [dataCountWarehouse, setDataCountWarehouse] = useState([])
  useEffect(() => {
    Promise.all([getData('http://127.0.0.1:8000/api/admin/warehouse'),
    getData('http://127.0.0.1:8000/api/admin/warehouse/warehouseShow'),
      // getData('http://127.0.0.1:8000/api/admin/warehouse/countWarehouse')
    ])
      .then(function (res) {
        setDataWarehouse(res[0].data)
        setDataCountWarehouse(res[1].data)
      })
      .catch((error) => {
        // console.log(error)
      })
  }, [])

  return (
    <>
      {/* <WidgetsDropdown /> */}
      <CButton href='#/warehouses-add' className='btn1'>Tạo kho</CButton>
      <CRow>{dataWarehouse.map((item, index) => (
        <CCol sm={6} lg={6} key={index}>

          <CCard color='warning' textColor='black' className='mb-3 border-warning'>
            <CCardBody >
              <h4>{item.name} </h4>
              <p>Mã kho: {item.id} - Thủ kho:</p>
              <p>Địa chỉ: {item.location}</p>
              <p> </p>
              {/* <CBadge color='success'> Active </CBadge> */}
              <>
                <CDropdown className='dropdown'>
                  <CDropdownToggle color="transparent" caret={false} className="p-0">
                    <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
                  </CDropdownToggle>
                  <CDropdownMenu>
                    <CDropdownItem href={'#/warehouses-edit/' + item.id}>Sửa</CDropdownItem>
                    <CDropdownItem href={'#/warehouses-shelf/' + item.id}>Chi tiết</CDropdownItem>
                    <CDropdownItem onClick={(e) => handleDelete(e, item.id)} >Delete</CDropdownItem>
                  </CDropdownMenu>
                </CDropdown>
                {/* <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
                  <CModalHeader>
                    <CModalTitle>Tạo kho</CModalTitle>
                  </CModalHeader>
                  <CModalBody>
                    <CRow className="justify-content-center">
                      <CCol md={9} lg={9} xl={9}>
                        <CCard className="mx-4">
                          <CCardBody className="p-4">
                            <CForm>
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
                            </CForm>
                          </CCardBody>
                        </CCard>
                      </CCol>
                    </CRow>
                  </CModalBody>
                  <CModalFooter>
                    <CButton color="danger" onClick={() => setVisible(false)}>
                      Close
                    </CButton>
                    <CButton color="warning" onClick={(e)=>handleAddWarehouse()}>Lưu</CButton>
                  </CModalFooter>
                </CModal> */}
                
              </>

            </CCardBody>
          </CCard>

        </CCol>))}

      </CRow>
    </>
  )
}

export default Warehouses
