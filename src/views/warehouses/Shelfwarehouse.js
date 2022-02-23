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
import { getData } from '../api/Api';
import { useHistory, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ShelfWarehouse = (props) => {
  const [dataTable, setDataTable] = useState([])
  console.log(props)
  const { id } = useParams()


  useEffect(() => {
    Promise.all([getData('http://127.0.0.1:8000/api/admin/warehouse/shelfWarehouse/' + id)])
      .then(response => {
        setDataTable(response[0].data)
        console.log(response[0].data)
      })
  }, []);

  return (
    <>
      <p style={{ fontWeight: "bold" }}>&gt;Danh sách giá kệ</p>
      <CCard>
        <CCardHeader>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <CButton href='#/shelf-add' color="success">Tạo mới Giá</CButton>
          </div>
        </CCardHeader>
        <CCardBody>
          <CTable striped hover responsive bordered borderColor="warning">
            <CTableHead color="warning">
              <CTableRow>
                <CTableHeaderCell className="text-center">STT</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Tên giá kệ</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Vị trí</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Trạng thái</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Thao tác</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {dataTable.map((item, index) => (
                <CTableRow key={index}>
                  <CTableDataCell className="text-center">{index + 1}</CTableDataCell>
                  <CTableDataCell className="text-center" style={{ width: "200px" }} >{item.name}</CTableDataCell>
                  <CTableDataCell className="text-center" style={{ width: "300px" }}>{item.position}</CTableDataCell>
                  <CTableDataCell className="text-center" style={{ width: "200px" }}>{item.status === '1' ? 'Đã đầy' : 'Còn chỗ'}</CTableDataCell>
                  <CTableDataCell className="text-center">
                    <div className="d-grid gap-2 d-md-block">
                      <CButton href={'#/item-shelf/' + item.id} color="success">chi tiết</CButton>
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

export default ShelfWarehouse
