# Online Donations

![enter image description here](https://img.shields.io/badge/status-finished-succes)
Simple online donations system done using [Quarkus](https://quarkus.io/), [React](https://reactjs.org/) and [MySQL](https://www.mysql.com/).


# Requirements

 - Java JDK 11 ([Azul zulu OpenJDK](https://www.azul.com/downloads/?version=java-11-lts&package=jdk) recommended)
 - [Gradle](https://docs.gradle.org/current/userguide/userguide.html) 
 - [NodeJS](https://nodejs.org/en/)
 - [Yarn](https://yarnpkg.com/) 
 - [Docker](https://docs.docker.com/get-docker/)

## Build Quarkus

It's necessary to build the quarkus project before our docker compose, for this, making use of Gradle, we go into the backend folder, execute the next command:

    gradle build

## Docker compose

After building the quarkus project, we are ready to deploy our docker container. For this, we go into the root folder of the project, and execute the next command:

    docker-compose up --build

## Setting up MySQL database

We have a container running with a dist of MySQL, we just need to connect to it with any database tool of our preference, or via CLI to the direction

> localhost:3300

That way, we can execute the three sql files included on the "SQL" folder, where you can also find the ER diagram used. The execution order is:

 1. Database.sql
 2. Countries.sql
 3. Institutions.sql

## Accessing to the deployed app

After all this, we are ready to go and try it. Just access from your browser to the addres:

> http://localhost:9090/login
