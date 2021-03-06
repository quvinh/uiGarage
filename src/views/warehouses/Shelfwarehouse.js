/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import {
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
  cilDelete,
  cilFile,
  cilDescription,
  cilPlus,
  cilCheckAlt,
  cilX,
  cilSearch,
  cilPenAlt
} from '@coreui/icons';
import { getData, delData, putData } from '../api/Api';

// import Itemshelf from './Itemshelf';
// import Add from '../shelf/Add';
// import Edit from '../shelf/Edit';

import { getToken } from 'src/components/utils/Common';

const ShelfWarehouse = (props) => {
  const [visible, setVisible] = useState(false)
  const [visibleXL, setVisibleXL] = useState(false)
  const [visibleDel, setVisibleDel] = useState(false)
  const [visibleAlert, setVisibleAlert] = useState(false)

  const [count, setCount] = useState('')
  const [dataItemClick, setDataItemClick] = useState([])

  const [itemWarehouse, setItemWarehouse] = useState([])
  const [searchName, setSearchName] = useState([])

  const [dataShelf, setDataShelf] = useState([])
  const [shelfId, setShelfId] = useState([])
  const [shelfName, setShelfName] = useState([])
  const [shelfPosition, setShelfPosition] = useState([])


  const [itemShelfId, setItemShelfId] = useState([])
  const [itemAmount, setAmount] = useState([])
  const [itemPrice, setPrice] = useState([])
  const [itemStatus, setStatus] = useState([])
  const [amountShelf, setAmountShelf] = useState([])
  const [amountItem, setAmountItem] = useState([])

  const [isShelfSelected, setIsShelfSelected] = useState(false)
  const [warehouseName, setWarehouseName] = useState([])
  const [dataCategory, setDataCategory] = useState([])

  const [amountNotValid, setAmountNotValid] = useState([])
  const [idItem, setIdItem] = useState([])
  const [nameItem, setNameItem] = useState([])
  const [itemname, setItemname] = useState('')
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

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  }
  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  }
  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  }
  const handleNameChange = (e) => {
    setNameItem(e.target.value);
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

  const handleGetItem = (item) => {
    // setDataItem(item)
    setNameItem(item.itemname)
    setItemShelfId(item.shelf_id)
    setAmount(item.amount)
    setPrice(item.price)
    setStatusItem(item.status)
  }

  // console.log(dataItemClick)
  const handleUpdateItem = (e) => {
    const dataItem = {
      // shelf_id: itemShelfId,
      amount: itemAmount,
      price: itemPrice,
      status: 0,
    }
    console.log(dataItem)
    Promise.all([putData('http://127.0.0.1:8000/api/admin/detail_item/update/' + dataItemClick + '?token=' + getToken(), dataItem)])
      .then(response => {
        console.log('Edited successfully ^^')
        // handleClick(shelfId)
        showAll()
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


  const handleValid = (id, shelfid, warehouseid) => {
    if (id !== '') {
      Promise.all([getData('http://127.0.0.1:8000/api/admin/warehouse/amountItemKKD/' + id + '/' + shelfid + '/' + warehouseid + '?token=' + getToken(), { delay: false })])
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
    if (count === 0) {
      Promise.all([delData('http://127.0.0.1:8000/api/admin/shelf/delete/' + id + '?token=' + getToken())])
        .then(function (res) {
          handleReload()
          setIsShelfSelected(false)
        })
        .catch(error => {
          console.log(error)
        })
    }
    else {
      setVisibleAlert(!visibleAlert)
      setVisibleDel(false)
    }
  }

  const handleClick = (e, id) => {
    Promise.all([getData('http://127.0.0.1:8000/api/admin/warehouse/itemShelf/' + props.match.params.id + '/' + id + '?token=' + getToken()),
    getData('http://127.0.0.1:8000/api/admin/shelf/show/' + id + '?token=' + getToken())])
      .then(response => {
        console.log(response[0].data)
        setItemWarehouse(response[0].data);
        setShelfName(response[1].data.name);
        setShelfPosition(response[1].data.position);
        setCount(response[0].count);
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

        setItemWarehouse(response[4].data)
      })
  }, []);
  return (
    <>
      <CCard>
        <CCardHeader>
          <CRow>
            <CCol sm={9} lg={9}>
              {warehouseName} -- S??? l?????ng gi?? k???: {amountShelf}
              {/* -- S??? lo???i v???t t??: {amountItem} */}
              {/* -- T???ng gi?? tr??? :{total} */}
            </CCol>
            <CCol sm={3} lg={3}>
              <CForm>
                <CInputGroup>
                  <CFormInput placeholder='Nh???p t??n v???t t??' id="note" rows="1" onChange={(e) => setSearchName(e.target.value)}></CFormInput>
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
                }}>T???t c???</CButton>
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
                          <CListGroupItem>M?? gi??: {shelfId} - T??n gi??: {shelfName} - V??? tr??: {shelfPosition}</CListGroupItem>
                        </CListGroup>
                        {/* </div> */}
                      </CCol>

                      <CCol sm={2} lg={2}>
                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                          <CButton color="info" href={'#/shelf-edit/' + shelfId} ><CIcon icon={cilPenAlt} /></CButton>
                          <CButton color="danger" onClick={(e) => {
                            setVisibleDel(!visible)
                            // handleDeleteShelf(e, shelfId)
                          }} ><CIcon icon={cilDelete} /></CButton>
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
                        <CTableHeaderCell className="text-center">ID v???t t??</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">T??n v???t t??</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">Nh??m</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">M?? gi?? k???</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">T??n gi?? k???</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">T???ng s??? l?????ng</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">Thao t??c</CTableHeaderCell>
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
                              <CButton className='me-2' color='info' onClick={(e) => {
                                handleGetItem(item)
                                setDataItemClick(item.detail_item_id)
                                setVisible(!visible)
                              }}>
                                <CIcon icon={cilPenAlt} />
                              </CButton>
                              <CButton color='success' onClick={() => {
                                handleValid(item.id, item.shelf_id, item.warehouse_id)
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
          <CModalTitle>S???a v???t t??</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow className="justify-content-center">
            <CCol md={9} lg={9} xl={9}>
              <CCard className="mx-4">
                <CCardBody className="p-4">
                  <CForm>
                    {/* <CInputGroup className="mb-3">
                      <CInputGroupText id="" style={{ width: "100px" }}>T??n v???t t??</CInputGroupText>
                      <CFormInput id='name' placeholder="t??n v???t t??" onChange={(e) => handleNameChange(e)} value={nameItem} />
                    </CInputGroup> */}
                    {/* <CInputGroup className="mb-3">
                      <CFormSelect aria-label="Default select example" value={itemShelfId} onChange={(e) => setItemShelfId(e.target.value)}>
                        <option>Ch???n gi?? k???</option>
                        {dataShelf.map((item, index) => (
                          <option key={index} value={item.shelf_id}>{item.shelf_name}</option>
                        ))}
                      </CFormSelect>
                    </CInputGroup> */}
                    <CInputGroup className="mb-3">
                      <CInputGroupText id="" style={{ width: "100px" }}>T??n</CInputGroupText>
                      <CFormInput id='name' placeholder="t??n v???t t??" onChange={(e) => handleNameChange(e)} value={nameItem} disabled />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText id="" style={{ width: "100px" }}>Gi??/K???</CInputGroupText>
                      <CFormInput id='name' placeholder="t??n v???t t??" onChange={(e) => handleNameChange(e)} value={shelfNameItem} disabled />
                    </CInputGroup>

                    <CInputGroup className="mb-3">
                      <CInputGroupText id="" style={{ width: "100px" }}>S??? l?????ng t???ng</CInputGroupText>
                      <CFormInput id='name' placeholder="S??? l?????ng" onChange={(e) => handleAmountChange(e)} value={itemAmount} />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText id="" style={{ width: "100px" }}>????n gi??</CInputGroupText>
                      <CFormInput id='name' placeholder="????n gi??" onChange={(e) => handlePriceChange(e)} value={itemPrice + " VND"} disabled />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      {/* <CFormSelect
                        onChange={(e) => handleStatusChange(e)}
                        aria-label="Tr???ng th??i"
                        options={[
                          'Tr???ng th??i',
                          { label: '???? s??? d???ng', value: '1' },
                          { label: 'H???t', value: '0' }
                        ]}
                      /> */}
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
            setVisible(false)
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
          <CModalTitle>Chi ti???t v???t t??</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CListGroup>
            <CCard>
              <CCardBody>
                <CRow>
                  <CCol sm={6} lg={6}>
                    <CListGroupItem>ID v???t t??: {idItem}</CListGroupItem>
                    <CListGroupItem>T??n v???t t??: {nameItem}</CListGroupItem>
                    <CListGroupItem>S??? l?????ng kh??ng kh??? d???ng: {amountNotValid}</CListGroupItem>
                    <CListGroupItem>S??? l?????ng kh??? d???ng: {amountItems - amountNotValid}</CListGroupItem>
                    <CListGroupItem>T???ng s??? l????ng: {amountItems}</CListGroupItem>
                    <CListGroupItem>????n v??? t??nh: {unitItem}</CListGroupItem>
                  </CCol>
                  <CCol sm={6} lg={6}>
                    <CListGroupItem>M?? nh??m: {categoryIdItem}</CListGroupItem>
                    <CListGroupItem>T??n nh??m: {categoryNameItem}</CListGroupItem>
                    <CListGroupItem>M?? gi?? k???: {shelfIdItem}</CListGroupItem>
                    <CListGroupItem>T??n gi?? k???: {shelfNameItem}</CListGroupItem>
                    <CListGroupItem>M?? kho: {warehouseIdItem}</CListGroupItem>
                    <CListGroupItem>T??n kho: {warehouseNameItem}</CListGroupItem>
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
          </CListGroup>
        </CModalBody>
      </CModal>
      <CModal visible={visibleDel} onClose={() => setVisibleDel(false)}>
        <CModalHeader onClose={() => setVisibleDel(false)}>
        </CModalHeader>
        <CModalBody>B???n c?? ch???c mu???n x??a</CModalBody>
        <CModalFooter>
          <CButton color="danger" onClick={(e) => {
            handleDeleteShelf(e, shelfId)
            setVisibleDel(false)
          }}><CIcon icon={cilCheckAlt} /></CButton>
        </CModalFooter>
      </CModal>
      <CModal visible={visibleAlert} onClose={() => setVisibleAlert(false)}>
        <CModalHeader onClose={() => setVisibleAlert(false)}>
        </CModalHeader>
        <CModalBody>Vui l??ng chuy???n h???t v???t t?? tr?????c khi x??a</CModalBody>
      </CModal>
    </>
  )
}

export default ShelfWarehouse
