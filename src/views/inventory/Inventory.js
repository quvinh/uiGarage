/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CTableCaption,
  CCard,
  CCardBody
} from '@coreui/react';
import { getData, putData } from '../api/Api.js'
import DataExport from './DataExport.js';
import DataImport from './DataImport.js';

const Inventory = () => {


  const columns = [{
    dataField: 'code',
    text: 'Mã Phiếu'
  }, {
    dataField: 'tenKho',
    text: 'Tên Kho'
  }, {
    dataField: 'created_at',
    text: 'Ngày Tạo'
  }, {
    dataField: 'created_by',
    text: 'Người tạo'
  }];

  const [codeExport, setCodeExport] = useState([])
  const [codeImport, setCodeImport] = useState([])

  useEffect(() => {
    Promise.all([getData('http://127.0.0.1:8000/api/admin/inventory/showCodeExport'),
    getData('http://127.0.0.1:8000/api/admin/inventory/showCodeImport')
    ])
      .then(function (res) {
        console.log(res[1].data)
        setCodeExport(res[0].data)
        setCodeImport(res[1].data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const expandRowExport = {
    renderer: row => (
      <>
        <div>
          <DataExport props={row.code} />
        </div>
      </>

    ),
    onlyOneExpanding: true,
    // showExpandColumn: true,
    // expandByColumnOnly: true
  };
  const expandRowImport = {
    renderer: row => (
      <>
        <div>
          <DataImport props={row.code} />
        </div>
      </>

    ),
    onlyOneExpanding: true,
    showExpandColumn: true,
    expandByColumnOnly: true
  };

  return (
    <>
      <CCard>
        <CCardBody>
          <h1>Phiếu Nhập</h1>
          <BootstrapTable
            keyField='code'
            data={codeImport}
            columns={columns}
            expandRow={expandRowImport}
            noDataIndication={'Không có dữ liệu'}
          />
        </CCardBody>
      </CCard>
      <hr />
      <CCard>
        <CCardBody>
          <h1>Phiếu Xuất</h1>
          <BootstrapTable
            keyField='code'
            data={codeExport}
            columns={columns}
            expandRow={expandRowExport}
            noDataIndication={'Không có dữ liệu'}
          />
        </CCardBody>
      </CCard>

    </>

  )

}
export default Inventory
