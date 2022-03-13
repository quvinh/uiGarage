/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import { cilCheckCircle, cilDelete, cilDescription, cilSend } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CButton, CTableBody,
  CTableDataCell, CTableHead, CTableHeaderCell, CTableRow
} from '@coreui/react'
import { ButtonGroup, DialogTitle } from '@mui/material'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Container from '@mui/material/Container'
import Dialog from '@mui/material/Dialog'
import Grid from '@mui/material/Grid'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Paper from '@mui/material/Paper'
import Slide from '@mui/material/Slide'
import Stack from '@mui/material/Stack'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import React, { useEffect, useState } from 'react'
import { CSVLink } from 'react-csv'
import { getAllPermissions, getRoleNames, getToken } from 'src/components/utils/Common.js'
import { delData, getData, putData } from '../api/Api.js'


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />
})
const DataExport = (props) => {
  const [open, setOpen] = React.useState(false)


  const handleDelete = () => {
    if (tableHistoryExport.length > 0) {
      tableHistoryExport.map((item, index) => {
        console.log(item)
        Promise.all([delData('http://127.0.0.1:8000/api/admin/export/delete/' + item.id + '?token=' + getToken())])
          .then(function (res) {
            console.log("Deleted")
          })
          .catch(err => {
            console.log(err)
          })
      })
      window.location.reload()
    }
  }
  const handleDStatus = () => {
    if (tableHistoryExport.length > 0) {
      tableHistoryExport.map((item, index) => {
        console.log(item)
        Promise.all([putData('http://127.0.0.1:8000/api/admin/export/dStatus/' + item.id + '?token=' + getToken())])
          .then(function (res) {
            console.log("Changed 0->1")

          })
          .catch(err => {
            console.log(err)
          })
      })
      window.location.reload()
    }
  }
  const handleUpdateStatus = () => {
    if (tableHistoryExport.length > 0) {
      tableHistoryExport.map((item, index) => {
        console.log(item)
        Promise.all([putData('http://127.0.0.1:8000/api/admin/export/updateStatus/' + item.id + '?token=' + getToken())])
          .then(function (res) {
            console.log("Changed 1->2")

          })
          .catch(err => {
            console.log(err)
          })
      })
      window.location.reload();
    }
  }


  const handleClickOpen = () => {
    if (tableHistoryExport.length > 0) {
      setOpen(true)
    }
  }
  const handleClose = () => {
    setOpen(false)
  }

  const handleTotalPrice = () => {
    let total = 0
    tableHistoryExport.map((item) => {
      total += item.luongXuat * item.price
    })
    console.log(total)
    return total
  }

  const [tableHistoryExport, setTableHistoryExport] = useState([])

  const getIdWarehouseRole = () => {
    var nameRole = ''
    getRoleNames().split(' ').map((item) => {
      if (!isNaN(item)) nameRole = item
    })
    return nameRole
  }
  const print = () => {
    window.print()
  }

  const headers = [
    { label: "Mã Phiếu", key: "code" },
    { label: "Tên Kho", key: "tenKho" },
    { label: "Mã Vật Tư", key: "item_id" },
    { label: "Tên Vật Tư", key: "name" },
    { label: "Tên Kệ", key: "tenKe" },
    { label: "Giá nhập", key: "price" },
    { label: "Số lượng xuất ", key: "luongXuat" },
    { label: "Đơn Vị Tính", key: "unit" },
    { label: "Người tạo", key: "fullname" },
    { label: "Ngày tạo", key: "created_at" },

  ];

  const data = tableHistoryExport;

  useEffect(() => {
    Promise.all([getData('http://127.0.0.1:8000/api/admin/inventory/showHistoryExport/' + props.code + '?token=' + getToken())])
      .then(function (res) {
        setTableHistoryExport(res[0].data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <>
      {
        getAllPermissions().includes("Xem phiếu xuất") && (
          <CButton size='sm' className='me-2' color='warning' onClick={handleClickOpen}><CIcon icon={cilDescription} /></CButton>
        )
      }
      {
        getAllPermissions().includes("Xoá phiếu xuất") && (
          <CButton size='sm' className='me-2' color='danger' onClick={handleDelete}><CIcon icon={cilDelete} /></CButton>
        )
      }
      {/* {
        getAllPermissions().includes('Xoá phiếu nhập ' + getIdWarehouseRole()) ? (
          <CButton size='sm' className='me-2' color='danger' onClick={handleDelete}><CIcon icon={cilDelete} /></CButton>
        ) : (
          getRoleNames() === 'admin' ? (
            <CButton size='sm' className='me-2' color='danger' onClick={handleDelete}><CIcon icon={cilDelete} /></CButton>
          ) : (<></>)
        )
      } */}
      {
        getAllPermissions().includes("Duyệt phiếu xuất") && (
          <CButton size='sm' className='me-2' color={props.status === '0' ? 'info' : 'secondary'} onClick={handleDStatus} name='bt1' disabled={props.status === '0' ? false : true}><CIcon icon={cilSend} /></CButton>
        )
      }
      {
        getAllPermissions().includes("Duyệt phiếu xuất") && (
          <CButton size='sm' className='me-2' color={props.status === '1' ? 'success' : 'secondary'} onClick={handleUpdateStatus} name='bt2' disabled={props.status === '1' ? false : true}><CIcon icon={cilCheckCircle} /></CButton>
        )
      }
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition} >
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
                              primary="Người Tạo: Nguyễn Thị T"
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
                      <p style={{ textAlign: "center", fontWeight: "bold", fontSize: "20px", color: "orange" }}>PHIẾU XUẤT</p>

                      <TableContainer component={Paper} >
                        <Table aria-label="customized table"> {/*sx={{ minWidth: "70%" }}*/}
                          <CTableHead color="warning">
                            <CTableRow>
                              <CTableHeaderCell className="text-center">STT</CTableHeaderCell>
                              <CTableHeaderCell className="text-center">Mã vật tư</CTableHeaderCell>
                              <CTableHeaderCell className="text-center">Tên vật tư</CTableHeaderCell>
                              <CTableHeaderCell className="text-center">Mã kệ</CTableHeaderCell>
                              <CTableHeaderCell className="text-center">Giá xuất</CTableHeaderCell>
                              <CTableHeaderCell className="text-center">Số lượng Xuất</CTableHeaderCell>
                              <CTableHeaderCell className="text-center">Đơn vị tính</CTableHeaderCell>
                              <CTableHeaderCell className="text-center">Ngày tạo</CTableHeaderCell>
                              <CTableHeaderCell className="text-center">Trạng thái</CTableHeaderCell>
                            </CTableRow>
                          </CTableHead>
                          {tableHistoryExport.map((item, index) => (
                            <CTableBody key={index}>
                              <CTableRow v-for="item in tableItems" >
                                <CTableDataCell className="text-center">{String(index + 1)}</CTableDataCell>
                                <CTableDataCell className="text-center">{item.item_id}</CTableDataCell>
                                <CTableDataCell className="text-center">{item.name}</CTableDataCell>
                                <CTableDataCell className="text-center">{item.shelf_id}</CTableDataCell>
                                <CTableDataCell className="text-center">{item.price}</CTableDataCell>
                                <CTableDataCell className="text-center">{item.luongXuat}</CTableDataCell>
                                <CTableDataCell className="text-center">{item.unit}</CTableDataCell>
                                <CTableDataCell className="text-center">{item.created_at}</CTableDataCell>
                                <CTableDataCell className='text-center'>{item.status === '2' ? 'Đã duyệt' : (item.status === '1' ? 'Giao hàng' : 'Chưa duyệt')}</CTableDataCell>
                              </CTableRow>
                            </CTableBody>
                          ))}
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

export default DataExport
