import request from '@/utils/request'
import BASE_URL from '@/api/base'

export function saveMessage(obj) {
  return request({
    url: BASE_URL + 'message/save',
    method: 'POST',
    data: obj
  })
}
export function deleteById(id) {
  return request({
    url: BASE_URL + 'message/deleteById',
    method: 'GET',
    params: {
      id
    }
  })
}
export function getAllMessage() {
  return request({
    url: BASE_URL + 'message/getAll',
    method: 'GET'
  })
}
export function teaReply(id, reply) {
  return request({
    url: BASE_URL + 'message/teaReply',
    method: 'GET',
    params: {
      id, reply
    }
  })
}
