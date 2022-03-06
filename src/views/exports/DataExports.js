/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable prettier/prettier */
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import React, { useEffect, useState } from 'react';
import { getData } from '../api/Api';



const columns = [{
  dataField: 'id',
  text: 'ID Vật tư',
  filter: textFilter()
}, {
  dataField: 'name',
  text: 'Tên vật tư',
  filter: textFilter()
}, {
  dataField: 'request',
  text: 'Loại yêu cầu',
  filter: textFilter()
}, {
  dataField: 'amount',
  text: 'Số lượng'
}, {
  dataField: 'created_by',
  text: 'Người tạo',
  filter: textFilter()
}, {
  dataField: 'created_at',
  text: 'Ngày tạo',
  filter: textFilter()
}, {
  dataField: 'status',
  text: 'Trạng thái'
}
];

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
          item_id: row.id,
          item_name: row.name,
          amount: row.amount,
          created_by: row.created_by,
          created_at: row.created_at,
          status: row.status
        }])
      } else {
        setDataSelected(dataSelected.filter(function(value) {
          return value.item_id !== row.id
        }))
      }
    },
  };

  useEffect(() => {
    Promise.all([getData('http://127.0.0.1:8000/api/admin/export')])
      .then(function (res) {
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
      />
    </div>
  )
}
