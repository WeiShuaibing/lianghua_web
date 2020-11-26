import request from '@/utils/request'
import BASE_URL from '@/api/base'

export function add(bu) {
  return request({
    url: BASE_URL + 'suggestion/add',
    method: 'POST',
    data: bu
  })
}
export function update(bu) {
  return request({
    url: BASE_URL + 'suggestion/update',
    method: 'POST',
    data: bu
  })
}

export function getPage(pageNum, pageSize, status) {
  return request({
    url: BASE_URL + 'suggestion/getPage',
    method: 'GET',
    params: {
      pageNum, pageSize, status
    }
  })
}

export function getPageOfEdit(pageNum, pageSize, status) {
  return request({
    url: BASE_URL + 'suggestion/getPageOfEdit',
    method: 'GET',
    params: {
      pageNum, pageSize, status
    }
  })
}

export function deleteById(id) {
  return request({
    url: BASE_URL + 'suggestion/delete',
    method: 'GET',
    params: {
      id
    }
  })
}

export function getById(id) {
  return request({
    url: BASE_URL + 'suggestion/getById',
    method: 'GET',
    params: {
      id
    }
  })
}

export function updateStatus(id, status) {
  return request({
    url: BASE_URL + 'suggestion/updateStatus',
    method: 'GET',
    params: {
      id, status
    }
  })
}
