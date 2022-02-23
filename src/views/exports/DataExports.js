/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable prettier/prettier */
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import React, { useEffect, useState } from 'react';
import { getData } from '../api/Api';

const columns = [{
  dataField: 'itemId',
  text: 'Mã vật tư',
  headerStyle: {
    backgroundColor: '#ff944d'
  },
  filter: textFilter()
}, {
  dataField: 'batch_code',
  text: 'Mã sản xuất',
  filter: textFilter()
}, {
  dataField: 'nameItem',
  text: 'Tên vật tư',
  filter: textFilter()
}, {
  dataField: 'unit',
  text: 'ĐVT',
  filter: textFilter()
}, {
  dataField: 'nameCategory',
  text: 'Loại vật tư',
  filter: textFilter()
}, {
  dataField: 'amount',
  text: 'Số lượng',
  filter: textFilter()
}, {
  dataField: 'price',
  text: 'Đơn giá',
  filter: textFilter()
}, {
  dataField: 'nameWarehouse',
  text: 'Kho',
  filter: textFilter()
},
];

const rowStyle = (row, rowIndex) => {
  const style = {};
  rowIndex%2===0?style.backgroundColor = '#c8e6c9':style.backgroundColor = '#00BFFF';
  return style
}

export const DataExportTable = () => {
  const [tableDashboard, setTableDashboard] = useState([])
  const [dataSelected, setDataSelected] = useState([])
  function checkDataSelect(index) {
    if (dataSelected.length===0) {
      return true
    } else {
      for (let i = 0; i < dataSelected.length; i++) {
        if (dataSelected[i].item_id===index) {
          return false
        }
      }
      return true
    }
  }

  const handleGetSelectedData = () => {
    console.log(dataSelected)
  }

  const selectRow = {
    mode: 'checkbox',
    clickToSelect: false,
    onSelect: (row, isSelect, rowIndex, e) => {
      if (isSelect && checkDataSelect(row.id)) {
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
        }])
      } else {
        setDataSelected(dataSelected.filter(function(value) {
          return value.item_id !== row.id
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
    <div>
      <button className="btn btn-default" onClick={handleGetSelectedData}>Get Current Selected Rows</button>
      <BootstrapTable
        keyField='id'
        data={tableDashboard}
        columns={columns}
        filter={filterFactory()}
        selectRow={selectRow}
        rowStyle={rowStyle}
      />
    </div>
  )
}
