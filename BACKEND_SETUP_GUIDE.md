# Backend Setup Guide for Nodemailer Email Service

This guide explains how to set up the Node.js backend server with Nodemailer to handle contact form emails.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Set Up Environment
```bash
# Run the setup script to create .env file
node setup.js
```

### 3. Start the Backend Server
```bash
# Development mode (with auto-restart)
npm run dev

# Or production mode
npm start
```

The server will run on `http://localhost:3001`

## 📧 Email Configuration

The backend is configured to use your Gmail account:
- **Email:** satoshiengineer92@gmail.com
- **Password:** cupideroskama200334!@#QWE
- **Recipient:** satoshiengineer92@gmail.com

## 🔧 How It Works

### Backend Server (`backend/server.js`)
- Express.js server running on port 3001
- CORS enabled for frontend communication
- Nodemailer configured with Gmail SMTP
- API endpoint: `POST /api/send-email`

### Email Flow
1. User submits contact form on frontend
2. Frontend sends POST request to `http://localhost:3001/api/send-email`
3. Backend receives form data (name, email, projectType, message)
4. Nodemailer sends formatted email to satoshiengineer92@gmail.com
5. Backend returns success/error response to frontend

### Email Format
The backend sends beautifully formatted HTML emails with:
- Contact information section
- Project type
- Full message content
- Reply-to set to sender's email
- Timestamp and source information

## 🛠️ Development Workflow

### Start Both Servers
```bash
# Terminal 1: Start backend
cd backend
npm run dev

# Terminal 2: Start frontend
cd ../
npm run dev
```

### Test the Setup
1. Open your portfolio at `http://localhost:5173`
2. Go to the Contact page
3. Fill out and submit the contact form
4. Check your email (satoshiengineer92@gmail.com) for the message

## 🔒 Security Notes

### Gmail App Passwords (Recommended)
For better security, consider using Gmail App Passwords instead of your main password:

1. Go to Google Account settings
2. Enable 2-Factor Authentication
3. Generate an App Password for "Mail"
4. Replace `EMAIL_PASS` in `.env` with the app password

### Environment Variables
The `.env` file contains sensitive information:
- Never commit `.env` to version control
- Use different credentials for production
- Consider using environment-specific configs

## 🚀 Production Deployment

### Option 1: VPS/Cloud Server
1. Deploy the backend to your server
2. Update `BACKEND_EMAIL_ENDPOINT` in frontend to your server URL
3. Set up environment variables on the server
4. Use PM2 or similar for process management

### Option 2: Serverless (Vercel, Netlify Functions)
1. Convert backend to serverless functions
2. Deploy to your preferred platform
3. Update frontend endpoint accordingly

### Option 3: Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3001
CMD ["npm", "start"]
```

## 🐛 Troubleshooting

### Common Issues

#### "Authentication failed"
- Check Gmail credentials
- Enable "Less secure app access" or use App Passwords
- Verify 2FA is properly configured

#### "Connection timeout"
- Check internet connection
- Verify Gmail SMTP settings
- Check firewall settings

#### "CORS error"
- Ensure backend CORS includes your frontend URL
- Check that backend is running on correct port

#### "Module not found"
- Run `npm install` in backend directory
- Check Node.js version compatibility

### Debug Mode
Set `NODE_ENV=development` in `.env` for detailed error messages.

### Logs
Check console output for detailed error information:
```bash
# Backend logs
cd backend && npm run dev

# Frontend logs
# Check browser console for network errors
```

## 📁 File Structure
```
portfolio/
├── backend/
│   ├── server.js          # Main server file
│   ├── package.json       # Dependencies
│   ├── setup.js          # Environment setup
│   └── .env              # Environment variables
├── src/
│   └── services/
│       └── emailService.ts # Frontend email service
└── BACKEND_SETUP_GUIDE.md # This guide
```

## ✅ Current Status

- ✅ Backend server created with Nodemailer
- ✅ Gmail SMTP configuration
- ✅ API endpoint for contact form
- ✅ Frontend updated to use backend
- ✅ CORS configured for development
- ✅ Error handling and fallbacks
- ✅ HTML email formatting

## 🎯 Next Steps

1. Install backend dependencies: `cd backend && npm install`
2. Run setup: `node setup.js`
3. Start backend: `npm run dev`
4. Test contact form submission
5. Check your email for received messages

Your contact form is now ready to send emails directly to satoshiengineer92@gmail.com using Nodemailer!
