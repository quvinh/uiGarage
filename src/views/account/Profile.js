/* eslint-disable prettier/prettier */
import * as React from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import { DatePicker, DateTimePicker, LocalizationProvider } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import { getData, postData } from '../api/Api'
import { getToken, getUserID } from 'src/components/utils/Common'
import { useHistory } from 'react-router-dom'
import avatar from './../../assets/images/avatars/user.png'
import { Button, CardMedia } from '@mui/material'

const Profile = (props) => {
  const history = useHistory()
  const [username, setUsername] = React.useState()
  const [oldPassword, setOldPassword] = React.useState()
  const [newPassword, setNewPassword] = React.useState()
  const [email, setEmail] = React.useState()
  const [fullName, setFullName] = React.useState()
  const [phone, setPhone] = React.useState()
  const [address, setAddress] = React.useState()
  const [birthday, setBirthday] = React.useState()
  const [gender, setGender] = React.useState()
  const [dataUser, setDataUser] = React.useState([])
  const [isBirthdaySelected, setIsBirthdaySelected] = React.useState(false)

  const onSave = (e) => {
    const data = {
      username: username,
      email: email,
      phone: phone,
      fullname: fullName,
      address: address,
      birthday: isBirthdaySelected ? birthday : null,
      gender: gender
    }
    console.log(data)
    Promise.all([postData('http://127.0.0.1:8000/api/auth/update-user/' + getUserID() + '?token=' + getToken(), data)])
      .then(function (res) {
        console.log('UPDATED')
      })
      .catch(error => {
        console.log(error)
        if (error.response.status === 403) {
          history.push('/404')
        } else if (error.response.status === 401) {
          history.push('/login')
        }
      })
  }

  React.useEffect(() => {
    Promise.all([getData('http://127.0.0.1:8000/api/auth/get-user/' + getUserID() + '?token=' + getToken())])
      .then(function (res) {
        setUsername(res[0].data[0].username)
        setFullName(res[0].data[0].fullname)
        setEmail(res[0].data[0].email)
        setPhone(res[0].data[0].phone)
        setAddress(res[0].data[0].address === null ? "" : res[0].data[0].address)
        setGender(res[0].data[0].gender)
        setBirthday(res[0].data[0].birthday === null ? new Date('1990/01/01') : res[0].data[0].birthday)
      })
      .catch(error => {
        if (error.response.status === 403) {
          history.push('/404')
        } else if (error.response.status === 401) {
          history.push('/login')
        }
      })
  }, [])

  return (
    <>
      <Card variant="outlined">
        <CardContent>
          <Box sx={{ width: 1 }}>
            <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
              <Box gridColumn="span 4">
                <CardMedia
                  component="img"
                  height="50%"
                  width="50%"
                  image={avatar}
                  alt="image"
                />
              </Box>
              <Box gridColumn="span 8">
                <Stack spacing={2}>
                  <TextField size="small" label="(*) Tên đăng nhập" variant="outlined"
                    value={String(username)} color="warning" aria-readonly
                  />
                  <TextField fullWidth size="small" label="(*) Email" variant="outlined"
                    value={String(email)} color="warning" aria-readonly
                  />
                  <TextField fullWidth size="small" label="(*) Họ và tên" variant="outlined"
                    value={String(fullName)} color="warning"
                    onChange={(e) => setFullName(e.target.value)}
                  />
                  <TextField fullWidth size="small" label="(*) Số điện thoại" variant="outlined"
                    value={String(phone)} color="warning"
                    inputProps={{ type: 'number' }}
                    onChange={(e) => setPhone(e.target.value.length > 10 ? phone : e.target.value)}
                  />
                  <TextField fullWidth size="small" label="Địa chỉ" variant="outlined"
                    value={String(address)} color="warning"
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <LocalizationProvider fullWidth dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Ngày sinh"
                      value={birthday}
                      onChange={(newValue) => {
                        setIsBirthdaySelected(true)
                        setBirthday(newValue.getFullYear() + "/" + (newValue.getMonth() + 1) + "/" + newValue.getDate())
                        console.log(birthday)
                      }}
                      inputFormat={"dd/MM/yyyy"}
                      renderInput={(params) => <TextField color="warning" size="small" {...params} />}
                    />
                  </LocalizationProvider>
                  <Box display="grid" gridTemplateColumns="repeat(8, 1fr)" gap={2}>
                    <Box gridColumn="span 4">
                      <Stack direction="row" spacing={2}>
                        <Button variant="contained" color="warning" onClick={(e) => onSave(e)}>
                          Success
                        </Button>
                      </Stack>
                    </Box>
                    <Box gridColumn="span 4">
                      <FormControl color="warning">
                        <FormLabel>Giới tính</FormLabel>
                        <RadioGroup
                          defaultValue={gender === null ? null : (gender === 0 ? 0 : 1)}
                          color="warning"
                          onChange={(e) => { e.target.value === 0 ? setGender(0) : setGender(1) }}
                        >
                          <FormControlLabel value={0} control={<Radio color="warning" />} label="Nữ" />
                          <FormControlLabel value={1} control={<Radio color="warning" />} label="Nam" />
                          {/* <FormControlLabel value="other" control={<Radio color="warning" />} label="Khác" /> */}
                        </RadioGroup>
                      </FormControl>
                    </Box>
                  </Box>

                </Stack>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

    </>
  )
}

export default Profile
