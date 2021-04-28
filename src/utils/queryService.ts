import Axios from 'axios'
import {useQuery} from 'react-query'

export const getQuery = (key: any, url: string, config: any = {}) => {
  return useQuery(
    key,
    async () => {
      return await Axios.get(url)
    },
    config
  )
}

export const putQuery = (
  key: any,
  url: string,
  data: any,
  config: any = {}
) => {
  return useQuery(
    key,
    async () => {
      return await Axios.put(url, data)
    },
    config
  )
}

export const postQuery = (
  key: any,
  url: string,
  data: any,
  config: any = {}
) => {
  return useQuery(
    key,
    async () => {
      return await Axios.post(url, data)
    },
    config
  )
}

export const deleteQuery = (key: any, url: string, config: any = {}) => {
  return useQuery(
    key,
    async () => {
      return await Axios.delete(url)
    },
    config
  )
}
