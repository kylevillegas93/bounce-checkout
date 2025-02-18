DO
$$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'postgres') THEN
        CREATE USER postgres WITH PASSWORD 'postgres';
    END IF;
END
$$;

DO
$$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_database WHERE datname = 'item_storage') THEN
        CREATE DATABASE item_storage;
    END IF;
END
$$;

GRANT ALL PRIVILEGES ON DATABASE item_storage TO postgres;
  
CREATE TABLE IF NOT EXISTS bookings (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    store_id UUID,
    user_id UUID,
    total_price DECIMAL(10, 2) NOT NULL,
    total_quantity INT NOT NULL,
    items JSONB NOT NULL,
    status VARCHAR(255),
    starts_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);
 
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO postgres;
