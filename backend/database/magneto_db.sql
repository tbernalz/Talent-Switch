-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-04-2024 a las 21:17:23
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
-- Estructura de tabla para la tabla `applicant`
--

CREATE TABLE `applicant` (
  `applicant_email` varchar(30) NOT NULL,
  `applicant_status` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  `final_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `opportunity`
--

INSERT INTO `opportunity` (`opportunity_id`, `opportunity_name`, `opportunity_leader_email`, `opportunity_area`, `description`, `required_skills`, `start_date`, `final_date`) VALUES
(1, 'Registro de Usuarios', 'jepavasg@eafit.edu.co', 'Test', 'Requerimos registrar usuarios ficticios para pruebas', 'Test', '2024-04-20', '2024-04-23'),
(2, 'Opportunity Test 1', 'jepavasg1@eafit.edu.co', 'Infraestructura', 'Opportunity of test Sprint 1', 'Redes', '2024-04-20', '2024-04-25'),
(4, 'Registro de Usuarios', 'jepavasg@eafit.edu.co', 'Test', 'Opportunity of test Sprint 2', 'Test', '2024-04-22', '2024-04-22'),
(5, 'Opportunity Test Sprint 2', 'jepavasg@eafit.edu.co', 'Test', 'Opportunity of test Sprint 2', 'Test', '2024-04-24', '2024-04-24'),
(7, 'Registro de Usuarios', 'jepavasg@eafit.edu.co', 'Desarrollo', 'Requerimos registrar usuarios ficticios para pruebas', 'None', '2024-04-24', '2024-04-25');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `opportunity_applicant`
--

CREATE TABLE `opportunity_applicant` (
  `id` int(11) NOT NULL,
  `opportunity_id` int(11) NOT NULL,
  `applicant_email` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
(1, 'Juan Esteban Pavas González', 'jepavasg@eafit.edu.co', 'Desarrollo', 'Arquitectura', 'Diagramas', 'pending'),
(3, 'Juan Esteban Pavas González', 'jepavasg1@eafit.edu.co', 'Desarrollo', 'Arquitectura', 'Diagramas', 'accepted'),
(6, 'Juan Esteban Pavas González', 'jepavasg@eafit.edu.co', 'Desarrollo', 'Arquitectura', 'Diagramas', 'accepted');

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
(1, 'Proyecto Desarrollo de Contenido', 'jepavasg@eafit.edu.co', 'Desarrollo', 'Se requiere personal capacitado en redes para realizar mantenimiento', '2024-04-22', '2024-04-23'),
(2, 'Registro de Usuarios', 'Jepavasg@eafit.edu.co', 'Desarrollo', 'Requerimos registrar usuarios ficticios para pruebas', '2024-04-24', '0000-00-00'),
(3, 'Proyecto Desarrollo de Contenido', 'jepavasg@eafit.edu.co', 'Desarrollo', 'Requerimos personas con capacidad de crear contenido virtual para publicidad.', '2024-04-24', '0000-00-00'),
(6, 'Registro de Usuarios', 'jepavasg@eafit.edu.co', 'Desarrollo', 'Requerimos registrar usuarios ficticios para pruebas', '2024-04-20', '0000-00-00'),
(10, 'Project Team for Test Sprint 2', 'jepavasg@eafit.edu.co', 'Test', 'Test for Sprint 2', '2024-04-23', '2024-04-24'),
(11, 'Project Team 2 for Test Sprint 2', 'jepavasg@eafit.edu.co', 'Test', 'Description', '2024-04-23', '2024-04-22');

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
  `evaluation_level` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`user_id`, `name`, `email`, `actual_area`, `interest_area`, `skills`, `user_type`, `password`, `evaluation_level`) VALUES
(1, 'Elvis', 'elvis@email.com', 'Negocios', 'Marketing', 'Ventas', 'leader', 'Hola1234', NULL),
(2, 'name', 'name@email.com', 'Programación', 'Arquitectura', 'Diagramas', 'employee', 'Hola1234', NULL),
(3, 'Juan Esteban Pavas González', 'jepavasg@eafit.edu.co', 'Programación', 'Arquitectura', 'Diagramas', 'employee', 'Hola1234', NULL),
(4, 'Jose Manuel Camargo', 'chemahpta@gmail.com', 'Programación', 'Arquitectura', 'Estadistica', 'employee', 'Hola1234', NULL),
(5, 'John Alexander Acevedo', 'jaacevedos@eafit.edu.co', 'Diseño Ux', 'Test', 'Planeación', 'employee', 'Godo1234', NULL),
(6, 'Tomas Bernal zuluaga', 'tbernalz@eafit.edu.co', 'Arquitectura', 'Test', 'Planeación', 'employee', 'Berni1234', NULL),
(7, 'Santiago Rodriguez', 'srodriguez@email.com', 'Programación', 'Ventas', 'Estadistica', 'employee', 'Hola1234', NULL),
(10, 'Alberto Restrepo', 'arestrepo@email.com', 'Ingeniería', 'Gestión Humana', '', 'leader', 'Hola1234', NULL),
(12, 'Juan Esteban Pavas González', 'jepavasg1@eafit.edu.co', 'Programación', 'Arquitectura', 'Diagramas', 'leader', 'Hola1234', NULL),
(13, 'Luis Quiroga', 'luisquiro@email.com', 'Programación', 'Ventas', 'Estadistica', 'employee', 'Hola1234', NULL),
(15, 'Sergio Medina', 'sergiomed@email.com', 'Programación', 'Ventas', 'Estadistica', 'employee', 'Hola1234', NULL),
(16, 'Luis Quiroga', 'luisquiro1@email.com', 'Programación', 'Ventas', 'Estadistica', 'employee', 'Hola1234', NULL),
(17, 'Juan Pavas', 'juespago19@gmail.com', 'Programación', 'Arquitectura', 'Diagramas', 'leader', 'Hola1234', NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `applicant`
--
ALTER TABLE `applicant`
  ADD KEY `applicant_email` (`applicant_email`);

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
  ADD KEY `opportunity_id` (`opportunity_id`),
  ADD KEY `applicant_user_email` (`applicant_email`);

--
-- Indices de la tabla `postulation`
--
ALTER TABLE `postulation`
  ADD PRIMARY KEY (`postulation_id`),
  ADD KEY `postulant_email` (`postulant_email`);

--
-- Indices de la tabla `team`
--
ALTER TABLE `team`
  ADD PRIMARY KEY (`team_id`),
  ADD KEY `team_leader_email` (`team_leader_email`);

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
-- AUTO_INCREMENT de la tabla `opportunity`
--
ALTER TABLE `opportunity`
  MODIFY `opportunity_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `opportunity_applicant`
--
ALTER TABLE `opportunity_applicant`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `postulation`
--
ALTER TABLE `postulation`
  MODIFY `postulation_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `team`
--
ALTER TABLE `team`
  MODIFY `team_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `applicant`
--
ALTER TABLE `applicant`
  ADD CONSTRAINT `applicant_email` FOREIGN KEY (`applicant_email`) REFERENCES `user` (`email`);

--
-- Filtros para la tabla `opportunity`
--
ALTER TABLE `opportunity`
  ADD CONSTRAINT `opportunity_leader_email` FOREIGN KEY (`opportunity_leader_email`) REFERENCES `user` (`email`);

--
-- Filtros para la tabla `opportunity_applicant`
--
ALTER TABLE `opportunity_applicant`
  ADD CONSTRAINT `applicant_user_email` FOREIGN KEY (`applicant_email`) REFERENCES `applicant` (`applicant_email`),
  ADD CONSTRAINT `opportunity_id` FOREIGN KEY (`opportunity_id`) REFERENCES `opportunity` (`opportunity_id`);

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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
