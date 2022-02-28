/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormTextarea,
  CInputGroup,
  CInputGroupText,
  CRow,
  CFormSelect,
} from '@coreui/react'
import { postData } from '../api/Api';
import { getData } from '../api/Api';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FromControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Add = () => {
  const [open, setOpen] = React.useState(false);
  const [dataTable, setDataTable] = useState([])
  const [dataWarehouse, setDataWarehouse] = useState([])
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [warehouse_id, setWarehouse_id] = useState('');

  const handleName = (e) => {
    setName(e.target.value);
  }
  const handlePosition = (e) => {
    setPosition(e.target.value);
  }
  const handleWarehouse_id = (e) => {
    setWarehouse_id(e.target.value);
  }

  const handleAdd = () => {
    const data = {
      name: name,
      position: position,
      warehouse_id: warehouse_id
    }
    console.log(data);
    Promise.all([postData('http://127.0.0.1:8000/api/admin/shelf/store', data)])
      .then(res => {
        console.log('Added succesfully', res)
        console.log(dataTable)
        console.log(data)
        setDataTable([...dataTable, data])
      }).catch(error => {
        console.log(':(((')
        console.log(error)
      })
    window.location.reload(false);

  }
  useEffect(() => {
    Promise.all([getData('http://127.0.0.1:8000/api/admin/warehouse')])
      .then(function (res) {
        console.log(res)
        setDataWarehouse(res[0].data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])
  const handleAddForm = () => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleAddForm} color='warning'>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-square" viewBox="0 0 16 16">
          <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
        </svg>
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Thêm Giá kệ</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Tên giá kệ"
            type="text"
            fullWidth
            value={name}
            onChange={handleName}
            variant="standard"
          />
          <TextField
            margin="dense"
            id="position"
            label="Vị trí"
            type="text"
            fullWidth
            value={position}
            onChange={handlePosition}
            variant="standard"
          />
          {/* <TextField
            margin="dense"
            id="name"
            label="Mã kho"
            type="text"
            fullWidth
            value={warehouse_id}
            onChange={handleWarehouse_id}
            variant="standard"
          /> */}
          <FromControl sx={{ m: 1, minWidth: 120 }}>
            <Select
              native
              value={warehouse_id}
              onChange={(e) => setWarehouse_id(e.target.value)}>
                <option value="">Kho</option>
              {dataWarehouse.map((item, index) => (
                <option key={index} value={item.id}>{item.name}</option>
              ))}
            </Select>
          </FromControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAdd} >Save</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Add
