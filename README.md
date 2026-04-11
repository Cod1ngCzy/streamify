<div align="center">

# Streamify

A real-time chat and video calling application built with the MERN stack and powered by the GetStream API.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)
![GetStream](https://img.shields.io/badge/GetStream-005FFF?style=flat&logo=stream&logoColor=white)

</div>

---

## Overview

Streamify is a full-stack chat application that lets users create channels, send messages, and join video calls in real time. Authentication is handled by the backend using JWT cookies, and all real-time messaging and video functionality is powered by the [GetStream](https://getstream.io/) API.

---

## Features

- **Authentication** — Secure sign-up, sign-in, and sign-out with JWT stored in HTTP-only cookies
- **Real-time Messaging** — Channel-based messaging powered by GetStream's Chat SDK
- **Video Calling** — Video call support via GetStream's Video API
- **Channel Management** — Create and browse channels
- **Custom UI** — Discord-inspired dark theme built with Tailwind CSS
- **Error Monitoring** — Integrated with Sentry for frontend and backend error tracking

---

## Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React | UI framework |
| Vite | Build tool and dev server |
| Tailwind CSS v4 | Styling |
| Zustand | State management |
| Axios | HTTP client |
| stream-chat-react | GetStream Chat UI SDK |
| React Router | Client-side routing |
| React Hot Toast | Toast notifications |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express | REST API server |
| MongoDB + Mongoose | Database |
| JSON Web Tokens | Authentication |
| bcrypt | Password hashing |
| cookie-parser | Cookie handling |
| GetStream Server SDK | Stream token generation |
| Sentry | Error monitoring |

---

## Project Structure

```
streamify/
├── backend/
│   ├── config/
│   │   ├── db.js               # MongoDB connection
│   │   └── env.js              # Environment config
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── chat.controller.js
│   │   └── channel.controller.js
│   ├── middleware/
│   │   └── auth.middleware.js  # JWT authentication
│   ├── models/
│   │   └── user.model.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── chat.routes.js
│   │   └── channel.routes.js
│   ├── lib/
│   │   └── stream.js           # GetStream client
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatHeader.jsx
│   │   │   ├── CustomMessage.jsx
│   │   │   ├── CustomInput.jsx
│   │   │   └── CreateChannelModal.jsx
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── SignInPage.jsx
│   │   │   └── SignUpPage.jsx
│   │   ├── store/
│   │   │   ├── useAuthStore.js
│   │   │   ├── useChatStore.js
│   │   │   └── useChannelStore.js
│   │   ├── lib/
│   │   │   └── axios.js
│   │   └── main.jsx
│   └── vite.config.js
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)
- [GetStream](https://getstream.io/) account — free tier works

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/streamify.git
cd streamify
```

### 2. Set up the backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
NODE_ENV=development
JWT_SECRET=your_jwt_secret
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret
SENTRY_DSN=your_sentry_dsn
```

Start the backend:

```bash
node server.js
```

### 3. Set up the frontend

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend/` directory:

```env
VITE_STREAM_API_KEY=your_stream_api_key
```

Start the frontend:

```bash
npm run dev
```

### 4. Open the app

```
http://localhost:5173
```

---

## How Authentication Works

1. User signs in → backend verifies credentials → JWT issued as an HTTP-only cookie
2. Every subsequent request sends the cookie automatically via the Vite proxy
3. Protected routes use the `authenticateToken` middleware to verify the JWT
4. On sign-out, the cookie is cleared and the GetStream client is disconnected

---

## How GetStream Integration Works

1. User logs in → frontend calls `/api/v1/chat/token`
2. Backend generates a Stream token using the user's MongoDB `_id`
3. Frontend connects to GetStream using `client.connectUser()` with the token
4. All messaging, channels, and video are handled by GetStream from there

---

## Environment Variables

| Variable | Location | Description |
|---|---|---|
| `PORT` | backend | Express server port |
| `MONGO_URI` | backend | MongoDB connection string |
| `NODE_ENV` | backend | `development` or `production` |
| `JWT_SECRET` | backend | Secret for signing JWTs |
| `STREAM_API_KEY` | backend + frontend | GetStream API key |
| `STREAM_API_SECRET` | backend | GetStream API secret (backend only) |
| `SENTRY_DSN` | backend + frontend | Sentry error tracking DSN |
| `VITE_STREAM_API_KEY` | frontend | GetStream API key exposed to Vite |

---

## Development Notes

- The Vite dev server proxies `/api` requests to `http://localhost:5001` — this keeps cookies on the same origin and avoids CORS issues
- JWT cookies use `sameSite: "lax"` in development (HTTP) and `sameSite: "none" + secure: true` in production (HTTPS)
- When accessing from another device on the same network, always use the machine's local IP (e.g. `192.168.x.x:5173`) — not `localhost`

---

## License

MIT
