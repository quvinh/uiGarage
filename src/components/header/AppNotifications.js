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
import { getToken } from '../utils/Common';

const AppNotificationsDropdown = () => {

  const myRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const [visible1, setVisible1] = useState(false)
  const [notification, setNotification] = useState([])
  const [dataNotification, setDataNotification] = useState([])
  // const [dataNotification, setDataNotification] = useState([])

  const [title, setTitle] = useState([])
  const [content, setContent] = useState([])
  const [warehouseName, setWarehouseName] = useState([])
  const [notValid, setNotValid] = useState([])
  const [dataItem, setDataItem] = useState([])
  const [countNotification, setCountNotification] = useState([])


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

  const handleListItem = (id) => {
    Promise.all([getData('http://127.0.0.1:8000/api/admin/notification/showListItemById/' + id + '?token=' + getToken())])
      .then(function (response) {
        console.log(response[0].data)
        setDataItem(response[0].data)
        // setNotValid(response[0].data)
      })
  }

  const handleNotValid = (id) => {
    if (id !== '') {
      Promise.all([getData('http://127.0.0.1:8000/api/admin/warehouse/amountItemKKD/' + id + '?token=' + getToken(), { delay: false })])
        .then(function (response) {
          setNotValid(response[0].data)
        })
    }
    else {
      return Error;
    }
  }

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
            {countNotification}
            <span className="visually-hidden">unread messages</span>
          </span>
        </CDropdownToggle>
        <CDropdownMenu ref={myRef} className="pt-0" placement="bottom-end" >
          {notification.map((item, index) => (
            <CDropdownItem key={index} href='#'
              onClick={() => {
                setVisible(!visible)
                handleNotification(item.code)
              }}>
              <CRow>
                {item.name} - {item.title}
              </CRow>
              <CRow>
                {item.created_at}
              </CRow>

            </CDropdownItem>

          ))}
          <CDropdownDivider />
          <CDropdownItem><i><a href='#/notification-add'>tạo thông báo</a></i></CDropdownItem>
        </CDropdownMenu>

      </CDropdown>
      <CModal scrollable backdrop="static" alignment="center" size="xl" visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>{warehouseName} - {title}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CCard>
            <CCardBody>
              <CListGroup>
                <CListGroupItem>{content}</CListGroupItem>
              </CListGroup>
              <CTable>
                <CTableHead color="warning">
                  <CTableRow>
                    <CTableHeaderCell>Mã vật tư</CTableHeaderCell>
                    <CTableHeaderCell>Tên vật tư</CTableHeaderCell>
                    <CTableHeaderCell>Số lượng</CTableHeaderCell>
                    <CTableHeaderCell>Đơn vị tính</CTableHeaderCell>
                    <CTableHeaderCell>Thao tác</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {dataNotification.map((item, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell>{item.item_id}</CTableDataCell>
                      <CTableDataCell>{item.item_name}</CTableDataCell>
                      <CTableDataCell>{item.amount}</CTableDataCell>
                      <CTableDataCell>{item.unit}</CTableDataCell>
                      <CTableDataCell>
                        <CButton onClick={() => {
                          setVisible1(!visible1)
                          handleNotValid(item.item_id)
                          handleListItem(item.item_id)
                        }} color="white">
                          <CIcon icon={cilMagnifyingGlass} />
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CModalBody>
        <CModalFooter>
          <CButton href='#/notification-add' onClick={() => {
            setVisible1(false)
            setVisible(false)
          }} color="warning"><CIcon icon={cilPlus} />
          </CButton>
          <CButton color="success"><CIcon icon={cilPaperPlane} /></CButton>
          <CButton color="danger" onClick={() => setVisible(false)}>
            <CIcon icon={cilX} />
          </CButton>
        </CModalFooter>
      </CModal>
      <CModal fullscreen visible={visible1} onClose={() => setVisible1(false)}>
        <CModalHeader>
          <CModalTitle>Danh sách vật tư</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CCard>
            <CCardBody>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">Mã vật tư</TableCell>
                      <TableCell align="left">Tên vật tư</TableCell>
                      <TableCell align="left">Mã kho</TableCell>
                      <TableCell align="left">Tên kho</TableCell>
                      <TableCell align="left">Mã giá kệ</TableCell>
                      <TableCell align="left">Tên giá kệ</TableCell>
                      <TableCell align="left">Số lượng</TableCell>
                      <TableCell align="left">Đơn vị tính</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dataItem.map((row) => (
                      <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row" align="left">{row.itemid}</TableCell>
                        <TableCell align="left">{row.itemname}</TableCell>
                        <TableCell align="left">{row.warehouseid}</TableCell>
                        <TableCell align="left">{row.warehousename}</TableCell>
                        <TableCell align="left">{row.shelfid}</TableCell>
                        <TableCell align="left">{row.shelfname}</TableCell>
                        <TableCell align="left">{row.itemamount - notValid}</TableCell>
                        <TableCell align="left">{row.itemunit}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CCardBody>
          </CCard>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible1(false)}>
            Close
          </CButton>
          {/* <CButton href='#/notification-add' onClick={() => setVisible1(false)} color="primary">Tạo phiếu</CButton> */}
        </CModalFooter>
      </CModal>
    </>
  )

}

export default AppNotificationsDropdown
