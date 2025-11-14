 CREATE TABLE IF NOT EXISTS company (
    id SERIAL PRIMARY KEY,
    com_name varchar UNIQUE NOT NULL,
    com_type varchar NOT NULL,
    com_purpose varchar NOT NULL,
    com_address varchar NOT NULL,
    com_capital varchar DEFAULT '0' NOT NULL,
    notes text NULL
    );

CREATE TABLE IF NOT EXISTS images (
    id           SERIAL PRIMARY KEY,
    company_id   integer     NOT NULL REFERENCES company (id),
    image        BYTEA       NOT NULL,
    name         VARCHAR(64) NOT NULL,
    UNIQUE (company_id, name)     
--  name         VARCHAR(64) UNIQUE NOT NULL
);

-- ALTER TABLE images ADD constraint UniqueImageName UNIQUE (name);

CREATE TABLE IF NOT EXISTS users (
    id           SERIAL PRIMARY KEY,
    user_name    VARCHAR(64) UNIQUE NOT NULL,
    password     VARCHAR(255) NOT null
                 


);

CREATE TABLE IF NOT EXISTS com_updates (
    id               SERIAL PRIMARY KEY,
    company_name     VARCHAR     NOT NULL REFERENCES company (com_name) ON DELETE CASCADE,
    user_name        VARCHAR(64) NOT NULL REFERENCES users (user_name),
    date             TIMESTAMP   NOT NULL,
    field_name       VARCHAR(64) NOT NULL,
    new_value        VARCHAR(64) NOT NULL,
    old_value        VARCHAR(64) NOT NULL
);

 
              