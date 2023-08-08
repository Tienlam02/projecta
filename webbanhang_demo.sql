-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 22, 2023 at 05:34 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.0.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `webbanhang_demo`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(9, 'Mũ'),
(12, 'Quần'),
(13, 'Giày'),
(19, 'Nhẫn'),
(26, 'Áo  ');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(11) UNSIGNED NOT NULL,
  `name` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `categoryid` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `image` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8_unicode_ci NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `name`, `categoryid`, `price`, `image`, `description`, `quantity`) VALUES
(30, 'Mũ thời trang lux', 9, 1000000, '1686900058508táº£i xuá»ng.jpg', 'Mũ siêu câp víp pro đội là có người yêu', 10),
(31, 'Quần âu', 12, 120000, '1686661877889quanau.jpg', 'Quần âu đẹp quý phái, số 1 việt nam\r\n', 12),
(32, 'Quần bò', 12, 130000, '1686661893089quanbo.jpg', 'Quần bò nam, siêu  bền\r\n', 32),
(33, 'Quần kaki', 12, 1200000, '1686661914356quankaki.jpg', 'Mặc là thích, dùng là mê.', 4),
(34, 'Mũ lưỡi trai', 9, 45000, '1686453681099mu.jpg', 'Mũ siêu bền, bảo hành trọn đời', 34),
(35, 'Mũ cối', 9, 88888, '1686628284872mucoi.jpg', 'Mũ cối từ thời kháng chiến chống mỹ, siêu  bền', 88),
(36, 'Quần bagy', 12, 88888, '1686474381241bagy.jpg', 'Quần bagy đẹp số 1 Việt Nam', 87),
(37, 'Quần bò nữ', 12, 88888, '1686669420581quanbonu1.jpg', 'Quần đẹp số 1 Việt Nam', 8),
(38, 'Quần baggy nữ', 12, 88889, '1686669473725quanbagynu.jpg', 'Quần baggy nữ chất lượng cao', 32),
(39, 'Quần baggy nữ s2', 12, 98888, '1686669517438quanbonu2.jpg', 'Quần bò nữ siêu bền', 21),
(41, 'Mũ sô hai', 9, 535256, '1686671255952táº£i xuá»ng.jpg', 'Vải kaki polyester. Nhẹ - Thoáng - Thấm hút mồ hôi tốt. Không gây cảm giác bí, nặng đầu cho người sử dụng.', 24),
(42, 'Mũ số 3', 9, 535362, '1686671285627mucoi.jpg', 'Vải kaki polyester. Nhẹ - Thoáng - Thấm hút mồ hôi tốt. Không gây cảm giác bí, nặng đầu cho người sử dụng.', 442),
(43, 'Mũ sổ ', 9, 535353, '1686671331097táº£i xuá»ng.jpg', 'Vải kaki polyester. Nhẹ - Thoáng - Thấm hút mồ hôi tốt. Không gây cảm giác bí, nặng đầu cho người sử dụng.', 42),
(44, 'Quần sort', 12, 2147483647, '1686900098728quansort.jpg', 'Quần short nam đã trở thành xu hướng thời trang nổi bật hiện nay. Với những ưu điểm vượt trội như gọn gàng và tiện dụng, ', 888);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `fullname` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `username` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `address` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `phonenumber` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `permission` int(11) NOT NULL,
  `image` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `fullname`, `username`, `password`, `address`, `phonenumber`, `email`, `permission`, `image`) VALUES
(2, 'user', 'user', '$2b$08$nFzhhv7yZA4er2djj8rcYuC0q23Gj2g0Z7tNKMlZi2aVOPO/Dx31G', 'Hà nội', '42342423', 'user@gmail.com', 0, '1686840691569use.jpg'),
(3, 'admin', 'admin', '$2b$08$k1QVuzL2Nye7rFMjUt4xaeDpLo5hcrVx6OGQocjMoK2Tm7l5ywF2u', 'Lộc bình', '0349761273', 'admin@abc.com', 1, '1686840566801admin.png'),
(9, 'Thao trang', 'Trangxinh', '$2b$08$caTRK8uDRXrhtWiHWpVZDO4XDTGzONf3mWet1SnOkxP3Cbb1y8TK.', 'Hà nội', '88888880', 'trang@gmail.com', 0, '1686840461222gaixinh1.jpg'),
(10, 'Minh Tienn', 'MinhTien', '$2b$08$XswFlHS/TDUUQJa.F8YZ3./lXJi8qyrjGBlZb.eQUXYa827MMLbtG', 'Hà lộiiiiii', '888880', 'tienn@gmail.com', 0, '1686901583900exam_icon_182959 (1).ico');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_product_category` (`categoryid`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `FK_product_category` FOREIGN KEY (`categoryid`) REFERENCES `categories` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
