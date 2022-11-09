CREATE TABLE `moment_tag` (
  `moment_id` int NOT NULL,
  `tag_id` int NOT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`moment_id`,`tag_id`),
  KEY `tag_id` (`tag_id`),
  CONSTRAINT `moment_tag_ibfk_1` FOREIGN KEY (`moment_id`) REFERENCES `moment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `moment_tag_ibfk_2` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3