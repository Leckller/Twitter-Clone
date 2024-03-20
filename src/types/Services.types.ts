export type ServiceResponse<Data> = {
  status: number,
  data: Data
}

export type ServiceResponseError = {
  message: string
}