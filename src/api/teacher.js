import request from '@/utils/request'
import BASE_URL from '@/api/base'

export function saveTeacher(obj) {
  return request({
    url: BASE_URL + 'teacher/save',
    method: 'POST',
    data: obj
  })
}

export function update(obj) {
  return request({
    url: BASE_URL + 'teacher/update',
    method: 'POST',
    data: obj
  })
}
export function getById(id) {
  return request({
    url: BASE_URL + 'teacher/getById',
    method: 'GET',
    params: {
      id
    }
  })
}
export function deleteById(id) {
  return request({
    url: BASE_URL + 'teacher/deleteById',
    method: 'GET',
    params: {
      id
    }
  })
}
export function getPageOfteacher(pageNum, pageSize, matchStr) {
  return request({
    url: BASE_URL + 'teacher/getPage',
    method: 'GET',
    params: {
      pageNum,
      pageSize,
      matchStr
    }
  })
}
export function getMyCourseAllInfo() {
  return request({
    url: BASE_URL + 'teacher/getMyCourseAllInfo',
    method: 'GET'
  })
}
