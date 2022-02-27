/* eslint-disable prettier/prettier */
import React, { lazy, useEffect, useState } from 'react'

import {
  CAvatar,
  CBadge,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { getData, putData } from '../api/Api.js'
import Charts from './Charts.js'

//const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown.js'))
const WidgetsBrand = lazy(() => import('../widgets/WidgetsBrand.js'))

const Dashboard = () => {

  const [tonKho, setTonKho] = useState([])
  const [solgKho, setSolgKho] = useState([])
  useEffect(() => {
    Promise.all([getData('http://127.0.0.1:8000/api/admin/dashboard/tonKho'), getData('http://127.0.0.1:8000/api/admin/dashboard/solgKho')])
      .then(function (res) {
        setTonKho(res[0].data)
        setSolgKho(res[1].data)
      })
      .catch((error) => {
        // console.log(error)
      })
  }, [])

  return (
    <>
      {/* <WidgetsDropdown /> */}
      <CRow>
        <CCol sm={6} lg={5}>
          {solgKho.map((item, index) => (
            <CCard key={index} textColor='black' className='mb-3 border-warning'>
              <CCardBody>
                <h1>Kho đang hoạt động: {item.solgKho}</h1>
              </CCardBody>
            </CCard>
          ))}
          {tonKho.map((item, index) => (
            <CCard key={index} textColor='black' className='mb-3 border-warning'>
              <CCardBody >
                <h4>Tổng tồn kho {item.name}: {item.tonKho} <CBadge color='success'> Active </CBadge></h4>
                <h5>Tổng tiền trong kho:</h5>
                <h6>{item.total} VND</h6>
              </CCardBody>
            </CCard>
          ))}
        </CCol>
        <CCol sm={6} lg={6}>
          <Charts />
        </CCol>
      </CRow>
      {/* <CRow>

      </CRow> */}
    </>
  )
}

export default Dashboard
