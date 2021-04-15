/*
 Navicat Premium Data Transfer

 Source Server         : localmachine
 Source Server Type    : MySQL
 Source Server Version : 80023
 Source Host           : localhost:3306
 Source Schema         : utucodetestweather

 Target Server Type    : MySQL
 Target Server Version : 80023
 File Encoding         : 65001

 Date: 15/04/2021 15:56:34
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for daily_forecase_future
-- ----------------------------
DROP TABLE IF EXISTS `daily_forecase_future`;
CREATE TABLE `daily_forecase_future`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `city_id` int(0) NULL DEFAULT NULL COMMENT 'city id',
  `country_code` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'country code',
  `temp` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'temp : Json format.\r\n[{\r\n	\"calendar_date\": \"09/10/2021\",\r\n	\"min\": 273.15,\r\n	\"max\": 279.4\r\n}]',
  `weather` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'weather : Json format\r\n[\r\n    {\r\n      \"calendar_date\": \"09/10/2021\",\r\n      \"main\": \"Clouds\",\r\n      \"description\": \"broken clouds\"\r\n    }\r\n]',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for utu_cities
-- ----------------------------
DROP TABLE IF EXISTS `utu_cities`;
CREATE TABLE `utu_cities`  (
  `id` int(0) NOT NULL COMMENT 'id',
  `city_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'city name',
  `city_lon` double NOT NULL COMMENT 'Longitude',
  `city_lat` double NOT NULL COMMENT 'Latitude',
  `zip` int(0) NOT NULL COMMENT 'zip code',
  `country_code` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'country code',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for utu_daily_forecase
-- ----------------------------
DROP TABLE IF EXISTS `utu_daily_forecase`;
CREATE TABLE `utu_daily_forecase`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT,
  `city_id` int(0) NULL DEFAULT NULL,
  `country_code` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `dt` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'daily dt : Time of the forecasted data, Unix, UTC',
  `sunrise` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'Sunrise time, Unix, UTC',
  `sunset` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'Sunset time, Unix, UTC',
  `temp` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'daily temp : json format',
  `feels_like` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'human perception of weather : json format\r\n',
  `pressure` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'Atmospheric pressure on the sea level, hPa',
  `humidity` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'Humidity, %',
  `dew_point` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'Atmospheric temperature',
  `wind_speed` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'Wind speed',
  `wind_deg` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'Wind direction',
  `weather` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'Weather : Json format ',
  `clouds` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'Cloudiness, %',
  `pop` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'Probability of precipitation',
  `uvi` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'The maximum value of UV index for the day',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for utu_user_preferences
-- ----------------------------
DROP TABLE IF EXISTS `utu_user_preferences`;
CREATE TABLE `utu_user_preferences`  (
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT 'preference id',
  `user_id` bigint(0) NOT NULL COMMENT 'user id',
  `city_id` int(0) NOT NULL COMMENT 'city id',
  `country_code` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'country code',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for utu_users
-- ----------------------------
DROP TABLE IF EXISTS `utu_users`;
CREATE TABLE `utu_users`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT COMMENT 'user id',
  `device_uuid` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'device uuid',
  `curr_city_id` int(0) NULL DEFAULT NULL COMMENT 'current city id',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `device_uuid`(`device_uuid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
