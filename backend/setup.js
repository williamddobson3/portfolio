import fs from 'fs';
import path from 'path';

// Create .env file with the provided credentials
const envContent = `# Email Configuration
EMAIL_USER=satoshiengineer92@gmail.com
EMAIL_PASS=cupideroskama200334!@#QWE
EMAIL_TO=satoshiengineer92@gmail.com

# Server Configuration
PORT=3001
NODE_ENV=development
`;

const envPath = path.join(process.cwd(), '.env');

try {
  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env file created successfully');
  console.log('📧 Email configuration set up');
} catch (error) {
  console.error('❌ Error creating .env file:', error.message);
}
