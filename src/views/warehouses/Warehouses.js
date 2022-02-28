/* eslint-disable prettier/prettier */

import React, { useEffect, useState } from 'react'
// import BootstrapTable from 'react-bootstrap-table-next';
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CCard,
  CCardHeader,
  CCardBody,
  CButton,
  CRow,
  CCol
} from '@coreui/react';
import ShelfWarehouse from './Shelfwarehouse';
import Add from './Add';

import { delData, getData, postData } from '../api/Api';
import { Link, useParams } from 'react-router-dom';
import CIcon from '@coreui/icons-react';
import { cilAddressBook, cilPeople } from '@coreui/icons';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';

import { useHistory } from 'react-router-dom';

import Button from '@mui/material/Button';
import { StyledEngineProvider } from "@mui/material/styles";
import Edit from './Edit';


// import Edit from './Edit';

const headerStyle = {
  backgroundColor: '#ffb380',
  fontWeight: 'bold',
}

const rowStyle = { backgroundColor: '#ffe0cc' };

const columns = [{
  dataField: 'id',
  text: 'Mã kho',
  headerStyle: headerStyle,
  filter: textFilter()
}, {
  dataField: 'name',
  text: 'Tên kho',
  headerStyle: headerStyle,
  filter: textFilter()
}, {
  dataField: 'location',
  text: 'Địa chỉ',
  headerStyle: headerStyle,
  filter: textFilter()
}, {
  dataField: 'note',
  text: 'Ghi chú',
  headerStyle: headerStyle,
  filter: textFilter()
}];


const Warehouses = () => {

  const [dataTable, setDataTable] = useState([])

  // const { id } = useParams()
  // const handleDelete = (e, id) => {
  //   const eClick = e.currentTarget;
  //   Promise.all([delData('http://127.0.0.1:8000/api/admin/warehouse/delete/' + id)])
  //     .then(function (res) {
  //       eClick.closest('tr').remove();
  //     })
  //     .catch(error => {
  //       console.log(error)
  //     })
  // }

  useEffect(() => {
    Promise.all([getData('http://127.0.0.1:8000/api/admin/warehouse')
    ])
      .then(function (res) {
        setDataTable(res[0].data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  const expandRow = {
    onlyOneExpanding: true,
    renderer: row => (
      <>
        <Edit props={row.id} />
        <ShelfWarehouse props={row.id} />
      </>
    ),
    showExpandColumn: true
  }
  return (
    <>
      <CCard>
        <CCardBody>
          <p style={{ fontWeight: "bold" }}>&gt;Danh sách kho
            <StyledEngineProvider injectFirst>
              <Add />
            </StyledEngineProvider>
          </p>
          <BootstrapTable
            keyField='id'
            wrapperClasses="boo"
            data={dataTable}
            columns={columns}
            expandRow={expandRow}
            filter={filterFactory()}
            rowStyle={rowStyle}
            pagination={paginationFactory()}
            noDataIndication={'Không có dữ liệu'}
          />
        </CCardBody>
      </CCard>

    </>
  )
}

export default Warehouses
