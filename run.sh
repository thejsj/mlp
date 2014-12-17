#!/bin/bash

params=" -u ${DB_1_ENV_MYSQL_USER} -p${DB_1_ENV_MYSQL_PASS} -h ${DB_1_PORT_3306_TCP_ADDR} "

# Create Bash file for environment variables
echo "export DB_1_ENV_MYSQL_USER=${DB_1_ENV_MYSQL_USER}" >> /envvars.sh
echo "export DB_1_ENV_MYSQL_PASS=${DB_1_ENV_MYSQL_PASS}" >> /envvars.sh
echo "export DB_1_PORT_3306_TCP_ADDR=${DB_1_PORT_3306_TCP_ADDR}" >> /envvars.sh

echo "${params}"

# Create Database
mysql $params <<DELIMITER
CREATE DATABASE IF NOT EXISTS kbitzr;
DELIMITER

# Check if it exists
mysql $params <<DELIMITER
SHOW DATABASES LIKE 'kbitzr';
DELIMITER

node /app/server