import request from '@/utils/request'
import BASE_URL from '@/api/base'


export function add(bu) {
  return request({
    url: BASE_URL + 'car/add',
    method: 'POST',
    data: bu
  })
}
export function update(bu) {
  return request({
    url: BASE_URL + 'car/update',
    method: 'POST',
    data: bu
  })
}

export function getPage(pageNum, pageSize, carStatus) {
  return request({
    url: BASE_URL + 'car/getPage',
    method: 'GET',
    params: {
      pageNum, pageSize, carStatus
    }
  })
}

export function deleteById(id) {
  return request({
    url: BASE_URL + 'car/delete',
    method: 'GET',
    params: {
      id
    }
  })
}

export function getById(id) {
  return request({
    url: BASE_URL + 'car/getById',
    method: 'GET',
    params: {
      id
    }
  })
}

export function search(pageNum, pageSize, matchStr) {
  return request({
    url: BASE_URL + 'car/search',
    method: 'GET',
    params: {
      pageNum,
      pageSize,
      matchStr
    }
  })
}

