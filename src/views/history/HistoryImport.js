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
import { getData, putData } from '../api/Api.js'
import DataImport from './DataImport.js'
import { Link, useHistory } from 'react-router-dom'
import { getRoleNames, getToken } from 'src/components/utils/Common'

const HistoryImport = () => {
  const history = useHistory()
  const [codeImport, setCodeImport] = useState([])
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
    rowsPerPage - Math.min(rowsPerPage, codeImport.length - page * rowsPerPage);

  useEffect(() => {
    Promise.all([getData('http://127.0.0.1:8000/api/admin/inventory/showCodeImport?token=' + getToken())])
      .then(function (res) {
        setCodeImport(res[0].data)
      }).catch((error) => {
        console.log(error)
        if (error.response.status === 403) {
          history.push('/404')
        } else if(error.response.status === 401) {
          history.push('/login')
        }
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
        <CardHeader title='Phiếu Nhập' />
        <Table striped hover responsive bordered borderColor="warning">
          <TableHead style={{backgroundColor:'#80ccff', fontWeights:'bold'}}>
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
            {codeImport
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
                      <DataImport code={item.code} status={item.status} created_at={item.created_at} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                count={codeImport.length}
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
export default HistoryImport
