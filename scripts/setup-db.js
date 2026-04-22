import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
});

async function setupDatabase() {
  try {
    console.log('[v0] Starting database setup...');

    // Read the SQL schema file
    const sqlFilePath = path.join(process.cwd(), 'scripts', '01-schema.sql');
    const sqlContent = fs.readFileSync(sqlFilePath, 'utf8');

    // Split SQL statements (simple approach - split by semicolon)
    const statements = sqlContent
      .split(';')
      .map((stmt) => stmt.trim())
      .filter((stmt) => stmt.length > 0 && !stmt.startsWith('--'));

    console.log(`[v0] Found ${statements.length} SQL statements`);

    // Execute each statement
    for (const statement of statements) {
      try {
        console.log(`[v0] Executing: ${statement.substring(0, 50)}...`);
        const { data, error } = await supabase.rpc('exec_sql', {
          sql: statement,
        });

        if (error) {
          console.warn(`[v0] Warning: ${error.message}`);
        } else {
          console.log(`[v0] ✓ Statement executed`);
        }
      } catch (err) {
        console.warn(`[v0] Error executing statement: ${err.message}`);
      }
    }

    console.log('[v0] Database setup completed!');
  } catch (err) {
    console.error('[v0] Error during database setup:', err.message);
    process.exit(1);
  }
}

setupDatabase();
