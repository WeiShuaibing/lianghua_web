import request from '@/utils/request'
import BASE_URL from '@/api/base'

export function getPage(pageNum, pageSize) {
  return request({
    url: BASE_URL + 'admin/getPage',
    method: 'GET',
    params: {
      pageNum, pageSize
    }
  })
}

export function add(admin) {
  return request({
    url: BASE_URL + 'admin/add',
    method: 'POST',
    data: admin
  })
}

export function deleteById(id) {
  return request({
    url: BASE_URL + 'admin/delete',
    method: 'GET',
    params: {
      id
    }
  })
}

export function search(pageNum, pageSize, matchStr) {
  return request({
    url: BASE_URL + 'admin/search',
    method: 'GET',
    params: {
      pageNum,
      pageSize,
      matchStr
    }
  })
}

export function update(admin) {
  return request({
    url: BASE_URL + 'admin/update',
    method: 'POST',
    data: admin
  })
}

export function getById(id) {
  return request({
    url: BASE_URL + 'admin/getById',
    method: 'GET',
    params: {
      id
    }
  })
}
