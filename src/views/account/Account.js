/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import { cifVn, cilArrowCircleRight, cilDelete, cilDescription, cilLibraryAdd, cilPenAlt, cilPeople } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import {
  CAlert, CButton, CCard, CCardBody, CCardHeader, CCol, CFormCheck, CFormInput, CInputGroup,
  CInputGroupText, CListGroup,
  CListGroupItem,
  CModal, CModalBody,
  CModalFooter, CModalHeader,
  CModalTitle, CRow, CTable, CTableBody,
  CTableDataCell, CTableHead, CTableHeaderCell, CTableRow
} from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { textFilter } from 'react-bootstrap-table2-filter';
import { useHistory } from 'react-router-dom';
import { getToken, getUserID } from 'src/components/utils/Common';
import { delData, getData, postData, putData } from '../api/Api';

const Account = () => {
  const [dataTable, setDataTable] = useState([])
  const [dataUserDetail, setUserDetail] = useState([])
  const [dataPermission, setPermission] = useState([])
  // const [dataCheckPermission, setDataCheckPermission] = useState([])
  const [dataRoles, setRoles] = useState([])
  const [dataWarehouse, setDataWarehouse] = useState([])

  const [dataUserClick, setDataUserClick] = useState([])
  const [dataRoleClick, setDataRoleClick] = useState([])

  const [roleName, setRoleName] = useState('')
  const [rolesID, setRolesID] = useState()
  const [permissionID, setPermissionID] = useState('')

  const [isSelected, setIsSelected] = useState(false)

  const [isCheckedAll, setIsCheckedAll] = useState(false)
  const [isCheckedPermission, setIsCheckedPermission] = useState([])
  const [isCheckedRole, setIsCheckedRole] = useState()
  const [isCheckedWarehouse, setIsCheckedWarehouse] = useState([])

  //Modal
  const [visibleInfo, setVisibleInfo] = useState(false)
  const [visibleRoles, setVisibleRoles] = useState(false)
  const [visibleRemove, setVisibleRemove] = useState(false)
  const [visibleRemoveRole, setVisibleRemoveRole] = useState(false)
  const [visibleEditRole, setVisibleEditRole] = useState(false)
  const [visibleAddRole, setVisibleAddRole] = useState(false)

  const history = useHistory()

  const showPermission = (user_id, roles_id) => {
    console.log(user_id)
    console.log(roles_id)
    if (roles_id) {
      Promise.all([getData('http://127.0.0.1:8000/api/admin/auth_model/detail_roles/' + user_id + '/' + roles_id + '?token=' + getToken())])
        .then(function (res) {
          console.log(res[0].roleName.id)
          setIsCheckedPermission(res[0].data.map(item => item.name))
          setIsCheckedWarehouse(res[0].manager.map(item => String(item.warehouse_id)))
          setIsCheckedRole(res[0].roleName.id)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
  console.log(isCheckedWarehouse)
  const handleCheckPermissionAll = (e) => {
    setIsCheckedAll(!isCheckedAll)
    setIsCheckedPermission(dataPermission.map(item => item.name))
    isCheckedAll && setIsCheckedPermission([])
    setIsSelected(true)
  }

  const handleCheckPermission = (e) => {
    const { name, checked } = e.target
    setIsCheckedPermission([...isCheckedPermission, name])
    !checked && setIsCheckedPermission(isCheckedPermission.filter(item => item !== name))
    setIsSelected(true)
  }

  const handleCheckWarehouse = (e) => {
    const { id, checked } = e.target
    console.log(id)
    setIsCheckedWarehouse([...isCheckedWarehouse, id])
    !checked && setIsCheckedWarehouse(isCheckedWarehouse.filter(item => item !== id))
    setIsSelected(true)
  }
  // console.log(isCheckedWarehouse.includes(1))

  const handleCheckRole = (e) => {
    setIsCheckedRole(e.target.value)
    setIsSelected(true)
  }
  console.log(isCheckedRole)
  const handleGetUsers = () => {
    Promise.all([getData('http://127.0.0.1:8000/api/auth/users?token=' + getToken())])
      // Promise.all([getData('http://127.0.0.1:8000/api/auth/users', {headers:{'Authorization': 'Bearer ' + getToken()}})])
      .then(function (response) {
        console.log("daTA:", response)
        setDataTable(response[0].data)
      })
      .catch(err => {
        // history.push('/login')
        console.log(err)
      })
  }

  //Save user role
  const handelSave = (user_id, roles_id, permission, warehouse_id) => {
    console.log("......")
    if (user_id !== "" && roles_id !== "" && permission.length > 0 && warehouse_id.length > 0) {
      Promise.all([postData('http://127.0.0.1:8000/api/admin/auth_model/user_roles?token=' + getToken(), {
        user_id: user_id,
        roles_id: roles_id,
        permission: permission,
        warehouse_id: warehouse_id
      })])
        .then(function (res) {
          console.log('SAVED roles')
          handleGetUsers()
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      console.log("NO")
    }
  }

  //Update role name
  const handelUpdateRoleName = (role_id, role_name) => {
    Promise.all([putData('http://127.0.0.1:8000/api/admin/auth_model/roles/update/' + role_id + '?token=' + getToken(), {
      name: role_name
    })])
      .then(function (res) {
        console.log('UPDATED role name')
        handleGetRoleNames()
        setVisibleEditRole(!visibleEditRole)
      })
      .catch(err => {
        console.log(err)
      })
  }

  //Add role name
  const handelAddRole = (role_name) => {
    Promise.all([postData('http://127.0.0.1:8000/api/admin/auth_model/roles/store?token=' + getToken(), {
      name: role_name
    })])
      .then(function (res) {
        console.log('STORED role name')
        handleGetRoleNames()
      })
      .catch(err => {
        console.log(err)
      })
  }

  const handelDeleteRole = (role_id) => {
    Promise.all([delData('http://127.0.0.1:8000/api/admin/auth_model/roles/delete/' + role_id + '?token=' + getToken())])
      .then(function (res) {
        console.log('UPDATED role name')
        handleGetRoleNames()
        handleGetUsers()
        setVisibleRemoveRole(!visibleRemoveRole)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const handleDelete = (id) => {
    Promise.all([delData('http://127.0.0.1:8000/api/admin/detail_user/delete/' + id + '?token=' + getToken())])
      .then(function (res) {
        console.log('Deleted')
        handleGetUsers()
        setVisibleRemove(false)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const handleGetRoleNames = () => {
    Promise.all([getData('http://127.0.0.1:8000/api/admin/auth_model/roles?token=' + getToken())])
      .then(function (res) {
        setRoles(res[0].data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  useEffect(() => {
    // const header = `Authorization: Bearer ${getToken()}`
    Promise.all([
      getData('http://127.0.0.1:8000/api/auth/users?token=' + getToken()),
      // Promise.all([getData('http://127.0.0.1:8000/api/auth/users', {headers:{'Authorization': 'Bearer ' + getToken()}}),
      getData('http://127.0.0.1:8000/api/admin/detail_user/show/' + getUserID() + '?token=' + getToken()),
      getData('http://127.0.0.1:8000/api/admin/auth_model/roles?token=' + getToken()),
      getData('http://127.0.0.1:8000/api/admin/auth_model/permission?token=' + getToken()),
      getData('http://127.0.0.1:8000/api/admin/warehouse?token=' + getToken()),
    ])
      .then(function (res) {

        setDataTable(res[0].data)
        setUserDetail(res[1].data)
        setRoles(res[2].data)
        setPermission(res[3].data)
        setDataWarehouse(res[4].data)
      })
      .catch(error => {
        console.log(error)
        // if (error.response.status === 403) {
        //   history.push('/404')
        // } else if (error.response.status === 401) {
        //   history.push('/login')
        // }
      })
  }, [])

  return (
    <>
      <p style={{ fontWeight: "bold" }}>&gt;T??i kho???n</p>
      <CCard>
        <CCardHeader>Qu???n l?? t??i kho???n</CCardHeader>
        <CCardBody>
          <CTable hover>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col" className="text-center">STT</CTableHeaderCell>
                <CTableHeaderCell scope="col" className="text-center">T??n ????ng nh???p</CTableHeaderCell>
                <CTableHeaderCell scope="col" className="text-center">H??? v?? t??n</CTableHeaderCell>
                <CTableHeaderCell scope="col" className="text-center">S??T</CTableHeaderCell>
                <CTableHeaderCell scope="col" className="text-center">Ch???c v???</CTableHeaderCell>
                <CTableHeaderCell scope="col" className="text-center">Thao t??c</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {
                dataTable.map((item, index) => (

                  <CTableRow key={index}>
                    <CTableHeaderCell scope="row" className="text-center">{index + 1}</CTableHeaderCell>
                    <CTableDataCell className="text-center">{item.username}</CTableDataCell>
                    <CTableDataCell className="text-center">{item.fullname}</CTableDataCell>
                    <CTableDataCell className="text-center">{item.phone}</CTableDataCell>
                    <CTableDataCell className="text-center">{
                      (item.roles_id === null) ? ("Ch??a ph??n quy???n") : (
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
                        showPermission(item.id, item.roles_id)
                        // console.log(dataCheckPermission)
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

                ))
              }

            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
      <CModal alignment="center" size="lg" visible={visibleInfo} onClose={() => setVisibleInfo(false)}>
        <CModalHeader>
          <CModalTitle>Th??ng tin: {dataUserClick.fullname}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CListGroup>
            <CListGroupItem component="button"><CIcon icon={cilArrowCircleRight} /> Username: {dataUserClick.username}</CListGroupItem>
            <CListGroupItem component="button"><CIcon icon={cilArrowCircleRight} /> T??n: {dataUserClick.fullname}</CListGroupItem>
            <CListGroupItem component="button"><CIcon icon={cifVn} /> S??T: {dataUserClick.phone}</CListGroupItem>
            <CListGroupItem component="button"><CIcon icon={cilArrowCircleRight} /> Email: {dataUserClick.email}</CListGroupItem>
            <CListGroupItem component="button"><CIcon icon={cilArrowCircleRight} /> Ch???c v???: {
              (dataUserClick.roles_id === null) ? ("Ch??a ph??n quy???n") : (
                dataRoles.map((value) => {
                  if (value.id === dataUserClick.roles_id) return value.name
                })
              )
            }</CListGroupItem>
            <CListGroupItem component="button"><CIcon icon={cilArrowCircleRight} /> ?????a ch???: {dataUserClick.address ? dataUserClick.address : "Ch??a c???p nh???t"}</CListGroupItem>
            <CListGroupItem component="button"><CIcon icon={cilArrowCircleRight} /> Ng??y sinh: {dataUserClick.birthday ? dataUserClick.birthday : "Ch??a c???p nh???t"}</CListGroupItem>
            <CListGroupItem component="button"><CIcon icon={cilArrowCircleRight} /> Gi???i t??nh: {dataUserClick.gender ? dataUserClick.gender : "Ch??a c???p nh???t"}</CListGroupItem>
          </CListGroup>
        </CModalBody>
      </CModal>

      <CModal alignment="center" fullscreen visible={visibleRoles} backdrop="static" onClose={() => {
        setVisibleRoles(false)
        // setPermission([])
        setIsCheckedPermission([])
        setIsCheckedWarehouse([])
        setIsCheckedAll(false)
        setIsSelected(false)
        setRolesID()
      }}>
        <CModalHeader>
          <CModalTitle style={{ minWidth: "95%" }}>
            <CRow>
              <CCol>
                <span>Ph??n quy???n ng?????i d??ng</span>
              </CCol>
              <CCol>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  {
                    (isSelected) ? (
                      <CButton color="warning" style={{ minWidth: 200 }} onClick={() => {
                        handelSave(dataUserClick.id, isCheckedRole, isCheckedPermission, isCheckedWarehouse)
                        setIsSelected(false)
                      }}>L??u ph??n quy???n</CButton>
                    ) : (
                      <CButton color="secondary" style={{ minWidth: 200 }}  >L??u ph??n quy???n</CButton>
                    )
                  }
                </div>
              </CCol>
            </CRow>
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CCol xs={6}>
              <CCard>
                <CCardHeader>Th??ng tin ng?????i d??ng</CCardHeader>
                <CCardBody>
                  <CListGroup>
                    <CListGroupItem><span>T??n ????ng nh???p: </span>{dataUserClick.username}</CListGroupItem>
                    <CListGroupItem><span>H??? v?? t??n: </span>{dataUserClick.fullname}</CListGroupItem>
                  </CListGroup>
                </CCardBody>
              </CCard>
              <br />
              <CCard>
                <CCardHeader>
                  <CRow>
                    <CCol>
                      Ch???c v???
                    </CCol>
                    <CCol>
                      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <CButton size="sm" color="warning" onClick={(e) => {
                          setRoleName()
                          setVisibleAddRole(!visibleAddRole)
                        }}>
                          <CIcon icon={cilLibraryAdd} />
                        </CButton>
                      </div>
                    </CCol>
                  </CRow>
                </CCardHeader>
                <CCardBody>
                  <CRow xs={{ gutter: 2 }}>
                    {
                      dataRoles && dataRoles.map((item, index) => (
                        // <option key={index} value={item.id}>{item.name}</option>
                        <>
                          <CCol xs={{ span: 6 }} key={index}>
                            {/* <CListGroupItem> */}
                            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                              <CInputGroup>
                                <CFormInput value={item.name !== "admin" ? item.name : "Administrator"} disabled />
                                <CInputGroupText>
                                  <CFormCheck type="radio" value={item.id} checked={String(item.id) === String(isCheckedRole)} name="role" onChange={(e) => handleCheckRole(e)} />
                                </CInputGroupText>
                              </CInputGroup>
                              <CButton size="sm" color="info"
                                disabled={item.name !== "admin" ? false : true}
                                onClick={() => {
                                  setDataRoleClick(item)
                                  setVisibleEditRole(!visibleEditRole)
                                  setRoleName(item.name)
                                }}
                              >
                                <CIcon icon={cilPenAlt} />
                              </CButton>
                              <CButton size="sm" color="danger"
                                disabled={item.name !== "admin" ? false : true}
                                onClick={() => {
                                  setDataRoleClick(item)
                                  setVisibleRemoveRole(!visibleRemoveRole)
                                }}
                              >
                                <CIcon icon={cilDelete} />
                              </CButton>
                            </div>
                          </CCol>
                        </>
                      ))
                    }
                  </CRow>
                </CCardBody>
              </CCard>
              <br />
              <CCard>
                <CCardHeader>Ho???t ?????ng</CCardHeader>
                <CCardBody>
                  <CRow xs={{ gutter: 2 }}>
                    {
                      dataWarehouse && dataWarehouse.map((item, index) => (
                        <>
                          <CInputGroup key={index}>
                            <CFormInput value={item.name} disabled />
                            <CInputGroupText>
                              <CFormCheck type="checkbox" id={parseInt(item.id)} checked={isCheckedWarehouse.includes(String(item.id))} onChange={(e) => handleCheckWarehouse(e)} />
                            </CInputGroupText>
                          </CInputGroup>
                        </>
                      ))
                    }
                  </CRow>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol xs={6}>
              <CCard>
                <CCardHeader>Quy???n h???n</CCardHeader>
                <CCardBody>
                  <CRow xs={{ gutter: 2 }}>
                    <CInputGroup>
                      <CInputGroupText>
                        <CFormCheck type="checkbox" name="selectAllPermission" onChange={() => handleCheckPermissionAll()} checked={isCheckedAll} />
                      </CInputGroupText>
                      <CFormInput value="CH???N T???T C???" disabled />
                    </CInputGroup>
                    {
                      dataPermission && dataPermission.map((item, index) => (
                        <>
                          <CInputGroup>
                            <CInputGroupText>
                              <CFormCheck type="checkbox" name={item.name} checked={isCheckedPermission.includes(item.name)} onChange={(e) => handleCheckPermission(e)} />
                            </CInputGroupText>
                            <CFormInput value={item.name} disabled />
                          </CInputGroup>
                        </>
                      ))
                    }
                  </CRow>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CModalBody>
        <CModalFooter>
        </CModalFooter>
      </CModal>

      {/* Remove user */}
      <CModal visible={visibleRemove} onClose={() => setVisibleRemove(false)}>
        <CModalHeader onClose={() => setVisibleRemove(false)}>
          <CModalTitle>X??c nh???n xo?? ng?????i d??ng</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CAlert color="danger">
            Xo?? ng?????i d??ng `{dataUserClick.fullname}` trong h??? th???ng. B???n ch???c ch??? ?
          </CAlert>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisibleRemove(false)}>
            Hu???
          </CButton>
          <CButton color="warning" onClick={() => handleDelete(dataUserClick.id)}>Xo??</CButton>
        </CModalFooter>
      </CModal>

      {/* Remove role */}
      <CModal visible={visibleRemoveRole} onClose={() => setVisibleRemoveRole(false)}>
        <CModalHeader onClose={() => setVisibleRemoveRole(false)}>
          <CModalTitle>X??c nh???n xo?? ch???c v???</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CAlert color="danger">
            Xo?? ch???c v??? `{dataRoleClick.name}` trong h??? th???ng. B???n ch???c ch??? ?
          </CAlert>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisibleRemoveRole(false)}>
            Hu???
          </CButton>
          <CButton color="warning" onClick={(e) => handelDeleteRole(dataRoleClick.id)}>Xo??</CButton>
        </CModalFooter>
      </CModal>

      {/* Edit role */}
      <CModal visible={visibleEditRole} onClose={() => setVisibleEditRole(false)}>
        <CModalHeader onClose={() => setVisibleEditRole(false)}>
          <CModalTitle>Ch???nh s???a ch???c v???</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CInputGroup className="flex-nowrap">
            <CInputGroupText id="addon-wrapping">Ch???c v???</CInputGroupText>
            <CFormInput value={roleName} onChange={(e) => setRoleName(e.target.value)} />
          </CInputGroup>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisibleEditRole(false)}>
            Hu???
          </CButton>
          <CButton color="success" onClick={(e) => {
            handelUpdateRoleName(dataRoleClick.id, roleName)
          }}>L??u</CButton>
        </CModalFooter>
      </CModal>

      {/* Add role */}
      <CModal visible={visibleAddRole} onClose={() => setVisibleAddRole(false)}>
        <CModalHeader onClose={() => setVisibleAddRole(false)}>
          <CModalTitle>Th??m ch???c v???</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CInputGroup className="flex-nowrap">
            <CInputGroupText id="addon-wrapping">Ch???c v???</CInputGroupText>
            <CFormInput value={roleName} onChange={(e) => setRoleName(e.target.value)} />
          </CInputGroup>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisibleAddRole(false)}>
            Hu???
          </CButton>
          <CButton color="success" onClick={(e) => {
            handelAddRole(roleName)
            setVisibleAddRole(false)
          }}>L??u</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default Account
