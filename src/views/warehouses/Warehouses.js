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
import { cilOptions, cilPlus } from '@coreui/icons'
import { getData, putData, delData, postData } from '../api/Api.js'
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
      <CButton href='#/warehouses-add' className='btn1'><CIcon icon={cilPlus} /></CButton>
      <CCard>
        <CCardBody>
          <CRow>{dataWarehouse.map((item, index) => (
            <CCol sm={6} lg={6} key={index}>
              <CCard color='secondary' textColor='black' className='mb-3 border-info'>
                <CCardHeader style={{ backgroundColor: "#ffa366" }}><h4>{item.name} </h4></CCardHeader>
                <CCardBody>
                  <CRow>
                    <CCol sm={10} lg={10}>
                      <p>Mã kho: {item.id} - Thủ kho: Nguyễn Thị T</p>
                      <p>Địa chỉ: {item.location}</p>
                    </CCol>
                    <CCol>
                        <CDropdown direction='dropstart'>
                          <CDropdownToggle color="transparent" caret={false} className="p-0">
                            <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
                          </CDropdownToggle>
                          <CDropdownMenu>
                            <CDropdownItem href={'#/warehouses-edit/' + item.id}>Sửa</CDropdownItem>
                            <CDropdownItem href={'#/warehouses-shelf/' + item.id}>Chi tiết</CDropdownItem>
                            <CDropdownItem onClick={(e) => handleDelete(e, item.id)} >Delete</CDropdownItem>
                          </CDropdownMenu>
                        </CDropdown>
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCard>
            </CCol>))}
          </CRow>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Warehouses
