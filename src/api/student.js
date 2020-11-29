import request from '@/utils/request'
import BASE_URL from '@/api/base'

export function saveStudent(obj) {
  return request({
    url: BASE_URL + 'student/save',
    method: 'POST',
    data: obj
  })
}
export function saveBatchStudent(obj) {
  return request({
    url: BASE_URL + 'student/saveBatch',
    method: 'POST',
    data: obj
  })
}

export function update(obj) {
  return request({
    url: BASE_URL + 'student/update',
    method: 'POST',
    data: obj
  })
}
export function getById(id) {
  return request({
    url: BASE_URL + 'student/getById',
    method: 'GET',
    params: {
      id
    }
  })
}
export function deleteById(id) {
  return request({
    url: BASE_URL + 'student/deleteById',
    method: 'GET',
    params: {
      id
    }
  })
}
export function getPageOfStudent(pageNum, pageSize, matchStr) {
  return request({
    url: BASE_URL + 'student/getPage',
    method: 'GET',
    params: {
      pageNum,
      pageSize,
      matchStr
    }
  })
}
