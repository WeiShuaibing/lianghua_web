import request from '@/utils/request'
import BASE_URL from '@/api/base'

export function save(obj) {
  return request({
    url: BASE_URL + 'scoring/save',
    method: 'POST',
    data: obj
  })
}
export function getById(id) {
  return request({
    url: BASE_URL + 'scoring/getById',
    method: 'GET',
    params: {
      id
    }
  })
}
export function deleteById(id) {
  return request({
    url: BASE_URL + 'scoring/deleteById',
    method: 'GET',
    params: {
      id
    }
  })
}
export function getAll() {
  return request({
    url: BASE_URL + 'scoring/getAll',
    method: 'GET'
  })
}
