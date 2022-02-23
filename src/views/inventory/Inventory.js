/* eslint-disable prettier/prettier */
import React, { lazy, useEffect, useState } from 'react'
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CTableCaption
} from '@coreui/react';
import { getData, putData } from '../api/Api.js'

const Inventory = () => {


  const [tableDashboardExport, setTableDashboardExport] = useState([])
  const [tableDashboardImport, setTableDashboardImport] = useState([])
  useEffect(() => {
    Promise.all([getData('http://127.0.0.1:8000/api/admin/inventory/showInventExport'), getData('http://127.0.0.1:8000/api/admin/inventory/showInventImport')])
      .then(function (res) {
        setTableDashboardExport(res[0].data)
        setTableDashboardImport(res[1].data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <>
      <CTable striped hover responsive bordered borderColor="warning" caption='top'>
        <CTableCaption>Kiểm kê Xuất</CTableCaption>
        <CTableHead color="warning">
          <CTableRow>
            <CTableHeaderCell className="text-center">STT</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Mã vật tư</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Tên vật tư</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Loại yêu cầu</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Số lượng</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Tồn kho</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Ngày tạo</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Trạng thái</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {tableDashboardExport.map((item, index) => (
            <CTableRow v-for="item in tableItems" key={index}>
              <CTableDataCell className="text-center">{String(index + 1)}</CTableDataCell>
              <CTableDataCell className="text-center">{item.item_id}</CTableDataCell>
              <CTableDataCell className="text-center">{item.name}</CTableDataCell>
              <CTableDataCell className="text-center">Xuất</CTableDataCell>
              <CTableDataCell className="text-center">{item.luongXuat}</CTableDataCell>
              <CTableDataCell className="text-center">{item.tonKho}</CTableDataCell>
              <CTableDataCell className="text-center">{item.created_at}</CTableDataCell>
              <CTableDataCell className='text-center'>{item.status === '1' ? 'Đã duyệt' : 'Chưa duyệt'}</CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
      <CTable striped hover responsive bordered borderColor="warning" caption='top'>
        <CTableCaption>Kiểm kê Nhập</CTableCaption>
        <CTableHead color="warning">
          <CTableRow>
            <CTableHeaderCell className="text-center">STT</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Mã vật tư</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Tên vật tư</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Loại yêu cầu</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Số lượng</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Tồn kho</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Ngày tạo</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Trạng thái</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {tableDashboardImport.map((item, index) => (
            <CTableRow v-for="item in tableItemImport" key={index}>
              <CTableDataCell className='text-center'>{String(index + 1)}</CTableDataCell>
              <CTableDataCell className="text-center">{item.item_id}</CTableDataCell>
              <CTableDataCell className="text-center">{item.name}</CTableDataCell>
              <CTableDataCell className="text-center">Nhập</CTableDataCell>
              <CTableDataCell className="text-center">{item.luongNhap}</CTableDataCell>
              <CTableDataCell className="text-center">{item.tonKho}</CTableDataCell>
              <CTableDataCell className="text-center">{item.created_at}</CTableDataCell>
              <CTableDataCell className="text-center">{item.status === '1' ? 'Đã duyệt' : 'Chưa duyệt'}</CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </>
  )
}
export default Inventory
