import request from '@/utils/request'
import BASE_URL from '@/api/base'

export function add(bu) {
  return request({
    url: BASE_URL + 'notice/add',
    method: 'POST',
    data: bu
  })
}
export function update(bu) {
  return request({
    url: BASE_URL + 'notice/update',
    method: 'POST',
    data: bu
  })
}

export function getPage(pageNum, pageSize) {
  return request({
    url: BASE_URL + 'notice/getPage',
    method: 'GET',
    params: {
      pageNum, pageSize
    }
  })
}

export function deleteById(id) {
  return request({
    url: BASE_URL + 'notice/delete',
    method: 'GET',
    params: {
      id
    }
  })
}

export function getById(id) {
  return request({
    url: BASE_URL + 'notice/getById',
    method: 'GET',
    params: {
      id
    }
  })
}

export function search(pageNum, pageSize, matchStr) {
  return request({
    url: BASE_URL + 'notice/search',
    method: 'GET',
    params: {
      pageNum,
      pageSize,
      matchStr
    }
  })
}

