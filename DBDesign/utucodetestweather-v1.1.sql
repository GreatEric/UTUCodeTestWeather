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

 Date: 20/04/2021 23:55:53
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for utu_user_preferences
-- ----------------------------
DROP TABLE IF EXISTS `utu_user_preferences`;
CREATE TABLE `utu_user_preferences`  (
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT 'preference id',
  `device_uuid` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'device uuid',
  `city_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'city name',
  `region_code` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'region code',
  `country_code` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'country code',
  `lat` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'latitude',
  `lon` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'lontitude',
  `is_default` tinyint(0) NULL DEFAULT NULL COMMENT 'is default: 0->not default; 1-> default',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of utu_user_preferences
-- ----------------------------
INSERT INTO `utu_user_preferences` VALUES (12, '1e004af759a059d7', 'Melbourne', 'VIC', 'AUS', '-37.854065', '144.980007', 1);
INSERT INTO `utu_user_preferences` VALUES (13, '1e004af759a059d7', 'Victoria', 'NB', 'CAN', '46.68595', '-67.61604', 0);
INSERT INTO `utu_user_preferences` VALUES (18, '1e004af759a059d7', 'Wuhan', 'HU', 'CHN', '30.568148', '114.286994', 0);

-- ----------------------------
-- Table structure for utu_users
-- ----------------------------
DROP TABLE IF EXISTS `utu_users`;
CREATE TABLE `utu_users`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT COMMENT 'user id',
  `device_uuid` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'device uuid',
  `city` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'registry city',
  `region` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'registry region',
  `country` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'registry country',
  `lat` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'registry latitude',
  `lon` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'registry lontitude',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `device_uuid`(`device_uuid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 26 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of utu_users
-- ----------------------------
INSERT INTO `utu_users` VALUES (26, '1e004af759a059d7', 'Melbourne', 'VIC', 'AUS', '-37.854065', '144.980007');

SET FOREIGN_KEY_CHECKS = 1;
