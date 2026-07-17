-- ===========================================
-- Campaign Master Database
-- Version 1.0
-- ===========================================

create table if not exists counties (

    id bigint generated always as identity primary key,

    name text not null unique

);

create table if not exists constituencies (

    id bigint generated always as identity primary key,

    county_id bigint
        references counties(id)
        on delete cascade,

    name text not null

);

create table if not exists wards (

    id bigint generated always as identity primary key,

    constituency_id bigint
        references constituencies(id)
        on delete cascade,

    name text not null

);

create index if not exists idx_constituencies_county
on constituencies(county_id);

create index if not exists idx_wards_constituency
on wards(constituency_id);