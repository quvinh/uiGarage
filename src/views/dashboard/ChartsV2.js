/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React from "react";
import { CChart } from '@coreui/react-chartjs'

const ChartsV2 = (props) => {
  const arrImportCode = []
  props.importCode.map((item, index) => {
    arrImportCode.push(item.importCode)
  })
  const arrImportMonth = []
  props.importCode.map((item, index) => {
    arrImportMonth.push(item.month)
  })
  const arrExportMonth = []
  props.exportCode.map((item, index) => {
    arrExportMonth.push(item.month)
  })
  const arrExportCode = []
  props.exportCode.map((item, index) => {
    arrExportCode.push(item.exportCode)
  })

  return (
    <CChart
      type="line"
      data={{
        labels: arrImportMonth,
        datasets: [
          {
            label: 'Nhập',
            backgroundColor: 'rgba(241, 90, 34, 1)',
            borderColor: 'rgba(220, 220, 220, 1)',
            pointBackgroundColor: 'rgba(220, 220, 220, 1)',
            pointBorderColor: '#fff',
            data: arrImportCode,
          },
          {
            label: 'Xuất',
            backgroundColor: 'rgba(151, 187, 205, 1)',
            borderColor: 'rgba(151, 187, 205, 1)',
            pointBackgroundColor: 'rgba(151, 187, 205, 1)',
            pointBorderColor: '#fff',
            data: arrExportCode,
          },
        ],
      }}
    />
  )
}
export default ChartsV2
