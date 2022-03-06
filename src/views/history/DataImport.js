/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import ListItemText from '@mui/material/ListItemText'
import ListItem from '@mui/material/ListItem'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CloseIcon from '@mui/icons-material/Close'
import Slide from '@mui/material/Slide'
import Grid from '@mui/material/Grid'
import styled from "@emotion/styled"
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import CIcon from '@coreui/icons-react';


import React, { useEffect, useState } from 'react'
import {
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton
} from '@coreui/react';
import { getData, delData, putData } from '../api/Api.js'
import { cilCheckCircle, cilDelete, cilDescription, cilFile, cilSend } from '@coreui/icons'
import { getToken } from 'src/components/utils/Common.js'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />
})

const DataImport = (props) => {
  const [open, setOpen] = React.useState(false)
  const handleDelete = () => {
    if (tableHistoryImport.length > 0) {
      tableHistoryImport.map((item, index) => {
        console.log(item)
        Promise.all([delData('http://127.0.0.1:8000/api/admin/import/delete/' + item.id + '?token=' + getToken())])
          .then(function (res) {
            console.log("Deleted")
            window.location.reload()
          })
          .catch(err => {
            console.log(err)
          })
      })
    }

  }
  const handleDStatus = () => {
    if (tableHistoryImport.length > 0) {
      tableHistoryImport.map((item, index) => {
        console.log(item)
        Promise.all([putData('http://127.0.0.1:8000/api/admin/import/dStatus/' + item.id + '?token=' + getToken())])
          .then(function (res) {
            console.log("Changed 0->1")
            window.location.reload()
          })
          .catch(err => {
            console.log(err)
          })
      })
    }

  }
  const handleUpdateStatus = () => {
    if (tableHistoryImport.length > 0) {
      console.log(tableHistoryImport)
      tableHistoryImport.map((item, index) => {
        console.log(item)
        Promise.all([putData('http://127.0.0.1:8000/api/admin/import/updateStatus/' + item.id + '?token=' + getToken())])
          .then(function (res) {
            console.log("Changed 1->2")
            window.location.reload()
          })
          .catch(err => {
            console.log(err)
          })
      })
    }

  }

  const handleClickOpen = () => {
    if (tableHistoryImport.length > 0) {
      setOpen(true)
    }
  }
  const handleClose = () => {
    setOpen(false)
  }

  const handleTotalPrice = () => {
    let total = 0
    tableHistoryImport.map((item) => {
      total += item.luongNhap * item.price
    })
    console.log(total)
    return total
  }


  const [tableHistoryImport, setTableHistoryImport] = useState([])
  useEffect(() => {
    Promise.all([getData('http://127.0.0.1:8000/api/admin/inventory/showHistoryImport/' + props.code + '?token=' + getToken())])
      .then(function (res) {
        setTableHistoryImport(res[0].data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <>
      <CButton size='sm' className='me-2' color='warning' onClick={handleClickOpen}><CIcon icon={cilDescription} /></CButton>
      <CButton size='sm' className='me-2' color='danger' onClick={handleDelete}><CIcon icon={cilDelete} /></CButton>
      <CButton size='sm' className='me-2' color={props.status === '0' ? 'info' : 'secondary'} onClick={handleDStatus} name='b1' disabled={props.status === '0' ? false : true}><CIcon icon={cilSend} /></CButton>
      <CButton size='sm' className='me-2' color={props.status === '1' ? 'success' : 'secondary'} onClick={handleUpdateStatus} name='b2' disabled={props.status === '1' ? false : true}><CIcon icon={cilCheckCircle} /></CButton>

      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar style={{ background: "#ffa64d" }} sx={{ position: 'static' }}>
          <Toolbar className="d-grid gap-2 d-md-flex justify-content-md-end">
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                Thoát
              </Typography>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Container maxWidth="lg" style={{ aline: "center" }}> {/*maxWidth="sm"*/}
          <Card>
            <CardContent>
              <Stack spacing={2}>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Card>
                      <CardContent>
                        LOGO
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={8}>
                  </Grid>
                  <Grid item xs={6}>
                    <Card>
                      <CardContent>
                        <ListItem>
                          <ListItemText
                            primary="NAM KHÁNH"
                            secondary={'GARAGE'}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText
                            primary="Địa chỉ: Lê Hồng Phong"
                            secondary={'Liên hệ: 0123456789'}
                          />
                        </ListItem>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={6}>
                    <Card>
                      <CardContent>
                        <ListItem>
                          <ListItemText
                            primary={"Người Tạo: " + props.created_by}
                            secondary={'Thủ kho'}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText
                            primary={"Số phiếu: " + props.code}
                            secondary={'Thời gian nhập: ' + props.created_at}
                          />
                        </ListItem>
                      </CardContent>
                    </Card>
                  </Grid>
                  {/* </Grid> */}
                  <Grid item xs={12}>
                    <p style={{ textAlign: "center", fontWeight: "bold", fontSize: "20px", color: "orange" }}>PHIẾU NHẬP</p>
                    <TableContainer component={Paper}>
                      <Table aria-label="customized table"> {/*sx={{ minWidth: "70%" }}*/}
                        <TableHead color="warning">
                          <TableRow>
                            <CTableHeaderCell className="text-center">STT</CTableHeaderCell>
                            <CTableHeaderCell className="text-center">Mã vật tư</CTableHeaderCell>
                            <CTableHeaderCell className="text-center">Tên vật tư</CTableHeaderCell>
                            <CTableHeaderCell className="text-center">Mã kệ</CTableHeaderCell>
                            <CTableHeaderCell className="text-center">Giá nhập</CTableHeaderCell>
                            <CTableHeaderCell className="text-center">Số lượng nhập</CTableHeaderCell>
                            <CTableHeaderCell className="text-center">Đơn vị tính</CTableHeaderCell>
                            <CTableHeaderCell className="text-center">Ngày tạo</CTableHeaderCell>
                            <CTableHeaderCell className="text-center">Trạng thái</CTableHeaderCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {tableHistoryImport.map((item, index) => (
                            <CTableRow key={index} v-for="item in tableItems" >
                              <CTableDataCell className="text-center">{String(index + 1)}</CTableDataCell>
                              <CTableDataCell className="text-center">{item.item_id}</CTableDataCell>
                              <CTableDataCell className="text-center">{item.name}</CTableDataCell>
                              <CTableDataCell className="text-center">{item.shelf_id}</CTableDataCell>
                              <CTableDataCell className="text-center">{item.price}</CTableDataCell>
                              <CTableDataCell className="text-center">{item.luongNhap}</CTableDataCell>
                              <CTableDataCell className="text-center">{item.unit}</CTableDataCell>
                              <CTableDataCell className="text-center">{item.created_at}</CTableDataCell>
                              <CTableDataCell className='text-center'>{item.status === '2' ? 'Đã duyệt' : (item.status === '1' ? 'Giao hàng' : 'Chưa duyệt')}</CTableDataCell>
                            </CTableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                  <Grid item xs={6}>
                  </Grid>
                  <Grid item xs={6}>
                    <Card>
                      <CardContent>
                        <ListItem>
                          <ListItemText
                            primary={"Tổng giá: " + String(handleTotalPrice() + " VND")}
                          />
                        </ListItem>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Stack>
            </CardContent>
          </Card>
        </Container>
      </Dialog>
    </>

  )
}

export default DataImport
