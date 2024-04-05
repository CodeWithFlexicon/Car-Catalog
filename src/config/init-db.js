const { pool } = require("./configPg");

const createEnumTypeQuery = `
  DO $$
  BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'body_type') THEN
          CREATE TYPE body_type AS ENUM (
              'Cargo Van',
              'Convertible',
              'Coupe',
              'Ext Cargo Minivan',
              'Ext Cargo Van',
              'Ext Minivan',
              'Ext Van',
              'Hatchback',
              'Minivan',
              'Passenger Van',
              'Sedan',
              'SUV',
              'Truck (Access Cab)',
              'Truck (Cab Plus)',
              'Truck (Club Cab)',
              'Truck (Crew Cab)',
              'Truck (CrewMax)',
              'Truck (Double Cab)',
              'Truck (Extended Cab)',
              'Truck (King Cab)',
              'Truck (Mega Cab)',
              'Truck (Quad Cab)',
              'Truck (Regular Cab)',
              'Truck (SuperCab)',
              'Truck (SuperCrew)',
              'Truck (Xtracab)',
              'Van',
              'Wagon'
          );
      END IF;

      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'cam_type') THEN
        CREATE TYPE cam_type AS ENUM (
            'Double overhead cam (DOHC)',
            'Overhead valves (OHV)',
            'Single overhead cam (SOHC)'
        );
      END IF;

      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'engine_type') THEN
        CREATE TYPE engine_type AS ENUM (
            'diesel',
            'electric',
            'electric (fuel cell)',
            'flex-fuel (FFV)',
            'gas',
            'hybrid',
            'mild hybrid',
            'natural gas (CNG)',
            'plug-in hybrid'
        );
      END IF;

      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'cylinder_type') THEN
        CREATE TYPE cylinder_type AS ENUM (
            'flat 4', 'flat 6', 'I2', 'I3', 'I4', 'I5', 'I6',
            'rotary 0', 'V10', 'V12', 'V6', 'V8', 'W12', 'W16', 'W8'
        );
    END IF;

    -- Drive Type ENUM
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'drive_type') THEN
        CREATE TYPE drive_type AS ENUM (
            'all wheel drive', 'four wheel drive',
            'front wheel drive', 'rear wheel drive'
        );
    END IF;

    -- Fuel Type ENUM
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'fuel_type') THEN
        CREATE TYPE fuel_type AS ENUM (
            'diesel fuel', 'electric', 'flex-fuel (premium unleaded recommended/E85)',
            'flex-fuel (premium unleaded required/E85)', 'flex-fuel (unleaded/E85)',
            'flex-fuel (unleaded/natural gas)', 'hydrogen', 'natural gas',
            'premium unleaded (recommended)', 'premium unleaded (required)', 'regular unleaded'
        );
    END IF;

    -- Transmission ENUM
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'transmission_type') THEN
        CREATE TYPE transmission_type AS ENUM (
            '1-speed direct drive', '10-speed automatic', '10-speed shiftable automatic',
            '2-speed', '2-speed automatic', '3-speed automatic', '4-speed automatic',
            '4-speed manual', '4-speed shiftable automatic', '5-speed automated manual',
            '5-speed automatic', '5-speed manual', '5-speed shiftable automatic',
            '6-speed automated manual', '6-speed automatic', '6-speed manual',
            '6-speed shiftable automatic', '7-speed automated manual', '7-speed automatic',
            '7-speed manual', '7-speed shiftable automatic', '8-speed automated manual',
            '8-speed automatic', '8-speed shiftable automatic', '9-speed automated manual',
            '9-speed automatic', '9-speed shiftable automatic',
            'continuously variable-speed automatic',
            'continuously variable-speed shiftable automatic',
            'electrically variable-speed automatic'
        );
    END IF;

    -- Valve Timing ENUM
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'valve_timing_type') THEN
        CREATE TYPE valve_timing_type AS ENUM ('Variable');
    END IF;
  END$$;
`;

const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      user_id SERIAL PRIMARY KEY,
      username VARCHAR(100) NOT NULL UNIQUE,
      email VARCHAR(100) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NOT NULL,
      created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS favorites (
      favorite_id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL,
      make_model_trim_id INTEGER NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(user_id),
      FOREIGN KEY (make_model_trim_id) REFERENCES make_model_trims(id)
    );

    CREATE TABLE IF NOT EXISTS make (
      id BIGINT PRIMARY KEY,
      name VARCHAR(32) NOT NULL,
      is_active BOOLEAN DEFAULT TRUE
    );

    CREATE TABLE IF NOT EXISTS make_models (
      id BIGINT PRIMARY KEY,
      make_id BIGINT NOT NULL,
      name VARCHAR(64) NOT NULL,
      import_id BIGINT,
      source VARCHAR(255),
      is_active BOOLEAN DEFAULT TRUE,
      FOREIGN KEY (make_id) REFERENCES make(id)
    );

    CREATE TABLE IF NOT EXISTS make_model_trims (
      id BIGINT PRIMARY KEY,
      make_model_id BIGINT NOT NULL,
      year INTEGER CHECK (year >= 1900 AND year <= EXTRACT(YEAR FROM CURRENT_DATE)),
      name VARCHAR(128) NOT NULL,
      description TEXT,
      msrp BIGINT,
      invoice BIGINT,
      import_id BIGINT,
      source VARCHAR(255),
      is_active BOOLEAN DEFAULT TRUE,
      created TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
      modified TIMESTAMP WITHOUT TIME ZONE,
      FOREIGN KEY (make_model_id) REFERENCES make_models(id)
    );
  
    CREATE TABLE IF NOT EXISTS make_model_trim_bodies (
      id BIGINT PRIMARY KEY,
      make_model_trim_id BIGINT NOT NULL,
      type body_type NOT NULL,
      doors INTEGER,
      length FLOAT,
      width FLOAT,
      seats INTEGER,
      height FLOAT,
      wheel_base FLOAT,
      front_track FLOAT,
      rear_track FLOAT,
      ground_clearance FLOAT,
      cargo_capacity FLOAT,
      max_cargo_capacity FLOAT,
      curb_weight BIGINT,
      gross_weight BIGINT,
      max_payload BIGINT,
      max_towing_capacity BIGINT,
      FOREIGN KEY (make_model_trim_id) REFERENCES make_model_trims(id)
    );

    CREATE TABLE IF NOT EXISTS make_model_trim_engines (
      id BIGINT PRIMARY KEY,
      make_model_trim_id BIGINT NOT NULL,
      engine_type engine_type,
      fuel_type fuel_type,
      cylinders cylinder_type,
      size FLOAT,
      horsepower_hp INTEGER,
      horsepower_rpm INTEGER,
      torque_ft_lbs INTEGER,
      torque_rpm INTEGER,
      valves INTEGER,
      valve_timing valve_timing_type,
      cam_type cam_type,
      drive_type drive_type,
      transmission transmission_type,
      FOREIGN KEY (make_model_trim_id) REFERENCES make_model_trims(id)
    );

    CREATE TABLE IF NOT EXISTS make_model_trim_exterior_colors (
      id BIGINT PRIMARY KEY,
      make_model_trim_id BIGINT NOT NULL,
      name VARCHAR(128) NOT NULL,
      rgb VARCHAR(16),
      FOREIGN KEY (make_model_trim_id) REFERENCES make_model_trims(id)
    );

    CREATE TABLE IF NOT EXISTS make_model_trim_interior_colors (
      id BIGINT PRIMARY KEY,
      make_model_trim_id BIGINT NOT NULL,
      name VARCHAR(128) NOT NULL,
      rgb VARCHAR(16),
      FOREIGN KEY (make_model_trim_id) REFERENCES make_model_trims(id)
    );

    CREATE TABLE IF NOT EXISTS make_model_trim_mileage (
      id BIGINT PRIMARY KEY,
      make_model_trim_id BIGINT NOT NULL,
      fuel_tank_capacity FLOAT,
      combined_mpg INTEGER,
      epa_city_mpg INTEGER,
      epa_highway_mpg INTEGER,
      range_city INTEGER,
      range_highway INTEGER,
      battery_capacity_electric INTEGER,
      epa_time_to_charge_hr_240v_electric FLOAT,
      epa_kwh_100_mi_electric INTEGER,
      range_electric INTEGER,
      epa_highway_mpg_electric INTEGER,
      epa_city_mpg_electric INTEGER,
      epa_combined_mpg_electric INTEGER,
      FOREIGN KEY (make_model_trim_id) REFERENCES make_model_trims(id)
    ); 
`;

async function initEnum() {
  const client = await pool.connect();

  try {
    await client.query(createEnumTypeQuery);
    console.log("ENUMS created successfully");
  } catch (err) {
    console.error("Error creating ENUMS:", err);
  } finally {
    client.release();
  }
}

initEnum();

async function initDb() {
  const client = await pool.connect();

  try {
    await client.query(createTableQuery);
    console.log("Tables created or verified successfully");
  } catch (err) {
    console.error("Error creating tables:", err);
  } finally {
    client.release();
  }
}

initDb();
