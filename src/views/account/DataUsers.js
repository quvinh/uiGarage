/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { useHistory } from 'react-router-dom';
import { getToken } from 'src/components/utils/Common';
import { getData } from '../api/Api';

export const DataUsers = () => {
  const [dataTable, setDataTable] = useState([])
  const history = useHistory()
  const columns = [{
    dataField: 'id',
    text: 'Product ID'
  }, {
    dataField: 'name',
    text: 'Product Name'
  }, {
    dataField: 'price',
    text: 'Product Price'
  }]

  const expandRow = {
    renderer: row => (
      <div>
        <p>{`This Expand row is belong to rowKey ${row.id}`}</p>
        <p>You can render anything here, also you can add additional data on every row object</p>
        <p>expandRow.renderer callback will pass the origin row object to you</p>
      </div>
    ),
    showExpandColumn: true
  }

  useEffect(() => {
    const header = `Authorization: Bearer ${getToken()}`
    Promise.all([getData('http://127.0.0.1:8000/api/auth/users/token', { headers: { header } })])
      .then(function (res) {
        setDataTable(res[0].data)
      })
      .catch(error => {
        console.log(error)
        history.push('/login')
      })
  }, [])

  return (
    <>
      <BootstrapTable
        keyField='id'
        data={dataTable}
        columns={columns}
        expandRow={expandRow}
      />
    </>
  )
}
