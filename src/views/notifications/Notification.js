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
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormFloating,
  CFormInput,
  CFormLabel,
  CFormTextarea
} from '@coreui/react';
import {
  Stack,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { delData, getData, putData } from '../api/Api';
import { getToken, getUserID } from 'src/components/utils/Common';
import { styled } from '@mui/system';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled';
import { cilDelete, cilPenAlt, cilX, cilCheckAlt } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { useHistory } from 'react-router-dom';


const NotificationEvent = () => {
  const [dataTable, setDataTable] = useState([])
  const [userProfile, setUserProfile] = useState([])
  const [visible, setVisible] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [id, setId] = useState('')
  const history = useHistory()

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }

  const handleContentChange = (e) => {
    setTitle(e.target.value)
  }

  const handleClick = (item) => {
    setId(item.id)
    setTitle(item.title)
    setContent(item.content)
  }

  const handleDelete = (e,id) => {
    // const eClick = e.currentTarget;
    console.log(id)
    Promise.all([delData('http://127.0.0.1:8000/api/admin/notification/delete/' + id + '?token=' + getToken())])
      .then(function (res) {
        hanleReload()
        // eClick.closest('tr').remove();
      })
      .catch(error => {
        console.log(error)
      })
  }

  const hanleReload = () => {
    Promise.all([getData('http://127.0.0.1:8000/api/admin/notification?token=' + getToken())])
      .then(function (res) {
        setDataTable(res[0].data)
      })
  }

  const handleEdit = (id) => {
    const data = {
      title: title,
      content: content,
    }
    console.log(data)
    Promise.all([putData('http://127.0.0.1:8000/api/admin/notification/update/' + id + '?token=' + getToken(), data)
    ]).then(function (res) {
      hanleReload()
    }).catch((error) => {
      console.log(error)
      if (error.response.status === 403) {
        history.push('/403')
      } else if (error.response.status === 401) {
        history.push('/login')
      }
    })
  }

  useEffect(() => {
    Promise.all([getData('http://127.0.0.1:8000/api/admin/notification?token=' + getToken()),
    // getData('http://127.0.0.1:8000/api/auth/get-user/' + getUserID() + '?token=' + getToken()),
    ])
      .then(function (res) {
        console.log(res[0].data)
        setDataTable(res[0].data)
        setUserProfile(res[1].data[0].fullname)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  return (
    <>
      <Stack direction="row" spacing={2}>
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
                <CTableHeaderCell className="text-center">Thao tác</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {dataTable.map((item, index) => (
                <CTableRow key={index}>
                  <CTableDataCell className="text-center">{index + 1}</CTableDataCell>
                  <CTableDataCell className="text-center">{item.title}</CTableDataCell>
                  <CTableDataCell className="text-center">{item.content}</CTableDataCell>
                  <CTableDataCell className="text-center">{item.fullname}</CTableDataCell>
                  <CTableDataCell className="text-center">{item.created_at}</CTableDataCell>
                  <CTableDataCell className="text-center">
                    <div className="d-grid gap-2 d-md-block">
                      <CButton className='me-2' onClick={() => {
                        handleClick(item)
                        setVisible(!visible)
                      }} color='warning'><CIcon icon={cilPenAlt} /></CButton>
                      <CButton onClick={(e) => handleDelete(e,item.id)} color="danger"><CIcon icon={cilDelete} /></CButton>
                    </div>
                  </CTableDataCell>
                </CTableRow>
              ))}

            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Chỉnh sửa thông báo</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CFormFloating className="mb-3">
            <CFormInput onChange={(e) => setTitle(e.target.value)}
              value={title} type="text"
              id="title" placeholder="Chủ đề" />
            <CFormLabel htmlFor="title">Chủ đề</CFormLabel>
          </CFormFloating>
          <CFormFloating className="mb-3">
            <CFormTextarea value={content}
              style={{ height: '200px' }} type="text"
              id="content" placeholder="Nội dung"
              onChange={(e) => setContent(e.target.value)} />
            <CFormLabel htmlFor="content">Nội dung</CFormLabel>
          </CFormFloating>
        </CModalBody>
        <CModalFooter>
          <CButton color="success" onClick={(e) => {
            handleEdit(id)
            setVisible(false)
            }}><CIcon icon={cilCheckAlt} /></CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default NotificationEvent
