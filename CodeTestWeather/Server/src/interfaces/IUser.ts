export interface IUser {
  id: bigint;
  device_uuid: string;
  city: string,
  region: string,
  country: string,
  lat: string,
  lon: string
}

export interface IUserInputDTO {
  device_uuid: string;
  city: string,
  region: string,
  country: string,
  lat: string,
  lon: string
}