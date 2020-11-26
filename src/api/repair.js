import request from '@/utils/request'
import BASE_URL from '@/api/base'

export function add(bu) {
  return request({
    url: BASE_URL + 'repair/add',
    method: 'POST',
    data: bu
  })
}
export function update(bu) {
  return request({
    url: BASE_URL + 'repair/update',
    method: 'POST',
    data: bu
  })
}

export function getPageOfEdit(pageNum, pageSize, status) {
  return request({
    url: BASE_URL + 'repair/getPageOfEdit',
    method: 'GET',
    params: {
      pageNum, pageSize, status
    }
  })
}
export function getPage(pageNum, pageSize, status) {
  return request({
    url: BASE_URL + 'repair/getPage',
    method: 'GET',
    params: {
      pageNum, pageSize, status
    }
  })
}

export function deleteById(id) {
  return request({
    url: BASE_URL + 'repair/delete',
    method: 'GET',
    params: {
      id
    }
  })
}

export function getById(id) {
  return request({
    url: BASE_URL + 'repair/getById',
    method: 'GET',
    params: {
      id
    }
  })
}

export function updateStatus(id, status) {
  return request({
    url: BASE_URL + 'repair/updateStatus',
    method: 'GET',
    params: {
      id, status
    }
  })
}
