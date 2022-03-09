import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilNotes,
  cilPeople,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Bảng tin',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: 'Chức năng',
  },
  {
    component: CNavGroup,
    name: 'Danh mục',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Điều phối kho',
        to: '/transfer',
      },
      {
        component: CNavItem,
        name: 'Quản lý kho',
        to: '/warehouses',
      },
      {
        component: CNavItem,
        name: 'Loại phụ tùng',
        to: '/categories',
      },
      // {
      //   component: CNavItem,
      //   name: 'Báo giá',
      //   to: '/',
      // },
      // {
      //   component: CNavItem,
      //   name: 'Nhà cung cấp',
      //   to: '/',
      // },
      // {
      //   component: CNavItem,
      //   name: 'Khách hàng',
      //   to: '/',
      // },
    ],
  },
  {
    component: CNavItem,
    name: 'Thông tin tài khoản',
    to: '/profile',
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Thông báo',
    to: '/notification',
    icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
  },
  // {
  //   component: CNavGroup,
  //   name: 'Quản trị',
  //   icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Các kho',
  //       to: '#',
  //     },
  //   ],
  // },
  // {
  //   component: CNavTitle,
  //   name: 'Mở rộng',
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Pages',
  //   icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Admin',
  //       to: '/account',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Cấp tài khoản',
  //       to: '/register',
  //     },
  //   ],
  // },
]

export default _nav
