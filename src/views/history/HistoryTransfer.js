/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
// import {
//   CTable,
//   CTableHead,
//   CTableRow,
//   CTableHeaderCell,
//   CTableBody,
//   CTableDataCell,
//   CCard,
//   CCardHeader,
//   CCardBody,
//   CButton,
//   CButtonGroup,
// } from '@coreui/react';
import {
  Card,
  CardHeader,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Stack,
  ButtonGroup,
  TableFooter
} from '@mui/material';
import { getData, putData } from '../api/Api.js'
import { Link } from 'react-router-dom';
import DataTransfer from './DataTransfer';
import { getToken } from 'src/components/utils/Common.js';

const HistoryTransfer = () => {

  const [codeTransfer, setCodeTransfer] = useState([])
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, codeTransfer.length - page * rowsPerPage);

  useEffect(() => {
    Promise.all([getData('http://127.0.0.1:8000/api/admin/inventory/showCodeTransfer' + '?token=' + getToken())],
    )
      .then(function (res) {
        setCodeTransfer(res[0].data)
      }).catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <>
      {/* <Stack direction="row" spacing={2}>
        <Link className='btn btn-primary' to='/history_import'>
          Phiếu Nhập
        </Link>
        <Link className='btn btn-warning' to='/history_export'>
          Phiếu Xuất
        </Link>
        <Link className='btn btn-success' to='/history_transfer'>
          Phiếu Chuyển Kho
        </Link>
      </Stack> */}
      <br />
      <Card>
        <CardHeader title='Phiếu chuyển kho' />
        <TableContainer>
          <Table striped hover responsive bordered borderColor="warning">
            <TableHead style={{backgroundColor:'#66ff66'}}>
              <TableRow>
                <TableCell className="text-center">STT</TableCell>
                <TableCell className="text-center">Mã Phiếu</TableCell>
                <TableCell className="text-center">Người Tạo</TableCell>
                <TableCell className="text-center">Từ Kho</TableCell>
                <TableCell className="text-center">Từ Kệ</TableCell>
                <TableCell className="text-center">Đến Kho</TableCell>
                <TableCell className="text-center">Đến Kệ</TableCell>
                <TableCell className="text-center">Thời gian</TableCell>
                <TableCell className="text-center">Trạng thái</TableCell>
                <TableCell className="text-center">Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {codeTransfer
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((rows, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-center">{index + 1}</TableCell>
                    <TableCell className="text-center">{rows.code}</TableCell>
                    <TableCell className="text-center">{rows.fullname}</TableCell>
                    <TableCell className="text-center">{rows.name_from_warehouse}</TableCell>
                    <TableCell className="text-center">{rows.name_from_shelf}</TableCell>
                    <TableCell className="text-center">{rows.name_to_warehouse}</TableCell>
                    <TableCell className="text-center">{rows.name_to_shelf}</TableCell>
                    <TableCell className="text-center">{rows.created_at}</TableCell>
                    <TableCell className="text-center">{rows.status === '2' ? 'Đã duyệt' : (rows.status === '1' ? 'Giao hàng' : 'Chưa duyệt')}</TableCell>
                    <TableCell className="text-center">
                      <div className="d-grid gap-2 d-md-block">
                        <DataTransfer code={rows.code} created_at={rows.created_at} status={rows.status} created_by={rows.fullname}/>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 40 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  count={codeTransfer.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Card>
    </>
  )
}



export default HistoryTransfer
