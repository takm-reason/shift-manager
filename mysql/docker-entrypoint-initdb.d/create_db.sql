CREATE DATABASE IF NOT EXISTS `bookshelf`
  DEFAULT CHARACTER SET = 'utf8'
  DEFAULT COLLATE 'utf8_general_ci';
USE `bookshelf`;

CREATE TABLE IF NOT EXISTS `bookshelf`.`users` (
  `id` int(6) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(30) NOT NULL,
  `password` varchar(128) NOT NULL,
  `root` boolean NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `bookshelf`.`plans` (
  `id` int(6) unsigned NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `in` time NOT NULL,
  `out` time NOT NULL,
  `note` varchar(30),
  `shop` int(6),
  `userid` int(6) NOT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO `bookshelf`.`users` (
  `username`, `password`, `root`
) VALUES (
  'jack',
  '16aad48eebc20f6314af0ec9cb4197191bd8010c74e215e88364297540a3656788d5ac7fccf79ee2b5b5ad77d15af1926b24ee8351f0cd328b670b1f53fa5139',
  TRUE
);

INSERT INTO `bookshelf`.`users` (
  `username`, `password`, `root`
) VALUES (
  'jill',
  'b82130c685048de01094d56ea6d574f483460ef7e9bebd887c122cb7abbb593c39926ab5636d3502035ed9f5176d81a85d2144a9b9c807da61a2ee82eb3c9a3c',
  FALSE
);

INSERT INTO `bookshelf`.`users` (
  `username`, `password`, `root`
) VALUES (
  'user',
  'a47f1d4c2ac939decd58ce4fa8d2ef2287dbcc34cf89bc30368955f10d46805a11893d6c240e3719cc10e68891e8573374dad71a1cca8e66eb9c4ce828367ebe',
  TRUE
);

INSERT INTO `bookshelf`.`plans` (
  `date`, `in`, `out`, `note`, `shop`, `userid`
) VALUES (
  '2018-05-06',
  '00:00:00',
  '00:00:00',
  '18時から出勤可能',
  '0',
  '3'
);

INSERT INTO `bookshelf`.`plans` (
  `date`, `in`, `out`, `note`, `shop`, `userid`
) VALUES (
  '2018-05-05',
  '00:00:00',
  '00:00:00',
  '16時から出勤可能',
  '0',
  '3'
);

INSERT INTO `bookshelf`.`plans` (
  `date`, `in`, `out`, `note`, `userid`
) VALUES (
  '2018-05-05',
  '00:00:00',
  '00:00:00',
  '16時から出勤可能',
  '3'
);
