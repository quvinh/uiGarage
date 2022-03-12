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
  CFormTextarea,
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
  cilPlus,
  cilCheckAlt,
  cilX,
  cilSearch
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

import { StyledEngineProvider } from "@mui/material/styles";
import { Button } from '@mui/material';
import { getToken } from 'src/components/utils/Common';

const ShelfWarehouse = (props) => {


  const [visible, setVisible] = useState(false)
  const [visibleXL, setVisibleXL] = useState(false)


  const [dataItemClick, setDataItemClick] = useState([])
  const [listItem, setListItem] = useState([])

  const [itemWarehouse, setItemWarehouse] = useState([])
  const [categoryname, setCategory] = useState([])
  const [dataItem, setDataItem] = useState([])
  const [searchName, setSearchName] = useState([])

  const [dataShelf, setDataShelf] = useState([])
  const [shelfId, setShelfId] = useState([])
  const [shelfStatus, setShelfStatus] = useState([])
  const [shelfName, setShelfName] = useState([])
  const [shelfPosition, setShelfPosition] = useState([])


  const [categoryId, setCategoryId] = useState([])
  const [itemShelfId, setItemShelfId] = useState([])
  const [itemAmount, setAmount] = useState([])
  const [unit, setUnit] = useState([])
  const [itemId, setItemId] = useState([])
  const [itemPrice, setPrice] = useState([])
  const [itemStatus, setStatus] = useState([])
  const [amountShelf, setAmountShelf] = useState([])
  const [amountItem, setAmountItem] = useState([])

  const [total, setTotal] = useState([])
  const [isShelfSelected, setIsShelfSelected] = useState(false)
  const [warehouseName, setWarehouseName] = useState([])
  const [dataCategory, setDataCategory] = useState([])

  const [amountNotValid, setAmountNotValid] = useState([])
  const [idItem, setIdItem] = useState([])
  const [nameItem, setNameItem] = useState([])
  const [categoryIdItem, setCategoryIdItem] = useState([])
  const [categoryNameItem, setCategoryNameItem] = useState([])
  const [shelfIdItem, setShelfIdItem] = useState([])
  const [shelfNameItem, setShelfNameItem] = useState([])
  const [warehouseIdItem, setWarehouseIdItem] = useState([])
  const [warehouseNameItem, setWarehouseNameItem] = useState([])
  const [priceItem, setPriceItem] = useState([])
  const [amountItems, setAmountItems] = useState([])
  const [unitItem, setUnitItem] = useState([])
  const [statusItem, setStatusItem] = useState([])
  const [amountValid, setAmountValid] = useState([])




  const handlSearchName = (e) => {
    setSearchName(e.target.value)
  }

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
  const showAll = () => {
    Promise.all([getData('http://127.0.0.1:8000/api/admin/warehouse/listItem/' + props.match.params.id + '?token=' + getToken())])
      .then(function (res) {
        console.log(res[0].data)
        setItemWarehouse(res[0].data)
      })
  }

  const handleSearch = (searchName) => {

    Promise.all([getData('http://127.0.0.1:8000/api/admin/warehouse/searchItems/' + searchName + '/' + props.match.params.id + '?token=' + getToken())])
      .then(response => {
        setItemWarehouse(response[0].data);
      })
  }

  // console.log(dataItemClick)
  const handleUpdateItem = (e) => {
    const dataItem = {
      shelf_id: itemShelfId,
      amount: itemAmount,
      price: itemPrice,
      status: itemStatus,
    }
    Promise.all([putData('http://127.0.0.1:8000/api/admin/detail_item/update/' + dataItemClick + '?token=' + getToken(), dataItem)])
      .then(response => {
        console.log('Edited successfully ^^')
        // handleClick(shelfId)
        handleReload()
      }).catch((err) => {
        console.log(err)
      })
  }
  // console.log(dataItem)

  const handleReload = () => {
    Promise.all([getData('http://127.0.0.1:8000/api/admin/warehouse/shelfWarehouse/' + props.match.params.id + '?token=' + getToken())])
      .then(response => {
        console.log(response[0].data)
        setDataShelf(response[0].data)
      })
  }

  const handleValid = (id,shelfid,warehouseid) => {
    if (id !== '') {
      Promise.all([getData('http://127.0.0.1:8000/api/admin/warehouse/amountItemKKD/' + id + '/' + shelfid + '/' + warehouseid +'?token=' + getToken(),{ delay: false })])
      // getData('http://127.0.0.1:8000/api/admin/warehouse/amountItemKKDTransfer' + id + '/' + shelfid + '/' + warehouseid +'?token=' + getToken(), 
        .then(function (response) {
          setAmountNotValid(response[0].data)
        })
    }
    else {
      return Error;
    }
  }

  const handleDetailItem = (id, shelfid, warehouseid) => {
    console.log(id)
    console.log(shelfid)
    console.log(warehouseid)
    Promise.all([getData('http://127.0.0.1:8000/api/admin/warehouse/detailItemId/' + id + '/' + shelfid + '/' + warehouseid + '?token=' + getToken(), { delay: false })])
      .then(function (response) {
        console.log(response[0].data)
        setIdItem(response[0].data[0].id)
        setNameItem(response[0].data[0].itemname)
        setCategoryIdItem(response[0].data[0].categoryid)
        setCategoryNameItem(response[0].data[0].categoryname)
        setShelfIdItem(response[0].data[0].shelfid)
        setShelfNameItem(response[0].data[0].shelfname)
        setWarehouseIdItem(response[0].data[0].warehouseid)
        setWarehouseNameItem(response[0].data[0].warehousename)
        setPriceItem(response[0].data[0].price)
        setAmountItems(response[0].data[0].amount)
        setUnitItem(response[0].data[0].unit)
        setStatusItem(response[0].data[0].itemstatus)
      })
  }



  const handleDeleteShelf = (e, id) => {
    Promise.all([delData('http://127.0.0.1:8000/api/admin/shelf/delete/' + id + '?token=' + getToken())])
      .then(function (res) {
        handleReload()
        setIsShelfSelected(false)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const handleClick = (e, id) => {
    Promise.all([getData('http://127.0.0.1:8000/api/admin/warehouse/itemShelf/' + props.match.params.id + '/' + id + '?token=' + getToken()),
    getData('http://127.0.0.1:8000/api/admin/shelf/show/' + id + '?token=' + getToken())])
      .then(response => {
        console.log(response[0].data)
        setItemWarehouse(response[0].data);
        setShelfName(response[1].data.name);
        setShelfPosition(response[1].data.position);
      })
    setShelfId(id);

  }
  useEffect(() => {
    Promise.all([getData('http://127.0.0.1:8000/api/admin/warehouse/shelfWarehouse/' + props.match.params.id + '?token=' + getToken()),
    getData('http://127.0.0.1:8000/api/admin/category' + getToken()),
    getData('http://127.0.0.1:8000/api/admin/warehouse/show/' + props.match.params.id + '?token=' + getToken()),
    getData('http://127.0.0.1:8000/api/admin/warehouse/amountShelf/' + props.match.params.id + '?token=' + getToken()),
    getData('http://127.0.0.1:8000/api/admin/warehouse/listItem/' + props.match.params.id + '?token=' + getToken()),
      // getData('http://127.0.0.1:8000/api/admin/warehouse/sumAmountItem/' + props.match.params.id + '?token=' + getToken()),

    ])
      .then(function (response) {
        setDataShelf(response[0].data)
        setDataCategory(response[1].data)
        setWarehouseName(response[2].data.name)
        setAmountShelf(response[3].data)
        setAmountItem(response[3].count)
        console.log(response[4].data)
        setItemWarehouse(response[4].data)
      })
  }, []);
  return (
    <>
      <CCard>
        <CCardHeader>
          <CRow>
            <CCol sm={9} lg={9}>
              {warehouseName} -- Số lượng giá kệ: {amountShelf} -- Số vật tư: {amountItem}
              {/* -- Tổng giá trị :{total} */}
            </CCol>
            <CCol sm={3} lg={3}>
              <CForm>
                <CInputGroup>
                  <CFormInput placeholder='Nhập tên vật tư' id="note" rows="1" onChange={(e) => setSearchName(e.target.value)}></CFormInput>
                  <CButton color='warning' onClick={(e) => { handleSearch(searchName) }} ><CIcon icon={cilSearch} /></CButton>
                </CInputGroup>
              </CForm>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol sm={3} lg={2}><div className="d-grid gap-2 d-md-block">
              <CButton color="warning" className='m-2' href={'#/shelf-add/' + props.match.params.id}><CIcon icon={cilPlus} /></CButton>
              <CButton style={{ backgroundColor: "#99ff66", width: "120px", height: "38px", border: "none", color: "#262626" }}
                onClick={(e) => {
                  showAll()
                  setIsShelfSelected(false)
                }}>Tất cả</CButton>
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
                          <CListGroupItem>Mã giá: {shelfId} - Tên giá: {shelfName} - Vị trí: {shelfPosition}</CListGroupItem>
                        </CListGroup>
                        {/* </div> */}
                      </CCol>

                      <CCol sm={2} lg={2}>
                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                          <CButton color="warning" href={'#/shelf-edit/' + shelfId} ><CIcon icon={cilFile} /></CButton>
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
                        <CTableHeaderCell className="text-center">Tổng số lượng</CTableHeaderCell>
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
                              <CButton color='success' onClick={() => {
                                handleValid(item.id,item.shelf_id,item.warehouse_id)
                                handleDetailItem(item.id, item.shelf_id, item.warehouse_id)
                                setVisibleXL(!visibleXL)
                              }}><CIcon icon={cilDescription} /></CButton>
                              {/* <CButton className='me-2' color="success"><CIcon icon={cilDescription} /></CButton> */}
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
                      <CFormSelect aria-label="Default select example" value={itemShelfId} onChange={(e) => setItemShelfId(e.target.value)}>
                        <option>Chọn giá kệ</option>
                        {dataShelf.map((item, index) => (
                          <option key={index} value={item.shelf_id}>{item.shelf_name}</option>
                        ))}
                      </CFormSelect>
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText id="" style={{ width: "100px" }}>Số lượng tổng</CInputGroupText>
                      <CFormInput id='name' placeholder="Số lượng" onChange={(e) => handleAmountChange(e)} value={itemAmount} />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText id="" style={{ width: "100px" }}>Đơn giá</CInputGroupText>
                      <CFormInput id='name' placeholder="Đơn giá" onChange={(e) => handlePriceChange(e)} value={itemPrice} />
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
          <CButton color="warning" onClick={(e) => {

            handleUpdateItem(e, dataItemClick)
          }
          }><CIcon icon={cilCheckAlt} /></CButton>
          <CButton color="danger" onClick={() => {
            setVisible(false)
            setItemShelfId([])
            setAmount([])
            setPrice([])
            setStatus(['1'])
          }}>
            <CIcon icon={cilX} />
          </CButton>

        </CModalFooter>
      </CModal>
      <CModal size="xl" visible={visibleXL} onClose={() => setVisibleXL(false)}>
        <CModalHeader>
          <CModalTitle>Chi tiết vật tư</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CListGroup>
            <CCard>
              <CCardBody>
                <CRow>
                  <CCol sm={6} lg={6}>
                    <CListGroupItem>ID vật tư: {idItem}</CListGroupItem>
                    <CListGroupItem>Tên vật tư: {nameItem}</CListGroupItem>
                    <CListGroupItem>Số lượng không khả dụng: {amountNotValid}</CListGroupItem>
                    <CListGroupItem>Số lượng khả dụng: {amountItems - amountNotValid}</CListGroupItem>
                    <CListGroupItem>Tổng số lương: {amountItems}</CListGroupItem>
                    <CListGroupItem>Đơn vị tính: {unitItem}</CListGroupItem>
                  </CCol>
                  <CCol sm={6} lg={6}>
                    <CListGroupItem>Mã nhóm: {categoryIdItem}</CListGroupItem>
                    <CListGroupItem>Tên nhóm: {categoryNameItem}</CListGroupItem>
                    <CListGroupItem>Mã giá kệ: {shelfIdItem}</CListGroupItem>
                    <CListGroupItem>Tên giá kệ: {shelfNameItem}</CListGroupItem>
                    <CListGroupItem>Mã kho: {warehouseIdItem}</CListGroupItem>
                    <CListGroupItem>Tên kho: {warehouseNameItem}</CListGroupItem>
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
          </CListGroup>
        </CModalBody>
      </CModal>
    </>
  )
}

export default ShelfWarehouse
