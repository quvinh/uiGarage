/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import {
    CRow,
    CCol
} from '@coreui/react'

import { getData, delData } from '../api/Api';
import { useHistory, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import { StyledEngineProvider } from "@mui/material/styles";
import Edit from '../detail_item/Edit';
import Detail_Item from '../detail_item/Detail_item';

const headerStyle = {
    backgroundColor: '#4ddbff',
    fontWeight: 'bold',
}
const columns = [{
    dataField: 'id',
    text: 'ID vật tư',
    headerStyle: headerStyle,
}, {
    dataField: 'itemname',
    text: 'Tên vật tư',
    headerStyle: headerStyle,
}, {
    dataField: 'categoryname',
    text: 'Nhóm',
    headerStyle: headerStyle,
}, {
    dataField: 'batch_code',
    text: 'Mã lô',
    headerStyle: headerStyle,
}, {
    dataField: 'warehouse_id',
    text: 'Mã kho',
    headerStyle: headerStyle,
}, {
    dataField: 'shelf_id',
    text: 'Mã giá kệ',
    headerStyle: headerStyle,
}, /*{
    dataField: 'amount',
    text: 'Số lượng khả dụng',
    headerStyle: headerStyle,
}, {
    dataField: 'amount',
    text: 'Số lượng không khả dụng',
    headerStyle: headerStyle,
},*/ {
    dataField: 'amount',
    text: 'Tổng số lượng',
    headerStyle: headerStyle,
}, {
    dataField: 'unit',
    text: 'Đơn vị tính',
    headerStyle: headerStyle,
}];
const Itemshelf = (props) => {
    const [show, setShow] = useState(false);
    const [dataTable, setDataTable] = useState([])
    console.log(props)
    // const { id } = useParams()

    const handleDelete = (e, id) => {
        // const eClick = e.currentTarget;
        console.log(id)
        Promise.all([delData('http://127.0.0.1:8000/api/admin/shelf/delete/' + id)])
            .then(function (response) {
                // eClick.closest('tr').remove();
            })
            .catch(error => {
                console.log(error)
            })
    }

    useEffect(() => {
        console.log(props)
        Promise.all([getData('http://127.0.0.1:8000/api/admin/shelf/itemShelf/' + props.props)])
            .then(response => {
                setDataTable(response[0].data)
                console.log(response[0].data)
            })
    }, []);
    const expandRow = {
        onlyOneExpanding: true,
        renderer: row => (
            <>
                <Edit props={row.id} />
                {/* <Detail_Item props={row.id} /> */}
            </>
        ),
        showExpandColumn: true
    }

    return (
        <>

            <p style={{ fontWeight: "bold" }}>&gt;Danh sách vật tư</p>
            <BootstrapTable
                keyField='id'
                // wrapperClasses="boo"
                data={dataTable}
                columns={columns}
                expandRow={expandRow}
                filter={filterFactory()}
                // rowStyle={rowStyle}
                noDataIndication={'Không có dữ liệu'}
            />
        </>
    )
}

export default Itemshelf
