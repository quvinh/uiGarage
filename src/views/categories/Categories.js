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
  CButton
} from '@coreui/react';
import { delData, getData } from '../api/Api';

const Categories = () => {
  const [dataTable, setDataTable] = useState([])

  const handleDelete = (e, id) => {
    const eClick = e.currentTarget;
    Promise.all([delData('http://127.0.0.1:8000/api/admin/category/delete/' + id)])
      .then(function (res) {
        eClick.closest('tr').remove();
      })
      .catch(error => {
        console.log(error)
      })
  }

  useEffect(() => {
    Promise.all([getData('http://127.0.0.1:8000/api/admin/category')])
      .then(function (res) {
        setDataTable(res[0].data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  return (
    <>
      <p style={{fontWeight: "bold"}}>&gt;Loại phụ tùng</p>
      <CCard>
        <CCardHeader>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <CButton href='#/categories-add' color="success">Tạo mới loại phụ tùng</CButton>
          </div>
        </CCardHeader>
        <CCardBody>
          <CTable striped hover responsive bordered borderColor="warning">
            <CTableHead color="warning">
              <CTableRow>
                <CTableHeaderCell className="text-center">STT</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Tên loại phụ tùng</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Ghi chú</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Thao tác</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {dataTable.map((item, index) => (
                <CTableRow key={index}>
                  <CTableDataCell className="text-center">{index + 1}</CTableDataCell>
                  <CTableDataCell className="text-center">{item.name}</CTableDataCell>
                  <CTableDataCell className="text-center">{item.note === null ? "" : item.note}</CTableDataCell>
                  <CTableDataCell className="text-center">
                    <div className="d-grid gap-2 d-md-block">
                      <CButton href={'#/categories-edit/'+item.id} color="success">Sửa</CButton>
                      <CButton onClick={(e) => handleDelete(e, item.id)} color="secondary">Xoá</CButton>
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

export default Categories
