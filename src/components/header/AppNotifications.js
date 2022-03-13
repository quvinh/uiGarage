/* eslint-disable prettier/prettier */
import React, { useEffect, useRef, useState } from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CTooltip,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CCol,
  CCard,
  CCardBody,
  CListGroup,
  CRow,
  CListGroupItem,
  CTable,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CTableHead
} from '@coreui/react'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import {
  cilBell,
  cilX,
  cilPaperPlane,
  cilMagnifyingGlass,
  cilPlus,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar8 from './../../assets/images/avatars/8.jpg'
import { Button } from '@mui/material'
import { getData, putData, delData, postData } from '../../views/api/Api';
import { useHistory } from 'react-router-dom';
import { getToken, getUserID } from '../utils/Common';
// import  from 'src/views/notifications/ListNotification';

const AppNotifications = (props) => {

  const [visible, setVisible] = useState(false)
  const [visible1, setVisible1] = useState(false)
  const [notification, setNotification] = useState([])
  const [dataNotification, setDataNotification] = useState([])
  // const [dataNotification, setDataNotification] = useState([])

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [createdBy, setCreatedBy] = useState('')
  const [createdAt, setCreatedAt] = useState('')
  const [fullname, setFullName] = useState('')
  const [warehouseName, setWarehouseName] = useState([])
  const [notValid, setNotValid] = useState([])
  const [dataItem, setDataItem] = useState([])
  const [countNotification, setCountNotification] = useState([])
  const [idNotifiCation, setIdNotification] = useState([])
  const [userProfile, setUserProfile] = useState([])

  const handleNotification = (code) => {
    console.log(code)
    Promise.all([getData('http://127.0.0.1:8000/api/admin/notification/showNotification/' + code + '?token=' + getToken())])
      .then(function (res) {
        console.log(res[0].data)
        if (res[0].data[0] !== null) {
          setDataNotification(res[0].data)
          setWarehouseName(res[0].data[0].warehouse_name)
          setTitle(res[0].data[0].title)
          setContent(res[0].data[0].content)
        }
        else {
          return Error;
        }
      })
  }


  const handleShow = (e, id) => {
    setIdNotification(id)
    Promise.all([getData('http://127.0.0.1:8000/api/admin/notification/show/' + id + '?token=' + getToken())])
      .then(function (response) {
        // setIdNotification(response[0].data.id)
        setTitle(response[0].data[0].title)
        setContent(response[0].data[0].content)
        setCreatedAt(response[0].data[0].created_at)
        setCreatedBy(response[0].data[0].created_by)
        setFullName(response[0].data[0].fullname)
      })
  }
  //  const handleComplete = (id) => {
  //    Promise.all([getData('http://127.0.0.1:8000/api/admin/notification/updateStatus/' + id + '?token=' + getToken())])
  //    .then(function (res) => {

  //    })
  //  }
  const handleDelete = (e, id) => {
    // const eClick = e.currentTarget;
    console.log(id)
    Promise.all([delData('http://127.0.0.1:8000/api/admin/notification/delete/' + id + '?token=' + getToken())])
      .then(function (res) {
        handleReload()
        // eClick.closest('tr').remove();
      })
      .catch(error => {
        console.log(error)
      })
  }

  const handleListItem = (id) => {
    Promise.all([getData('http://127.0.0.1:8000/api/admin/notification/showListItemById/' + id + '?token=' + getToken())])
      .then(function (response) {
        console.log(response[0].data)
        setDataItem(response[0].data)
        // setNotValid(response[0].data)
      })
  }
  const handleReload = () => {
    Promise.all([getData('http://127.0.0.1:8000/api/admin/notification?token=' + getToken())])
      .then(function (res) {
        setNotification(res[0].data)
        setCountNotification(res[0].count)
      })
  }

  // const handleNotValid = (id) => {
  //   if (id !== '') {
  //     Promise.all([getData('http://127.0.0.1:8000/api/admin/warehouse/amountItemKKD/' + id + '?token=' + getToken(), { delay: false })])
  //       .then(function (response) {
  //         setNotValid(response[0].data)
  //       })
  //   }
  //   else {
  //     return Error;
  //   }
  // }

  useEffect(() => {
    Promise.all([getData('http://127.0.0.1:8000/api/admin/notification' + '?token=' + getToken())
    ]).then(function (res) {
      console.log(res[0].data)
      setNotification(res[0].data)
      setCountNotification(res[0].count)
    })
      .catch((error) => {
        // console.log(error)
      })
  }, [])

  return (
    <>
      <CDropdown variant="nav-item" placement={'bottom-start'} >
        <CDropdownToggle size={'lg'} placement="bottom-end" className="py-0" caret={false}>
          <CIcon icon={cilBell} size={'xl'} />
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {/* {countNotification} */}
            <span className="visually-hidden">unread messages</span>
          </span>
        </CDropdownToggle>
        <CDropdownMenu className="pt-0" placement="bottom-end" >
          <CCard>
            <CCardBody>
              {notification.map((item, index) => (
                <CDropdownItem key={index} href='#'
                  onClick={(e) => {
                    setVisible(!visible)
                    handleShow(e, item.id)
                  }}
                >
                  <CRow>
                    <strong>{item.fullname}</strong>
                    {/* <strong>{userProfile}</strong> đã tạo thông báo */}
                  </CRow>
                  <CRow>
                    {item.name} - {item.title}
                  </CRow>
                  <CRow>
                    {item.created_at}
                  </CRow>

                </CDropdownItem>

              ))}
            </CCardBody>
          </CCard>

          {/* <CDropdownDivider />
            <CDropdownItem><i><a href='#/notification-add' style={{textDecoration: "none"}}>tạo thông báo</a></i></CDropdownItem> */}
        </CDropdownMenu>

      </CDropdown>
      <CModal scrollable backdrop="static" alignment="center" size="xl" visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Thông báo</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <h5>Tiêu đề:</h5>
          <CListGroup>
            <CListGroupItem className='mb-3'> {title}</CListGroupItem>
          </CListGroup>
          <h5>Nội dung:</h5>
          <CCard>
            <CCardBody style={{ height: "350px" }}>
              {content}
            </CCardBody>
          </CCard>

        </CModalBody>


        <CModalFooter>
          <CButton color='success' onClick={(e) => {
            setVisible(false)
            handleDelete(e, idNotifiCation)
          }}>
            Hoàn thành
          </CButton>
          <div style={{ position: "relative", right: "0px" }}>
            Người tạo: {fullname}
          </div>
        </CModalFooter>
      </CModal>
    </>
  )

}

export default AppNotifications
