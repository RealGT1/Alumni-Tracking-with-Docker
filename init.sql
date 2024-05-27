CREATE USER IF NOT EXISTS 'example_user'@'%' IDENTIFIED BY 'example_password';
CREATE DATABASE IF NOT EXISTS example_db;
GRANT ALL PRIVILEGES ON example_db.* TO 'example_user'@'%';
FLUSH PRIVILEGES;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `name` varchar(25) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(140) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `admin` (`id`, `name`, `email`, `password`) VALUES
(36, 'Samarth', 'a3@g.com', '$2b$10$QvxXo1PONUcXcCl2Of2LE.R/zUwpS6DCbJvUSf4aIAHD1gUOMk.oe'),
(52, 'Pavithra N', 'pavithra123@gmail.com', '$2b$10$c4m2FlYc.SnrlZOInT/.LeutYGINPjEt09lSaxtEDOsW58vOun4JO'),
(54, 'ae', 'shreyasshet723@gmail.com', '$2b$10$9I0DRTwXv1LdOwJr1GU8auLOuIVTsq40oHXRcV2ouqBtsx2W7mz..');

DELIMITER $$
CREATE TRIGGER `after_admin_insert` AFTER INSERT ON `admin` FOR EACH ROW INSERT INTO users (name, email, user_type) 
VALUES (NEW.name, NEW.email, 'admin')
$$
DELIMITER ;

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `category` (`id`, `name`) VALUES
(25, 'Software Engineer'),
(26, 'Full Stack Developer');



CREATE TABLE `employee` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `email` varchar(40) NOT NULL,
  `password` varchar(150) NOT NULL,
  `bio` varchar(500) DEFAULT NULL,
  `batch` int(11) NOT NULL,
  `company` varchar(50) NOT NULL,
  `linkedin` varchar(100) NOT NULL,
  `image` varchar(60) NOT NULL,
  `category_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `employee` (`id`, `name`, `email`, `password`, `bio`, `batch`, `company`, `linkedin`, `image`, `category_id`) VALUES
(1014, 'SHREYAS P', 'shreyasshet723@gmail.com', '$2b$10$3dVJmo7MtIWZONS/EHul5.hBP1JHkFNxEanBdmPFiUr7Cg5nvphau', 'hey man', 2021, 'Wipro', 'https://www.linkedin.com/in/shreyas-p-67165222a/', 'image_1709533147886.jpg', 26);

DELIMITER $$
CREATE TRIGGER `after_employee_insert` AFTER INSERT ON `employee` FOR EACH ROW INSERT INTO users (name, email, user_type) 
VALUES (NEW.name, NEW.email, 'employee')
$$
DELIMITER ;

CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `description` text DEFAULT NULL,
  `admin_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `events` (`id`, `name`, `date`, `description`, `admin_id`) VALUES
(26, 'Google', '2024-02-21', 'New', 36),
(28, 'Amazon', '2024-02-20', 'Yesss', 35),
(34, 'ssdf', '2024-02-07', 'dfdsfdsfgfsdg', 35),
(35, 'ergsege', '2024-02-07', 'regresge', 35),
(36, 'regese', '2024-01-31', 'ergregre', 35),
(39, 'sfdfesd', '2024-02-29', 'rrsegse', 35),
(40, 'rhrdhd', '2024-03-01', 'drfhrdhrd', 35),
(55, 'rt', '2024-02-28', 'ty', 36);

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `content` text NOT NULL,
  `timestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `messages` (`id`, `user_id`, `content`, `timestamp`) VALUES
(66, 35, 'hii', '2024-02-12 14:11:38'),
(67, 35, 'no', '2024-02-12 14:11:46'),
(68, 35, 'oie', '2024-02-12 14:12:04'),
(69, 35, 'n', '2024-02-12 14:15:23'),
(70, 35, 'no ni', '2024-02-12 14:15:27'),
(71, 36, 'its okay', '2024-02-12 14:16:13'),
(72, 36, 'where are you', '2024-02-12 14:16:22'),
(73, 36, 'okayyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy', '2024-02-12 14:17:08'),
(74, 36, 'saasd', '2024-02-12 14:31:59'),
(75, 35, 'hii', '2024-02-12 14:32:38'),
(76, 35, 'nooo', '2024-02-12 14:32:44'),
(77, 35, 'hii', '2024-02-26 17:35:28'),
(78, 35, 'tr3t4w34t', '2024-02-28 08:00:30'),
(79, 35, 'hii', '2024-02-28 21:30:47'),
(80, 50, 'rhe', '2024-02-29 05:25:42'),
(81, 36, 'hii', '2024-03-04 06:31:27'),
(82, 36, 'hii', '2024-03-04 08:40:47'),
(83, 36, 'hi\nji', '2024-03-06 06:07:31'),
(84, 36, 'hiiiiiiiiiiiiiii', '2024-03-25 21:45:59'),
(85, 1014, 'nooooooooooooooooooooooo', '2024-03-25 21:46:28'),
(86, 52, 'okayyyyyyyyyyyyyyyyy', '2024-03-25 21:54:34'),
(87, 53, 'hey', '2024-03-25 21:59:19'),
(88, 1014, 'hiii', '2024-03-25 22:00:10'),
(89, 36, 'ya', '2024-03-25 22:03:00'),
(90, 36, 'hmm', '2024-03-25 22:04:56'),
(91, 36, 'hmm', '2024-03-25 22:05:01'),
(92, 1014, 'j', '2024-03-25 22:06:11'),
(93, 36, 'jyjhdjr4h', '2024-03-26 12:51:46'),
(94, 36, 'faerfea', '2024-03-27 09:13:25'),
(95, 36, 'gyu', '2024-03-27 10:45:42'),
(96, 36, 'hey', '2024-05-25 14:20:28'),
(97, 36, 'no', '2024-05-25 14:20:33'),
(98, 54, 'jey', '2024-05-25 14:22:21');

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(30) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `user_type` enum('admin','employee') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `users` (`id`, `name`, `email`, `user_type`) VALUES
(7, 'Pavithra N', 'a2@g.com', 'admin'),
(8, 'ae', 'ae@g.com', 'employee'),
(9, 'Samarth', 'a3@g.com', 'admin'),
(10, 'SHREYAS P', 'shreyasshet723@gmail.com', 'employee'),
(11, 'fses', 'ereg@g.com', 'employee'),
(12, 'SHREYAS P', 'shreyasshet723@gmail.com', 'employee'),
(13, 'SHREYAS P', 'shreyasshet723@gmail.com', 'employee'),
(14, 'SHREYAS P', 'shreyasshet723@gmail.com', 'employee'),
(15, 'wefwq', 'erfq3r@g.com', 'admin'),
(16, 'er', 'tw4t@g.com', 'admin'),
(17, 'Pavithra ', 'pavithra123@g.com', 'admin'),
(18, 'tq3rt', 't43tw4@g.com', 'employee'),
(19, 'Pavithra N', 'a2@g.com', 'admin'),
(20, 'Sam', 's3@g.com', 'employee'),
(21, 'SHREYAS P', 'shreyasshet723@gmail.com', 'employee'),
(22, 'Pavithra N', 'pavithra123@gmail.com', 'admin'),
(23, 'wefwe', 'shreyasshet723@gmail.com', 'employee'),
(24, 'SHREY', 'shreyasshet723@gmail.com', 'employee'),
(25, 'fgh', 'shreyasshet723@gmail.com', 'employee'),
(26, 'Sam', 'a8@g.com', 'admin'),
(27, 'ae', 'shreyasshet723@gmail.com', 'admin'),
(28, 'chethna', 'gdhudu@gmail.com', 'admin');




ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `employee`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

ALTER TABLE `employee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1018;

ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=99;

ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

ALTER TABLE `employee`
  ADD CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
