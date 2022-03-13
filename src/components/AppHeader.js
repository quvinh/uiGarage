/* eslint-disable prettier/prettier */
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
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBell, cilEnvelopeOpen, cilList, cilMenu } from '@coreui/icons'

import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from './header/index'
import { logo } from 'src/assets/brand/logo'
import { getAllPermissions, getRoleNames } from './utils/Common'
import AppNotifications from './header/AppNotifications'
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
              <CDropdown variant="nav-item">
                <CDropdownToggle>Danh mục</CDropdownToggle>
                <CDropdownMenu>
                  {
                    getAllPermissions().includes("Thêm kho","Sửa kho","Xoá kho","Xem kho") && (
                      <CDropdownItem href="#/warehouses">Quản lý kho</CDropdownItem>
                    )
                  }
                  {/* {
                    getRoleNames() === "admin" ? (
                      <>
                        <CDropdownItem href="#/warehouses">Quản lý kho</CDropdownItem>
                      </>
                    ) : (<></>)
                  } */}
                  <CDropdownItem href="#/categories">Các loại phụ tùng</CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            </CNavItem>
            <CNavItem>
              <CNavLink to="/dashboard" component={NavLink} activeClassName="active">
                Bảng tin
              </CNavLink>
            </CNavItem>
            {
              getAllPermissions().includes("Thêm phiếu nhập") && (
                <CNavItem>
                  <CNavLink to="/imports" component={NavLink}>
                    Nhập kho
                  </CNavLink>
                </CNavItem>
              )
            }
            {
              getAllPermissions().includes("Thêm phiếu xuất") && (
                <CNavItem>
                  <CNavLink to="/exports" component={NavLink}>
                    Xuất kho
                  </CNavLink>
                </CNavItem>
              )
            }
            {
              getAllPermissions().includes("Thêm phiếu chuyển") && (
                <CNavItem>
                  <CNavLink to="/transfer" component={NavLink}>
                    Điều phối kho
                  </CNavLink>
                </CNavItem>
              )
            }
            <CNavItem>
              {/* <CNavLink to="/history_import" component={NavLink}>
                    QL Phiếu
                  </CNavLink> */}
              <CDropdown variant="nav-item">
                <CDropdownToggle>QL Phiếu</CDropdownToggle>
                <CDropdownMenu>
                  {
                    getAllPermissions().includes("Xem phiếu nhập","Sửa phiếu nhập","Xoá phiếu nhập","Duyệt phiếu nhập") && (
                      <CDropdownItem href="#/history_import">Phiếu nhập</CDropdownItem>
                    )
                  }
                  {
                    getAllPermissions().includes("Sửa phiếu xuất","Xoá phiếu xuất","Xem phiếu xuất","Duyệt phiếu xuất") && (
                      <CDropdownItem href="#/history_export">Phiếu xuất</CDropdownItem>
                    )
                  }
                  {
                    getAllPermissions().includes("Sửa phiếu chuyển","Xoá phiếu chuyển","Xem phiếu chuyển","Duyệt phiếu chuyển") && (
                      <CDropdownItem href="#/history_transfer">Phiếu luân chuyển</CDropdownItem>
                    )
                  }
                </CDropdownMenu>
              </CDropdown>
            </CNavItem>
            {

              getRoleNames().includes("admin") && (
                <CNavItem>
                  <CDropdown variant="nav-item">
                    <CDropdownToggle>Quản trị</CDropdownToggle>
                    <CDropdownMenu>
                      <CDropdownItem href="#/account">Quản lý người dùng</CDropdownItem>
                      {/* <CDropdownItem href="#/role">Quản lý phân quyền</CDropdownItem> */}
                      <CDropdownItem href="#/register">Cấp tài khoản</CDropdownItem>
                    </CDropdownMenu>
                  </CDropdown>
                </CNavItem>
              )
            }
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
              <AppNotifications />
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
