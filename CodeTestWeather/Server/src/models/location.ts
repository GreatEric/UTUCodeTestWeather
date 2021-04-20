import { Sequelize,DataType } from "sequelize-typescript";

export default (sequelize: Sequelize) => {
  const Location = sequelize.define('utu_user_preferences', {
    id: {
      type: DataType.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    device_uuid: {
      type: DataType.STRING
    },
    city_name: {
      type: DataType.STRING
    },
    region_code: {
      type: DataType.STRING
    },
    country_code: {
      type: DataType.STRING
    },
    lat: {
      type: DataType.STRING
    },
    lon: {
      type: DataType.STRING
    },
    is_default: {
      type: DataType.TINYINT
    },
  },{
    timestamps: false
  });
  return Location;
}