/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import {
    CTable,
    CTableHead,
    CTableRow,
    CTableHeaderCell,
    CTableBody,
    CTableDataCell,
    CCard,
    CCardHeader,
    CCardBody,
    CButton
} from '@coreui/react';
import { getData } from '../api/Api';
import { useHistory, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Itemshelf = (props) => {
    const [dataTable, setDataTable] = useState([])
    console.log(props)
    const { id } = useParams()


    useEffect(() => {
        Promise.all([getData('http://127.0.0.1:8000/api/admin/shelf/itemShelf/' + id)])
            .then(response => {
                setDataTable(response[0].data)
                console.log(response[0].data)
            })
    }, []);

    return (
        <>
            <p style={{ fontWeight: "bold" }}>&gt;Danh sách vật tư</p>
            <CCard>
                <CCardBody>
                    <CTable striped hover responsive bordered borderColor="warning">
                        <CTableHead color="warning">
                            <CTableRow>
                                <CTableHeaderCell className="text-center">STT</CTableHeaderCell>
                                <CTableHeaderCell className="text-center">ID vật tư</CTableHeaderCell>
                                <CTableHeaderCell className="text-center">Tên vật tư</CTableHeaderCell>
                                <CTableHeaderCell className="text-center">Nhóm</CTableHeaderCell>
                                <CTableHeaderCell className="text-center">Mã lô</CTableHeaderCell>
                                <CTableHeaderCell className="text-center">Số lượng</CTableHeaderCell>
                                <CTableHeaderCell className="text-center">Đơn vị tính</CTableHeaderCell>
                                <CTableHeaderCell className="text-center">Trạng thái</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {dataTable.map((item, index) => (
                                <CTableRow key={index}>
                                    <CTableDataCell className="text-center">{index + 1}</CTableDataCell>
                                    <CTableDataCell className="text-center">{item.id}</CTableDataCell>
                                    <CTableDataCell className="text-center" style={{ width: "200px" }} >{item.itemname}</CTableDataCell>
                                    <CTableDataCell className="text-center" style={{ width: "300px" }}>{item.categoryname}</CTableDataCell>
                                    <CTableDataCell className="text-center" style={{ width: "300px" }}>{item.batch_code}</CTableDataCell>
                                    <CTableDataCell className="text-center" style={{ width: "300px" }}>{item.amount}</CTableDataCell>
                                    <CTableDataCell className="text-center" style={{ width: "300px" }}>{item.unit}</CTableDataCell>
                                    <CTableDataCell className="text-center" style={{ width: "200px" }}>{item.status === '1' ? 'hết' : 'Còn'}</CTableDataCell>
                                </CTableRow>
                            ))}
                        </CTableBody>
                    </CTable>
                </CCardBody>
            </CCard>
        </>
    )
}

export default Itemshelf
