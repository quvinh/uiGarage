/* eslint-disable prettier/prettier */
import React, { lazy, useEffect, useState } from 'react'
import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { CChartLine, CChartBar, CChart } from '@coreui/react-chartjs'
import { getData, putData } from '../api/Api.js'
import { Scale } from 'chart.js'


const Charts = () => {
  const [importVT, setImportVT] = useState([])
  const [exportVT, setExportVT] = useState([])
  const [importCode, setImportCode] = useState([])
  const [exportCode, setExportCode] = useState([])
  useEffect(() => {
    Promise.all([getData('http://127.0.0.1:8000/api/admin/dashboard/import'), getData('http://127.0.0.1:8000/api/admin/dashboard/export'),
    // getData('http://127.0.0.1:8000/api/admin/dashboard/importCode'), getData('http://127.0.0.1:8000/api/admin/dashboard/exportCode')
  ])
      .then(function (res) {
        console.log(res)
        setImportVT(res[0].data)
        setExportVT(res[1].data)
        // setImportCode(res[2].data)
        // setExportCode(res[3].data)
      }).catch((err) => {
        // console.log(err)
      })
  })
  const arrImportAmount = []
  importVT.map((item, index) => {
    arrImportAmount.push(item.importAmount)
  })
  const arrImportMonth = []
  importVT.map((item, index) => {
    arrImportMonth.push(item.month)
  })
  const arrExportAmount = []
  exportVT.map((item, index) => {
    arrExportAmount.push(item.exportAmount)
  })
  // const arrImportMonth = []
  // importVT.map((item, index) => {
  //   arrImportMonth.push(item.month)
  // })
  return (
    <CRow>
      <CCol sm={6} lg={6}>
        <CChart
          type="bar"
          data={{

            labels: arrImportMonth,
            datasets: [
              {
                label: 'Nhập',
                backgroundColor: 'rgba(241, 90, 34, 1)',
                borderColor: 'rgba(220, 220, 220, 1)',
                pointBackgroundColor: 'rgba(220, 220, 220, 1)',
                pointBorderColor: '#fff',
                data: arrImportAmount,
              },
              {
                label: 'Xuất',
                backgroundColor: 'rgba(151, 187, 205, 1)',
                borderColor: 'rgba(151, 187, 205, 1)',
                pointBackgroundColor: 'rgba(151, 187, 205, 1)',
                pointBorderColor: '#fff',
                data: arrExportAmount,
              },
            ],
          }}
        />
      </CCol>
      <CCol>
        {/* <CChartBar
          // data={{
          //   labels: arrImportMonth,
          //   datasets: [
          //     {
          //       label: 'Nhập',
          //       backgroundColor: 'rgba(241, 90, 34, 1)',
          //       borderColor: 'rgba(220, 220, 220, 1)',
          //       pointBackgroundColor: 'rgba(220, 220, 220, 1)',
          //       pointBorderColor: '#fff',
          //       data: arrImportAmount,
          //     },
          //     {
          //       label: 'Xuất',
          //       backgroundColor: 'rgba(151, 187, 205, 1)',
          //       borderColor: 'rgba(151, 187, 205, 1)',
          //       pointBackgroundColor: 'rgba(151, 187, 205, 1)',
          //       pointBorderColor: '#fff',
          //       data: arrExportAmount,
          //     },
          //   ],
          // }}
        /> */}
      </CCol>
    </CRow>
    // <CCol>

    // </CCol>


  )
}
export default Charts
