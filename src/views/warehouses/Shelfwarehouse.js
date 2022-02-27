/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
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
  CCol,
  CRow,
  CContainer,
  CForm,
  CInputGroup,
  CInputGroupText,
  CFormInput,
  CFormTextarea
} from '@coreui/react';
import { getData, delData, putData, postData } from '../api/Api';
import { useHistory, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';

import Itemshelf from './Itemshelf';
import Add from '../shelf/Add';
import Edit from '../shelf/Edit';

import { StyledEngineProvider } from "@mui/material/styles";



const headerStyle = {
  backgroundColor: '#ff944d',
  fontWeight: 'bold',
}
const columns = [{
  dataField: 'id',
  text: 'Mã giá kệ',
  headerStyle: headerStyle,
}, {
  dataField: 'name',
  text: 'Tên giá kệ',
  headerStyle: headerStyle,
}, {
  dataField: 'position',
  text: 'vị trí',
  headerStyle: headerStyle,
}, 
// {
//   dataField: 'status',
//   text: 'trạng thái',
//   headerStyle: headerStyle,
// }
];
const ShelfWarehouse = (props) => {

  const [dataTable, setDataTable] = useState([])
  const [dataWarehouse, setDataWarehouse] = useState([])

  const history = useHistory()

  // const { id } = useParams()
  
  useEffect(() => {
    Promise.all([getData('http://127.0.0.1:8000/api/admin/warehouse/shelfWarehouse/' + props.props),
      // getData('http://127.0.0.1:8000/api/admin/shelf/show/' + ),
      // getData('http://127.0.0.1:8000/api/admin/warehouse')
    ])
      .then(response => {
        setDataTable(response[0].data)
        // setDataWarehouse(response[1].data)
      })
  }, []);
  const expandRow = {
    onlyOneExpanding: true,
    renderer: row => (
      <div>
        <Edit props={row.id} />
        <Itemshelf props={row.id} />
      </div>
    ),
    showExpandColumn: true
  }

  return (
    <>
      <p style={{ fontWeight: "bold" }}>Danh sách giá kệ
        <StyledEngineProvider injectFirst>
          <Add />
        </StyledEngineProvider>
      </p>
      <BootstrapTable
        keyField='id'
        // wrapperClasses="boo"
        data={dataTable}
        columns={columns}
        expandRow={expandRow}
        filter={filterFactory()}
        // rowStyle={rowStyle}
        pagination={ paginationFactory() }
        noDataIndication={'Không có dữ liệu'}
      >
      </BootstrapTable>
    </>
  )
}

export default ShelfWarehouse
