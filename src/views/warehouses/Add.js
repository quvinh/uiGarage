/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
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
} from '@coreui/react'
import { postData } from '../api/Api';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Add = () => {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [note, setNote] = useState('');
  const history = useHistory()

  const handleName = (e) => {
    setName(e.target.value);
  }
  const handleLocation = (e) => {
    setLocation(e.target.value);
  }
  const handleNote = (e) => {
    setNote(e.target.value);
  }

  const handleAddForm = () => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
    setName("");
    setLocation("");
    setNote("");
  }

  const handleAdd = () => {
    const data = {
      name: name,
      location: location,
      note: note
    }
    console.log(data);
    Promise.all([postData('http://127.0.0.1:8000/api/admin/warehouse/store', data)])
      .then(res => {
        console.log('Added succesfully', res)
        // history.push('/warehouses')
      }).catch(error => {
        // validatorAll()
        console.log(':(((')
        console.log(error)
      })
      window.location.reload(false);
  }

  return (
    <>
    <Button onClick={handleAddForm} color="warning">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-square" viewBox="0 0 16 16">
          <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
        </svg>
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Tạo mới kho</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Tên Kho"
            type="text"
            fullWidth
            value={name}
            onChange={handleName}
            variant="standard"
          />
          <TextField
            margin="dense"
            id="location"
            label="Địa chỉ"
            type="text"
            fullWidth
            value={location}
            onChange={handleLocation}
            variant="standard"
          />
          <TextField
            margin="dense"
            id="name"
            label="Chú thích"
            type="text"
            fullWidth
            value={note}
            onChange={handleNote}
            variant="standard"
          />
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
