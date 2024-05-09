CREATE DATABASE BSTRADE;

-- creation first
CREATE TABLE users (
    user_id CHAR(255) PRIMARY KEY,
    email VARCHAR(50) UNIQUE NOT NULL,
    full_name VARCHAR(50) NOT NULL,
    password VARCHAR(256) NOT NULL,
    job VARCHAR(50),
    is_verified boolean DEFAULT FALSE,
    req_Pwd_Change boolean DEFAULT FALSE,
    bio VARCHAR(5000) DEFAULT '',
    profile_pic VARCHAR(10485760) DEFAULT NULL
);

-- trigger second
CREATE OR REPLACE FUNCTION generate_hashed_id() RETURNS TRIGGER AS $$
BEGIN
  NEW.user_id = MD5(random()::text || clock_timestamp()::text);
  RETURN NEW.user_id;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER hash_id_trigger
BEFORE INSERT ON users
FOR EACH ROW EXECUTE FUNCTION generate_hashed_id();


-- other tables
CREATE TABLE stocks (
    stock_id SERIAL PRIMARY KEY,
    stock_name VARCHAR(100) NOT NULL
);

CREATE TABLE stock_data (
    stock_data_id SERIAL PRIMARY KEY,
    datetime_column DATE,
    price DECIMAL(10, 2) NOT NULL,
    stock_id INT REFERENCES stock(stock_id)
);

CREATE TABLE starred_box(
    starred_box_id SERIAL PRIMARY KEY,
    user_id CHAR(255) REFERENCES users(user_id),
    stock_id INTEGER REFERENCES stocks(stock_id)
);



CREATE TABLE notif(
    notif_id SERIAL PRIMARY KEY,
    stock_id INTEGER REFERENCES stocks(stock_id),
    msg VARCHAR(512) NOT NULL
);

-- CREATE TABLE notifications(
--     notifications_id SERIAL PRIMARY KEY,
--     notifs REFERENCES Notif(stock)
-- );