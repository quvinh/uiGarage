/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CInputGroup,
  CInputGroupText,
  CFormInput,
  CCard,
  CCardHeader,
  CCardBody,
  CRow,
  CCol,
  CButton,
  CFormTextarea,
  CListGroupItem,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilArrowCircleBottom } from '@coreui/icons';
import { getData } from '../api/Api';
// import BootstrapTable from 'react-bootstrap-table-next';
// import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';

// const setDate = () => {
//   let today = new Date()
//   // let date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear()
//   let date = today.toLocaleDateString("en-US", { year: 'numeric', month: '2-digit', day: '2-digit' })
//   // document.getElementById("myDate").defaultValue = date
//   console.log(date)
// }


const Imports = () => {
  const [itemId, setItemID] = useState('')
  const [batchCode, setBatchCode] = useState('')
  const [nameItem, setNameItem] = useState('')
  const [unit, setUnit] = useState('')
  const [createdBy, setCreatedBy] = useState('')
  const [amount, setAmount] = useState('')
  const [price, setPrice] = useState('')
  const [nameStore, setNameStore] = useState('')
  const [note, setNote] = useState('')

  const [dataTable, setDataTable] = useState([])
  const [dataItem, setDataItem] = useState([])


  const btnAddTable = (e) => {//Button click, add data table
    const data = {
      itemId: itemId,
      batchCode: batchCode,
      nameItem: nameItem,
      unit: unit,
      createdBy: createdBy,
      amount: amount,
      price: price,
      nameStore: nameStore,
      note: note
    }
    setDataTable([...dataTable, data])
  }

  useEffect(() => {
    // Promise.all([getData()])
    //   .then(res => {
    //     setDataItem(res[0].data)
    //   })
  }, [])

  return (
    <>
      <CCard>
        <CCardHeader>
          <h6>Nhập vật tư - phụ tùng</h6>
        </CCardHeader>
        <CCardBody>
          <CRow className="g-3">
            <CCol xs>
              <CInputGroup size="sm" className="mb-3">
                <CInputGroupText id="" style={{ width: "120px" }}>Tên vật tư</CInputGroupText>
                <CFormInput placeholder="Nhập tên vật tư" onChange={(e) => setNameItem(e.target.value)} />
              </CInputGroup>
            </CCol>
            <CCol xs>
              <CInputGroup size="sm" className="mb-3">
                <CInputGroupText id="" style={{ width: "120px" }}>ĐVT</CInputGroupText>
                {/* <CFormInput placeholder="Nhập đvt" onChange={(e) => setUnit(e.target.value)} /> */}
                <CDropdown>
                <CDropdownToggle size="sm" color="secondary">Chiếc</CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem type='button'>Bộ</CDropdownItem>
                  <CDropdownItem type='button'>Cái</CDropdownItem>
                  <CDropdownItem type='button'>Can</CDropdownItem>
                  <CDropdownItem type='button'>Chiếc</CDropdownItem>
                  <CDropdownItem type='button'>Đôi</CDropdownItem>
                  <CDropdownItem type='button'>Lon</CDropdownItem>
                  <CDropdownItem type='button'>Ông</CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
              </CInputGroup>

            </CCol>
          </CRow>
          <CRow className="g-3">
            <CCol xs>
              <CInputGroup size="sm" className="mb-3">
                <CInputGroupText id="" style={{ width: "120px" }}>Mã vật tư</CInputGroupText>
                <CFormInput placeholder="Mã vật tư" onChange={(e) => setItemID(e.target.value)} />
              </CInputGroup>
            </CCol>
            <CCol xs>
              <CInputGroup size="sm" className="mb-3">
                <CInputGroupText id="" style={{ width: "120px" }}>Mã sản xuất</CInputGroupText>
                <CFormInput placeholder="Mã sản xuất" onChange={(e) => setBatchCode(e.target.value)} />
              </CInputGroup>
            </CCol>
          </CRow>
          <CRow className="g-3">
            <CCol xs>
              <CInputGroup size="sm" className="mb-3">
                <CInputGroupText id="" style={{ width: "120px" }}>Loại vật tư</CInputGroupText>
                <CFormInput placeholder="Loại vật tư" />
              </CInputGroup>
            </CCol>
            <CCol xs>
              <CInputGroup size="sm" className="mb-3">
                <CInputGroupText id="" style={{ width: "120px" }}>Số lượng</CInputGroupText>
                <CFormInput placeholder="0" onChange={(e) => setAmount(e.target.value)} />
              </CInputGroup>
            </CCol>
          </CRow>
          <CRow className="g-3">
            <CCol xs>
              <CInputGroup size="sm" className="mb-3">
                <CInputGroupText id="" style={{ width: "120px" }}>Đơn giá</CInputGroupText>
                <CFormInput placeholder="Nhập đơn giá" onChange={(e) => setPrice(e.target.value)} />
              </CInputGroup>
            </CCol>
            <CCol xs>
              <CInputGroup size="sm" className="mb-3">
                <CInputGroupText id="" style={{ width: "120px" }}>Thành tiền</CInputGroupText>
                <CFormInput placeholder="" />
              </CInputGroup>
            </CCol>
          </CRow>
          <CRow className="g-3">
            <CCol xs>
              <CInputGroup size="sm" className="mb-3">
                <CInputGroupText id="" style={{ width: "120px" }}>Người tạo</CInputGroupText>
                <CFormInput placeholder="Họ và tên" onChange={(e) => setCreatedBy(e.target.value)} />
              </CInputGroup>
            </CCol>
            <CCol xs>
              <CInputGroup size="sm" className="mb-3">
                <CInputGroupText id="" style={{ width: "120px" }}>Nhà kho</CInputGroupText>
                <CFormInput placeholder="" onChange={(e) => setNameStore(e.target.value)} />
              </CInputGroup>
            </CCol>
          </CRow>
          <CRow className="g-3">
            <CCol xs>
              <CInputGroup size="sm" className="mb-3" style={{ width: "300px" }}>
                <CInputGroupText id="" style={{ width: "120px" }}>Ngày nhập kho</CInputGroupText>
                <CFormInput id="myDate" type="date" />
              </CInputGroup>
            </CCol>
          </CRow>
          <CButton color="success" onClick={(e) => btnAddTable(e)}>Thêm vào phiếu</CButton>
        </CCardBody>
      </CCard>
      <CTable striped hover responsive bordered borderColor="warning">
        <CTableHead color="warning">
          <CTableRow>
            <CTableHeaderCell className="text-center">STT</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Mã vật tư</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Mã sản xuất</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Tên vật tư</CTableHeaderCell>
            <CTableHeaderCell className="text-center">ĐVT</CTableHeaderCell>
            <CTableHeaderCell className="text-center">SLYC</CTableHeaderCell>
            <CTableHeaderCell className="text-center">SL thực nhận</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Đơn giá</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Tiền hàng</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Kho</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Ghi chú</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody id="myTable">
          {dataTable.map((item, index) => (
            <CTableRow v-for="item in tableItems" key={index}>
              <CTableDataCell className="text-center">{String(index + 1)}</CTableDataCell>
              <CTableDataCell className="text-center">{item.itemId}</CTableDataCell>
              <CTableDataCell className="text-center">{item.batchCode}</CTableDataCell>
              <CTableDataCell className="text-center">{item.nameItem}</CTableDataCell>
              <CTableDataCell className="text-center">{item.unit}</CTableDataCell>
              <CTableDataCell className="text-center">-</CTableDataCell>
              <CTableDataCell className="text-center">{item.amount}</CTableDataCell>
              <CTableDataCell className="text-center">{item.price}</CTableDataCell>
              <CTableDataCell className="text-center">...</CTableDataCell>
              <CTableDataCell className="text-center">K.LE HONG PHONG</CTableDataCell>
              <CTableDataCell className="text-center">{item.note}</CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </>
  )
}

export default Imports
