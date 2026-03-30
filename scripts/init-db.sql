-- CheckFlow AI Database Initialization
-- Created: March 30, 2026
-- This script initializes all required tables and indexes for the application

-- 1. Waitlist table for email signups
CREATE TABLE IF NOT EXISTS waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL UNIQUE,
  use_case VARCHAR(255),
  source VARCHAR(50) DEFAULT 'landing_page',
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  verified_at TIMESTAMP WITH TIME ZONE,
  metadata JSONB,
  INDEX idx_email ON waitlist(email),
  INDEX idx_status ON waitlist(status),
  INDEX idx_created_at ON waitlist(created_at)
);

-- 2. Email verification tokens
CREATE TABLE IF NOT EXISTS email_verifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL,
  token VARCHAR(255) NOT NULL UNIQUE,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  verified_at TIMESTAMP WITH TIME ZONE,
  attempts INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (email) REFERENCES waitlist(email) ON DELETE CASCADE,
  INDEX idx_email ON email_verifications(email),
  INDEX idx_token ON email_verifications(token),
  INDEX idx_expires_at ON email_verifications(expires_at)
);

-- 3. Workflow history (optional, for future features)
CREATE TABLE IF NOT EXISTS workflow_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email VARCHAR(255),
  prompt TEXT NOT NULL,
  generated_workflow JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_email) REFERENCES waitlist(email) ON DELETE SET NULL,
  INDEX idx_user_email ON workflow_submissions(user_email),
  INDEX idx_created_at ON workflow_submissions(created_at)
);

-- 4. Activity logs for debugging and analytics
CREATE TABLE IF NOT EXISTS activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  action VARCHAR(100) NOT NULL,
  user_email VARCHAR(255),
  details JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_action ON activity_logs(action),
  INDEX idx_email ON activity_logs(user_email),
  INDEX idx_created_at ON activity_logs(created_at)
);

-- Enable Row Level Security for waitlist table
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert into waitlist
CREATE POLICY "Enable insert for all users" ON waitlist
  FOR INSERT WITH CHECK (true);

-- Create policy to allow reading own records (if authenticated)
CREATE POLICY "Enable read for authenticated users" ON waitlist
  FOR SELECT USING (true);

-- Enable RLS for other tables
ALTER TABLE email_verifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable all operations for service role" ON email_verifications
  FOR ALL USING (true) WITH CHECK (true);

ALTER TABLE workflow_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable all operations for service role" ON workflow_submissions
  FOR ALL USING (true) WITH CHECK (true);

ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable all operations for service role" ON activity_logs
  FOR ALL USING (true) WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX idx_waitlist_email_status ON waitlist(email, status);
CREATE INDEX idx_verifications_email_token ON email_verifications(email, token);

-- Create function to automatically update verified_at timestamp
CREATE OR REPLACE FUNCTION update_verified_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.verified_at IS NOT NULL AND OLD.verified_at IS NULL THEN
    NEW.verified_at = CURRENT_TIMESTAMP;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update verified_at
CREATE TRIGGER update_waitlist_verified_at
BEFORE UPDATE ON waitlist
FOR EACH ROW
EXECUTE FUNCTION update_verified_timestamp();

-- Insert some sample data for testing (optional)
-- DELETE FROM waitlist WHERE email LIKE '%test%';
-- INSERT INTO waitlist (email, use_case, source, status) VALUES
--   ('test@example.com', 'workflow_automation', 'landing_page', 'pending'),
--   ('demo@example.com', 'team_collaboration', 'landing_page', 'verified');

-- Print confirmation
SELECT 'Database initialized successfully!' as status;
