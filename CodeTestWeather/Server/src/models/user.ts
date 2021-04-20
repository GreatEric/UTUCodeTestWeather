import { Sequelize,DataType } from "sequelize-typescript";

export default (sequelize: Sequelize) => {
  const User = sequelize.define('utu_users', {
    id: {
      type: DataType.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    device_uuid: {
      type: DataType.STRING
    },
    city: {
      type: DataType.STRING
    },
    region: {
      type: DataType.STRING
    },
    country: {
      type: DataType.STRING
    },
    lat: {
      type: DataType.STRING
    },
    lon: {
      type: DataType.STRING
    }
  },{
    timestamps: false
  });
  return User;
}