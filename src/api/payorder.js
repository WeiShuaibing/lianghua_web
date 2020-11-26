import request from '@/utils/request'
import BASE_URL from '@/api/base'

export function add(bu) {
  return request({
    url: BASE_URL + 'payorder/add',
    method: 'POST',
    data: bu
  })
}
export function update(bu) {
  return request({
    url: BASE_URL + 'payorder/update',
    method: 'POST',
    data: bu
  })
}

export function getPage(pageNum, pageSize, type) {
  return request({
    url: BASE_URL + 'payorder/getPage',
    method: 'GET',
    params: {
      pageNum, pageSize, type
    }
  })
}

export function deleteById(id) {
  return request({
    url: BASE_URL + 'payorder/delete',
    method: 'GET',
    params: {
      id
    }
  })
}

export function getById(id) {
  return request({
    url: BASE_URL + 'payorder/getById',
    method: 'GET',
    params: {
      id
    }
  })
}

export function search(pageNum, pageSize, matchStr) {
  return request({
    url: BASE_URL + 'payorder/search',
    method: 'GET',
    params: {
      pageNum,
      pageSize,
      matchStr
    }
  })
}

