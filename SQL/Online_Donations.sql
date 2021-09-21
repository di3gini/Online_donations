
DROP SCHEMA IF EXISTS `online_donations`;
CREATE SCHEMA IF NOT EXISTS `online_donations` DEFAULT CHARACTER SET utf8 ;
USE `online_donations` ;


CREATE TABLE IF NOT EXISTS `online_donations`.`country` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(70) NOT NULL UNIQUE);


CREATE TABLE IF NOT EXISTS `online_donations`.`institution` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(150) NOT NULL,
  `id_country` INT NOT NULL,
  CONSTRAINT `fk_Institution_Contry`
    FOREIGN KEY (`id_country`)
    REFERENCES `online_donations`.`country` (`id`))
ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS `online_donations`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `surname` VARCHAR(45) NOT NULL,
  `id_number` VARCHAR(45) NOT NULL);


CREATE TABLE IF NOT EXISTS `online_donations`.`donation` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `amount` FLOAT NOT NULL,
  `date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `id_institution` INT NOT NULL,
  `id_user` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_Donation_Institution1`
    FOREIGN KEY (`id_institution`)
    REFERENCES `online_donations`.`institution` (`id`),
  CONSTRAINT `fk_Donation_User1`
    FOREIGN KEY (`id_user`)
    REFERENCES `online_donations`.`user` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;
