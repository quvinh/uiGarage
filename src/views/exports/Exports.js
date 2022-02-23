/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
} from '@coreui/react';

import {DataExportTable} from './DataExports';


const Exports = () => {
  return (
    <>
      {/* <CTable striped hover responsive bordered borderColor="warning">
        <CTableHead color="warning">
          <CTableRow>
            <CTableHeaderCell className="text-center">STT</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Mã vật tư</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Tên vật tư</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Loại yêu cầu</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Số lượng</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Người tạo</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Ngày tạo</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Trạng thái</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
        </CTableBody>
      </CTable> */}
      <DataExportTable />
    </>
  )
}

export default Exports
