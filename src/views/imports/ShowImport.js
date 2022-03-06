/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React from "react"
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
import { postData } from '../api/Api'
import { getToken } from "src/components/utils/Common"
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})
export const ShowImport = (props) => {
  // console.log()

  const [open, setOpen] = React.useState(false)
  const [isSave, setIsSave] = React.useState(false)

  const handleClickOpen = () => {
    if (props.dataTable.length > 0) {
      setOpen(true)
    }
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleTime = () => {
    const time = new Date()
    const date = time.getDate() + "/" + (time.getMonth() + 1) + "/" + time.getFullYear() + " " +
      time.getHours() + ":" + time.getMinutes()
    return date
  }

  const handleTotalPrice = () => {
    let total = 0
    props.dataTable.map((item) => {
      total += item.totalPrice
    })
    console.log(total)
    return total
  }

  const handleSave = () => {
    console.log(props.dataTable)
    if (props.dataTable.length > 0) {
      props.dataTable.map((item, index) => {
        console.log(item)
        Promise.all([postData('http://127.0.0.1:8000/api/admin/import/store?token=' + getToken(), item)])
          .then(function (res) {
            console.log("SAVED")
            setIsSave(true)
          })
          .catch(err => {
            console.log(err)
          })
      })
    }
  }

  // function generate(element) {
  //   return [0, 1, 2].map((value) =>
  //     React.cloneElement(element, {
  //       key: value,
  //     }),
  //   );
  // }

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      // backgroundColor: theme.palette.common.black,
      // color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      // backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  return (
    <div>
      <Button variant="outlined" size="sm" color="warning" onClick={handleClickOpen}>
        Tạo phiếu nhập
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              HUỶ
            </Typography>

            {
              (isSave) ? (
                <Button autoFocus color="inherit" onClick={handleClose}>
                  Lưu thành công - Click để đóng
                </Button>
              ) : (
                <Button autoFocus color="inherit" onClick={handleSave}>
                  Lưu phiếu
                </Button>
              )
            }
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
                            primary="Người Tạo: Nguyễn Thị T"
                            secondary={'Thủ kho'}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText
                            primary={"Số phiếu: " + props.code}
                            secondary={'Thời gian nhập: ' + String(handleTime())}
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
                        <TableHead>
                          <TableRow>
                            <StyledTableCell align="center">STT</StyledTableCell>
                            <StyledTableCell align="center">Mã vật tư</StyledTableCell>
                            <StyledTableCell align="center">Mã sản xuất</StyledTableCell>
                            <StyledTableCell align="center">Tên vật tư</StyledTableCell>
                            <StyledTableCell align="center">ĐVT</StyledTableCell>
                            <StyledTableCell align="center">SL</StyledTableCell>
                            <StyledTableCell align="center">Đơn giá</StyledTableCell>
                            <StyledTableCell align="center">Tiền hàng</StyledTableCell>
                            <StyledTableCell align="center">Ghi chú</StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {props.dataTable.map((row, index) => (
                            <StyledTableRow key={index}>
                              <StyledTableCell align="center">{index + 1}</StyledTableCell>
                              <StyledTableCell align="center">{row.item_id}</StyledTableCell>
                              <StyledTableCell align="center">{row.batch_code}</StyledTableCell>
                              <StyledTableCell align="center" component="th" scope="row">{row.name}</StyledTableCell>
                              <StyledTableCell align="center">{row.unit}</StyledTableCell>
                              <StyledTableCell align="center">{row.amount}</StyledTableCell>
                              <StyledTableCell align="center">{row.price}</StyledTableCell>
                              <StyledTableCell align="center">{row.totalPrice}</StyledTableCell>
                              <StyledTableCell align="center">{row.note ? row.note : ""}</StyledTableCell>
                            </StyledTableRow>
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
    </div>
  )
}
