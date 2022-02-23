/* eslint-disable prettier/prettier */
import React, { lazy, useEffect, useState } from 'react'

import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { getData, putData } from '../api/Api.js'

const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown.js'))

const Dashboard = () => {
  const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  const [msg, setMsg] = useState();
  const handleUpdateStatusExport = (e, id) => {
    const eClick = e.currentTarget;
    Promise.all([putData('http://127.0.0.1:8000/api/admin/export/updateStatus/' + id),
    getData('http://127.0.0.1:8000/api/admin/export/indexStatus')])
      .then(function (res) {
        eClick.closest('tr').remove();
        console.log('Updated succesfully', res);
        setMsg = 'Duyệt thành công.';
      })
      .catch(err => {
        console.log(err)
      })
  }
  const handleUpdateStatusImport = (e, id) => {
    const eClick = e.currentTarget;
    Promise.all([putData('http://127.0.0.1:8000/api/admin/import/updateStatus/' + id),
    getData('http://127.0.0.1:8000/api/admin/import/indexStatus')])
      .then(function (res) {
        eClick.closest('tr').remove();
        console.log('Updated succesfully', res);
        setMsg = 'Duyệt thành công.';
      }).catch(err => {
        console.log(err)
      })
  }

  const [tableDashboardExport, setTableDashboardExport] = useState([])
  const [tableDashboardImport, setTableDashboardImport] = useState([])
  useEffect(() => {
    Promise.all([getData('http://127.0.0.1:8000/api/admin/export/indexStatus'), getData('http://127.0.0.1:8000/api/admin/import/indexStatus')])
      .then(function (res) {
        console.log(res[0].data)
        setTableDashboardExport(res[0].data)
        setTableDashboardImport(res[1].data)

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
            <CCardHeader>Giao dịch xuất chờ xử lý</CCardHeader>
            <CCardBody>
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
                    <CTableHeaderCell className="text-center">Thao tác</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {tableDashboardExport.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell className="text-center">{String(index + 1)}</CTableDataCell>
                      <CTableDataCell className="text-center">{item.item_id}</CTableDataCell>
                      <CTableDataCell className="text-center">{item.name}</CTableDataCell>
                      <CTableDataCell className="text-center">Xuất</CTableDataCell>
                      <CTableDataCell className="text-center">{item.amount}</CTableDataCell>
                      <CTableDataCell className="text-center">{item.created_by}</CTableDataCell>
                      <CTableDataCell className="text-center">{item.created_at}</CTableDataCell>
                      <CTableDataCell className="text-center">{item.status === '1' ? 'Đã duyệt' : 'Chưa duyệt'}</CTableDataCell>
                      <CTableDataCell>
                        <div className="d-grid gap-2 d-md-block">
                          <CButton onClick={(e) => handleUpdateStatusExport(e, item.id)} color="primary">Duyệt</CButton>
                        </div>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
        <br />
        <CCol>
          <CCard>
            <CCardHeader>Giao dịch nhập chờ xử lý</CCardHeader>
            <CCardBody>
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
                    <CTableHeaderCell className="text-center">Thao tác</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {tableDashboardImport.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell className='text-center'>{String(index + 1)}</CTableDataCell>
                      <CTableDataCell className='text-center'>{item.item_id}</CTableDataCell>
                      <CTableDataCell className="text-center">{item.name}</CTableDataCell>
                      <CTableDataCell className="text-center">Nhập</CTableDataCell>
                      <CTableDataCell className="text-center">{item.amount}</CTableDataCell>
                      <CTableDataCell className="text-center">{item.created_by}</CTableDataCell>
                      <CTableDataCell className="text-center">{item.created_at}</CTableDataCell>
                      <CTableDataCell className="text-center">{item.status === '1' ? 'Đã duyệt' : 'Chưa duyệt'}</CTableDataCell>
                      <CTableDataCell>
                        <div className='d-grid gap-2 d-md-block'>
                          <CButton onClick={(e) => handleUpdateStatusImport(e, item.id)} color='primary'>Duyệt</CButton>
                        </div>
                      </CTableDataCell>
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
