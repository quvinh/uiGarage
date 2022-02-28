/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'

import { getData, putData } from '../api/Api';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl, NativeSelect } from '@mui/material';
import PropTypes from 'prop-types';
import FromControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Edit = (props) => {
  const [open, setOpen] = React.useState(false);

  const [item_id, setItem_id] = useState('');
  const [category_id, setCategory_id] = useState('');
  const [warehouse_id, setWarehouse_id] = useState('');
  const [shelf_id, setShelf_id] = useState('');
  const [batch_code, setBatch_code] = useState('');
  // const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [unit, setUnit] = useState('');
  const [price, setPrice] = useState('');
  const [status, setStatus] = useState('');
  // const history = useHistory();

  const handleItem_idChange = (e) => {
    setItem_id(e.target.value);
  }
  const handleCategory_idChange = (e) => {
    setCategory_id(e.target.value);
  }
  const handleWarehouse_idChange = (e) => {
    setWarehouse_id(e.target.value);
  }
  const handleShelf_idChange = (e) => {
    setShelf_id(e.target.value);
  }
  const handleBatch_codeChange = (e) => {
    setBatch_code(e.target.value);
  }
  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  }
  const handleUnitChange = (e) => {
    setUnit(e.target.value);
  }
  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  }
  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  }

  const handleUpdateForm = () => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  }

  const handleUpdate = (e) => {
    const data = {
      item_id: item_id,
      category_id: category_id,
      warehouse_id: warehouse_id,
      shelf_id: shelf_id,
      batch_code: batch_code,
      amount: amount,
      unit: unit,
      price: price,
      status: status,
    }
    Promise.all([putData('http://127.0.0.1:8000/api/admin/detail_item/update/' + props.props, data)])
      .then(response => {
        console.log('Edited successfully ^^')
        // history.push('/detail_item')
      }).catch((err) => {
        console.log(err)
      })
    window.location.reload(false);
  }

  useEffect(() => {
    Promise.all([getData('http://127.0.0.1:8000/api/admin/detail_item/show/' + props.props),
      // getData('http://127.0.0.1:8000/api/admin/warehouse'),
      // getData('http://127.0.0.1:8000/api/admin/category'),
      // getData('http://127.0.0.1:8000/api/admin/shelf')
    ])
      .then(response => {
        setItem_id(response[0].data.item_id)
        setCategory_id(response[0].data.category_id)
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
        <Button onClick={handleUpdateForm}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-brush" viewBox="0 0 16 16">
            <path d="M15.825.12a.5.5 0 0 1 .132.584c-1.53 3.43-4.743 8.17-7.095 10.64a6.067 6.067 0 0 1-2.373 1.534c-.018.227-.06.538-.16.868-.201.659-.667 1.479-1.708 1.74a8.118 8.118 0 0 1-3.078.132 3.659 3.659 0 0 1-.562-.135 1.382 1.382 0 0 1-.466-.247.714.714 0 0 1-.204-.288.622.622 0 0 1 .004-.443c.095-.245.316-.38.461-.452.394-.197.625-.453.867-.826.095-.144.184-.297.287-.472l.117-.198c.151-.255.326-.54.546-.848.528-.739 1.201-.925 1.746-.896.126.007.243.025.348.048.062-.172.142-.38.238-.608.261-.619.658-1.419 1.187-2.069 2.176-2.67 6.18-6.206 9.117-8.104a.5.5 0 0 1 .596.04zM4.705 11.912a1.23 1.23 0 0 0-.419-.1c-.246-.013-.573.05-.879.479-.197.275-.355.532-.5.777l-.105.177c-.106.181-.213.362-.32.528a3.39 3.39 0 0 1-.76.861c.69.112 1.736.111 2.657-.12.559-.139.843-.569.993-1.06a3.122 3.122 0 0 0 .126-.75l-.793-.792zm1.44.026c.12-.04.277-.1.458-.183a5.068 5.068 0 0 0 1.535-1.1c1.9-1.996 4.412-5.57 6.052-8.631-2.59 1.927-5.566 4.66-7.302 6.792-.442.543-.795 1.243-1.042 1.826-.121.288-.214.54-.275.72v.001l.575.575zm-4.973 3.04.007-.005a.031.031 0 0 1-.007.004zm3.582-3.043.002.001h-.002z" />
          </svg>
        </Button>
      </DialogActions>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Chỉnh sửa giá</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="item_id"
            label="Mã vật tư"
            type="text"
            fullWidth
            value={item_id}
            onChange={handleItem_idChange}
            variant="standard"
          />
          <TextField
            margin="dense"
            id="category_id"
            label="Mã nhóm"
            type="text"
            fullWidth
            value={category_id}
            onChange={handleCategory_idChange}
            variant="standard"
          />
          <TextField
            margin="dense"
            id="warehouse_id"
            label="Mã kho"
            type="text"
            fullWidth
            value={warehouse_id}
            onChange={handleWarehouse_idChange}
            variant="standard"
          />
          <TextField
            margin="dense"
            id="warehouse_id"
            label="Mã giá kệ"
            type="text"
            fullWidth
            value={shelf_id}
            onChange={handleShelf_idChange}
            variant="standard"
          />
          <TextField
            margin="dense"
            id="batch_code"
            label="Mã lô"
            type="text"
            fullWidth
            value={batch_code}
            onChange={handleBatch_codeChange}
            variant="standard"
          />
          <TextField
            margin="dense"
            id="amount"
            label="Số lượng"
            type="text"
            fullWidth
            value={amount}
            onChange={handleAmountChange}
            variant="standard"
          />
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <Select
              native
              value={unit}
              onChange={(e) => setUnit(e.target.value)}>
              <option value="">Đơn vị tính</option>
              <option value={"Cái"}>Cái</option>
              <option value={"Lon"}>Lon</option>
              <option value={"Lọ"}>Lọ</option>
              <option value={"Chiếc"}>Chiếc</option>
              <option value={"Can"}>Can</option>
              <option value={"Thùng"}>Thùng</option>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            id="price"
            label="Đơn giá"
            type="text"
            fullWidth
            value={price}
            onChange={handlePriceChange}
            variant="standard"
          />
          <FromControl sx={{ m: 1, minWidth: 120 }}>
            <Select
              native
              value={status}
              onChange={(e) => setStatus(e.target.value)}>
              <option value="">Trạng thái</option>
              <option value={0}>Còn</option>
              <option value={1}>Hết</option>
            </Select>
          </FromControl>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={(e) => handleUpdate(e)} >Save</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Edit
