import request from '@/utils/request'
import BASE_URL from '@/api/base'

export function save(obj) {
  return request({
    url: BASE_URL + 'class/save',
    method: 'POST',
    data: obj
  })
}

export function update(obj) {
  return request({
    url: BASE_URL + 'class/update',
    method: 'POST',
    data: obj
  })
}
export function getById(id) {
  return request({
    url: BASE_URL + 'class/getById',
    method: 'GET',
    params: {
      id
    }
  })
}
export function deleteById(id) {
  return request({
    url: BASE_URL + 'class/deleteById',
    method: 'GET',
    params: {
      id
    }
  })
}
export function getPage(pageNum, pageSize) {
  return request({
    url: BASE_URL + 'class/getPage',
    method: 'GET',
    params: {
      pageNum,
      pageSize
    }
  })
}
