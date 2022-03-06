/* eslint-disable prettier/prettier */
import React, { lazy, useEffect, useState } from 'react'

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
import ChartsV2 from './ChartsV2.js'
import { getToken } from 'src/components/utils/Common.js'
import { useHistory } from 'react-router-dom'


//const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown.js'))
// const WidgetsBrand = lazy(() => import('../widgets/WidgetsBrand.js'))

const Dashboard = () => {

  const [tonKho, setTonKho] = useState([])
  const [solgKho, setSolgKho] = useState([])
  const [importVT, setImportVT] = useState([])
  const [exportVT, setExportVT] = useState([])
  const [importCode, setImportCode] = useState([])
  const [exportCode, setExportCode] = useState([])

  const history = useHistory()

  const year = new Date().getFullYear().toString()
  // var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  // var d = new Date();
  // const month = months[d.getMonth()].toString();

  useEffect(() => {
    Promise.all([getData('http://127.0.0.1:8000/api/admin/dashboard/tonKho?token=' + getToken()),
    getData('http://127.0.0.1:8000/api/admin/dashboard/solgKho?token=' + getToken()),
    getData('http://127.0.0.1:8000/api/admin/dashboard/import/' + year + '?token=' + getToken()),
    getData('http://127.0.0.1:8000/api/admin/dashboard/export/' + year + '?token=' + getToken()),
    // getData('http://127.0.0.1:8000/api/admin/dashboard/importCode/' + month + '/' + year),
    // getData('http://127.0.0.1:8000/api/admin/dashboard/exportCode/' + month + '/' + year),
    ])
      .then(function (res) {
        // res.header('Access-Control-Allow-Origin: *')
        setTonKho(res[0].data)
        setSolgKho(res[1].data)
        setImportVT(res[2].data)
        setExportVT(res[3].data)
        // setImportCode(res[4].data)
        // setExportCode(res[5].data)
      })
      .catch((error) => {
        // console.log(error)
        if(error.response.status === 403) {
          history.push('/404')
        }
      })
  }, [])

  return (
    <>
      {/* <WidgetsDropdown /> */}
      <CRow>
        <CCol sm={6} lg={5}>
          {solgKho.map((item, index) => (
            <CCard key={index} textColor='black' className='mb-3 border-warning'>
              <CCardBody>
                <h1>Kho đang hoạt động: {item.solgKho}</h1>
              </CCardBody>
            </CCard>
          ))}
          {tonKho.map((item, index) => (
            <CCard key={index} textColor='black' className='mb-3 border-warning'>
              <CCardBody >
                <h4>Tổng tồn kho {item.name}: {item.tonKho} <CBadge color='success'> Active </CBadge></h4>
                <h5>Tổng tiền trong kho:</h5>
                <h6>{item.total} VND</h6>
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
          <CCard>
            <CCardHeader>
              <CDropdown />
            </CCardHeader>
            <CCardBody>
              {/* <ChartsV2 importCode={importCode} exportCode={exportCode}/> */}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      {/* <CRow>

      </CRow> */}
    </>
  )
}

export default Dashboard
