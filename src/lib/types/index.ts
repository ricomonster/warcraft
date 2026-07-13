import type { Result as NeverthrowResult } from 'neverthrow';

export interface APIResponseError {
  code: string
  message: string
  status: number
}

export type Result<T> = NeverthrowResult<T, Error>
export type APIResult<T> = NeverthrowResult<T, APIResponseError>
