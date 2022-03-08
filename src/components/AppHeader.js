import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNav,
  CNavLink,
  CNavItem,
  CButton,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBell, cilEnvelopeOpen, cilList, cilMenu } from '@coreui/icons'

import { AppBreadcrumb } from './index'
import { AppHeaderDropdown, AppNotificationsDropdown } from './header/index'
import { logo } from 'src/assets/brand/logo'

const AppHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <CIcon icon={logo} height={48} alt="Logo" />
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNav variant="tabs" role="tablist">
            <CNavItem>
              <CNavLink to="/dashboard" component={NavLink} activeClassName="active">
                Bảng tin
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink to="/imports" component={NavLink}>
                Nhập kho
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink to="/exports" component={NavLink}>
                Xuất kho
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink to="/transfer" component={NavLink}>
                Điều phối kho
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink to="/history_import" component={NavLink}>
                QL Phiếu
              </CNavLink>
            </CNavItem>
            {/* <CNavItem>
              <CNavLink to="/reports" component={NavLink}>
                Báo cáo
              </CNavLink>
            </CNavItem> */}
          </CNav>
        </CHeaderNav>
        <CHeaderNav>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilEnvelopeOpen} size="lg" />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilList} size="lg" />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <AppNotificationsDropdown />
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav className="ms-3">
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
      <CHeaderDivider />
      {/* <CContainer fluid>
        <AppBreadcrumb />
      </CContainer> */}
    </CHeader>
  )
}

export default AppHeader
