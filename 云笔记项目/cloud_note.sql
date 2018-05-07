/*
Navicat MySQL Data Transfer

Source Server         : mysql
Source Server Version : 50721
Source Host           : localhost:3306
Source Database       : cloud_note

Target Server Type    : MYSQL
Target Server Version : 50721
File Encoding         : 65001

Date: 2018-05-07 18:32:04
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `cn_activity`
-- ----------------------------
DROP TABLE IF EXISTS `cn_activity`;
CREATE TABLE `cn_activity` (
  `cn_activity_id` varchar(100) NOT NULL COMMENT '活动ID',
  `cn_activity_title` varchar(500) DEFAULT NULL COMMENT '活动标题',
  `cn_activity_body` text COMMENT '活动介绍(html片段)',
  `cn_activity_end_time` bigint(20) DEFAULT NULL COMMENT '活动结束时间',
  PRIMARY KEY (`cn_activity_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cn_activity
-- ----------------------------
INSERT INTO `cn_activity` VALUES ('1', 'Java', 'Java技术征文', null);
INSERT INTO `cn_activity` VALUES ('10', '测试', '测试技术征文', null);
INSERT INTO `cn_activity` VALUES ('11', '大数据', '大数据技术征文', null);
INSERT INTO `cn_activity` VALUES ('2', '.net', '.net技术征文', null);
INSERT INTO `cn_activity` VALUES ('3', 'C++', 'C++技术征文', null);
INSERT INTO `cn_activity` VALUES ('4', 'IOS', 'IOS技术征文', null);
INSERT INTO `cn_activity` VALUES ('5', 'Andriod', 'Android技术征文', null);
INSERT INTO `cn_activity` VALUES ('6', '网络营销', '网络营销技术征文', null);
INSERT INTO `cn_activity` VALUES ('7', '嵌入式', '嵌入式技术征文', null);
INSERT INTO `cn_activity` VALUES ('8', 'PHP', 'PHP技术征文', null);
INSERT INTO `cn_activity` VALUES ('9', 'UID', 'UID技术征文', null);

-- ----------------------------
-- Table structure for `cn_activity_status`
-- ----------------------------
DROP TABLE IF EXISTS `cn_activity_status`;
CREATE TABLE `cn_activity_status` (
  `cn_activity_status_id` varchar(100) NOT NULL COMMENT '活动状态ID',
  `cn_activity_id` varchar(100) DEFAULT NULL COMMENT '活动ID',
  `cn_activity_status_code` varchar(500) DEFAULT NULL COMMENT '活动状态Code',
  `cn_activity_status_name` varchar(500) DEFAULT NULL COMMENT '活动状态名称',
  PRIMARY KEY (`cn_activity_status_id`),
  KEY `FK_Reference_9` (`cn_activity_id`),
  CONSTRAINT `FK_Reference_9` FOREIGN KEY (`cn_activity_id`) REFERENCES `cn_activity` (`cn_activity_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cn_activity_status
-- ----------------------------
INSERT INTO `cn_activity_status` VALUES ('1', '1', 'normal', 'normal');

-- ----------------------------
-- Table structure for `cn_note`
-- ----------------------------
DROP TABLE IF EXISTS `cn_note`;
CREATE TABLE `cn_note` (
  `cn_note_id` varchar(100) NOT NULL COMMENT '笔记ID',
  `cn_notebook_id` varchar(100) DEFAULT NULL COMMENT '笔记本ID',
  `cn_user_id` varchar(100) DEFAULT NULL COMMENT '用户ID',
  `cn_note_status_id` varchar(100) DEFAULT NULL COMMENT '笔记状态ID:备用',
  `cn_note_type_id` varchar(100) DEFAULT NULL COMMENT '笔记本类型ID：备用',
  `cn_note_title` varchar(500) DEFAULT NULL COMMENT '笔记标题',
  `cn_note_body` text COMMENT '笔记内容',
  `cn_note_create_time` bigint(20) DEFAULT NULL COMMENT '笔记创建时间',
  `cn_note_last_modify_time` bigint(20) DEFAULT NULL COMMENT '笔记最近修改时间',
  PRIMARY KEY (`cn_note_id`),
  KEY `FK_Reference_2` (`cn_notebook_id`),
  KEY `FK_Reference_3` (`cn_user_id`),
  KEY `FK_Reference_7` (`cn_note_status_id`),
  KEY `FK_Reference_8` (`cn_note_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cn_note
-- ----------------------------
INSERT INTO `cn_note` VALUES ('0e086e15000e4d3385afef193c18bb89', '623c1074d04641f78a04afc4ed64e684', '48595f52-b22c-4485-9244-f4004255b972', '1', '1', '测试建立的笔记', '', '1525688810279', '1525688810279');

-- ----------------------------
-- Table structure for `cn_notebook`
-- ----------------------------
DROP TABLE IF EXISTS `cn_notebook`;
CREATE TABLE `cn_notebook` (
  `cn_notebook_id` varchar(100) NOT NULL COMMENT '笔记本ID',
  `cn_user_id` varchar(100) DEFAULT NULL COMMENT '用户ID',
  `cn_notebook_type_id` varchar(100) DEFAULT NULL COMMENT '笔记本类型ID',
  `cn_notebook_name` varchar(500) DEFAULT NULL COMMENT '笔记本名',
  `cn_notebook_desc` text COMMENT '笔记本说明',
  `cn_notebook_createtime` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`cn_notebook_id`),
  KEY `FK_Note_User_Reference` (`cn_user_id`),
  KEY `FK_Reference_6` (`cn_notebook_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cn_notebook
-- ----------------------------
INSERT INTO `cn_notebook` VALUES ('623c1074d04641f78a04afc4ed64e684', '48595f52-b22c-4485-9244-f4004255b972', '1', '测试新建的笔记本', null, '2018-05-07 18:26:09');
INSERT INTO `cn_notebook` VALUES ('b9844bfbe5704048bbd9be8354a2a00d', '48595f52-b22c-4485-9244-f4004255b972', '1', '测试笔记本2', null, '2018-05-07 18:28:43');

-- ----------------------------
-- Table structure for `cn_notebook_type`
-- ----------------------------
DROP TABLE IF EXISTS `cn_notebook_type`;
CREATE TABLE `cn_notebook_type` (
  `cn_notebook_type_id` varchar(100) NOT NULL COMMENT '笔记本类型ID',
  `cn_notebook_type_code` varchar(100) DEFAULT NULL COMMENT '笔记本类型Code',
  `cn_notebook_type_name` varchar(500) DEFAULT NULL COMMENT '笔记本类型名称',
  `cn_notebook_type_desc` text COMMENT '笔记本类型说明',
  PRIMARY KEY (`cn_notebook_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cn_notebook_type
-- ----------------------------
INSERT INTO `cn_notebook_type` VALUES ('1', 'favorites', 'favorites', '收藏');
INSERT INTO `cn_notebook_type` VALUES ('2', 'recycle', 'recycle', '回收站');
INSERT INTO `cn_notebook_type` VALUES ('3', 'action', 'action', '活动');
INSERT INTO `cn_notebook_type` VALUES ('4', 'push', 'push', '推送');
INSERT INTO `cn_notebook_type` VALUES ('5', 'normal', 'normal', '正常');

-- ----------------------------
-- Table structure for `cn_note_activity`
-- ----------------------------
DROP TABLE IF EXISTS `cn_note_activity`;
CREATE TABLE `cn_note_activity` (
  `cn_note_activity_id` varchar(100) NOT NULL COMMENT '投稿ID',
  `cn_activity_id` varchar(100) DEFAULT NULL COMMENT '活动ID',
  `cn_note_id` varchar(100) DEFAULT NULL COMMENT '笔记ID',
  `cn_note_activity_up` int(11) DEFAULT NULL COMMENT '投稿赞:增加数',
  `cn_note_activity_down` int(11) DEFAULT NULL COMMENT '投稿踩:增加数',
  `cn_note_activity_title` varchar(500) DEFAULT NULL,
  `cn_note_activity_body` text,
  PRIMARY KEY (`cn_note_activity_id`),
  KEY `FK_Reference_4` (`cn_activity_id`),
  KEY `FK_Reference_5` (`cn_note_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cn_note_activity
-- ----------------------------

-- ----------------------------
-- Table structure for `cn_note_status`
-- ----------------------------
DROP TABLE IF EXISTS `cn_note_status`;
CREATE TABLE `cn_note_status` (
  `cn_note_status_id` varchar(100) NOT NULL COMMENT '笔记状态ID',
  `cn_note_status_code` varchar(100) DEFAULT NULL COMMENT '笔记状态Code',
  `cn_note_status_name` varchar(500) DEFAULT NULL COMMENT '笔记状态名字',
  PRIMARY KEY (`cn_note_status_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cn_note_status
-- ----------------------------
INSERT INTO `cn_note_status` VALUES ('1', 'normal', 'normal');

-- ----------------------------
-- Table structure for `cn_note_type`
-- ----------------------------
DROP TABLE IF EXISTS `cn_note_type`;
CREATE TABLE `cn_note_type` (
  `cn_note_type_id` varchar(100) NOT NULL COMMENT '笔记本类型ID',
  `cn_note_type_code` varchar(100) DEFAULT NULL COMMENT '笔记本类型Code',
  `cn_note_type_name` varchar(500) DEFAULT NULL COMMENT '笔记本类型名称',
  `cn_note_type_desc` text COMMENT '笔记本类型说明',
  PRIMARY KEY (`cn_note_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cn_note_type
-- ----------------------------
INSERT INTO `cn_note_type` VALUES ('1', 'normal', 'normal', null);

-- ----------------------------
-- Table structure for `cn_share`
-- ----------------------------
DROP TABLE IF EXISTS `cn_share`;
CREATE TABLE `cn_share` (
  `cn_share_id` varchar(100) NOT NULL COMMENT '共享ID',
  `cn_share_title` varchar(500) DEFAULT NULL COMMENT '共享标题',
  `cn_share_body` text COMMENT '共享内容',
  `cn_note_id` varchar(100) DEFAULT NULL COMMENT '笔记id',
  PRIMARY KEY (`cn_share_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cn_share
-- ----------------------------
INSERT INTO `cn_share` VALUES ('b09fa6064e3a4cf3a144d1279f8717aa', '测试建立的笔记', '', '0e086e15000e4d3385afef193c18bb89');

-- ----------------------------
-- Table structure for `cn_user`
-- ----------------------------
DROP TABLE IF EXISTS `cn_user`;
CREATE TABLE `cn_user` (
  `cn_user_id` varchar(100) NOT NULL COMMENT '用户ID',
  `cn_user_name` varchar(100) DEFAULT NULL COMMENT '用户名',
  `cn_user_password` varchar(100) DEFAULT NULL COMMENT '密码',
  `cn_user_token` varchar(100) DEFAULT NULL COMMENT '令牌',
  `cn_user_nick` varchar(100) DEFAULT NULL COMMENT '说明',
  PRIMARY KEY (`cn_user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cn_user
-- ----------------------------
INSERT INTO `cn_user` VALUES ('48595f52-b22c-4485-9244-f4004255b972', 'demo', '/OqSD3QStdp74M9CuMk3WQ==', null, null);
