import request from '@/utils/request'
import BASE_URL from '@/api/base'

export function updateClasscourserel(obj) {
  return request({
    url: BASE_URL + 'classcourserel/update',
    method: 'POST',
    data: obj
  })
}
export function getScoringInfoById(id) {
  return request({
    url: BASE_URL + 'classcourserel/getScoringInfoById',
    method: 'GET',
    params: {
      id
    }
  })
}
