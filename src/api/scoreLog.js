import request from '@/utils/request'
import BASE_URL from '@/api/base'

export function getAllScoreLog(stuId) {
  return request({
    url: BASE_URL + 'scoreLog/getAll',
    method: 'GET',
    params: {
      stuId
    }
  })
}

