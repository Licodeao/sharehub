CREATE TABLE `picture` (
  `id` int NOT NULL AUTO_INCREMENT,
  `filename` varchar(100) NOT NULL,
  `mimetype` varchar(30) DEFAULT NULL,
  `size` int DEFAULT NULL,
  `moment_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `filename` (`filename`),
  KEY `user_id` (`user_id`),
  KEY `moment_id` (`moment_id`),
  CONSTRAINT `picture_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `picture_ibfk_2` FOREIGN KEY (`moment_id`) REFERENCES `moment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3