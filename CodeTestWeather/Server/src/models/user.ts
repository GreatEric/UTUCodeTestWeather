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
    curr_city_id: {
      type: DataType.INTEGER
    }
  },{
    timestamps: false
  });
  return User;
}