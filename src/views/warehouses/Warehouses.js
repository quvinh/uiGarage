/* eslint-disable prettier/prettier */

import React, { useEffect, useState } from 'react'

import {
  CButton,
  CCol,
  CRow,
  CCard,
  CCardBody,
  CDropdownMenu,
  CDropdownItem,
  CDropdown,
  CDropdownToggle,
  CCardHeader,

} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {  cilPlus, cilSettings } from '@coreui/icons'
import { getData, delData } from '../api/Api.js'
import { useHistory } from 'react-router-dom';
import { getToken } from 'src/components/utils/Common.js'

//const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown.js'))
// const WidgetsBrand = lazy(() => import('../widgets/WidgetsBrand.js'))

const Warehouses = () => {
  const history = useHistory()

  const handleReload = () => {
    Promise.all([getData('http://127.0.0.1:8000/api/admin/warehouse?token=' + getToken())])
      .then(function (res) {
        setDataWarehouse(res[0].data)
      })
  }

  // const handleAddWarehouse = () => {
  //   const data = {
  //     name: name,
  //     location: location,
  //     note: note
  //   }
  //   console.log(data);
  //   Promise.all([postData('http://127.0.0.1:8000/api/admin/warehouse/store?token=' + getToken(), data)])
  //     .then(res => {
  //       console.log('Added succesfully', res)
  //     }).catch(error => {
  //       // validatorAll()
  //       console.log(':(((')
  //       console.log(error)
  //     })
  //   window.location.reload(false)
  // }

  const handleDelete = (e, id) => {
    console.log(id)
    Promise.all([delData('http://127.0.0.1:8000/api/admin/warehouse/delete/' + id + '?token=' + getToken())])
      .then(function (response) {
        handleReload()
        // eClick.closest('tr').remove();
      })
      .catch(error => {
        console.log(error)
      })
  }
  // const [visible1, setVisible1] = useState(false)
  const [dataWarehouse, setDataWarehouse] = useState([])
  const [dataCountWarehouse, setDataCountWarehouse] = useState([])
  useEffect(() => {
    Promise.all([getData('http://127.0.0.1:8000/api/admin/warehouse?token=' + getToken()),
    getData('http://127.0.0.1:8000/api/admin/warehouse/warehouseShow?token=' + getToken()),
      // getData('http://127.0.0.1:8000/api/admin/warehouse/countWarehouse')
    ])
      .then(function (res) {
        setDataWarehouse(res[0].data)
        setDataCountWarehouse(res[1].data)
      })
      .catch((error) => {
        console.log(error.response.status)
        if (error.response.status === 403) {
          history.push('/404')
        }
      })
  }, [])

  return (
    <>
      {/* <WidgetsDropdown /> */}
      <CButton href='#/warehouses-add' className='btn1'><CIcon icon={cilPlus} /></CButton>
      <CCard>
        <CCardBody>
          <CRow>{dataWarehouse.map((item, index) => (
            <CCol sm={6} lg={6} key={index}>
              <CCard color='secondary' textColor='black' className='mb-3 border-info'>
                <CCardHeader style={{ backgroundColor: "#ffa366" }}><h4>{item.name} </h4></CCardHeader>
                <CCardBody>
                  <CRow>
                    <CCol sm={10} lg={10}>
                      <p>Mã kho: {item.id}</p>
                      <p>Địa chỉ: {item.location}</p>
                    </CCol>
                    <CCol>
                      <CDropdown variant="btn-group" direction="dropstart">
                        <CDropdownToggle color="transparent" caret={false} className="p-0">
                          <CIcon style={{position: "relative", right: "-10px"}} icon={ cilSettings } size={'md'} />
                        </CDropdownToggle>
                        <CDropdownMenu >
                          <CDropdownItem href={'#/warehouses-edit/' + item.id}>Sửa</CDropdownItem>
                          <CDropdownItem href={'#/warehouses-shelf/' + item.id}>Chi tiết</CDropdownItem>
                          <CDropdownItem onClick={(e) => handleDelete(e, item.id)} >Delete</CDropdownItem>
                        </CDropdownMenu>
                      </CDropdown>
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCard>
            </CCol>
          ))}
          </CRow>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Warehouses
