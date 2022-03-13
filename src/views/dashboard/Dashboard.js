/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'

import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDropdown,
  CRow,
} from '@coreui/react'
import { getData } from '../api/Api.js'
import Charts from './Charts.js'
// import ChartsV2 from './ChartsV2.js'
import { getDataWarehouseID, getRoleNames, getToken } from 'src/components/utils/Common.js'
import { useHistory } from 'react-router-dom'


//const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown.js'))
// const WidgetsBrand = lazy(() => import('../widgets/WidgetsBrand.js'))

const Dashboard = () => {
  // var nameRole = ''
  // getRoleNames().split(' ').map((item) => {
  //   if (!isNaN(item)) nameRole = item
  // })
  // isNaN(nameRole) ? nameRole = nameRole : nameRole = null

  const [tonKho, setTonKho] = useState([])
  const [importVT, setImportVT] = useState([])
  const [exportVT, setExportVT] = useState([])
  // const [importCode, setImportCode] = useState([])
  // const [exportCode, setExportCode] = useState([])

  const history = useHistory()

  const year = new Date().getFullYear().toString()
  // var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  // var d = new Date();
  // const month = months[d.getMonth()].toString();
  const getIdWarehouseRole = () => {
    var nameRole = ''
    getRoleNames().split(' ').map((item) => {
      if (!isNaN(item)) nameRole = item
    })
    return nameRole
  }

  useEffect(() => {
    Promise.all([
      getData(getRoleNames() === 'admin' ? (
        'http://127.0.0.1:8000/api/admin/dashboard/tongTonKho?token=' + getToken(),
        'http://127.0.0.1:8000/api/admin/dashboard/import/' + year + '?token=' + getToken(),
        'http://127.0.0.1:8000/api/admin/dashboard/export/' + year + '?token=' + getToken()
      ) : getDataWarehouseID().length > 0 && (
        'http://127.0.0.1:8000/api/admin/dashboard/tonKho/' + getDataWarehouseID()[0] + '?token=' + getToken(),
        'http://127.0.0.1:8000/api/admin/dashboard/importByWarehouse/' + getDataWarehouseID()[0] + '/' + year + '?token=' + getToken(),
        'http://127.0.0.1:8000/api/admin/dashboard/exportByWarehouse/' + getDataWarehouseID()[0] + '/' + year + '?token=' + getToken()
      ))])
      .then(function (res) {
        // res.header('Access-Control-Allow-Origin: *')
        setTonKho(res[0].data)
        setImportVT(res[1].data)
        setExportVT(res[2].data)
        // setImportCode(res[4].data)
        // setExportCode(res[5].data)
      })
      .catch((error) => {
        console.log(error)
        // if (error.response.status === 403) {
        //   history.push('/404')
        // } else if (error.response.status === 401) {
        //   history.push('/login')
        // }
        // history.push('/404')
      })
  }, [])

  return (
    <>
      <CRow>
        <CCol sm={6} lg={5}>
            <CCard textColor='black' className='mb-3 border-warning'>
              <CCardBody>
                <h4>Kho đang hoạt động</h4>
              </CCardBody>
            </CCard>
          {tonKho.map((item, index) => (
            <CCard key={index} textColor='black' className='mb-3 border-warning'>
              <CCardBody >
                <h4>{item.name} <CBadge color='success'> Active </CBadge>  <p style={{ fontSize: '18px', fontStyle: 'italic', color: 'blue' }}>Số lượng vật tư:{item.tonKho}</p></h4>
                <h5>Giá trị vật tư trong kho: </h5>
                <h6>{parseInt(item.total).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</h6>
              </CCardBody>
            </CCard>
          ))}
        </CCol>
        <CCol sm={6} lg={6}>
          <CCard>
            <CCardBody>
              <Charts importVT={importVT} exportVT={exportVT} />
            </CCardBody>
          </CCard>
          {/* <CCard>
            <CCardHeader>
              <CDropdown />
            </CCardHeader>
            <CCardBody>
              <ChartsV2 importCode={importCode} exportCode={exportCode}/>
            </CCardBody>
          </CCard> */}
        </CCol>
      </CRow>

    </>
  )
}

export default Dashboard
