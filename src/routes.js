import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Account = React.lazy(() => import('./views/account/Account'))
const Profile = React.lazy(() => import('./views/account/Profile'))

const Status = React.lazy(() => import('./views/status/Status'))

const Imports = React.lazy(() => import('./views/imports/Imports'))
const Exports = React.lazy(() => import('./views/exports/Exports'))
const Reports = React.lazy(() => import('./views/reports/Reports'))

const HistoryImport = React.lazy(() => import('./views/history/HistoryImport'))
const HistoryTransfer = React.lazy(() => import('./views/history/HistoryTransfer'))
const HistoryExport = React.lazy(() => import('./views/history/HistoryExport'))

const Transfer = React.lazy(() => import('./views/transfer/Transfer'))

//Warehouse
const Warehouses = React.lazy(() => import('./views/warehouses/Warehouses'))
const EditWarehouses = React.lazy(() => import('./views/warehouses/Edit'))
const AddWarehouses = React.lazy(() => import('./views/warehouses/Add'))
const ShelfWarehouse = React.lazy(() => import('./views/warehouses/Shelfwarehouse'))

//Categories
const Categories = React.lazy(() => import('./views/categories/Categories'))
const EditCategories = React.lazy(() => import('./views/categories/Edit'))
const AddCategories = React.lazy(() => import('./views/categories/Add'))

//Shelves
const Shelves = React.lazy(() => import('./views/shelf/Shelves'))
const EditShelves = React.lazy(() => import('./views/shelf/Edit'))
const AddShelves = React.lazy(() => import('./views/shelf/Add'))
// const AddShelves1 = React.lazy(() => import('./views/shelf/Add'))

// Detail_item
// const Shelves = React.lazy(() => import('./views/detail_item/Detail_item'))
const EditDetailItem = React.lazy(() => import('./views/detail_item/Edit'))
// const AddShelves = React.lazy(() => import('./views/detail_item/Add'))

//Chart
const Charts = React.lazy(() => import('./views/charts/Charts'))

//Notification
const Notification = React.lazy(() => import('./views/notifications/Notification'))
const AddNotification = React.lazy(() => import('./views/notifications/AddNeedItem'))

//Supplier
const Suppliers = React.lazy(() => import('./views/suppliers/Suppliers'))
const AddSuppliers = React.lazy(() => import('./views/suppliers/Add'))
const EditSuppliers = React.lazy(() => import('./views/suppliers/Edit'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/account', name: 'User', component: Account },
  { path: '/profile', name: 'Profile', component: Profile },
  { path: '/dashboard', name: 'Bản tin', component: Dashboard },
  { path: '/charts', name: 'Charts', component: Charts },
  { path: '/exports', name: 'Thông tin xuất kho', component: Exports },
  { path: '/status', name: 'Duyệt phiếu', component: Status },
  { path: '/imports', name: 'Thông tin nhập kho', component: Imports },
  { path: '/history_import', name: 'Kiểm kê tồn kho', component: HistoryImport },
  { path: '/history_transfer', name: 'Kiểm kê tồn kho', component: HistoryTransfer },
  { path: '/history_export', name: 'Kiểm kê tồn kho', component: HistoryExport },
  { path: '/reports', name: 'Báo cáo', component: Reports },
  { path: '/transfer', name: 'Điều phối kho', component: Transfer },

  { path: '/warehouses', name: 'Kho', component: Warehouses },
  { path: '/warehouses-add', name: 'Tạo kho', component: AddWarehouses },
  { path: '/warehouses-edit/:id', name: 'Chỉnh sửa kho', component: EditWarehouses },
  { path: '/warehouses-shelf/:id', name: 'kệ trong kho', component: ShelfWarehouse },

  { path: '/categories', name: 'Category', component: Categories },
  { path: '/categories-add', name: 'Tạo category', component: AddCategories },
  { path: '/categories-edit/:id', name: 'Chỉnh sửa category', component: EditCategories },

  { path: '/shelf', name: 'Giá', component: Shelves },
  { path: '/shelf-add/:id', name: 'Tạo giá', component: AddShelves },
  // { path: '/shelf-add/:id', name: 'Tạo kho', component: AddShelves1 },
  { path: '/shelf-edit/:id', name: 'Chỉnh sửa kho', component: EditShelves },
  { path: '/detail_item-edit/:id', name: 'Chỉnh sửa vật tư', component: EditDetailItem },

  { path: '/notification', name: 'Thông báo', component: Notification },
  { path: '/notification-add', name: 'Tạo thông báo', component: AddNotification },

  { path: '/supplier', name: 'Nhà cung cấp', component: Suppliers },
  { path: '/supplier-add', name: 'Tạo mới nhà cung cấp', component: AddSuppliers },
  { path: '/supplier-edit/:id', name: 'Chỉnh sửa nhà cung cấp', component: EditSuppliers },
]

export default routes
