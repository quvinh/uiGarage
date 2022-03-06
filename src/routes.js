import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

const Items = React.lazy(() => import('./views/items/Items'))
const Imports = React.lazy(() => import('./views/imports/Imports'))
const Exports = React.lazy(() => import('./views/exports/Exports'))
const Reports = React.lazy(() => import('./views/reports/Reports'))
const Inventory = React.lazy(() => import('./views/inventory/Inventory'))
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
const Itemshelf = React.lazy(() => import('./views/warehouses/Itemshelf'))

// Detail_item
// const Shelves = React.lazy(() => import('./views/detail_item/Detail_item'))
const EditDetailItem = React.lazy(() => import('./views/detail_item/Edit'))
// const AddShelves = React.lazy(() => import('./views/detail_item/Add'))

//Chart
const Charts = React.lazy(() => import('./views/charts/Charts'))

//Notification
const Notification = React.lazy(() => import('./views/notifications/Notification'))
const AddNotification = React.lazy(() => import('./views/notifications/AddNeedItem'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Bản tin', component: Dashboard },
  { path: '/charts', name: 'Charts', component: Charts },
  { path: '/exports', name: 'Thông tin xuất kho', component: Exports },
  { path: '/items', name: 'Vật tư - phụ tùng', component: Items },
  { path: '/imports', name: 'Thông tin nhập kho', component: Imports },
  { path: '/inventory', name: 'Kiểm kê tồn kho', component: Inventory },
  { path: '/reports', name: 'Báo cáo', component: Reports },
  { path: '/transfer', name: 'Điều phối kho', component: Transfer },

  { path: '/warehouses', name: 'Kho', component: Warehouses },
  { path: '/warehouses-add', name: 'Tạo kho', component: AddWarehouses },
  { path: '/warehouses-edit/:id', name: 'Chỉnh sửa kho', component: EditWarehouses },
  { path: '/warehouses-shelf/:id', name: 'kệ trong kho', component: ShelfWarehouse },
  { path: '/item-shelf/:warehouse_id/:shelf_id', name: 'vật tư trong kệ', component: Itemshelf },

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
]

export default routes
