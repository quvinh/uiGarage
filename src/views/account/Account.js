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
import { Link, useHistory } from 'react-router-dom';
import { getToken, getUser } from 'src/components/utils/Common';
import { DataUsers } from './DataUsers';

const Account = () => {
  const [dataTable, setDataTable] = useState([])
  const history = useHistory()
  const handleDelete = (e, id) => {
    const eClick = e.currentTarget;
    Promise.all([delData('http://127.0.0.1:8000/api/admin/warehouse/delete/' + id)])
      .then(function (res) {
        eClick.closest('tr').remove();
      })
      .catch(error => {
        console.log(error)
      })
  }

  // useEffect(() => {
  //   const header = `Authorization: Bearer ${getToken()}`
  //   Promise.all([getData('http://127.0.0.1:8000/api/auth/users/token', {headers: { header }})])
  //     .then(function (res) {
  //       setDataTable(res[0].data)
  //     })
  //     .catch(error => {
  //       console.log(error)
  //       history.push('/login')
  //     })
  // }, [])

  return (
    <>
      <p style={{fontWeight: "bold"}}>&gt;Tài khoản</p>
      <CCard>
        <CCardHeader>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <CButton href='#/warehouses-add' color="success">Tạo mới kho</CButton>
          </div>
        </CCardHeader>
        <CCardBody>
          <CTable striped hover responsive bordered borderColor="warning">
            <CTableHead color="warning">
              <CTableRow>
                <CTableHeaderCell className="text-center">STT</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Mã kho</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Tên kho</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Địa chỉ</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Ghi chú</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Thao tác</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {/* {dataTable.map((item, index) => (
                <CTableRow key={index}>
                  <CTableDataCell className="text-center">{index + 1}</CTableDataCell>
                  <CTableDataCell className="text-center">{item.id}</CTableDataCell>
                  <CTableDataCell className="text-center" style={{ width: "200px" }}  >{item.name}</CTableDataCell>
                  <CTableDataCell className="text-center" style={{ width: "300px" }}>{item.location}</CTableDataCell>
                  <CTableDataCell className="text-center" style={{ width: "200px" }}>{item.note === null ? "" : item.note}</CTableDataCell>
                  <CTableDataCell className="text-center">
                    <div className="d-grid gap-2 d-md-block">
                      <CButton href={'#/warehouses-shelf/'+item.id} color="success">chi tiết</CButton>
                      <CButton href={'#/warehouses-edit/'+item.id} color="success">Sửa</CButton>
                      <CButton onClick={(e) => handleDelete(e, item.id)} color="secondary">Xoá</CButton>
                    </div>
                  </CTableDataCell>
                </CTableRow>
              ))} */}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
      <DataUsers />
    </>
  )
}

export default Account
