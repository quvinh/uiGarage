/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import { getData, postData } from '../api/Api'
import Validator from './Validation'
import { ShowImport } from './ShowImport'
import { Card, CardContent, Grid } from '@mui/material'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import Autocomplete from '@mui/material/Autocomplete'
import { alpha, styled } from '@mui/material/styles'

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: 'green',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'green',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'red',
    },
    '&:hover fieldset': {
      borderColor: 'yellow',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'green',
    },
  },
});

const Demo = () => {
  const [item_id, setItemID] = useState('')
  const [batch_code, setBatchCode] = useState('')
  const [warehouse_id, setWarehouse] = useState('')
  const [suppliers_id, setSuppliers] = useState('')
  const [shelf_id, setShelf] = useState('')
  const [category_id, setCategory] = useState()
  const [name, setName] = useState('')
  const [unit, setUnit] = useState('')
  const [created_by, setCreatedBy] = useState('')
  const [amount, setAmount] = useState('')
  const [price, setPrice] = useState('')
  const [totalPrice, setTotalPrice] = useState('')
  const [nameWarehouse, setNameWarehouse] = useState('')
  const [note, setNote] = useState('')

  const [dataTable, setDataTable] = useState([])
  const [dataItem, setDataItem] = useState([])
  const [dataWarehouse, setDataWarehouse] = useState([])
  const [dataSuppliers, setDataSuppliers] = useState([])
  const [dataShelf, setDataShelf] = useState([])
  const [dataCategory, setDataCategory] = useState([])
  const [dataNameSelected, setDataNameSelected] = useState([])

  // const simpleValidator = useRef(SimpleReactValidator())
  const [validator, showValidationMessage] = Validator()

  const setNull = () => {
    setName('')
    setItemID('')
    setBatchCode('')
    setAmount('0')
    setPrice('0')
    setTotalPrice('0')
    setUnit('')
    setCategory('')
    setWarehouse('')
    setSuppliers('')
    setShelf('')
    setCreatedBy('')
    // setDataTable([])
  }

  const onChangeName = (e, newValue) => {
    setName(newValue)
    // if(dataItem.some(item => newValue === item.name_item)) {
    // }
    dataItem.map((item) => {
      if(item.name_item === newValue) {
        setItemID(item.item_id)
        setBatchCode(item.batch_code)
        setCategory(item.category_id)
        setShelf(item.shelf_id)
        setAmount(item.amount)
        setUnit(item.unit)
        setWarehouse(item.warehouse_id)
        setPrice(item.price)
        console.log(category_id)
      }
    })
    // console.log(arr)
  }

  const onChangeWarehouse = (e) => {
    let index = e.nativeEvent.target.selectedIndex;
    setWarehouse(e.target.value)
    setNameWarehouse(e.nativeEvent.target[index].text)
    console.log(e.nativeEvent.target[index].text)
  }

  const btnAddTable = (e) => {//Button click, add data table
    console.log(unit)
    if (validator.allValid()) {
      const data = {
        item_id: item_id,
        batch_code: batch_code,
        warehouse_id: warehouse_id,
        shelf_id: shelf_id,
        suppliers_id: suppliers_id,
        category_id: category_id,
        name: name,
        unit: unit,
        created_by: 1,//USER
        amount: amount,
        price: price,
        nameWarehouse: nameWarehouse,
        note: note
      }
      setDataTable([...dataTable, data])
      console.log(dataTable)
    } else {
      showValidationMessage(true)
    }
  }

  const btnCreateImport = () => {
    console.log(unit)
    if (dataTable.length > 0) {
      dataTable.map((item, index) => {
        console.log(item)
        Promise.all([postData('http://127.0.0.1:8000/api/admin/import/store', item)])
          .then(function (res) {
            console.log(index)
          })
          .catch(err => {
            console.log(err)
          })
      })
      setNull()
    }
  }

  const nameSelected = (
    nameItem,
    itemId,
    category_id,
    warehouse_id,
    shelf_id,
    suppliers_id,
    batchCode,
    amount,
    unit,
    price) => {
    console.log('Clicked', suppliers_id)
    setName(nameItem)
    setItemID(itemId)
    setCategory(category_id)
    setWarehouse(warehouse_id)
    setShelf(shelf_id)
    setBatchCode(batchCode)
    setUnit(unit)
    setPrice(price)
    setAmount(amount)
    setSuppliers(suppliers_id)
  }

  const unitLable = [
    { lable: "Chiếc" },
    { lable: "Bộ" },
    { lable: "Cái" },
    { lable: "Can" },
    { lable: "Đôi" },
    { lable: "Lon" },
    { lable: "Ông" },
  ]

  useEffect(() => {
    Promise.all([getData('http://127.0.0.1:8000/api/admin/warehouse'),
    getData('http://127.0.0.1:8000/api/admin/suppliers'),
    getData('http://127.0.0.1:8000/api/admin/category'),
    getData('http://127.0.0.1:8000/api/admin/shelf'),
    getData('http://127.0.0.1:8000/api/admin/items/searchItem/1')])
      .then(res => {
        console.log(res[0].data)
        setDataWarehouse(res[0].data)
        setDataSuppliers(res[1].data)
        setDataCategory(res[2].data)
        setDataShelf(res[3].data)
        setDataItem(res[4].data)
      })
  }, [])

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Card variant="outlined">
            <CardContent>
              <Stack spacing={2}>
                <Autocomplete
                  id="name_item"
                  freeSolo
                  options={dataItem.map((option) => option.name_item)}
                  value={name}
                  onChange={(e, newValue) => onChangeName(e, newValue)}
                  renderInput={(params) => <TextField {...params} label="Tên vật tư" />}
                />
                <Autocomplete
                  id="unit"
                  freeSolo
                  size='small'
                  options={unitLable.map((option) => option.lable)}
                  renderInput={(params) => <TextField {...params} label="ĐVT" />}
                />
              </Stack>
              <br />
              <Grid container spacing={2}>
                <Grid item xs={5}>
                  <CssTextField size='small' label="Mã vật tư" value={item_id} id="custom-css-outlined-input" />
                </Grid>
                <Grid item xs={5}>
                  <CssTextField size='small' label="Mã sản xuất" value={batch_code} id="custom-css-outlined-input" />
                </Grid>
              </Grid>
              <br />
              <Stack spacing={2}>
                <Autocomplete
                  id="name_category"
                  freeSolo
                  size='small'
                  defaultValue={category_id}
                  onChange={(e, newValue) => setCategory(newValue)}
                  // defaultValue={dataCategory.find(v => v.id===category_id)}
                  // getOptionLabel={(option) => option.id}
                  options={dataCategory.map((option) => option.id)}
                  renderInput={(params) => <TextField {...params} label="Loại vật tư" />}
                />
                <Autocomplete
                  id="name_warehouse"
                  freeSolo
                  size='small'
                  options={dataWarehouse.map((option) => option.name)}
                  renderInput={(params) => <TextField {...params} label="Tên kho" />}
                />
                <Autocomplete
                  id="name_shelf"
                  freeSolo
                  size='small'
                  options={dataShelf.map((option) => option.name)}
                  renderInput={(params) => <TextField {...params} label="Tên giá/kệ" />}
                />
                <Autocomplete
                  id="name_supplier"
                  freeSolo
                  size='small'
                  options={dataSuppliers.map((option) => option.name)}
                  renderInput={(params) => <TextField {...params} label="Nhà cung cấp" />}
                />
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={8}>
          <Card>
            <CardContent>

            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default Demo

