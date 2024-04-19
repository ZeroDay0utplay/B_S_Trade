CREATE DATABASE BSTRADE;

-- Function Definition for hasing ids
CREATE OR REPLACE FUNCTION generate_hashed_id() RETURNS TRIGGER AS $$
BEGIN
  NEW.id = MD5(random()::text || clock_timestamp()::text);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Table Creation
CREATE TABLE users (
    id CHAR(32) PRIMARY KEY,
    email VARCHAR(50) UNIQUE NOT NULL,
    full_name VARCHAR(50) NOT NULL,
    password VARCHAR(256) NOT NULL,
    job VARCHAR(50),
    is_verified boolean DEFAULT FALSE,
    req_Pwd_Change boolean DEFAULT FALSE
);

-- Trigger Creation
CREATE TRIGGER hash_id_trigger
BEFORE INSERT ON users
FOR EACH ROW EXECUTE FUNCTION generate_hashed_id();



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