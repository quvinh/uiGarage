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

const DataTransfer = (props) => {
  const [open, setOpen] = React.useState(false)

  const handleDelete = () => {
    if (tableHistoryTransfer.length > 0) {
      tableHistoryTransfer.map((item, index) => {
        console.log(item)
        Promise.all([delData('http://127.0.0.1:8000/api/admin/transfer/delete/' + item.id + '?token=' + getToken())])
          .then(function (res) {
            console.log("Deleted")
            window.location.reload();
          })
          .catch(err => {
            console.log(err)
          })
      })
    }
  }
  const handleDStatus = () => {
    if (tableHistoryTransfer.length > 0) {
      tableHistoryTransfer.map((item, index) => {
        console.log(item)
        Promise.all([putData('http://127.0.0.1:8000/api/admin/transfer/dStatus/' + item.id + '?token=' + getToken())])
          .then(function (res) {
            console.log("Changed 0->1")
            window.location.reload();
          })
          .catch(err => {
            console.log(err)
          })
      })
    }
  }
  const handleUpdateStatus = () => {
    if (tableHistoryTransfer.length > 0) {
      tableHistoryTransfer.map((item, index) => {
        console.log(item)
        Promise.all([putData('http://127.0.0.1:8000/api/admin/transfer/updateStatus/' + item.id + '?token=' + getToken())])
          .then(function (res) {
            console.log("Changed 1->2")
            window.location.reload();
          })
          .catch(err => {
            console.log(err)
          })
      })
    }
  }

  const handleClickOpen = () => {
    if (tableHistoryTransfer.length > 0) {
      setOpen(true)
    }
  }
  const handleClose = () => {
    setOpen(false)
  }


  const [tableHistoryTransfer, setTableHistoryTransfer] = useState([])
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
    { label: "M?? Phi???u", key: "code" },
    { label: "M?? V???t T??", key: "item_id" },
    { label: "T??n V???t T??", key: "name" },
    { label: "T??n Kho", key: "name_from_warehouse" },
    { label: "T??n K???", key: "name_from_shelf" },
    { label: "T??n Kho", key: "name_to_warehouse" },
    { label: "T??n K???", key: "name_to_shelf" },
    { label: "Gi?? nh???p", key: "price" },
    { label: "S??? l?????ng xu???t ", key: "amount" },
    { label: "????n V??? T??nh", key: "unit" },
    { label: "Ng?????i t???o", key: "fullname" },
    { label: "Ng??y t???o", key: "created_at"},

  ];

  const data = tableHistoryTransfer;


  useEffect(() => {
    Promise.all([getData('http://127.0.0.1:8000/api/admin/inventory/showHistoryTransfer/' + props.code + '?token=' + getToken())])
      .then(function (res) {
        setTableHistoryTransfer(res[0].data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <>
      <CButton size='sm' className='me-2' color='warning' onClick={handleClickOpen}><CIcon icon={cilDescription} /></CButton>
      {
        getAllPermissions().includes('Xo?? phi???u chuy???n ' + getIdWarehouseRole()) ? (
          <CButton size='sm' className='me-2' color='danger' onClick={handleDelete}><CIcon icon={cilDelete} /></CButton>
        ) : (
          getRoleNames() === 'admin' ? (
            <CButton size='sm' className='me-2' color='danger' onClick={handleDelete}><CIcon icon={cilDelete} /></CButton>
          ) : (<></>)
        )
      }
      <CButton size='sm' className='me-2' color={props.status === '0' ? 'info' : 'secondary'} onClick={handleDStatus} name='b1' disabled={props.status === '0' ? false : true}><CIcon icon={cilSend} /></CButton>
      <CButton size='sm' className='me-2' color={props.status === '1' ? 'success' : 'secondary'} onClick={handleUpdateStatus} name='b2' disabled={props.status === '1' ? false : true}><CIcon icon={cilCheckCircle} /></CButton>

      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <DialogTitle className="d-grid gap-2 d-md-flex justify-content-md-end" style={{ background: "#ffa64d" }} sx={{ position: 'static' }}>
          <ButtonGroup variant="contained">
            <CSVLink data={data} headers={headers} className='btn btn-primary' filename={props.code}>
              CSV
            </CSVLink>
            <Button onClick={print} >
              Print
            </Button>
            <Button onClick={handleClose} >Tho??t</Button>
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
                            primary="NAM KH??NH"
                            secondary={'GARAGE'}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText
                            primary="?????a ch???: L?? H???ng Phong"
                            secondary={'Li??n h???: 0123456789'}
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
                            primary={"Ng?????i T???o: " + props.created_by}
                            secondary={'Th??? kho'}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText
                            primary={"S??? phi???u: " + props.code}
                            secondary={'Th???i gian nh???p: ' + props.created_at}
                          />
                        </ListItem>
                      </CardContent>
                    </Card>
                  </Grid>
                  {/* </Grid> */}
                  <Grid item xs={12}>
                    <p style={{ textAlign: "center", fontWeight: "bold", fontSize: "20px", color: "orange" }}>PHI???U NH???P</p>
                    {tableHistoryTransfer.map((item, index) => (
                      <TableContainer component={Paper} key={index}>
                        <Table aria-label="customized table"> {/*sx={{ minWidth: "70%" }}*/}
                          <CTableHead color="warning">
                            <CTableRow>
                              <CTableHeaderCell className="text-center">STT</CTableHeaderCell>
                              <CTableHeaderCell className="text-center">M?? v???t t??</CTableHeaderCell>
                              <CTableHeaderCell className="text-center">T??n v???t t??</CTableHeaderCell>
                              <CTableHeaderCell className="text-center">T??? Kho</CTableHeaderCell>
                              <CTableHeaderCell className="text-center">T??? Gi??</CTableHeaderCell>
                              <CTableHeaderCell className="text-center">?????n Kho</CTableHeaderCell>
                              <CTableHeaderCell className="text-center">?????n Gi??</CTableHeaderCell>
                              <CTableHeaderCell className="text-center">S??? l?????ng </CTableHeaderCell>
                              <CTableHeaderCell className="text-center">????n v??? t??nh</CTableHeaderCell>
                              <CTableHeaderCell className="text-center">Ng??y t???o</CTableHeaderCell>
                              <CTableHeaderCell className="text-center">Tr???ng th??i</CTableHeaderCell>
                            </CTableRow>
                          </CTableHead>
                          <CTableBody>
                            <CTableRow v-for="item in tableItems" >
                              <CTableDataCell className="text-center">{String(index + 1)}</CTableDataCell>
                              <CTableDataCell className="text-center">{item.item_id}</CTableDataCell>
                              <CTableDataCell className="text-center">{item.name}</CTableDataCell>
                              <CTableDataCell className="text-center">{item.name_from_warehouse}</CTableDataCell>
                              <CTableDataCell className="text-center">{item.name_from_shelf}</CTableDataCell>
                              <CTableDataCell className="text-center">{item.name_to_warehouse}</CTableDataCell>
                              <CTableDataCell className="text-center">{item.name_to_shelf}</CTableDataCell>
                              <CTableDataCell className="text-center">{item.amount}</CTableDataCell>
                              <CTableDataCell className="text-center">{item.unit}</CTableDataCell>
                              <CTableDataCell className="text-center">{item.created_at}</CTableDataCell>
                              <CTableDataCell className='text-center'>{item.status === '2' ? '???? duy???t' : (item.status === '1' ? 'Giao h??ng' : 'Ch??a duy???t')}</CTableDataCell>
                            </CTableRow>
                          </CTableBody>
                        </Table>
                      </TableContainer>
                    ))}
                  </Grid>
                  <Grid item xs={6}>
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

export default DataTransfer
