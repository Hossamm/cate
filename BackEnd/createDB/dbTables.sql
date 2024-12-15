CREATE TABLE company (
    id int4 GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    photoid int4 NOT NULL,
    comname varchar NOT NULL,
    notes text NULL,
    CONSTRAINT compny_pk PRIMARY KEY (id) );
   
CREATE TABLE photo (
    id int4 NOT NULL,
    photoname text NOT NULL,
    photofile serial4 NOT NULL
);



