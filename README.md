# 📸 Snapora - Next-Gen Image Sharing Platform

<div align="center">

![Snapora Banner](https://via.placeholder.com/1200x300/0f172a/00D4AA?text=SNAPORA+-+Share+Your+Vision)

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Visit_Now-00D4AA?style=for-the-badge&logo=vercel&logoColor=white)](https://snapora-frontend.vercel.app/)
[![GitHub Repo](https://img.shields.io/badge/📦_GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Hiomio/Snapora)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

**A modern, feature-rich platform for photographers, artists, and content creators to share and discover stunning visual content.**

[🎯 Features](#-features) • [🛠️ Tech Stack](#️-tech-stack) • [🚀 Quick Start](#-quick-start) • [📖 Documentation](#-project-structure) • [🤝 Contributing](#-contributing)

</div>

---

## ✨ Why Snapora?

<table>
<tr>
<td width="33%" align="center">
<img src="https://img.icons8.com/fluency/96/000000/lightning-bolt.png" width="64"/>
<h3>⚡ Lightning Fast</h3>
<p>Built with Next.js 15 & optimized for peak performance</p>
</td>
<td width="33%" align="center">
<img src="https://img.icons8.com/fluency/96/000000/security-checked.png" width="64"/>
<h3>🔐 Secure & Reliable</h3>
<p>JWT authentication with Google OAuth integration</p>
</td>
<td width="33%" align="center">
<img src="https://img.icons8.com/fluency/96/000000/like.png" width="64"/>
<h3>💬 Fully Interactive</h3>
<p>Comments, likes, follows, and real-time notifications</p>
</td>
</tr>
</table>

---

## 🎯 Features

### 🔐 **Authentication & Security**

```mermaid
graph LR
    A[User] -->|Email/Password| B[JWT Auth]
    A -->|Google OAuth| B
    B --> C[Email Verification]
    C --> D[Secure Access]
    style B fill:#00D4AA
    style D fill:#22c55e
```

- ✅ Multi-provider login (Email + Google OAuth)
- ✅ Email verification for secure activation
- ✅ JWT stateless authentication
- ✅ Role-based access control
- ✅ Bcrypt password hashing

### 📸 **Image Management**

<details>
<summary><b>🖼️ Advanced Image Features</b> (click to expand)</summary>

- 🎨 **Drag & Drop Upload** - Intuitive file upload interface
- ⚡ **Auto Optimization** - Automatic compression & resizing
- 🌈 **Format Support** - JPEG, PNG, WebP, GIF
- ☁️ **Cloud Storage** - Cloudinary CDN integration
- 📦 **Bulk Operations** - Upload multiple images at once
- 🏷️ **Smart Tagging** - Organized categorization system

</details>

### 🎨 **User Experience**

| Feature | Description |
|---------|-------------|
| 🌙 **Dark Theme** | Eye-friendly interface with modern aesthetics |
| 📱 **Responsive Design** | Perfect on desktop, tablet & mobile |
| 🧱 **Masonry Layout** | Pinterest-style image grid |
| ♾️ **Infinite Scroll** | Seamless content loading |
| ⌨️ **Keyboard Shortcuts** | Power user productivity features |

### 🔍 **Discovery & Exploration**

```
┌─────────────────────────────────────────┐
│  🔍 Smart Search Engine                 │
├─────────────────────────────────────────┤
│  ├─ 🏷️  Tag-based filtering            │
│  ├─ 📅  Date range selection            │
│  ├─ 🔥  Trending content                │
│  ├─ 👤  Creator profiles                │
│  └─ 📊  Popularity sorting              │
└─────────────────────────────────────────┘
```

### 💬 **Social Features**

<table>
<tr>
<td>❤️ <b>Like System</b><br/>Heart reactions with real-time updates</td>
<td>💭 <b>Comments</b><br/>Threaded discussions on images</td>
<td>👥 <b>Follow System</b><br/>Connect with creators</td>
</tr>
<tr>
<td>⭐ <b>Favorites</b><br/>Personal image collections</td>
<td>🔔 <b>Notifications</b><br/>Real-time activity updates</td>
<td>🔗 <b>Sharing</b><br/>Social media integration</td>
</tr>
</table>

### 📊 **Analytics Dashboard**

<div align="center">

```
╔════════════════════════════════════════╗
║     📈 User Dashboard Analytics        ║
╠════════════════════════════════════════╣
║  • Image Views & Engagement Tracking  ║
║  • Follower Growth Insights           ║
║  • Popular Content Analysis           ║
║  • Trending Topic Detection           ║
╚════════════════════════════════════════╝
```

</div>

---

## 🛠️ Tech Stack

<div align="center">

### Frontend Arsenal

[![Next.js](https://img.shields.io/badge/Next.js_15-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React_18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

### Backend Powerhouse

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white)](https://jwt.io/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)](https://cloudinary.com/)

</div>

<details>
<summary><b>📋 Detailed Technology Breakdown</b></summary>

#### Frontend Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 15.2.4 | React framework with App Router |
| React | 18.2.0 | UI library with hooks |
| TypeScript | 5.0+ | Type-safe JavaScript |
| Tailwind CSS | 3.4+ | Utility-first CSS framework |
| Framer Motion | 10.16+ | Animation library |
| NextAuth.js | 4.24+ | Authentication solution |
| React Hook Form | 7.48+ | Form handling |
| React Hot Toast | 2.4+ | Notification system |
| Lucide React | 0.294+ | Icon library |

#### Backend Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 18.17+ | JavaScript runtime |
| Express.js | 4.18+ | Web framework |
| MongoDB | 7.0+ | NoSQL database |
| Mongoose | 8.0+ | MongoDB ODM |
| JWT | 9.0+ | Token authentication |
| Bcrypt | 5.1+ | Password hashing |
| Multer | 1.4+ | File upload handling |
| Cloudinary | 1.41+ | Image management |
| Nodemailer | 6.9+ | Email service |

</details>

---

## 📁 Project Structure

<details>
<summary><b>🗂️ Complete Directory Tree</b> (click to expand)</summary>

```
Snapora/
├── 📂 frontend/                    # Next.js 15 Application
│   ├── 📂 src/
│   │   ├── 📂 app/                 # App Router
│   │   │   ├── 📂 (auth)/          # 🔐 Authentication routes
│   │   │   │   ├── login/          # Login page
│   │   │   │   ├── register/       # Registration page
│   │   │   │   └── help/           # Support page
│   │   │   ├── 📂 (protected)/     # 🔒 Protected routes
│   │   │   │   ├── dashboard/      # User dashboard
│   │   │   │   ├── feed/           # Image feed
│   │   │   │   ├── upload-image/   # Upload interface
│   │   │   │   ├── profile/        # User profiles
│   │   │   │   ├── collections/    # Collections
│   │   │   │   ├── search/         # Search page
│   │   │   │   ├── settings/       # Settings panel
│   │   │   │   └── notifications/  # Notifications
│   │   │   ├── 📂 api/             # API routes
│   │   │   └── globals.css         # Global styles
│   │   ├── 📂 components/          # Reusable components
│   │   │   ├── ui/                 # UI components
│   │   │   ├── layout/             # Layout components
│   │   │   ├── cards/              # Card components
│   │   │   └── features/           # Feature components
│   │   ├── 📂 context/             # React contexts
│   │   ├── 📂 hooks/               # Custom hooks
│   │   ├── 📂 lib/                 # Utility functions
│   │   └── 📂 utils/               # Helpers
│   └── 📄 Configuration files...
│
├── 📂 backend/                     # Express.js API Server
│   ├── 📂 src/
│   │   ├── 📂 controllers/         # Route controllers
│   │   ├── 📂 models/              # Database models
│   │   ├── 📂 routes/              # API routes
│   │   ├── 📂 middlewares/         # Custom middlewares
│   │   ├── 📂 config/              # Configuration
│   │   ├── 📂 utils/               # Utilities
│   │   ├── 📂 db/                  # Database connection
│   │   └── 📄 Entry points...
│   └── 📄 Configuration files...
│
└── 📄 Documentation files...
```

</details>

---

## 🚀 Quick Start

### Prerequisites

<div align="center">

| Requirement | Version | Download Link |
|------------|---------|---------------|
| ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white) | ≥ 18.17.0 | [Download](https://nodejs.org/) |
| ![npm](https://img.shields.io/badge/npm-CB3837?style=flat&logo=npm&logoColor=white) | ≥ 9.0.0 | Included with Node.js |
| ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white) | ≥ 7.0 | [Download](https://mongodb.com/try/download/community) |
| ![Git](https://img.shields.io/badge/Git-F05032?style=flat&logo=git&logoColor=white) | Latest | [Download](https://git-scm.com/) |

</div>

### Installation Steps

#### 1️⃣ Clone the Repository

```bash
# Clone using HTTPS
git clone https://github.com/Hiomio/Snapora.git

# Or using SSH
git clone git@github.com:Hiomio/Snapora.git

# Navigate to project
cd Snapora
```

#### 2️⃣ Backend Configuration

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Setup environment variables
cp env.example.txt .env

# Edit configuration (use your preferred editor)
nano .env
```

<details>
<summary><b>⚙️ Backend Environment Variables</b></summary>

```env
# Database
MONGO_URI=mongodb://localhost:27017/snapora

# Server Configuration
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000

# Authentication
JWT_SECRET=your_super_secret_jwt_key_here

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

</details>

#### 3️⃣ Frontend Configuration

```bash
# Navigate to frontend (from project root)
cd ../frontend

# Install dependencies
npm install

# Setup environment variables
cp env.example.txt .env.local

# Edit configuration
nano .env.local
```

<details>
<summary><b>⚙️ Frontend Environment Variables</b></summary>

```env
# API Configuration
NEXT_PUBLIC_BACKEND_API=http://localhost:5000

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# NextAuth
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

</details>

#### 4️⃣ Launch the Application

Open two terminal windows:

**Terminal 1 - Backend Server:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend Server:**
```bash
cd frontend
npm run dev
```

<div align="center">

### 🎉 Success! Access Your Application

[![Frontend](https://img.shields.io/badge/Frontend-http://localhost:3000-00D4AA?style=for-the-badge&logo=vercel)](http://localhost:3000)
[![Backend API](https://img.shields.io/badge/Backend_API-http://localhost:5000-FF6B6B?style=for-the-badge&logo=node.js)](http://localhost:5000)

</div>

---

## 🔧 Advanced Configuration

### 🍃 MongoDB Setup

<details>
<summary><b>MongoDB Atlas (Cloud)</b></summary>

1. Create account at [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create a new cluster (Free tier available)
3. Create database user with password
4. Whitelist your IP address (or use `0.0.0.0/0` for development)
5. Get connection string from "Connect" button
6. Update `MONGO_URI` in your `.env` file

**Example Connection String:**
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/snapora?retryWrites=true&w=majority
```

</details>

<details>
<summary><b>Local MongoDB Installation</b></summary>

**macOS (using Homebrew):**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb/brew/mongodb-community
```

**Ubuntu/Debian:**
```bash
sudo apt-get install mongodb
sudo systemctl start mongodb
sudo systemctl enable mongodb
```

**Windows:**
Download installer from [MongoDB Download Center](https://www.mongodb.com/try/download/community)

</details>

### ☁️ Cloudinary Configuration

1. Sign up at [Cloudinary](https://cloudinary.com/)
2. Navigate to Dashboard
3. Copy your **Cloud Name**, **API Key**, and **API Secret**
4. Create an upload preset:
   - Go to Settings → Upload
   - Click "Add upload preset"
   - Set signing mode to "Unsigned"
   - Note the preset name
5. Update environment variables

### 🔐 Google OAuth Setup

1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Create new project or select existing
3. Enable **Google+ API**
4. Navigate to Credentials → Create Credentials → OAuth 2.0 Client ID
5. Add authorized redirect URIs:
   ```
   http://localhost:3000/api/auth/callback/google
   https://yourdomain.com/api/auth/callback/google
   ```
6. Copy Client ID and Client Secret
7. Update environment variables

---

## 🤝 Contributing

We ❤️ contributions! Here's how you can help make Snapora even better:

### 🐛 Report Bugs

Found a bug? Please check [existing issues](https://github.com/Hiomio/Snapora/issues) first, then create a new one with:

- **Clear title** and description
- **Steps to reproduce** the issue
- **Expected** vs **actual** behavior
- **Screenshots** or GIFs if applicable
- Your **environment** (OS, browser, Node version)

### 💡 Suggest Features

Have an idea? We'd love to hear it! Create a [feature request](https://github.com/Hiomio/Snapora/issues/new) with:

- **Clear description** of the feature
- **Use case** explanation
- **Mockups** or wireframes (if applicable)
- **Impact** on user experience

### 🔧 Submit Code

1. **Fork** the repository
2. **Create** a feature branch:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Code** your changes
4. **Test** thoroughly
5. **Commit** with conventional commits:
   ```bash
   git commit -m 'feat: add amazing feature'
   ```
6. **Push** to your fork:
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open** a Pull Request

### 📋 Development Guidelines

- ✅ Follow ESLint + Prettier configuration
- ✅ Write meaningful commit messages
- ✅ Add tests for new features
- ✅ Update documentation
- ✅ Ensure all tests pass

---

## 📄 License

<div align="center">

This project is licensed under the **MIT License**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

See the [LICENSE](LICENSE) file for details.

</div>

---

## 🙏 Acknowledgments

<div align="center">

Special thanks to these amazing technologies and their communities:

| Technology | Contribution |
|------------|--------------|
| **Next.js Team** | Amazing React framework |
| **Vercel** | Hosting & deployment platform |
| **MongoDB** | Powerful database solution |
| **Cloudinary** | Image management service |
| **Tailwind CSS** | Utility-first CSS framework |
| **All Contributors** | Making this project better every day |

</div>

---

<div align="center">

## 💫 Built With Passion

### 👩‍💻 Created by **Kaluri Himabindhu**

[![Portfolio](https://img.shields.io/badge/Portfolio-000000?style=for-the-badge&logo=About.me&logoColor=white)](https://your-portfolio.com)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Hiomio)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/kaluri-himabindhu-9378b927a/)
[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/yourusername)

---

### ⭐ Star this repository if you find it helpful!

[![GitHub stars](https://img.shields.io/github/stars/Hiomio/Snapora?style=social)](https://github.com/Hiomio/Snapora/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/Hiomio/Snapora?style=social)](https://github.com/Hiomio/Snapora/network/members)
[![GitHub watchers](https://img.shields.io/github/watchers/Hiomio/Snapora?style=social)](https://github.com/Hiomio/Snapora/watchers)

---

**Made with ❤️ and lots of ☕**

*© 2026 Snapora. All rights reserved.*

</div>

