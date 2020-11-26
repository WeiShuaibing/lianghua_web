import request from '@/utils/request'
import BASE_URL from '@/api/base'

export function selectAllBuName() {
  return request({
    url: BASE_URL + 'building/selectAllBuName',
    method: 'GET'
  })
}

export function add(bu) {
  return request({
    url: BASE_URL + 'building/add',
    method: 'POST',
    data: bu
  })
}
export function update(bu) {
  return request({
    url: BASE_URL + 'building/update',
    method: 'POST',
    data: bu
  })
}

export function getPage(pageNum, pageSize) {
  return request({
    url: BASE_URL + 'building/getPage',
    method: 'GET',
    params: {
      pageNum, pageSize
    }
  })
}

export function deleteById(id) {
  return request({
    url: BASE_URL + 'building/delete',
    method: 'GET',
    params: {
      id
    }
  })
}

export function getById(id) {
  return request({
    url: BASE_URL + 'building/getById',
    method: 'GET',
    params: {
      id
    }
  })
}

export function search(pageNum, pageSize, matchStr) {
  return request({
    url: BASE_URL + 'building/search',
    method: 'GET',
    params: {
      pageNum,
      pageSize,
      matchStr
    }
  })
}

export function getHomeFormat() {
  return request({
    url: BASE_URL + 'building/getHomeFormat',
    method: 'GET'
  })
}
