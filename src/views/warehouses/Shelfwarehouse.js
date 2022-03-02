/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCol,
  CRow,
  CCard,
  CCardBody,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CDropdownMenu,
  CDropdownItem,
  CDropdown,
  CDropdownDivider,
  CDropdownToggle,
  CCardHeader,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CInputGroup,
  CFormSelect,
  CFormInput,

  CInputGroupText,
  CListGroup,
  CListGroupItem,

} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import {
  cilOptions,
  cilDelete,
  cilPeople,
  cilFile,
  cilDescription,
} from '@coreui/icons';
import { getData, delData, putData, postData } from '../api/Api';
import { useHistory, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';

// import Itemshelf from './Itemshelf';
// import Add from '../shelf/Add';
// import Edit from '../shelf/Edit';
import '../../css/dropdown.css'

import { StyledEngineProvider } from "@mui/material/styles";
import { Button } from '@mui/material';

const ShelfWarehouse = (props) => {

  const [dataShelf, setDataShelf] = useState([])
  const [visible, setVisible] = useState(false)
  const [visibleShelf, setVisibleShelf] = useState(false)
  const [dataItemClick, setDataItemClick] = useState([])

  const [itemWarehouse, setItemWarehouse] = useState([])
  const [categoryname, setCategory] = useState([])
  const [shelfId, setShelfId] = useState([])
  const [dataItem, setDataItem] = useState([])

  const [itemId, setItemId] = useState([]);
  const [categoryId, setCategoryId] = useState([]);
  const [item_shelfId, setItemShelfId] = useState([]);
  const [item_amount, setAmount] = useState([]);
  const [unit, setUnit] = useState([]);
  const [item_price, setPrice] = useState([]);
  const [item_status, setStatus] = useState([]);
  const [amountShelf, setAmountShelf] = useState([]);
  const [amountItem, setAmountItem] = useState([]);
  const [isShelfSelected, setIsShelfSelected] = useState(false)

  const [warehouseName, setWarehouseName] = useState([]);
  // const [data_Shelf, setData_Shelf] = useState([]);
  const [dataCategory, setDataCategory] = useState([]);
  // const [validator, showValidationMessage] = Validator()

  const handleItemIdChange = (e) => {
    setItemId(e.target.value);
  }
  const handleCategoryIdChange = (e) => {
    setCategoryId(e.target.value);
  }
  const handleShelfIdChange = (e) => {
    setItemShelfId(e.target.value);
  }
  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  }
  const handleUnitChange = (e) => {
    setUnit(e.target.value);
  }
  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  }
  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  }

  const handleReset = (e) => {
    setShelfId('')
    setAmount('')
    setPrice('')
    setStatus(0)
  }
  console.log(dataItemClick)
  const handleUpdateItem = (e) => {
    const dataItem = {
      shelf_id: item_shelfId,
      amount: item_amount,
      price: item_price,
      status: item_status,
    }

    console.log(dataItem)
    Promise.all([putData('http://127.0.0.1:8000/api/admin/detail_item/update/' + dataItemClick, dataItem)])
      .then(response => {
        console.log('Edited successfully ^^')
        handleClick(shelfId)
        // history.push('/detail_item')
      }).catch((err) => {
        console.log(err)
      })
  }

  const handleReload = () => {
    Promise.all([getData('http://127.0.0.1:8000/api/admin/warehouse/shelfWarehouse/' + props.match.params.id)])
      .then(response => {
        setDataShelf(response[0].data)
      })
  }

  const handleDeleteShelf = (e, id) => {
    Promise.all([delData('http://127.0.0.1:8000/api/admin/shelf/delete/' + id)])
      .then(function (res) {
        handleReload()
        setIsShelfSelected(false)
      })
      .catch(error => {
        console.log(error)
      })

    // window.location.reload()
  }


  // const history = useHistory()
  const handleClick = (e, id) => {
    Promise.all([getData('http://127.0.0.1:8000/api/admin/warehouse/itemShelf/' + props.match.params.id + '/' + id)])
      .then(response => {
        setItemWarehouse(response[0].data);
      })
    setShelfId(id);
    
  }
  useEffect(() => {
    Promise.all([getData('http://127.0.0.1:8000/api/admin/warehouse/shelfWarehouse/' + props.match.params.id),
    getData('http://127.0.0.1:8000/api/admin/category'),
    getData('http://127.0.0.1:8000/api/admin/warehouse/show/' + props.match.params.id),
    getData('http://127.0.0.1:8000/api/admin/warehouse/amountShelf/' + props.match.params.id),
    getData('http://127.0.0.1:8000/api/admin/warehouse/sumAmountItem/' + props.match.params.id),
    ])
      .then(response => {
        console.log(response[0].data)
        setDataShelf(response[0].data)
        setDataCategory(response[1].data)
        setWarehouseName(response[2].data.name)
        setAmountShelf(response[3].data)
        setAmountItem(response[4].data[0].amountItem)
        // console.log(response[4].data[0].amountItem)
      })
  }, []);
  return (
    <>
      <CCard>
        <CCardHeader>{warehouseName} -- Số lượng giá kệ: {amountShelf} -- Số vật tư: {amountItem} </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol sm={3} lg={2}><div className="d-grid gap-2 d-md-block">
              <CButton color="warning" href={'#/shelf-add/' + props.match.params.id}>Add</CButton>
              {/* <Add/> */}
            </div>
              <br />
              {dataShelf.map((item, index) => (
                <CCard key={index}>
                  <CButtonGroup role="group" aria-label="Basic example">
                    <CButton color="warning" onClick={(e) => {
                      handleClick(e, item.shelf_id)
                      setIsShelfSelected(true)
                    }}>{item.shelf_name}</CButton>
                  </CButtonGroup>
                </CCard>
              ))}
            </CCol>

            <CCol sm={9} lg={10}>
              {
                (isShelfSelected) ? (
                  <>
                    <CRow>
                      <CCol sm={10} lg={10}>
                        {/* <div className="d-grid gap-2 d-md-flex justify-content-md-start"> */}
                          <CListGroup>
                            <CListGroupItem>{dataItem.shelf_id} - {dataItem.shelf_name} - {dataItem.shelf_status}</CListGroupItem>
                          </CListGroup>
                        {/* </div> */}
                      </CCol>
                      <CCol sm={2} lg={2}>
                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                          <CButton color="warning" className="me-md-2" href={'#/shelf-edit/' + shelfId} ><CIcon icon={cilFile} /></CButton>
                          <CButton color="danger" onClick={(e) => handleDeleteShelf(e, shelfId)} ><CIcon icon={cilDelete} /></CButton>
                        </div>
                      </CCol>
                    </CRow>

                  </>
                ) : (<></>)
              }
              <br />
              <CCard className='card-item'>
                <CCardBody>
                  <CTable>
                    <CTableHead color="warning">
                      <CTableRow>
                        <CTableHeaderCell className="text-center">STT</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">ID vật tư</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">Tên vật tư</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">Nhóm</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">Mã giá kệ</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">Tên giá kệ</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">Số lượng</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">Thao tác</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody rowStyle={{ alignItems: "stretch" }}>
                      {itemWarehouse.map((item, index) => (
                        <CTableRow key={index}>
                          <CTableDataCell className="text-center">{index + 1}</CTableDataCell>
                          <CTableDataCell className="text-center">{item.id}</CTableDataCell>
                          <CTableDataCell className="text-center">{item.itemname}</CTableDataCell>
                          <CTableDataCell className="text-center">{item.categoryname}</CTableDataCell>
                          <CTableDataCell className="text-center">{item.shelf_id}</CTableDataCell>
                          <CTableDataCell className="text-center">{item.shelfname}</CTableDataCell>
                          <CTableDataCell className="text-center">{item.amount}</CTableDataCell>
                          <CTableDataCell className="text-center">
                            <div >
                              <CButton className='me-2' color='warning' onClick={(e) => {
                                setDataItemClick(item.detail_item_id)
                                setVisible(!visible)
                              }}>
                                <CIcon icon={cilFile} />
                              </CButton>
                              <CButton className='me-2' color="success"><CIcon icon={cilDescription} /></CButton>
                            </div>
                          </CTableDataCell>
                        </CTableRow>
                      ))}
                    </CTableBody>
                  </CTable>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
      <CModal visible={visible} onClose={() => setVisible(false)} backdrop={"static"}>
        <CModalHeader onClose={() => {
          setVisible(false)
          setItemShelfId([])
          setAmount([])
          setPrice([])
          setStatus(['1'])
        }}>
          <CModalTitle>Sửa vật tư</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow className="justify-content-center">
            <CCol md={9} lg={9} xl={9}>
              <CCard className="mx-4">
                <CCardBody className="p-4">
                  <CForm>
                    <CInputGroup className="mb-3">
                      <CFormSelect aria-label="Default select example" value={item_shelfId} onChange={(e) => setItemShelfId(e.target.value)}>
                        <option>Chọn giá kệ</option>
                        {dataShelf.map((item, index) => (
                          <option key={index} value={item.shelf_id}>{item.shelf_name}</option>
                        ))}
                      </CFormSelect>
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText id="" style={{ width: "100px" }}>Số lượng tổng</CInputGroupText>
                      <CFormInput id='name' placeholder="Số lượng" onChange={(e) => handleAmountChange(e)} value={item_amount} />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText id="" style={{ width: "100px" }}>Đơn giá</CInputGroupText>
                      <CFormInput id='name' placeholder="Đơn giá" onChange={(e) => handlePriceChange(e)} value={item_price} />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CFormSelect
                        onChange={(e) => setStatus(e.target.value)}
                        aria-label="Trạng thái"
                        options={[
                          'Trạng thái',
                          { label: 'Còn', value: '1' },
                          { label: 'Hết', value: '0' }
                        ]}
                      />
                    </CInputGroup>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton color="danger" onClick={() => {
            setVisible(false)
            setItemShelfId([])
            setAmount([])
            setPrice([])
            setStatus(['1'])
          }}>
            Đóng
          </CButton>
          <CButton color="warning" onClick={(e) => {

            handleUpdateItem(e, dataItemClick)
          }
          }>Lưu</CButton>
        </CModalFooter>
      </CModal>
      <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Thông tin giá kệ</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CListGroup>
            <CListGroupItem></CListGroupItem>
          </CListGroup>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="primary">Save changes</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default ShelfWarehouse
