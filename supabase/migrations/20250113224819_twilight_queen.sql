/*
  # Create surveys table for storing life strategy data

  1. New Tables
    - `surveys`
      - `id` (text, primary key) - Short unique identifier
      - `data` (jsonb) - Survey response data
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `surveys` table
    - Add policy for anyone to read survey data
    - Add policy for anyone to create survey data
*/

CREATE TABLE IF NOT EXISTS surveys (
  id text PRIMARY KEY,
  data jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE surveys ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read survey data"
  ON surveys
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can create survey data"
  ON surveys
  FOR INSERT
  TO public
  WITH CHECK (true);