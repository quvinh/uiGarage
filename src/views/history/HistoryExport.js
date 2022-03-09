/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
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
import { getData } from '../api/Api.js'
import DataExport from './DataExport.js';
import { Link } from 'react-router-dom';
import { getToken } from 'src/components/utils/Common.js';

const HistoryExport = () => {

  const [codeExport, setCodeExport] = useState([])
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
    rowsPerPage - Math.min(rowsPerPage, codeExport.length - page * rowsPerPage);

  useEffect(() => {
    Promise.all([getData('http://127.0.0.1:8000/api/admin/inventory/showCodeExport?token=' + getToken())])
      .then(function (res) {
        setCodeExport(res[0].data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <>
      <Stack direction="row" spacing={2}>
        <Link className='btn btn-primary' to='/history_import'>
          Phiếu Nhập
        </Link>
        <Link className='btn btn-warning' to='/history_export'>
          Phiếu Xuất
        </Link>
        <Link className='btn btn-success' to='/history_transfer'>
          Phiếu Chuyển Kho
        </Link>
      </Stack>
      <br />
      <Card>
        <CardHeader title='Phiếu Xuất' />
        <Table striped hover responsive bordered borderColor="warning">
          <TableHead style={{ backgroundColor: '#ffcc80' }}>
            <TableRow>
              <TableCell className="text-center">STT</TableCell>
              <TableCell className="text-center">Mã Phiếu</TableCell>
              <TableCell className="text-center">Tên Kho</TableCell>
              <TableCell className="text-center">Người Tạo</TableCell>
              <TableCell className="text-center">Thời gian</TableCell>
              <TableCell className="text-center">Trạng thái</TableCell>
              <TableCell className="text-center">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {codeExport
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="text-center">{index + 1}</TableCell>
                  <TableCell className="text-center">{item.code}</TableCell>
                  <TableCell className="text-center">{item.tenKho}</TableCell>
                  <TableCell className="text-center">{item.created_by}</TableCell>
                  <TableCell className="text-center">{item.created_at}</TableCell>
                  <TableCell className="text-center">{item.status === '2' ? 'Đã duyệt' : (item.status === '1' ? 'Giao hàng' : 'Chưa duyệt')}</TableCell>
                  <TableCell className="text-center">
                    <div className="d-grid gap-2 d-md-block">
                      <DataExport code={item.code} status={item.status} created_at={item.created_at} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                count={codeExport.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </Card>
    </>
  )
}
export default HistoryExport
