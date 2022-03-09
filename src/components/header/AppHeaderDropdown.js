/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import {
  CAvatar,
  CBadge,
  CButton,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilEnvelopeOpen,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar8 from './../../assets/images/avatars/8.jpg'
import { getRoleNames, getToken, getUser, getUserID, removeUserSession } from '../utils/Common'
import { useHistory } from 'react-router-dom'
import { getData } from 'src/views/api/Api'

const AppHeaderDropdown = () => {
  const history = useHistory()
  const [user, setUser] = useState([])

  var nameRole = ''
  getRoleNames().split(' ').map((item) => {
    if (isNaN(item)) nameRole += item + ' '
  })

  const handleLogout = () => {
    console.log(getToken())
    removeUserSession()
    console.log(getToken())
    history.push('/login')
  }

  useEffect(() => {
    Promise.all([getData('http://127.0.0.1:8000/api/auth/get-user/' + String(getUserID()) + '?token=' + getToken())])
      .then(function (res) {
        setUser(res[0].data[0].fullname)
        // console.log(res[0].data[0].fullname)
      })
      .catch(error => {
        console.log(error)
        if (error.response.status === 403) {
          history.push('/404')
        }
      })
  }, [])

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
        <CButton color="light" shape="rounded-pill">{user}</CButton>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">{"Chức vụ: " + nameRole.trim()}</CDropdownHeader>
        {/* <CDropdownItem href="#">
          <CIcon icon={cilBell} className="me-2" />
          Updates
          <CBadge color="info" className="ms-2">
            42
          </CBadge>
        </CDropdownItem> */}
        <CDropdownItem href="#">
          <CIcon icon={cilEnvelopeOpen} className="me-2" />
          Tin nhắn
          <CBadge color="success" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilTask} className="me-2" />
          Nhiệm vụ
          <CBadge color="danger" className="ms-2">
            10
          </CBadge>
        </CDropdownItem>
        {/* <CDropdownItem href="#">
          <CIcon icon={cilCommentSquare} className="me-2" />
          Comments
          <CBadge color="warning" className="ms-2">
            42
          </CBadge>
        </CDropdownItem> */}
        <CDropdownHeader className="bg-light fw-semibold py-2">Settings</CDropdownHeader>
        <CDropdownItem href="#/profile">
          <CIcon icon={cilUser} className="me-2" />
          Thông tin
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilSettings} className="me-2" />
          Cài đặt
        </CDropdownItem>
        {/* <CDropdownItem href="#">
          <CIcon icon={cilCreditCard} className="me-2" />
          Payments
          <CBadge color="secondary" className="ms-2">
            42
          </CBadge>
        </CDropdownItem> */}
        {/* <CDropdownItem href="#">
          <CIcon icon={cilFile} className="me-2" />
          Projects
          <CBadge color="primary" className="ms-2">
            42
          </CBadge>
        </CDropdownItem> */}
        <CDropdownDivider />
        <CDropdownItem onClick={handleLogout}>
          <CIcon icon={cilLockLocked} className="me-2" />
          Đăng xuất
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
