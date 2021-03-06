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
export const ShowTransfer = (props) => {

  console.log(props.dataTable)
  const [open, setOpen] = React.useState(false)
  const [isSave, setIsSave] = React.useState(false)
  const handleClickOpen = () => {
    if (props.dataTable.length > 0) {
      console.log("data...")
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

  const handleSave = (e) => {
    if (props.dataTable.length > 0) {
      console.log(props.dataTable)
      props.dataTable.map((item, index) => {
        console.log("LOG")
        console.log(item)
        Promise.all([postData('http://127.0.0.1:8000/api/admin/transfer/store?token=' + getToken(), item)])
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

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {

    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  return (
    <div>
      <Button variant="outlined" size="sm" color="warning" onClick={handleClickOpen}>
        T???o phi???u lu??n chuy???n
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
              HU???
            </Typography>

            {
              (isSave) ? (
                <Button autoFocus color="inherit" onClick={handleClose}>
                  L??u th??nh c??ng - Click ????? ????ng
                </Button>
              ) : (
                <Button autoFocus color="inherit" onClick={(e) => handleSave(e)}>
                  L??u phi???u
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
                            primary="Ng?????i T???o: Nguy???n Th??? T"
                            secondary={'Th??? kho'}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText
                            primary={"S??? phi???u: " + props.code}
                            secondary={'Th???i gian nh???p: ' + String(handleTime())}
                          />
                        </ListItem>
                      </CardContent>
                    </Card>
                  </Grid>
                  {/* </Grid> */}
                  <Grid item xs={12}>
                    <p style={{ textAlign: "center", fontWeight: "bold", fontSize: "20px", color: "orange" }}>PHI???U CHUY???N KHO</p>
                    <TableContainer component={Paper}>
                      <Table aria-label="customized table"> {/*sx={{ minWidth: "70%" }}*/}
                        <TableHead>
                          <TableRow>
                            <StyledTableCell className="text-center">STT</StyledTableCell>
                            <StyledTableCell className="text-center">M?? v???t t??</StyledTableCell>
                            <StyledTableCell className="text-center">T??n v???t t??</StyledTableCell>
                            <StyledTableCell className="text-center">??VT</StyledTableCell>
                            <StyledTableCell className="text-center">SL</StyledTableCell>
                            <StyledTableCell className="text-center">T??? kho</StyledTableCell>
                            <StyledTableCell className="text-center">T???i Gi??/k???</StyledTableCell>
                            <StyledTableCell className="text-center">?????n kho</StyledTableCell>
                            <StyledTableCell className="text-center">T???i Gi??/k???</StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {props.dataTable.map((row, index) => (
                            <StyledTableRow key={index}>
                              <StyledTableCell className="text-center">{String(index + 1)}</StyledTableCell>
                              <StyledTableCell className="text-center">{row.item_id}</StyledTableCell>
                              <StyledTableCell className="text-center" component="th" scope="row">{row.name}</StyledTableCell>
                              <StyledTableCell className="text-center">{row.unit}</StyledTableCell>
                              <StyledTableCell className="text-center">{row.amount}</StyledTableCell>
                              <StyledTableCell className="text-center">{row.nameFromWarehouse}</StyledTableCell>
                              <StyledTableCell className="text-center">{row.nameFromShelf}</StyledTableCell>
                              <StyledTableCell className="text-center">{row.nameToWarehouse}</StyledTableCell>
                              <StyledTableCell className="text-center">{row.nameToShelf}</StyledTableCell>
                            </StyledTableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
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
