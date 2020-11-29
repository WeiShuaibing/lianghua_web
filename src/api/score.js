import request from '@/utils/request'
import BASE_URL from '@/api/base'

export function getPageOfScore(classId, courseId, classCourseRel, pageNum, pageSize) {
  return request({
    url: BASE_URL + 'score/getPageOfScore',
    method: 'GET',
    params: {
      classId,
      courseId,
      classCourseRel,
      pageNum,
      pageSize
    }
  })
}

export function saveScore(obj) {
  return request({
    url: BASE_URL + 'score/save',
    method: 'POST',
    data: obj
  })
}
