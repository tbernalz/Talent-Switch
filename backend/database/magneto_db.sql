-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-05-2024 a las 09:11:27
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `magneto_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `evaluation`
--

CREATE TABLE `evaluation` (
  `id` int(11) NOT NULL,
  `evaluated_email` varchar(30) NOT NULL,
  `qualification` tinyint(1) NOT NULL,
  `comment` text DEFAULT NULL,
  `evaluation_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `evaluation`
--

INSERT INTO `evaluation` (`id`, `evaluated_email`, `qualification`, `comment`, `evaluation_date`) VALUES
(1, 'jepavasg@eafit.edu.co', 5, 'Gran trabajo', '2024-05-05'),
(2, 'jepavasg@eafit.edu.co', 5, 'Gran trabajo', '2024-05-05'),
(9, 'tbernalz@eafit.edu.co', 1, 'Evaluación de Prueba', '2024-05-05'),
(13, 'tbernalz@eafit.edu.co', 1, 'Evaluación de Prueba', '2024-05-05'),
(16, 'jepavasg@eafit.edu.co', 5, 'Gran trabajo', '2024-05-20'),
(21, 'jepavasg@eafit.edu.co', 5, 'Gran trabajo', '2024-05-22'),
(22, 'jepavasg@eafit.edu.co', 5, 'Gran trabajo', '2024-05-22'),
(23, 'jepavasg@eafit.edu.co', 5, 'Muy buen trabajo', '2024-05-22'),
(24, 'jepavasg1@eafit.edu.co', 4, 'Evaluación de Prueba', '2024-05-29');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `opportunity`
--

CREATE TABLE `opportunity` (
  `opportunity_id` int(11) NOT NULL,
  `opportunity_name` varchar(80) NOT NULL,
  `opportunity_leader_email` varchar(30) NOT NULL,
  `opportunity_area` varchar(30) NOT NULL,
  `description` text NOT NULL,
  `required_skills` varchar(255) NOT NULL,
  `start_date` date NOT NULL,
  `final_date` date NOT NULL,
  `opportunity_state` varchar(10) NOT NULL DEFAULT 'open'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `opportunity`
--

INSERT INTO `opportunity` (`opportunity_id`, `opportunity_name`, `opportunity_leader_email`, `opportunity_area`, `description`, `required_skills`, `start_date`, `final_date`, `opportunity_state`) VALUES
(23, 'Registro de Usuarios', 'jepavasg1@eafit.edu.co', 'Desarrollo', 'Requerimos registrar usuarios ficticios para pruebas', 'None', '2024-05-27', '2024-05-29', 'open'),
(24, 'Registro de Usuarios', 'jepavasg@eafit.edu.co', 'Desarrollo', 'Requerimos registrar usuarios ficticios para pruebas', 'None', '2024-05-28', '2024-05-29', 'open'),
(25, 'Registro de Usuarios', 'jepavasg1@eafit.edu.co', 'Test', 'Requerimos registrar usuarios ficticios para pruebas', 'Test', '2024-05-28', '2024-05-29', 'open'),
(26, 'Oportunidad Test Front', 'jepavasg1@eafit.edu.co', 'Test', 'Estamos probando el fron', 'None', '2024-05-28', '2024-05-28', 'open');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `opportunity_applicant`
--

CREATE TABLE `opportunity_applicant` (
  `id` int(11) NOT NULL,
  `opportunity_id` int(11) NOT NULL,
  `applicant_email` varchar(30) NOT NULL,
  `applicant_state` varchar(10) NOT NULL DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `opportunity_applicant`
--

INSERT INTO `opportunity_applicant` (`id`, `opportunity_id`, `applicant_email`, `applicant_state`) VALUES
(16, 23, 'jepavasg@eafit.edu.co', 'accepted'),
(17, 26, 'santiRichardYT@gmail.com', 'rejected'),
(18, 25, 'jepavasg@eafit.edu.co', 'pending'),
(19, 24, 'jepavasg@eafit.edu.co', 'pending');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `postulation`
--

CREATE TABLE `postulation` (
  `postulation_id` int(11) NOT NULL,
  `postulant_name` varchar(60) NOT NULL,
  `postulant_email` varchar(30) NOT NULL,
  `postulant_actual_area` varchar(30) NOT NULL,
  `postulant_interest_area` varchar(255) NOT NULL,
  `postulant_skills` varchar(255) NOT NULL,
  `postulation_state` varchar(10) NOT NULL DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `postulation`
--

INSERT INTO `postulation` (`postulation_id`, `postulant_name`, `postulant_email`, `postulant_actual_area`, `postulant_interest_area`, `postulant_skills`, `postulation_state`) VALUES
(16, 'Juan Esteban Pavas González', 'jepavasg@eafit.edu.co', 'Desarrollo', 'Arquitectura', 'Diagramas', 'accepted'),
(17, 'Juan Esteban Pavas González', 'jepavasg@eafit.edu.co', 'Programación', 'Gestión de Bases de Datos', 'MySQL', 'rejected'),
(18, 'Juan Esteban Pavas González', 'jepavasg@eafit.edu.co', 'Programación', 'Arquitectura', 'Diagramas', 'pending');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('OSymEj48ugz8ffIrZq5nAidHGYn86gDz', 1717043370, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2024-05-30T04:29:29.976Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"user_id\":12,\"name\":\"Juan Esteban Pavas González\",\"email\":\"jepavasg1@eafit.edu.co\",\"actual_area\":\"Programación\",\"interest_area\":\"Arquitectura\",\"skills\":\"Diagramas\",\"user_type\":\"leader\",\"password\":\"Hola1234\",\"evaluation_level\":null,\"total_evaluations\":0}}');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `team`
--

CREATE TABLE `team` (
  `team_id` int(11) NOT NULL,
  `team_name` varchar(80) NOT NULL,
  `team_leader_email` varchar(30) NOT NULL,
  `team_area` varchar(30) NOT NULL,
  `description` text NOT NULL,
  `start_date` date NOT NULL,
  `final_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `team`
--

INSERT INTO `team` (`team_id`, `team_name`, `team_leader_email`, `team_area`, `description`, `start_date`, `final_date`) VALUES
(20, 'Registro de Usuarios', 'jepavasg1@eafit.edu.co', 'Desarrollo', 'Requerimos registrar usuarios ficticios para pruebas', '2024-05-27', '2024-05-29'),
(21, 'Registro de Usuarios', 'jepavasg1@eafit.edu.co', 'Desarrollo', 'Requerimos registrar usuarios ficticios para pruebas', '2024-05-28', '2024-05-29'),
(22, 'Registro de Usuarios', 'jepavasg1@eafit.edu.co', 'Desarrollo', 'Requerimos registrar usuarios ficticios para pruebas', '2024-05-28', '2024-05-29');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `team_member`
--

CREATE TABLE `team_member` (
  `id` int(11) NOT NULL,
  `team_id` int(11) NOT NULL,
  `member_email` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `team_member`
--

INSERT INTO `team_member` (`id`, `team_id`, `member_email`) VALUES
(17, 20, 'jepavasg1@eafit.edu.co'),
(18, 20, 'jepavasg@eafit.edu.co'),
(19, 21, 'jepavasg1@eafit.edu.co'),
(20, 22, 'jepavasg1@eafit.edu.co'),
(21, 22, 'jepavasg@eafit.edu.co');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `name` varchar(60) NOT NULL,
  `email` varchar(30) NOT NULL,
  `actual_area` varchar(30) NOT NULL,
  `interest_area` varchar(255) NOT NULL,
  `skills` varchar(255) NOT NULL,
  `user_type` enum('leader','employee') NOT NULL,
  `password` varchar(30) NOT NULL,
  `evaluation_level` float DEFAULT NULL,
  `total_evaluations` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`user_id`, `name`, `email`, `actual_area`, `interest_area`, `skills`, `user_type`, `password`, `evaluation_level`, `total_evaluations`) VALUES
(1, 'Elvis', 'elvis@email.com', 'Negocios', 'Marketing', 'Ventas', 'leader', 'Hola1234', NULL, 0),
(2, 'name', 'name@email.com', 'Programación', 'Arquitectura', 'Diagramas', 'employee', 'Hola1234', NULL, 0),
(3, 'Juan Esteban Pavas González', 'jepavasg@eafit.edu.co', 'Programación', 'Ventas', 'Estadística', 'employee', 'Hola1234', 4.00001, 8),
(4, 'Jose Manuel Camargo', 'chemahpta@gmail.com', 'Programación', 'Arquitectura', 'Estadistica', 'employee', 'Hola1234', NULL, 0),
(5, 'John Alexander Acevedo', 'jaacevedos@eafit.edu.co', 'Diseño Ux', 'Test', 'Planeación', 'employee', 'Godo1234', NULL, 0),
(6, 'Tomas Bernal zuluaga', 'tbernalz@eafit.edu.co', 'Arquitectura', 'Test', 'Planeación', 'employee', 'Berni1234', 3, 8),
(7, 'Santiago Rodriguez', 'srodriguez@email.com', 'Programación', 'Ventas', 'Estadistica', 'employee', 'Hola1234', NULL, 0),
(10, 'Alberto Restrepo', 'arestrepo@email.com', 'Ingeniería', 'Gestión Humana', '', 'leader', 'Hola1234', NULL, 0),
(12, 'Juan Esteban Pavas González', 'jepavasg1@eafit.edu.co', 'Programación', 'Arquitectura', 'Diagramas', 'leader', 'Hola1234', 4, 1),
(13, 'Luis Quiroga', 'luisquiro@email.com', 'Programación', 'Ventas', 'Estadistica', 'employee', 'Hola1234', NULL, 0),
(15, 'Sergio Medina', 'sergiomed@email.com', 'Programación', 'Ventas', 'Estadistica', 'employee', 'Hola1234', NULL, 0),
(16, 'Luis Quiroga', 'luisquiro1@email.com', 'Programación', 'Ventas', 'Estadistica', 'employee', 'Hola1234', NULL, 0),
(17, 'Juan Pavas', 'juespago19@gmail.com', 'Programación', 'Arquitectura', 'Diagramas', 'leader', 'Hola1234', NULL, 0),
(18, 'Anselmo', 'anselmo@email.com', 'Ventas', 'Desarrollo', 'Creatividad', 'employee', 'Hola1234', NULL, 0),
(19, 'Jose Gonzalez', 'jgonzalez@email.com', 'Desarrollo', 'Ventas', 'Estadistica', 'employee', 'Hola1234', NULL, 0),
(20, 'Juan Esteban Pavas González', 'jepavasg2@eafit.edu.co', 'Programación', 'Arquitectura', 'Estadistica', 'employee', 'Hola1234', NULL, 0),
(21, 'Jose Luis Montoya', 'jmontoya@eafit.edu.co', 'Ing. de sistemas', 'Molestar a Rua', 'Encontrar problemas de ortografía', 'leader', 'Aqws1234', NULL, 0),
(22, 'Santiago Rodríguez Duque', 'santiRichardYT@gmail.com', 'streamer profesional', 'futbolista profesional', 'Recuperación de balones y mujeres', 'employee', 'Anakin123', NULL, 0),
(23, 'Alejandro Zúñiga', 'azunigaj@eafit.edu.co', 'Gestión Humana', 'Desarrollo', 'python', 'employee', 'Qawsed123', NULL, 0),
(24, 'Juan Andres Corrales', 'jacorrales@email.com', 'Programación', 'Arquitectura', 'Diagramas', 'employee', 'Hola1234', NULL, 0),
(25, 'Juan David Osorio', 'jdosorio@email.com', 'Programación', 'Ventas', 'Estadistica', 'employee', 'Hola1234', NULL, 0),
(26, 'Juan David Perez', 'jdperez@email.com', 'Gestión Humana', 'Ventas', 'Estadistica', 'employee', 'Hola1234', NULL, 0),
(27, 'Jose Manuel Lopez', 'jmlopez@email.com', 'Programación', 'Ventas', 'Estadistica', 'employee', 'Hola1234', NULL, 0),
(28, 'Maria Alejandra Cordoba', 'macordoba@email.com', 'Negocios', 'Programación', 'Python, Css, JavaScript', 'employee', 'Hola1234', NULL, 0),
(29, 'Luis Sanchez', 'lsanchez@email.com', 'Gestión Humana', 'Arquitectura', 'Diagramas', 'leader', 'Hola1234', NULL, 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `evaluation`
--
ALTER TABLE `evaluation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `evaluated_email` (`evaluated_email`);

--
-- Indices de la tabla `opportunity`
--
ALTER TABLE `opportunity`
  ADD PRIMARY KEY (`opportunity_id`),
  ADD KEY `opportunity_leader_email` (`opportunity_leader_email`);

--
-- Indices de la tabla `opportunity_applicant`
--
ALTER TABLE `opportunity_applicant`
  ADD PRIMARY KEY (`id`),
  ADD KEY `opportunity_id` (`opportunity_id`) USING BTREE,
  ADD KEY `applicant_user_email` (`applicant_email`);

--
-- Indices de la tabla `postulation`
--
ALTER TABLE `postulation`
  ADD PRIMARY KEY (`postulation_id`),
  ADD KEY `postulant_email` (`postulant_email`);

--
-- Indices de la tabla `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indices de la tabla `team`
--
ALTER TABLE `team`
  ADD PRIMARY KEY (`team_id`),
  ADD KEY `team_leader_email` (`team_leader_email`);

--
-- Indices de la tabla `team_member`
--
ALTER TABLE `team_member`
  ADD PRIMARY KEY (`id`),
  ADD KEY `team_id` (`team_id`),
  ADD KEY `member_email` (`member_email`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `evaluation`
--
ALTER TABLE `evaluation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `opportunity`
--
ALTER TABLE `opportunity`
  MODIFY `opportunity_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT de la tabla `opportunity_applicant`
--
ALTER TABLE `opportunity_applicant`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `postulation`
--
ALTER TABLE `postulation`
  MODIFY `postulation_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `team`
--
ALTER TABLE `team`
  MODIFY `team_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `team_member`
--
ALTER TABLE `team_member`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `evaluation`
--
ALTER TABLE `evaluation`
  ADD CONSTRAINT `evaluated_email` FOREIGN KEY (`evaluated_email`) REFERENCES `user` (`email`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `opportunity`
--
ALTER TABLE `opportunity`
  ADD CONSTRAINT `opportunity_leader_email` FOREIGN KEY (`opportunity_leader_email`) REFERENCES `user` (`email`);

--
-- Filtros para la tabla `opportunity_applicant`
--
ALTER TABLE `opportunity_applicant`
  ADD CONSTRAINT `applicant_user_email` FOREIGN KEY (`applicant_email`) REFERENCES `user` (`email`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `opportunity_id` FOREIGN KEY (`opportunity_id`) REFERENCES `opportunity` (`opportunity_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `postulation`
--
ALTER TABLE `postulation`
  ADD CONSTRAINT `postulant_email` FOREIGN KEY (`postulant_email`) REFERENCES `user` (`email`);

--
-- Filtros para la tabla `team`
--
ALTER TABLE `team`
  ADD CONSTRAINT `team_leader_email` FOREIGN KEY (`team_leader_email`) REFERENCES `user` (`email`);

--
-- Filtros para la tabla `team_member`
--
ALTER TABLE `team_member`
  ADD CONSTRAINT `member_email` FOREIGN KEY (`member_email`) REFERENCES `user` (`email`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `team_id` FOREIGN KEY (`team_id`) REFERENCES `team` (`team_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
