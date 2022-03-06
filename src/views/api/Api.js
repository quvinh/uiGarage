/* eslint-disable prettier/prettier */
import axios from "axios"

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
  // headers: [
  //   'Access-Control-Allow-Origin: *',
  //   'Access-Control-Allow-Methods: *',
  //   'Access-Control-Allow-Headers: *'
  // ],
  mode: 'cors'
  // header('Access-Control-Allow-Origin: *'),
  // header('Access-Control-Allow-Methods: *'),
  // header('Access-Control-Allow-Headers: *'),
  // timeout: 1000
},
  // axios.defaults.headers.get['Accepts'] = 'application/json',
  // axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*',
  // axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept',
)



export const getData = async (url) => {
  const res = await api.get(url);
  return res.data;
}

export const postData = async (url, data) => {
  const res = await api.post(url, data);
  console.log("POST")
  return res;
}

export const putData = async (url, data) => {
  const res = await api.put(url, data);
  return res;
}

export const delData = async (url) => {
  const res = await api.delete(url);
  return res.data;
}
