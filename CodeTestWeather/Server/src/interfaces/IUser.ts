export interface IUser {
  id: bigint;
  device_uuid: string;
  curr_city_id: number
}

export interface IUserInputDTO {
  device_uuid: string;
  curr_city_id: number
}