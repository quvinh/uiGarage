/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import { getToken } from 'src/components/utils/Common'
import { getData } from '../api/Api'

var data = []
var checked = false

// const getNotification = () => {
// }

// export const reloadNotification = (props) => {
//   checked = true
//   props === true && (
//     Promise.all([getData('http://127.0.0.1:8000/api/admin/notification?token=' + getToken())])
//       .then(function (res) {
//         data = res[0].data
//       })
//   )
// }

export const ListNotification = () => {
  const [notification, setNotification] = useState([])
  useEffect(() => {
    Promise.all([getData('http://127.0.0.1:8000/api/admin/notification?token=' + getToken())])
      .then(function (res) {
        setNotification(res[0].data)
      })
  }, [])

  return notification
}

