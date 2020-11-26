import request from '@/utils/request'
import BASE_URL from '@/api/base'

export function getBaseData() {
  return request({
    url: BASE_URL + 'home/getBaseData',
    method: 'GET'
  })
}
export function getSuggestionStatus() {
  return request({
    url: BASE_URL + 'home/getSuggestionStatus',
    method: 'GET'
  })
}
export function getRepairStatus() {
  return request({
    url: BASE_URL + 'home/getRepairStatus',
    method: 'GET'
  })
}
export function getPayStatus() {
  return request({
    url: BASE_URL + 'home/getPayStatus',
    method: 'GET'
  })
}
