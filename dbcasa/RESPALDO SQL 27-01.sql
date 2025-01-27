-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: casa
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tipousuario`
--

DROP TABLE IF EXISTS `tipousuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipousuario` (
  `id_tipo` int NOT NULL AUTO_INCREMENT,
  `nomtusuario` varchar(20) NOT NULL,
  PRIMARY KEY (`id_tipo`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipousuario`
--

LOCK TABLES `tipousuario` WRITE;
/*!40000 ALTER TABLE `tipousuario` DISABLE KEYS */;
INSERT INTO `tipousuario` VALUES (1,'Alumno'),(2,'Administrador');
/*!40000 ALTER TABLE `tipousuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trabajo`
--

DROP TABLE IF EXISTS `trabajo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trabajo` (
  `idtrabajo` int NOT NULL AUTO_INCREMENT,
  `nombretrabajo` varchar(30) NOT NULL,
  `desctrabajo` varchar(30) DEFAULT NULL,
  `ubicacion` varchar(30) NOT NULL,
  `id_creador` int NOT NULL,
  PRIMARY KEY (`idtrabajo`),
  KEY `fk_creador` (`id_creador`),
  CONSTRAINT `fk_creador` FOREIGN KEY (`id_creador`) REFERENCES `usuario` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trabajo`
--

LOCK TABLES `trabajo` WRITE;
/*!40000 ALTER TABLE `trabajo` DISABLE KEYS */;
INSERT INTO `trabajo` VALUES (1,'1','1','1',1),(2,'Atención en biblioteca','Ordenar libros','Biblioteca',2),(3,'Punto estudiantil','Apoyando haciendo nada','Patio central',2),(4,'ASDASD','ASDASD','ASDASD',2),(5,'Limpiar','Limpiar mucho','Casino',2);
/*!40000 ALTER TABLE `trabajo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id_user` int NOT NULL AUTO_INCREMENT,
  `rut` varchar(12) DEFAULT NULL,
  `nombre` varchar(30) NOT NULL,
  `apellido_paterno` varchar(30) NOT NULL,
  `apellido_materno` varchar(30) NOT NULL,
  `correo` varchar(30) NOT NULL,
  `pass` varchar(30) NOT NULL,
  `tipousuario_id_tipo` int NOT NULL,
  `nomadmin` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id_user`),
  KEY `tipousuario_id_tipo` (`tipousuario_id_tipo`),
  CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`tipousuario_id_tipo`) REFERENCES `tipousuario` (`id_tipo`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'11111','Juan','Alumno','Alumno','juan@duoc.cl','123123',1,''),(2,'22222','Pedro','Administrativo','Administrativo','pedro@duoc.cl','123123',2,''),(3,'333','Pepe','Alumno','Alumno','pepe@duoc.cl','123123',1,''),(4,'4444','Tulio','Alumno','Alumno','tulio@duoc.cl','123123',1,'');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuariotrabajo`
--

DROP TABLE IF EXISTS `usuariotrabajo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuariotrabajo` (
  `idusuariotrabajo` int NOT NULL AUTO_INCREMENT,
  `fechainicio` date NOT NULL,
  `fechatermino` date DEFAULT NULL,
  `trabajo_idtrabajo` int NOT NULL,
  `usuario_id_user` int NOT NULL,
  `activo` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`idusuariotrabajo`),
  KEY `trabajo_idtrabajo` (`trabajo_idtrabajo`),
  KEY `usuario_id_user` (`usuario_id_user`),
  CONSTRAINT `usuariotrabajo_ibfk_1` FOREIGN KEY (`trabajo_idtrabajo`) REFERENCES `trabajo` (`idtrabajo`),
  CONSTRAINT `usuariotrabajo_ibfk_2` FOREIGN KEY (`usuario_id_user`) REFERENCES `usuario` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuariotrabajo`
--

LOCK TABLES `usuariotrabajo` WRITE;
/*!40000 ALTER TABLE `usuariotrabajo` DISABLE KEYS */;
INSERT INTO `usuariotrabajo` VALUES (1,'2025-01-27','2025-01-27',2,1,0),(2,'2025-01-27','2025-01-27',4,1,0),(3,'2025-01-27','2025-01-27',5,1,0),(4,'2025-01-27','2025-01-27',3,1,0),(5,'2025-01-27','2025-01-27',1,1,0);
/*!40000 ALTER TABLE `usuariotrabajo` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-27 12:43:31
