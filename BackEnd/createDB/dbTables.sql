CREATE TABLE company (
    id SERIAL PRIMARY KEY,
    com_name varchar UNIQUE NOT NULL,
    com_type varchar NOT NULL,
    com_purpose varchar NOT NULL,
    com_address varchar NOT NULL,
    notes text NULL
    );

CREATE TABLE IF NOT EXISTS images (
    id           SERIAL PRIMARY KEY,
    company_id       integer     NOT NULL REFERENCES company (id),
    image        BYTEA       NOT NULL,
    name         VARCHAR(64) NOT NULL
);