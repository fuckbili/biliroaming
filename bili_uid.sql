-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- 主机： localhost
-- 生成日期： 2021-01-17 10:47:24
-- 服务器版本： 5.6.46-log
-- PHP 版本： 7.4.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `db`
--

-- --------------------------------------------------------

--
-- 表的结构 `bili_uid`
--

CREATE TABLE `bili_uid` (
  `uid` varchar(255) NOT NULL,
  `access_key` varchar(255) DEFAULT NULL,
  `black` varchar(255) DEFAULT NULL COMMENT '黑名单',
  `last_time` varchar(255) DEFAULT NULL COMMENT '上次更新时间',
  `vip_exp` varchar(255) DEFAULT NULL,
  `come_from` text,
  `Tg_id` varchar(255) DEFAULT NULL COMMENT 'telegram id',
  `is_tg_admin` varchar(255) DEFAULT NULL COMMENT 'tg_bot admin'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转储表的索引
--

--
-- 表的索引 `bili_uid`
--
ALTER TABLE `bili_uid`
  ADD PRIMARY KEY (`uid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
