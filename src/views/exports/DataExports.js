/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable prettier/prettier */
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import React, { useEffect, useState } from 'react';
import { getData, postData } from '../api/Api';
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react';
const headerStyle = {
  backgroundColor: '#ff944d',
  fontWeight: 'bold',
}


const columns = [{
  dataField: 'itemId',
  text: 'Mã vật tư',
  headerStyle: headerStyle,
  filter: textFilter()
}, {
  dataField: 'batch_code',
  text: 'Mã sản xuất',
  headerStyle: headerStyle,
  filter: textFilter()
}, {
  dataField: 'nameItem',
  text: 'Tên vật tư',
  headerStyle: headerStyle,
  filter: textFilter()
}, {
  dataField: 'unit',
  text: 'ĐVT',
  headerStyle: headerStyle,
  filter: textFilter()
}, {
  dataField: 'nameCategory',
  text: 'Loại vật tư',
  headerStyle: headerStyle,
  filter: textFilter()
}, {
  dataField: 'amount',
  text: 'Số lượng',
  headerStyle: headerStyle,
  filter: textFilter()
}, {
  dataField: 'price',
  text: 'Đơn giá',
  headerStyle: headerStyle,
  filter: textFilter()
}, {
  dataField: 'nameWarehouse',
  text: 'Kho',
  headerStyle: headerStyle,
  filter: textFilter()
},
];

const rowStyle = (row, rowIndex) => {
  const style = {};
  rowIndex % 2 === 0 ? style.backgroundColor = '#c8e6c9' : style.backgroundColor = '#ffff99';
  return style
}

export const DataExportTable = () => {
  const [tableDashboard, setTableDashboard] = useState([])
  const [dataSelected, setDataSelected] = useState([])
  const [dataExport, setDataExport] = useState([])

  function checkDataSelect(index) {
    console.log(dataSelected)
    if (dataSelected.length === 0) {
      console.log("=0")
      return true
    } else {
      // for (let i = 0; i < dataSelected.length; i++) {
      //   if (dataSelected[i].item_id===index) {
      //     return false
      //   }
      // }
      dataSelected.map((item) => {
        console.log(item.item_id)
        if (item.item_id === index) {
          return false
        }
      })
      return true
    }
  }

  const handleGetSelectedData = () => {
    // console.log(dataSelected)
    setDataExport([...dataExport, dataSelected])
    console.log(dataExport)
  }

  const handleExport = (e) => {
    Promise.all([postData('http://127.0.0.1:8000/api/admin/export/store', dataExport)])
      .then(function(res){
        console.log("Exported")
      })
      .catch(error => {
        console.log(error)
      })
  }

  const selectRow = {
    mode: 'checkbox',
    clickToSelect: false,
    onSelect: (row, isSelect, rowIndex, e) => {
      // console.log(rowIndex, " ", row.itemId)
      if (isSelect && checkDataSelect(row.itemId)) {
        console.log("Add")
        setDataSelected([...dataSelected, {
          item_id: row.itemId,
          batch_code: row.batch_code,
          item_name: row.nameItem,
          unit: row.unit,
          name_category: row.nameCategory,
          amount: row.amount,
          price: row.price,
          name_warehouse: row.nameWarehouse,
          warehouse_id: row.warehouse_id,
          created_by: 1
        }])
      } else {
        setDataSelected(dataSelected.filter(function (value) {
          return value.item_id !== row.itemId
        }))
      }
    },
  };

  useEffect(() => {
    Promise.all([getData('http://127.0.0.1:8000/api/admin/items/itemInWarehouse/1')])
      .then(function (res) {
        console.log(res[0].data)
        setTableDashboard(res[0].data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <>
      <div className="d-grid gap-2 d-md-flex justify-content-md-center">
        <button className="btn btn-success" onClick={(e) => handleExport(e)}>Tạo phiếu xuất</button>
      </div>
      <CTable id='dataExport' striped hover responsive bordered borderColor="warning">
        <CTableHead color="light">
          <CTableRow>
            <CTableHeaderCell className="text-center">STT</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Mã vật tư</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Mã sản xuất</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Tên vật tư</CTableHeaderCell>
            <CTableHeaderCell className="text-center">ĐVT</CTableHeaderCell>
            {/* <CTableHeaderCell className="text-center">SLYC</CTableHeaderCell> */}
            <CTableHeaderCell className="text-center">SL thực</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Đơn giá</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Kho</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody id="myTable">
          {dataExport.map((item, index) => (
            <CTableRow v-for="item in tableItems" key={index}>
              <CTableDataCell className="text-center">{String(index + 1)}</CTableDataCell>
              <CTableDataCell className="text-center">{item[0].item_id}</CTableDataCell>
              <CTableDataCell className="text-center">{item[0].batch_code}</CTableDataCell>
              <CTableDataCell className="text-center">{item[0].item_name}</CTableDataCell>
              <CTableDataCell className="text-center">{item[0].unit}</CTableDataCell>
              {/* <CTableDataCell className="text-center">-</CTableDataCell> */}
              <CTableDataCell className="text-center">{item[0].amount}</CTableDataCell>
              <CTableDataCell className="text-center">{item[0].price}</CTableDataCell>
              <CTableDataCell className="text-center">{item[0].name_warehouse}</CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
      <hr />
      <div className="d-grid gap-2 d-md-flex justify-content-md-center">
        <button className="btn btn-primary" onClick={handleGetSelectedData}>Thêm phiếu xuất</button>
      </div>
      <BootstrapTable
        keyField='itemId'
        data={tableDashboard}
        columns={columns}
        filter={filterFactory()}
        selectRow={selectRow}
        rowStyle={rowStyle}
        noDataIndication={'Không có dữ liệu'}
      />
    </>
  )
}
