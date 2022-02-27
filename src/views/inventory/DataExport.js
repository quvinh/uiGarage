/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */

import React, { useEffect, useState } from 'react'
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CTableCaption
} from '@coreui/react';
import { getData } from '../api/Api.js'
const DataExport  = (props) => {

  const [tableHistoryExport, setTableHistoryExport] = useState([])
  // const [tableDashboardImport, setTableDashboardImport] = useState([])
  console.log(props.props)
  useEffect(() => {
    Promise.all([getData('http://127.0.0.1:8000/api/admin/inventory/showHistoryExport/' + props.props),
      // getData('http://127.0.0.1:8000/api/admin/inventory/showHistoryImport/'+ props)
    ])
      .then(function (res) {
        console.log(res.data)
        setTableHistoryExport(res[0].data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <>
      <CTable striped hover responsive bordered borderColor="warning" caption='top'>
        <CTableCaption>Lịch sử Xuất</CTableCaption>
        <CTableHead color="warning">
          <CTableRow>
            <CTableHeaderCell className="text-center">STT</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Mã vật tư</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Tên vật tư</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Loại yêu cầu</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Số lượng Xuất</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Ngày tạo</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Trạng thái</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {tableHistoryExport.map((item, index) => (
            <CTableRow v-for="item in tableItems" key={index}>
              <CTableDataCell className="text-center">{String(index + 1)}</CTableDataCell>
              <CTableDataCell className="text-center">{item.item_id}</CTableDataCell>
              <CTableDataCell className="text-center">{item.name}</CTableDataCell>
              <CTableDataCell className="text-center">Xuất</CTableDataCell>
              <CTableDataCell className="text-center">{item.luongXuat}</CTableDataCell>
              <CTableDataCell className="text-center">{item.created_at}</CTableDataCell>
              <CTableDataCell className='text-center'>{item.status === '2' ? 'Đã duyệt' : (item.status === '1' ? 'Giao hàng' : 'Chưa duyệt')}</CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </>

  )
}

export default DataExport
