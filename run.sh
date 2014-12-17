#!/bin/bash

params=" -u ${DB_1_ENV_MYSQL_USER} -p${DB_1_ENV_MYSQL_PASS} -h ${DB_1_PORT_3306_TCP_ADDR} "

# Create Database
mysql $params <<DELIMITER
CREATE DATABASE IF NOT EXISTS kbitzr;
DELIMITER

# Check if it exists
mysql $params <<DELIMITER
SHOW DATABASES LIKE 'kbitzr';
DELIMITER

node /app/server