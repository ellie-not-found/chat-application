# Firebase Real-Time Chat Application

A real-time chat application built with React.js and Firebase, featuring user authentication and real-time messaging.

## Features

- User authentication (Sign up/Login) using Firebase Authentication
- Real-time messaging using Firebase Firestore
- Modern UI with Chakra UI
- Responsive design
- Message history
- Auto-scroll to latest messages

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Firebase account

## Setup

1. Clone the repository
```bash
git clone <repository-url>
cd firebase-chat-app
```

2. Install dependencies
```bash
cd client
npm install
```

3. Create a Firebase project
- Go to [Firebase Console](https://console.firebase.google.com/)
- Create a new project
- Enable Authentication (Email/Password)
- Create a Firestore database
- Get your Firebase configuration

4. Update Firebase configuration
- Open `src/firebase.js`
- Replace the firebaseConfig object with your Firebase configuration:
```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id"
};
```

5. Start the development server
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Project Structure

```
client/
  ├── src/
  │   ├── components/
  │   │   ├── Login.js
  │   │   └── Chat.js
  │   ├── App.js
  │   ├── firebase.js
  │   └── index.js
  ├── package.json
  └── README.md
```

## Firebase Security Rules

Add these security rules to your Firebase Console for Firestore:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /messages/{messageId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null
                   && request.resource.data.uid == request.auth.uid
                   && request.resource.data.text is string
                   && request.resource.data.text.size() <= 500;
    }
  }
}
```

## Contributing

Feel free to submit issues and enhancement requests! 