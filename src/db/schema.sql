-- Create the groups table
CREATE TABLE IF NOT EXISTS groups (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL,
  emeralds INTEGER DEFAULT 0
);

-- Create the attendees table
CREATE TABLE IF NOT EXISTS attendees (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL,
  group_id INTEGER REFERENCES groups(id),
  days_attended INTEGER DEFAULT 0,
  -- We'll dynamically calculate rank in the query based on days_attended
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create badges catalogue table
CREATE TABLE IF NOT EXISTS badges (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  icon_url TEXT NOT NULL
);

-- Create the join table for attendee badges
CREATE TABLE IF NOT EXISTS attendee_badges (
  attendee_id INTEGER REFERENCES attendees(id) ON DELETE CASCADE,
  badge_id INTEGER REFERENCES badges(id) ON DELETE CASCADE,
  awarded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (attendee_id, badge_id)
);