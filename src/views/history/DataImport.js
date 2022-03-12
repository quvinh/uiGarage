/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import { cilCheckCircle, cilDelete, cilDescription, cilSend } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import {
  CButton, CTableDataCell, CTableHeaderCell, CTableRow
} from '@coreui/react';
import { ButtonGroup, DialogTitle } from "@mui/material";
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Slide from '@mui/material/Slide';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React, { useEffect, useState } from 'react';
import { CSVLink } from "react-csv";
import { getAllPermissions, getRoleNames, getToken } from 'src/components/utils/Common.js';
import { delData, getData, putData } from '../api/Api.js';



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
  const getIdWarehouseRole = () => {
    var nameRole = ''
    getRoleNames().split(' ').map((item) => {
      if (!isNaN(item)) nameRole = item
    })
    return nameRole
  }
  useEffect(() => {
    Promise.all([getData('http://127.0.0.1:8000/api/admin/inventory/showHistoryImport/' + props.code + '?token=' + getToken())])
      .then(function (res) {
        setTableHistoryImport(res[0].data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])
  const print = () => { window.print() }

  const headers = [
    { label: "Mã Phiếu", key: "code" },
    { label: "Tên Kho", key: "tenKho" },
    { label: "Mã Vật Tư", key: "item_id" },
    { label: "Tên Vật Tư", key: "name" },
    { label: "Tên Kệ", key: "tenKe" },
    { label: "Giá nhập", key: "price" },
    { label: "Số lượng nhập ", key: "luongNhap" },
    { label: "Đơn Vị Tính", key: "unit" },
    { label: "Người tạo", key: "fullname" },
    { label: "Ngày tạo", key: "created_at"},
  ];

  const data = tableHistoryImport;

  return (
    <>
      <CButton size='sm' className='me-2' color='warning' onClick={handleClickOpen}><CIcon icon={cilDescription} /></CButton>
      {
        getAllPermissions().includes('Xoá phiếu xuất ' + getIdWarehouseRole()) ? (
          <CButton size='sm' className='me-2' color='danger' onClick={handleDelete}><CIcon icon={cilDelete} /></CButton>
        ) : (
          getRoleNames() === 'admin' ? (
            <CButton size='sm' className='me-2' color='danger' onClick={handleDelete}><CIcon icon={cilDelete} /></CButton>
          ) : (<></>)
        )
      }
      <CButton size='sm' className='me-2' color={props.status === '0' ? 'info' : 'secondary'} onClick={handleDStatus} name='b1' disabled={props.status === '0' ? false : true}><CIcon icon={cilSend} /></CButton>
      <CButton size='sm' className='me-2' color={props.status === '1' ? 'success' : 'secondary'} onClick={handleUpdateStatus} name='b2' disabled={props.status === '1' ? false : true}><CIcon icon={cilCheckCircle} /></CButton>

      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition} scroll='paper'>

        <DialogTitle className="d-grid gap-2 d-md-flex justify-content-md-end" style={{ background: "#ffa64d" }} sx={{ position: 'static' }}>
          <ButtonGroup variant="contained">
            <CSVLink data={data} headers={headers} className='btn btn-primary' filename={props.code}>
              CSV
            </CSVLink>
            <Button onClick={print} >
              Print
            </Button>
            <Button onClick={handleClose} >Thoát</Button>
          </ButtonGroup>
        </DialogTitle>

        <Paper>
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
                                <CTableDataCell className="text-center">{item.tenKe}</CTableDataCell>
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
        </Paper>
      </Dialog>
    </>

  )
}

export default DataImport
