import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

const Status = React.lazy(() => import('./views/status/Status'))

const Imports = React.lazy(() => import('./views/imports/Imports'))
const Exports = React.lazy(() => import('./views/exports/Exports'))
const Reports = React.lazy(() => import('./views/reports/Reports'))

const History = React.lazy(() => import('./views/history/History'))
const DataImport = React.lazy(() => import('./views/history/DataImport'))
const HistoryV2 = React.lazy(() => import('./views/history/HistoryV2'))

const Transfer = React.lazy(() => import('./views/transfer/Transfer'))

//Warehouse
const Warehouses = React.lazy(() => import('./views/warehouses/Warehouses'))
const EditWarehouses = React.lazy(() => import('./views/warehouses/Edit'))
const AddWarehouses = React.lazy(() => import('./views/warehouses/Add'))

//Categories
const Categories = React.lazy(() => import('./views/categories/Categories'))
const EditCategories = React.lazy(() => import('./views/categories/Edit'))
const AddCategories = React.lazy(() => import('./views/categories/Add'))

//Chart
const Charts = React.lazy(() => import('./views/charts/Charts'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Bản tin', component: Dashboard },
  { path: '/charts', name: 'Charts', component: Charts },
  { path: '/exports', name: 'Thông tin xuất kho', component: Exports },
  { path: '/status', name: 'Duyệt phiếu', component: Status },
  { path: '/imports', name: 'Thông tin nhập kho', component: Imports },
  { path: '/history', name: 'Kiểm kê tồn kho', component: History },
  { path: '/dataExport', name: 'Kiểm kê tồn kho', component: DataImport },
  { path: '/historyV2', name: 'Kiểm kê tồn kho', component: HistoryV2 },
  { path: '/reports', name: 'Báo cáo', component: Reports },
  { path: '/transfer', name: 'Điều phối kho', component: Transfer },

  { path: '/warehouses', name: 'Kho', component: Warehouses },
  { path: '/warehouses-add', name: 'Tạo kho', component: AddWarehouses },
  { path: '/warehouses-edit/:id', name: 'Chỉnh sửa kho', component: EditWarehouses },

  { path: '/categories', name: 'Kho', component: Categories },
  { path: '/categories-add', name: 'Tạo kho', component: AddCategories },
  { path: '/categories-edit/:id', name: 'Chỉnh sửa kho', component: EditCategories },
]

export default routes
