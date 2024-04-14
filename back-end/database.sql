CREATE DATABASE BSTRADE;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    email VARCHAR(50) UNIQUE NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    pwd VARCHAR(256) NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL
);


CREATE TABLE stock(
    id SERIAL PRIMARY KEY,
    type VARCHAR(50)
);


CREATE TABLE starred_box(
    id SERIAL PRIMARY KEY,
    stocks VARCHAR(50) REFERENCES Stock(id)
);


CREATE TABLE notif(
    stock VARCHAR(50) NOT NULL,
    msg VARCHAR5(512) NOT NULL
);

CREATE TABLE notifications(
    id SERIAL PRIMARY KEY,
    notifs REFERENCES  Notif(stock)
);