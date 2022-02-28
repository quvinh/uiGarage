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
  CForm,
  CInputGroup,
  CInputGroupText,
  CFormInput,
  CFormCheck,
  CFormSelect,
  CListGroup,
  CListGroupItem
} from '@coreui/react';
import { delData, getData, postData } from '../api/Api';
import { Link, useHistory } from 'react-router-dom';
import { getToken, getUserID } from 'src/components/utils/Common';
import CIcon from '@coreui/icons-react';
import { cilAddressBook, cilPeople } from '@coreui/icons';
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

  const [rolesID, setRolesID] = useState('')
  const [permissionID, setPermissionID] = useState('')

  const [address, setAddress] = useState('')
  const [birthday, setBirthday] = useState(null)
  const [gender, setGender] = useState('')
  const [onAddressChanged, setOnAddressChanged] = useState(false)
  const [onBirthdayChanged, setOnBirthdayChanged] = useState(false)
  const [onGenderChanged, setOnGenderChanged] = useState(false)
  const history = useHistory()

  // const handleAddressChange = (e) => {
  //   setAddress(e.target.value)
  //   setOnAddressChanged(true)
  // }

  // const handleBirthdayChange = (e) => {
  //   setBirthday(e.toLocaleDateString())
  //   setOnBirthdayChanged(true)
  // }

  const handleSelectedRoles = (e) => {
    let index = e.nativeEvent.target.selectedIndex;
    console.log(e.nativeEvent.target[index].text)
    // Promise.all([getData('http://127.0.0.1:8000/api/admin/auth_model/detail_roles/' + id)])
    //   .then(function (res) {
    //     setPermission(res[0].data)
    //     console.log(res[0].data)
    //   })
    //   .catch(error => {
    //     console.log(error)
    //     history.push('/login')
    //   })
  }

  const expandRow = {
    onlyOneExpanding: true,
    renderer: row => (
      <div>
        <CCard>
          <CRow>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <CButton color="success">X</CButton>
            </div>
            <CCol xs={4}>
              <CCardBody>
                <CForm>
                  <CInputGroup className="mb-4" size='sm'>
                    <CInputGroupText style={{ width: "90px", fontWeight: 'bold' }}>Địa chỉ</CInputGroupText>
                    <CFormInput
                      placeholder="Chưa cập nhật"
                      autoComplete="address"
                      value={address}
                      readOnly
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4" size='sm'>
                    <CInputGroupText style={{ width: "90px", fontWeight: 'bold' }}>Ngày sinh</CInputGroupText>
                    <CFormInput
                      placeholder="Chưa cập nhật"
                      autoComplete="birthday"
                      value={birthday}
                      readOnly
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4" size='sm'>
                    <CInputGroupText style={{ width: "90px", fontWeight: 'bold' }}>Giới tính</CInputGroupText>
                    <CFormInput
                      placeholder="Chưa cập nhật"
                      autoComplete="gender"
                      value={gender}
                      readOnly
                    />
                  </CInputGroup>
                </CForm>
                {/* <CButton color="success" onClick={(e) => btnUpdateDetailUser(e, row.id)}>Lưu</CButton> */}
              </CCardBody>
            </CCol>
            <CCol xs={8}>
              <CCardBody>
                <CRow>
                  <CCol>
                    <CFormSelect size="sm" className="mb-3" value={rolesID} onChange={(e) => setRolesID(e.target.value)}>
                      <option>Vai trò</option>
                      {dataRoles.map((item, index) => (
                        <option key={index} value={item.id} onChange={(e) => handleSelectedRoles(e)}>{item.name}</option>
                      ))}
                    </CFormSelect>
                  </CCol>
                  <CCol>
                    <CListGroup>
                      <CButton color='secondary' size='sm' style={{ fontWeight: 'bold' }}>Quyền hạn</CButton>
                      {
                        dataPermission.map((item, index) => {
                          <CListGroupItem key={index}>{item.permission_name}</CListGroupItem>
                        })
                      }
                    </CListGroup>
                  </CCol>
                </CRow>
                <br />
                <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                  <CButton size="sm" color="success">LƯU QUYỀN HẠN</CButton>
                </div>
              </CCardBody>
            </CCol>
          </CRow>
        </CCard>
      </div>
    ),
    showExpandColumn: true
  }

  const btnUpdateDetailUser = (e, id) => {
    // if (birthday) {
    //   const splitDate = birthday.split("/")
    //   const date = splitDate[2] + "/" + splitDate[0] + "/" + splitDate[1]
    //   const data = {
    //     user_id: id,
    //     address: address,
    //     birthday: date,
    //     gender: gender,
    //   }
    //   console.log(data)
    //   Promise.all([postData('http://127.0.0.1:8000/api/admin/detail_user/store/' + id, data)])
    //     .then(function (res) {
    //       console.log('Update successfully')
    //       setUserDetail(res[0].data)
    //     })
    //     .catch(err => {
    //       console.log(err)
    //     })
    // } else {
    //   console.log("-_-")
    // }
  }

  useEffect(() => {
    // const header = `Authorization: Bearer ${getToken()}`
    Promise.all([getData('http://127.0.0.1:8000/api/auth/users?token=' + getToken()),
    getData('http://127.0.0.1:8000/api/admin/detail_user/show/' + getUserID()),
    getData('http://127.0.0.1:8000/api/admin/auth_model/roles'),
    getData('http://127.0.0.1:8000/api/admin/auth_model/permission')])
      .then(function (res) {
        setDataTable(res[0].data)
        setUserDetail(res[1].data)
        setRoles(res[2].data)
        setPermission(res[3])
        console.log(res[3].data)
      })
      .catch(error => {
        console.log(error)
        // history.push('/login')
      })
  }, [])

  return (
    <>
      <p style={{ fontWeight: "bold" }}>&gt;Tài khoản</p>
      <BootstrapTable
        keyField='id'
        wrapperClasses="boo"
        data={dataTable}
        columns={columns}
        expandRow={expandRow}
        filter={filterFactory()}
        rowStyle={rowStyle}
        noDataIndication={'Không có dữ liệu'}
      />
    </>
  )
}

export default Account
