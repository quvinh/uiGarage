/* eslint-disable no-unused-vars */
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
  CRow,
  CCol,
  CFormSelect,
  CListGroup,
  CListGroupItem,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CAlert
} from '@coreui/react';
import { delData, getData, postData } from '../api/Api';
import { Link, useHistory } from 'react-router-dom';
import { getToken, getUserID } from 'src/components/utils/Common';
import CIcon from '@coreui/icons-react';
import { cifVn, cilAddressBook, cilArrowCircleRight, cilDelete, cilDescription, cilPeople } from '@coreui/icons';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import DateTimePicker from '@mui/lab/DateTimePicker';
import DatePicker from '@mui/lab/DatePicker';

const headerStyle = {
  backgroundColor: '#ff944d',
  fontWeight: 'bold',
}

const columns = [{
  dataField: 'username',
  text: 'User',
  headerStyle: headerStyle,
  filter: textFilter()
}, {
  dataField: 'fullname',
  text: 'Họ và tên',
  headerStyle: headerStyle,
  filter: textFilter()
}, {
  dataField: 'phone',
  text: 'SĐT',
  headerStyle: headerStyle,
  filter: textFilter()
}, {
  dataField: 'email',
  text: 'Email',
  headerStyle: headerStyle,
  filter: textFilter()
},
]

const rowStyle = (row, rowIndex) => {
  const style = {};
  rowIndex % 2 === 0 ? style.backgroundColor = '#c8e6c9' : style.backgroundColor = '#ffff99';
  return style
}


const Account = () => {
  const [dataTable, setDataTable] = useState([])
  const [dataUserDetail, setUserDetail] = useState([])
  const [dataPermission, setPermission] = useState([])
  const [dataRoles, setRoles] = useState([])

  const [dataUserClick, setDataUserClick] = useState([])

  const [rolesID, setRolesID] = useState('')
  const [permissionID, setPermissionID] = useState('')

  const [address, setAddress] = useState('')
  const [birthday, setBirthday] = useState(null)
  const [gender, setGender] = useState('')
  // const [onAddressChanged, setOnAddressChanged] = useState(false)
  // const [onBirthdayChanged, setOnBirthdayChanged] = useState(false)
  // const [onGenderChanged, setOnGenderChanged] = useState(false)
  const [isSelected, setIsSelected] = useState(false)
  const [checked, setChecked] = useState('')

  //Modal
  const [visibleInfo, setVisibleInfo] = useState(false)
  const [visibleRoles, setVisibleRoles] = useState(false)
  const [visibleRemove, setVisibleRemove] = useState(false)

  const history = useHistory()

  const showPermission = (roles_id) => {
    if (roles_id) {
      Promise.all([getData('http://127.0.0.1:8000/api/admin/auth_model/detail_roles/' + roles_id)])
        .then(function (res) {
          // console.log(res[0].data)
          setPermission(res[0].data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  const handleGetUsers = () => {
    Promise.all([getData('http://127.0.0.1:8000/api/auth/users?token=' + getToken())])
      .then(function (response) {
        setDataTable(response[0].data)
      })
      .catch(err => { history.push('/login') })
  }

  const handelSave = (user_id, roles_id) => {
    console.log(user_id)
    console.log(roles_id)
    Promise.all([postData('http://127.0.0.1:8000/api/admin/auth_model/user_roles', {
      user_id: user_id,
      roles_id: roles_id
    })])
      .then(function (res) {
        console.log('SAVED roles')
        handleGetUsers()
      })
      .catch(err => {
        console.log(err)
      })

  }

  const handleDelete = (id) => {
    Promise.all([delData('http://127.0.0.1:8000/api/admin/detail_user/delete/' + id)])
      .then(function (res) {
        console.log('Deleted')
        handleGetUsers()
        setVisibleRemove(false)
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    // const header = `Authorization: Bearer ${getToken()}`
    Promise.all([getData('http://127.0.0.1:8000/api/auth/users?token=' + getToken()),
    // Promise.all([getData('http://127.0.0.1:8000/api/auth/users', {headers: header}),
    getData('http://127.0.0.1:8000/api/admin/detail_user/show/' + getUserID()),
    getData('http://127.0.0.1:8000/api/admin/auth_model/roles'),
    getData('http://127.0.0.1:8000/api/admin/auth_model/permission')])
      .then(function (res) {
        setDataTable(res[0].data)
        setUserDetail(res[1].data)
        setRoles(res[2].data)
        setPermission(res[3])
        console.log(res[2].data[0]["name"])
        console.log(res[0].dataRoles)
      })
      .catch(error => {
        console.log(error)
        history.push('/login')
      })
  }, [])

  return (
    <>
      <p style={{ fontWeight: "bold" }}>&gt;Tài khoản</p>
      <CCard>
        <CCardHeader>Quản lý tài khoản</CCardHeader>
        <CCardBody>
          <CTable hover>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col" className="text-center">STT</CTableHeaderCell>
                <CTableHeaderCell scope="col" className="text-center">Tên đăng nhập</CTableHeaderCell>
                <CTableHeaderCell scope="col" className="text-center">Họ và tên</CTableHeaderCell>
                <CTableHeaderCell scope="col" className="text-center">SĐT</CTableHeaderCell>
                <CTableHeaderCell scope="col" className="text-center">Chức vụ</CTableHeaderCell>
                <CTableHeaderCell scope="col" className="text-center">Thao tác</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {
                dataTable.map((item, index) => (
                  <>
                    <CTableRow key={index}>
                      <CTableHeaderCell scope="row" className="text-center">{index + 1}</CTableHeaderCell>
                      <CTableDataCell className="text-center">{item.username}</CTableDataCell>
                      <CTableDataCell className="text-center">{item.fullname}</CTableDataCell>
                      <CTableDataCell className="text-center">{item.phone}</CTableDataCell>
                      <CTableDataCell className="text-center">{
                        (item.roles_id === null) ? ("Chưa phân quyền") : (
                          dataRoles.map((value) => {
                            if (value.id === item.roles_id) return value.name
                          })
                        )
                      }</CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CButton size="sm" className="me-2" color='warning' onClick={(e) => {
                          setDataUserClick(item)
                          setVisibleInfo(!visibleInfo)
                        }}>
                          <CIcon icon={cilDescription} />
                        </CButton>
                        <CButton size="sm" className="me-2" color='success' onClick={(e) => {
                          setDataUserClick(item)
                          setVisibleRoles(!visibleRoles)
                          showPermission(item.roles_id)
                        }}>
                          <CIcon icon={cilPeople} />
                        </CButton>
                        <CButton size="sm" className="me-2" color='danger' onClick={(e) => {
                          setDataUserClick(item)
                          setVisibleRemove(!visibleRemove)
                        }}>
                          <CIcon icon={cilDelete} />
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  </>
                ))
              }

            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
      <CModal alignment="center" size="md" visible={visibleInfo} onClose={() => setVisibleInfo(false)}>
        <CModalHeader>
          <CModalTitle>Thông tin: {dataUserClick.fullname}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CListGroup>
            <CListGroupItem component="button"><CIcon icon={cilArrowCircleRight} /> Username: {dataUserClick.username}</CListGroupItem>
            <CListGroupItem component="button"><CIcon icon={cilArrowCircleRight} /> Tên: {dataUserClick.fullname}</CListGroupItem>
            <CListGroupItem component="button"><CIcon icon={cifVn} /> SĐT: {dataUserClick.phone}</CListGroupItem>
            <CListGroupItem component="button"><CIcon icon={cilArrowCircleRight} /> Email: {dataUserClick.email}</CListGroupItem>
            <CListGroupItem component="button"><CIcon icon={cilArrowCircleRight} /> Chức vụ: {
              (dataUserClick.roles_id === null) ? ("Chưa phân quyền") : (
                dataRoles.map((value) => {
                  if (value.id === dataUserClick.roles_id) return value.name
                })
              )
            }</CListGroupItem>
            <CListGroupItem component="button"><CIcon icon={cilArrowCircleRight} /> Địa chỉ: {dataUserClick.address ? dataUserClick.address : "Chưa cập nhật"}</CListGroupItem>
            <CListGroupItem component="button"><CIcon icon={cilArrowCircleRight} /> Ngày sinh: {dataUserClick.birthday ? dataUserClick.birthday : "Chưa cập nhật"}</CListGroupItem>
            <CListGroupItem component="button"><CIcon icon={cilArrowCircleRight} /> Giới tính: {dataUserClick.gender ? dataUserClick.gender : "Chưa cập nhật"}</CListGroupItem>
          </CListGroup>
        </CModalBody>
      </CModal>
      <CModal alignment="center" size="lg" visible={visibleRoles} backdrop="static" onClose={() => {
        setVisibleRoles(false)
        setPermission([])
        setIsSelected(false)
        setRolesID()
      }}>
        <CModalHeader>
          <CModalTitle>Quyền hạn</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CCol>
              <CFormSelect size="lg" className="mb-3" value={rolesID ? rolesID : dataUserClick.roles_id} onChange={(e) => {
                showPermission(e.target.value)
                setRolesID(e.target.value)
                setIsSelected(true)
              }}>
                <option>Quyền hạn</option>
                {
                  dataRoles.map((item, index) => (
                    <option key={index} value={item.id}>{item.name}</option>
                  ))
                }
              </CFormSelect>
            </CCol>
            <CCol>
              <CListGroup>
                {
                  dataPermission.map((item, index) => (
                    <CListGroupItem key={index} component="button">{item.permission_name}</CListGroupItem>
                  ))
                }
              </CListGroup>
            </CCol>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => {
            setVisibleRoles(false)
            setPermission([])
            setIsSelected(false)
            setRolesID()
          }}>
            Huỷ
          </CButton>
          {
            (isSelected) ? (
              <CButton color="warning" onClick={() => {
                handelSave(dataUserClick.id, rolesID)
                setIsSelected(false)
              }}>Lưu</CButton>
            ) : (
              <CButton color="secondary">Lưu</CButton>
            )
          }
        </CModalFooter>
      </CModal>
      <CModal visible={visibleRemove} onClose={() => setVisibleRemove(false)}>
        <CModalHeader onClose={() => setVisibleRemove(false)}>
          <CModalTitle>Xác nhận xoá người dùng</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CAlert color="danger">
            Xoá người dùng `{dataUserClick.fullname}` trong hệ thống. Bạn chắc chứ ?
          </CAlert>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisibleRemove(false)}>
            Huỷ
          </CButton>
          <CButton color="warning" onClick={() => handleDelete(dataUserClick.id)}>Xoá</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default Account
