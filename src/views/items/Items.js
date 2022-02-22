/* eslint-disable prettier/prettier */
import React from 'react'
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CCard,
  CCardHeader,
  CCardBody
} from '@coreui/react';

const Items = () => {
  return (
    <>
      <CCard>
        <CCardHeader>
          <h3>Danh sách hàng hoá <span style={{ color: "red", fontSize: 12 }}>(Tổng số: 1234 hàng hoá/ Kho: Lê Hồng phong)</span></h3>
        </CCardHeader>
        <CCardBody>
          <CTable striped hover responsive bordered borderColor="warning">
            <CTableHead color="warning">
              <CTableRow>
                {/* <CTableHeaderCell className="text-center">
                      <CIcon icon={cilPeople} />
                    </CTableHeaderCell> */}
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
              <CTableRow>
                <CTableDataCell className="text-center">1</CTableDataCell>
                <CTableDataCell className="text-center">MVT01-1234</CTableDataCell>
                <CTableDataCell className="text-center">Lọc dầu</CTableDataCell>
                <CTableDataCell className="text-center">Nhập kho</CTableDataCell>
                <CTableDataCell className="text-center">111</CTableDataCell>
                <CTableDataCell className="text-center">Vinh</CTableDataCell>
                <CTableDataCell className="text-center">12-2-2022</CTableDataCell>
                <CTableDataCell className="text-center">Chờ duyệt</CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableDataCell className="text-center">2</CTableDataCell>
                <CTableDataCell className="text-center">MVT01-3456</CTableDataCell>
                <CTableDataCell className="text-center">Lọc điều hoà</CTableDataCell>
                <CTableDataCell className="text-center">Nhập kho</CTableDataCell>
                <CTableDataCell className="text-center">111</CTableDataCell>
                <CTableDataCell className="text-center">Vinh</CTableDataCell>
                <CTableDataCell className="text-center">12-2-2022</CTableDataCell>
                <CTableDataCell className="text-center">Chờ duyệt</CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Items
