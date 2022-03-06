/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CCard,
  CCardHeader,
  CCardBody,
  CButton,
  CButtonGroup
} from '@coreui/react';
import { getData, putData } from '../api/Api.js'
import { Link } from 'react-router-dom';
import DataImport from './DataImport.js';

const HistoryImport = () => {

  const [codeImport, setCodeImport] = useState([])

  useEffect(() => {
    Promise.all([getData('http://127.0.0.1:8000/api/admin/inventory/showCodeImport')])
      .then(function (res) {
        setCodeImport(res[0].data)
      }).catch((error) => {
        console.log(error)
      })
  }, [])


  return (
    <>
      <div>
        <CButtonGroup>
        <Link className='btn btn-primary' to='/history_import'>
            Phiếu Nhập
          </Link>
          <Link className='btn btn-warning' to='/history_export'>
            Phiếu Xuất
          </Link>
          <Link className='btn btn-success' to='/history_transfer'>
            Phiếu Chuyển Kho
          </Link>
        </CButtonGroup>
      </div>
      <CCard>
        <CCardHeader>
          <span>Phiếu nhập</span>
        </CCardHeader>
        <CCardBody>
          <CTable striped hover responsive bordered borderColor="warning">
            <CTableHead color="warning">
              <CTableRow>
                <CTableHeaderCell className="text-center">STT</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Mã Phiếu</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Tên Kho</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Người Tạo</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Thời gian</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Trạng thái</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Thao tác</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {codeImport.map((item, index) => (
                <CTableRow key={index}>
                  <CTableDataCell className="text-center">{index + 1}</CTableDataCell>
                  <CTableDataCell className="text-center">{item.code}</CTableDataCell>
                  <CTableDataCell className="text-center">{item.tenKho}</CTableDataCell>
                  <CTableDataCell className="text-center">Nguyễn T ...</CTableDataCell>
                  <CTableDataCell className="text-center">{item.created_at}</CTableDataCell>
                  <CTableDataCell className="text-center">{item.status === '2' ? 'Đã duyệt' : (item.status === '1' ? 'Giao hàng' : 'Chưa duyệt')}</CTableDataCell>
                  <CTableDataCell className="text-center">
                    <div className="d-grid gap-2 d-md-block">
                      <DataImport code={item.code} status={item.status} created_at={item.created_at}/>
                    </div>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </>
  )
}
export default HistoryImport