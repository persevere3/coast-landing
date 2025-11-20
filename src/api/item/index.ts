import { request } from '@/api/requests.ts'
import type { ApiResponse, PaginationRequest, PaginationResponse } from '@/api/types.ts'

import type { GetItemListRes } from './types'

const urlMap = {
  getItemList: `/item/List`
} as const

export default {
  getItemList: (): Promise<ApiResponse<GetItemListRes>> => request.get(urlMap.getItemList)
};