/* eslint-disable prettier/prettier */
import React, { lazy, useEffect, useState } from 'react'

import {
  CAvatar,
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
import { getData } from '../api/Api.js'

const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown.js'))

const Dashboard = () => {
  const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  const [tableDashboard, setTableDashboard] = useState([])
  useEffect(() => {
    Promise.all([getData('http://127.0.0.1:8000/api/admin/import')])
      .then(function(res) {
        setTableDashboard(res[0].data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <>
      <WidgetsDropdown />
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Giao dịch nhập xuất chờ xử lý</CCardHeader>
            <CCardBody>
              <br />
              <CTable striped hover responsive bordered borderColor="warning">
                <CTableHead color="warning">
                  <CTableRow>
                    <CTableHeaderCell className="text-center">STT</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Mã vật tư</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Tên vật tư</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Loại yêu cầu</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Số lượng</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Người tạo</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Ngày tạo</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Trạng thái</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {tableDashboard.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell className="text-center">{String(index+1)}</CTableDataCell>
                      <CTableDataCell className="text-center">{item.id}</CTableDataCell>
                      <CTableDataCell className="text-center">Name?</CTableDataCell>
                      <CTableDataCell className="text-center">Nhap/XUat</CTableDataCell>
                      <CTableDataCell className="text-center">...</CTableDataCell>
                      <CTableDataCell className="text-center">...</CTableDataCell>
                      <CTableDataCell className="text-center">...</CTableDataCell>
                      <CTableDataCell className="text-center">{item.status==='1'?'Đã duyệt':'Chưa duyệt'}</CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
