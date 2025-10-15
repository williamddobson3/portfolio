# Firebase Security Rules

## Firestore Security Rules

Copy and paste these rules into your Firebase Console > Firestore > Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own user document
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      allow read: if request.auth != null; // Allow reading other users for chat
    }
    
    // Conversations - only participants can read/write
    match /conversations/{conversationId} {
      allow read, write: if request.auth != null && 
        request.auth.uid in resource.data.participants;
      
      // Allow creating new conversations if user is a participant
      allow create: if request.auth != null && 
        request.auth.uid in request.resource.data.participants;
      
      // Messages in conversations
      match /messages/{messageId} {
        allow read: if request.auth != null && 
          request.auth.uid in get(/databases/$(database)/documents/conversations/$(conversationId)).data.participants;
        allow create: if request.auth != null && 
          request.auth.uid == request.resource.data.senderUid &&
          request.auth.uid in get(/databases/$(database)/documents/conversations/$(conversationId)).data.participants;
        allow update: if request.auth != null && 
          request.auth.uid == resource.data.senderUid;
        allow delete: if request.auth != null && 
          request.auth.uid == resource.data.senderUid;
      }
    }
    
    // Reports - users can create reports, admins can read
    match /reports/{reportId} {
      allow create: if request.auth != null && 
        request.auth.uid == request.resource.data.reporterUid;
      allow read: if request.auth != null; // Admin access would need custom claims
    }
    
    // Bans - only admins can read/write
    match /bans/{userId} {
      allow read, write: if request.auth != null; // Admin access would need custom claims
    }
  }
}
```

## Realtime Database Security Rules

Copy and paste these rules into your Firebase Console > Realtime Database > Rules:

```json
{
  "rules": {
    "status": {
      "$uid": {
        ".read": "auth != null",
        ".write": "auth != null && auth.uid == $uid"
      }
    },
    "typing": {
      "$conversationId": {
        "$uid": {
          ".read": "auth != null",
          ".write": "auth != null && auth.uid == $uid"
        }
      }
    }
  }
}
```

## Setup Instructions

### 1. Enable Authentication

1. Go to Firebase Console > Authentication
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Enable "Email/Password" provider
5. Optionally enable "Google" for easier sign-in

### 2. Set up Firestore

1. Go to Firebase Console > Firestore Database
2. Click "Create database"
3. Choose "Start in test mode" (you can change rules later)
4. Select a location for your database
5. Go to "Rules" tab and paste the Firestore rules above

### 3. Set up Realtime Database

1. Go to Firebase Console > Realtime Database
2. Click "Create database"
3. Choose "Start in test mode"
4. Select a location for your database
5. Go to "Rules" tab and paste the Realtime Database rules above

### 4. Enable App Check (Recommended)

1. Go to Firebase Console > App Check
2. Click "Get started"
3. Register your web app
4. Enable reCAPTCHA v3
5. Add the App Check configuration to your Firebase config

### 5. Configure CORS (if needed)

If you encounter CORS issues, you may need to configure your Firebase project settings.

## Testing the Rules

### Test Firestore Rules

1. Go to Firebase Console > Firestore > Rules
2. Click "Rules playground"
3. Test different scenarios:
   - User reading their own data
   - User reading other users' data
   - User creating a conversation
   - User sending a message

### Test Realtime Database Rules

1. Go to Firebase Console > Realtime Database > Rules
2. Use the Firebase CLI to test rules:
   ```bash
   firebase database:rules:test
   ```

## Production Considerations

### Custom Claims for Admin Access

For production, you'll want to implement custom claims for admin users:

```javascript
// In your admin functions or Firebase console
admin.auth().setCustomUserClaims(uid, { admin: true });

// In your security rules
allow read, write: if request.auth != null && 
  request.auth.token.admin == true;
```

### Rate Limiting

Consider implementing rate limiting for message sending:

```javascript
// In your security rules (basic example)
allow create: if request.auth != null && 
  request.auth.uid == request.resource.data.senderUid &&
  // Add rate limiting logic here
  request.time > resource.data.lastMessageTime + 1000; // 1 second between messages
```

### Data Validation

Add validation to ensure data integrity:

```javascript
allow create: if request.auth != null && 
  request.auth.uid == request.resource.data.senderUid &&
  request.resource.data.text.size() <= 500 && // Max 500 characters
  request.resource.data.text.size() > 0; // Not empty
```

## Monitoring and Alerts

### Set up Monitoring

1. Go to Firebase Console > Monitoring
2. Set up alerts for:
   - High read/write operations
   - Authentication failures
   - Security rule violations

### Log Analysis

Monitor your Firebase logs for:
- Failed authentication attempts
- Security rule violations
- Unusual activity patterns

## Security Best Practices

1. **Regular Rule Reviews**: Review and update security rules regularly
2. **Principle of Least Privilege**: Only grant necessary permissions
3. **Input Validation**: Validate all user inputs
4. **Rate Limiting**: Implement rate limiting for expensive operations
5. **Monitoring**: Set up alerts for suspicious activity
6. **Regular Updates**: Keep Firebase SDK and rules updated

## Troubleshooting

### Common Issues

1. **Permission Denied**: Check if user is authenticated and has proper permissions
2. **Rule Evaluation Errors**: Check rule syntax and logic
3. **Performance Issues**: Optimize rules for better performance
4. **CORS Errors**: Configure proper CORS settings

### Debug Mode

Enable debug mode in development:

```javascript
// In your Firebase config
if (process.env.NODE_ENV === 'development') {
  // Enable debug logging
  console.log('Firebase debug mode enabled');
}
```

## Support

If you encounter issues with the security rules:

1. Check the Firebase Console for error messages
2. Review the Firebase documentation
3. Test rules in the Rules playground
4. Check browser console for client-side errors
