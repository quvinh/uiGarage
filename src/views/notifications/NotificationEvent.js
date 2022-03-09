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
import {
  Stack,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { delData, getData } from '../api/Api';
import { getToken } from 'src/components/utils/Common';
import { styled } from '@mui/system';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled';


const NotificationEvent = () => {
  const [dataTable, setDataTable] = useState([])

  const handleDelete = (e, id) => {
    const eClick = e.currentTarget;
    Promise.all([delData('http://127.0.0.1:8000/api/admin/category/delete/' + id + '?token=' + getToken())])
      .then(function (res) {
        eClick.closest('tr').remove();
      })
      .catch(error => {
        console.log(error)
      })
  }

  useEffect(() => {
    Promise.all([getData('http://127.0.0.1:8000/api/admin/category' + '?token=' + getToken())])
      .then(function (res) {
        setDataTable(res[0].data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  return (
    <>
      <Stack direction="row" spacing={2}>
        <Link className='btn btn-primary' to='/notification-event'>
          Sự kiện
        </Link>
        <Link className='btn btn-warning' to='/notification-item'>
          Vật tư
        </Link>
        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
          <CButton href='#/notification-add' color="success">Tạo thông báo</CButton>
        </div>
      </Stack>
      <CCard>

        <CCardBody>
          <CTable striped hover responsive bordered borderColor="warning">
            <CTableHead color="warning">
              <CTableRow>
                <CTableHeaderCell className="text-center">STT</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Tiêu đề</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Nội dung</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Người tạo</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Ngày tạo</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Thời gian bắt đầu</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Thời gian kết thúc</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow>
                <CTableDataCell></CTableDataCell>
                <CTableDataCell></CTableDataCell>
                <CTableDataCell></CTableDataCell>
                <CTableDataCell></CTableDataCell>
                <CTableDataCell></CTableDataCell>
                <CTableDataCell></CTableDataCell>
                <CTableDataCell></CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </>
  )
}

export default NotificationEvent
