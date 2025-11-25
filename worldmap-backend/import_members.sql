-- Import script for members CSV data
-- This script creates a temporary table to import the CSV with original headers,
-- then transfers the data to the members table with proper column mapping

-- Drop temp table if exists
DROP TABLE IF EXISTS temp_members_import;

-- Create temporary table with original CSV column names (matching CSV headers exactly)
CREATE TEMPORARY TABLE temp_members_import (
    "Timestamp" VARCHAR(50),
    "Gender" VARCHAR(50),
    "Country Code" VARCHAR(10),
    "Timezone" VARCHAR(100),
    "Goal" VARCHAR(100),
    "Goal-Other" VARCHAR(255),
    "Source" VARCHAR(100),
    "Source-Other" VARCHAR(255),
    "Country name (from Country)" VARCHAR(255),
    "Solo Project Tier" VARCHAR(50),
    "Role Type" VARCHAR(100),
    "Voyage Role" VARCHAR(100),
    "Voyage (from Voyage Signups)" VARCHAR(100),
    "Voyage Tier" VARCHAR(50)
);

-- Import CSV into temp table
-- Replace 'C:/path/to/your/members.csv' with your actual CSV file path
\copy temp_members_import FROM 'C:/path/to/your/members.csv' WITH (FORMAT csv, HEADER true, DELIMITER ',');

-- Insert data from temp table into members table with proper type conversions
INSERT INTO members (timestamp, gender, country_code, timezone, goal, goal_other, source, source_other, country, solo_project_tier, role_type, voyage_role, voyage, voyage_tier, join_year)
SELECT
    TO_TIMESTAMP("Timestamp", 'MM/DD/YYYY HH24:MI'),
    "Gender",
    "Country Code",
    NULLIF("Timezone", ''),
    "Goal",
    NULLIF("Goal-Other", ''),
    "Source",
    NULLIF("Source-Other", ''),
    "Country name (from Country)",
    NULLIF("Solo Project Tier", ''),
    NULLIF("Role Type", ''),
    "Voyage Role",
    NULLIF("Voyage (from Voyage Signups)", ''),
    NULLIF("Voyage Tier", ''),
    EXTRACT(YEAR FROM TO_TIMESTAMP("Timestamp", 'MM/DD/YYYY HH24:MI'))::INTEGER
FROM temp_members_import;

-- Clean up
DROP TABLE temp_members_import;

-- Verify import
SELECT COUNT(*) as total_members FROM members;
SELECT country, COUNT(*) as member_count FROM members GROUP BY country ORDER BY member_count DESC LIMIT 10;

