/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
// import React, { useEffect, useState } from 'react'
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
  CCol,
  CRow,
} from '@coreui/react';
// import { delData, getData } from '../api/Api';

// const Shelves = () => {
//   const [dataTable, setDataTable] = useState([])

//   const handleDelete = (e, id) => {
//     const eClick = e.currentTarget;
//     Promise.all([delData('http://127.0.0.1:8000/api/admin/detail_item/delete/' + id)])
//       .then(function (res) {
//         eClick.closest('tr').remove();
//       })
//       .catch(error => {
//         console.log(error)
//       })
//   }

//   useEffect(() => {
//     Promise.all([getData('http://127.0.0.1:8000/api/admin/detail_item')])
//       .then(function (res) {
//         setDataTable(res[0].data)
//       })
//       .catch(error => {
//         console.log(error)
//       })
//   }, [])

//   return (
//     <>
//       <p style={{fontWeight: "bold"}}>&gt;Giá</p>
//       <CCard>
//         <CCardHeader>
//           <div className="d-grid gap-2 d-md-flex justify-content-md-end">
//             <CButton href='#/categories-add' color="success">Tạo mới Giá</CButton>
//           </div>
//         </CCardHeader>
//         <CCardBody>
//           <CTable striped hover responsive bordered borderColor="warning">
//             <CTableHead color="warning">
//               <CTableRow>
//                 <CTableHeaderCell className="text-center">STT</CTableHeaderCell>
//                 <CTableHeaderCell className="text-center">Tên giá</CTableHeaderCell>
//                 <CTableHeaderCell className="text-center">Vị trí</CTableHeaderCell>
//                 <CTableHeaderCell className="text-center">Thao tác</CTableHeaderCell>
//               </CTableRow>
//             </CTableHead>
//             <CTableBody>
//               {dataTable.map((item, index) => (
//                 <CTableRow key={index}>
//                   <CTableDataCell className="text-center">{index + 1}</CTableDataCell>
//                   <CTableDataCell className="text-center">{item.name}</CTableDataCell>
//                   <CTableDataCell className="text-center">{item.position}</CTableDataCell>
//                   <CTableDataCell className="text-center">
//                     <div className="d-grid gap-2 d-md-block">
//                       <CButton href={'#/categories-edit/'+item.id} color="success">Sửa</CButton>
//                       <CButton onClick={(e) => handleDelete(e, item.id)} color="secondary">Xoá</CButton>
//                     </div>
//                   </CTableDataCell>
//                 </CTableRow>
//               ))}
//             </CTableBody>
//           </CTable>
//         </CCardBody>
//       </CCard>
//     </>
//   )
// }

// export default Shelves


import React, { useEffect, useState } from 'react';
import { getData } from '../api/Api';
import { useHistory } from 'react-router-dom';
import { BiDetail } from 'react-icons/bi';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


const Detail_Item = (props) => {
  const [open, setOpen] = React.useState(false);

  const [id, setId] = useState('');
  const [item_name, setItemName] = useState('');
  const [category_name, setCategoryName] = useState('');
  const [warehouse_id, setWarehouse_id] = useState('');
  const [shelf_id, setShelf_id] = useState('');
  const [batch_code, setBatch_code] = useState('');
  // const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [unit, setUnit] = useState('');
  const [price, setPrice] = useState('');
  const [status, setStatus] = useState('');

  const handleOpen = () => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  }
  useEffect(() => {
    console.log(props)
    Promise.all([getData('http://127.0.0.1:8000/api/admin/shelf/itemShelf/' + props.props)])
      .then(response => {
        console.log(response[0].data.id)
        setId(response[0].data.id)
        setItemName(response[0].data.itemname)
        setCategoryName(response[0].data.categoryname)
        setWarehouse_id(response[0].data.warehouse_id)
        setShelf_id(response[0].data.shelf_id)
        setBatch_code(response[0].data.batch_code)
        setAmount(response[0].data.amount)
        setUnit(response[0].data.unit)
        setPrice(response[0].data.price)
        setStatus(response[0].data.status)
      })
  }, []);

  return (
    <>
    <DialogActions>
        <Button onClick={handleOpen}>
          <BiDetail />
        </Button>
      </DialogActions>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Chi tiết</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="id"
            label="Mã vật tư"
            type="text"
            fullWidth
            value={id}
            variant="standard"
            readOnly
          />
          <TextField
            margin="dense"
            id="category_name"
            label="Mã nhóm"
            type="text"
            fullWidth
            value={category_name}
            variant="standard"
          />
          <TextField
            margin="dense"
            id="warehouse_id"
            label="Mã kho"
            type="text"
            fullWidth
            value={warehouse_id}
            variant="standard"
          />
          <TextField
            margin="dense"
            id="warehouse_id"
            label="Mã giá kệ"
            type="text"
            fullWidth
            value={shelf_id}
            variant="standard"
          />
          <TextField
            margin="dense"
            id="batch_code"
            label="Mã lô"
            type="text"
            fullWidth
            value={batch_code}
            variant="standard"
          />
          <TextField
            margin="dense"
            id="amount"
            label="Số lượng"
            type="text"
            fullWidth
            value={amount}
            variant="standard"
          />
          <TextField
            margin="dense"
            id="unit"
            label="Đơn vị tính"
            type="text"
            fullWidth
            value={unit}
            variant="standard"
          />
          <TextField
            margin="dense"
            id="price"
            label="Đơn giá"
            type="text"
            fullWidth
            value={price}
            variant="standard"
          />
          <TextField
            margin="dense"
            id="status"
            label="Trạng thái"
            type="text"
            fullWidth
            value={status}
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Detail_Item
