import request from '@/utils/request'
import BASE_URL from '@/api/base'

export function addBackup(obj) {
  return request({
    url: BASE_URL + 'system/backup',
    method: 'POST',
    data: obj
  })
}
export function dbRestore(backup_path) {
  return request({
    url: BASE_URL + 'system/dbRestore',
    method: 'GET',
    params: {
      backup_path
    }
  })
}

export function getPage(pageNum, pageSize) {
  return request({
    url: BASE_URL + 'system/getPage',
    method: 'GET',
    params: {
      pageNum, pageSize
    }
  })
}
