import request from '@/utils/request'
import BASE_URL from '@/api/base'

export function save(obj) {
  return request({
    url: BASE_URL + 'course/save',
    method: 'POST',
    data: obj
  })
}
export function getById(id) {
  return request({
    url: BASE_URL + 'course/getById',
    method: 'GET',
    params: {
      id
    }
  })
}
export function deleteById(id) {
  return request({
    url: BASE_URL + 'course/deleteById',
    method: 'GET',
    params: {
      id
    }
  })
}
export function getAll() {
  return request({
    url: BASE_URL + 'course/getAll',
    method: 'GET'
  })
}
export function getCourseOfClassId(id) {
  return request({
    url: BASE_URL + 'course/getCourseOfClassId',
    method: 'GET',
    params: {
      id
    }
  })
}
export function getAllCourseWithFormat() {
  return request({
    url: BASE_URL + 'course/getAllCourseWithFormat',
    method: 'GET'
  })
}

