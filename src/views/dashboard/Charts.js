/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { lazy, useEffect, useState } from 'react'
import {
} from '@coreui/react'
import { CChartLine, CChartBar, CChart } from '@coreui/react-chartjs'
import { getData, putData } from '../api/Api.js'
import { Scale } from 'chart.js'


const Charts = (props) => {
  // const [importVT, setImportVT] = useState([])
  // const [exportVT, setExportVT] = useState([])
  // const [importCode, setImportCode] = useState([])
  // const [exportCode, setExportCode] = useState([])
  // useEffect(() => {
  //   Promise.all([getData('http://127.0.0.1:8000/api/admin/dashboard/import'), getData('http://127.0.0.1:8000/api/admin/dashboard/export'),
  //     // getData('http://127.0.0.1:8000/api/admin/dashboard/importCode'), getData('http://127.0.0.1:8000/api/admin/dashboard/exportCode')
  //   ])
  //     .then(function (res) {
  //       console.log(res)
  //       setImportVT(res[0].data)
  //       setExportVT(res[1].data)
  //       // setImportCode(res[2].data)
  //       // setExportCode(res[3].data)
  //     }).catch((err) => {
  //       // console.log(err)
  //     })
  // })
  const arrImportAmount = []
  props.importVT.map((item, index) => {
    arrImportAmount.push(item.importAmount)
  })
  const arrImportMonth = []
  props.importVT.map((item, index) => {
    arrImportMonth.push(item.month)
  })
  const arrExportAmount = []
  props.exportVT.map((item, index) => {
    arrExportAmount.push(item.exportAmount)
  })
  // const arrImportMonth = []
  // importVT.map((item, index) => {
  //   arrImportMonth.push(item.month)
  // })
  return (
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
  )
}
export default Charts
