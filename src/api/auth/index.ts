import { request } from '@/api/requests.ts'
import type { ApiResponse, PaginationRequest, PaginationResponse } from '@/api/types.ts'

import type { LoginReqData, LoginResData } from './types'

const urlMap = {
  login: `/auth/login`
} as const

export default {
  login: (data: LoginReqData): Promise<ApiResponse<LoginResData>> => request.post(urlMap.login, data),
};