# 📸 Pixora - Image Sharing Platform

Pixora is a comprehensive image sharing platform that combines the power of modern web technologies to create an engaging and feature-rich experience for photographers, artists, and content creators. Built with performance and user experience in mind, it offers a seamless way to share, discover, and interact with visual content.

![Website Screenshot](./frontend/public/images/screenshot.jpg)

## 🚀 Live Demo

Check out the live demo of the application [here](https://pixora-nry.vercel.app/).

### 🎯 Key Highlights

- **🚀 High Performance**: Built with Next.js 15 and optimized for speed
- **🎨 Beautiful UI**: Modern dark theme with responsive design
- **🔐 Secure**: JWT authentication with Google OAuth integration
- **📱 Mobile-First**: Fully responsive across all devices
- **☁️ Cloud-Ready**: Integrated with Cloudinary for image optimization
- **🔍 Advanced Search**: Smart search with filters and trending content
- **💬 Interactive**: Comments, likes, favorites, and social features

---

## 🌟 Features

### 🔐 Authentication & Security
- **Multi-Provider Login**: Email/password + Google OAuth
- **Email Verification**: Secure account activation
- **JWT Tokens**: Stateless authentication
- **Protected Routes**: Role-based access control
- **Password Security**: Bcrypt hashing with salt rounds

### 📸 Image Management
- **Drag & Drop Upload**: Intuitive file upload interface
- **Image Optimization**: Automatic compression and resizing
- **Multiple Formats**: Support for JPEG, PNG, WebP, GIF
- **Cloud Storage**: Cloudinary integration for CDN delivery
- **Bulk Operations**: Multiple image upload and management

### 🎨 User Experience
- **Dark Theme**: Eye-friendly interface with customizable themes
- **Responsive Design**: Perfect on desktop, tablet, and mobile
- **Masonry Layout**: Pinterest-style image grid
- **Infinite Scroll**: Seamless content loading
- **Keyboard Shortcuts**: Power user features

### 🔍 Discovery & Search
- **Smart Search**: Image search
- **Advanced Filters**: By category, date, popularity, tags
- **Trending Content**: Algorithm-based recommendations
- **Tag System**: Organized content categorization
- **Collections**: Curated image collections
- **User Profiles**: Detailed creator profiles

### 💬 Social Features
- **Like System**: Heart reactions with real-time updates
- **Comments**: Threaded discussions on images
- **Follow System**: Connect with favorite creators
- **Favorites**: Personal image collections
- **Sharing**: Social media integration
- **Notifications**: Real-time activity updates

### 📊 Analytics & Insights
- **User Dashboard**: Personal statistics and insights
- **Image Analytics**: Views, likes, shares tracking
- **Trending Analytics**: Popular content insights
- **User Growth**: Follower and engagement tracking

---

## 🛠️ Tech Stack

### Frontend Technologies
| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 15.2.4 | React framework with App Router |
| **React** | 18.2.0 | UI library with hooks |
| **TypeScript** | 5.0+ | Type-safe JavaScript |
| **Tailwind CSS** | 3.4+ | Utility-first CSS framework |
| **Framer Motion** | 10.16+ | Animation library |
| **NextAuth.js** | 4.24+ | Authentication solution |
| **React Hook Form** | 7.48+ | Form handling |
| **React Hot Toast** | 2.4+ | Notification system |
| **Lucide React** | 0.294+ | Icon library |

### Backend Technologies
| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | 18.17+ | JavaScript runtime |
| **Express.js** | 4.18+ | Web application framework |
| **MongoDB** | 7.0+ | NoSQL database |
| **Mongoose** | 8.0+ | MongoDB object modeling |
| **JWT** | 9.0+ | JSON Web Tokens |
| **Bcrypt** | 5.1+ | Password hashing |
| **Multer** | 1.4+ | File upload handling |
| **Cloudinary** | 1.41+ | Image management service |
| **Nodemailer** | 6.9+ | Email sending |

---

## 📁 Project Structure

```
Pixora/
├── 📁 frontend/                    # Next.js 15 Application
│   ├── 📁 src/
│   │   ├── 📁 app/                 # App Router (Next.js 15)
│   │   │   ├── 📁 (auth)/          # Authentication routes
│   │   │   │   ├── 📄 login/       # Login page
│   │   │   │   ├── 📄 register/    # Registration page
│   │   │   │   └── 📄 help/        # Help & support
│   │   │   ├── 📁 (protected)/     # Protected routes
│   │   │   │   ├── 📄 dashboard/   # User dashboard
│   │   │   │   ├── 📄 feed/        # Image feed
│   │   │   │   ├── 📄 upload-image/ # Image upload
│   │   │   │   ├── 📄 profile/     # User profiles
│   │   │   │   ├── 📄 collections/ # Image collections
│   │   │   │   ├── 📄 search/      # Search functionality
│   │   │   │   ├── 📄 settings/    # User settings
│   │   │   │   └── 📄 notifications/ # Notifications
│   │   │   ├── 📁 api/             # API routes
│   │   │   └── 📄 globals.css      # Global styles
│   │   ├── 📁 components/          # Reusable components
│   │   │   ├── 📁 ui/              # UI components
│   │   │   ├── 📁 layout/          # Layout components
│   │   │   ├── 📁 cards/           # Card components
│   │   │   └── 📁 features/        # Feature components
│   │   ├── 📁 context/             # React contexts
│   │   ├── 📁 hooks/               # Custom hooks
│   │   ├── 📁 lib/                 # Utility functions
│   │   └── 📁 utils/               # Helper utilities
│   ├── 📄 package.json
│   ├── 📄 next.config.mjs
│   ├── 📄 tailwind.config.js
│   └── 📄 tsconfig.json
│
├── 📁 backend/                     # Express.js API Server
│   ├── 📁 src/
│   │   ├── 📁 controllers/         # Route controllers
│   │   │   ├── 📄 user.controllers.js
│   │   │   ├── 📄 image.controllers.js
│   │   │   ├── 📄 collection.controllers.js
│   │   │   ├── 📄 comment.controllers.js
│   │   │   ├── 📄 like.controllers.js
│   │   │   ├── 📄 favorite.controllers.js
│   │   │   ├── 📄 follow.controllers.js
│   │   │   └── 📄 notification.controllers.js
│   │   ├── 📁 models/              # Database models
│   │   │   ├── 📄 user.model.js
│   │   │   ├── 📄 image.model.js
│   │   │   ├── 📄 collection.model.js
│   │   │   ├── 📄 comment.model.js
│   │   │   ├── 📄 like.model.js
│   │   │   ├── 📄 favorite.model.js
│   │   │   ├── 📄 follow.model.js
│   │   │   └── 📄 notification.model.js
│   │   ├── 📁 routes/              # API routes
│   │   │   ├── 📄 user.routes.js
│   │   │   ├── 📄 image.routes.js
│   │   │   ├── 📄 collection.routes.js
│   │   │   ├── 📄 comment.routes.js
│   │   │   ├── 📄 like.routes.js
│   │   │   ├── 📄 favorite.routes.js
│   │   │   ├── 📄 follow.routes.js
│   │   │   └── 📄 notification.routes.js
│   │   ├── 📁 middlewares/         # Custom middlewares
│   │   │   └── 📄 auth.middleware.js
│   │   ├── 📁 config/              # Configuration files
│   │   │   ├── 📄 cloudinary.js
│   │   │   └── 📄 multer.js
│   │   ├── 📁 utils/               # Utility functions
│   │   │   ├── 📄 ApiError.js
│   │   │   ├── 📄 ApiResponse.js
│   │   │   ├── 📄 asyncHandler.js
│   │   │   ├── 📄 ipGeolocation.js
│   │   │   └── 📄 userUpdates.js
│   │   ├── 📁 db/                  # Database connection
│   │   │   └── 📄 index.js
│   │   ├── 📄 app.js               # Express app configuration
│   │   ├── 📄 index.js             # Server entry point
│   │   └── 📄 constants.js         # Application constants
│   ├── 📄 package.json
│   └── 📄 .env.example
│
├── 📄 README.md                    # This file
├── 📄 .gitignore                   # Git ignore rules
└── 📄 LICENSE                      # MIT License
```

---

## 🚀 Live Demo

<div align="center">

### 🌐 [View Live Demo](https://pixora-nry.vercel.app/)

**Experience Pixora in action!**

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Visit_Now-00D4AA?style=for-the-badge&logo=vercel)](https://pixora-nry.vercel.app/)

</div>

---

## 🛠️ Installation

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 18.17.0 ([Download](https://nodejs.org/))
- **npm** >= 9.0.0 or **yarn** >= 1.22.0
- **MongoDB** >= 7.0 ([Download](https://mongodb.com/try/download/community) or use [MongoDB Atlas](https://cloud.mongodb.com/))
- **Git** ([Download](https://git-scm.com/))

### 🚀 Quick Start

#### 1. Clone the Repository

```bash
# Clone the repository
git clone https://github.com/rehmanNRY/Pixora.git

# Navigate to the project directory
cd Pixora
```

#### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Copy environment variables
cp env.example.txt .env

# Edit the .env file with your configuration
nano .env
```

**Backend Environment Variables:**

```env
MONGO_URI=

PORT=
JWT_SECRET=
NODE_ENV=
CORS_ORIGIN=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

#### 3. Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd ../frontend

# Install dependencies
npm install

# Copy environment variables
cp env.example.txt .env.local

# Edit the .env.local file with your configuration
nano .env.local
```

**Frontend Environment Variables:**

```env
NEXT_PUBLIC_BACKEND_API=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

NEXTAUTH_SECRET=
```

#### 4. Start the Application

**Terminal 1 - Backend Server:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend Development Server:**
```bash
cd frontend
npm run dev
```

### 🌐 Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

---

## 🔧 Advanced Configuration

### Database Configuration

#### MongoDB Atlas Setup

1. Create a [MongoDB Atlas](https://cloud.mongodb.com/) account
2. Create a new cluster
3. Create a database user
4. Whitelist your IP address
5. Get your connection string
6. Update `MONGO_URI` in your `.env` file

#### Local MongoDB Setup

```bash
# Install MongoDB (macOS with Homebrew)
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB service
brew services start mongodb/brew/mongodb-community

# Or start manually
mongod --config /usr/local/etc/mongod.conf
```

### Cloudinary Setup

1. Create a [Cloudinary](https://cloudinary.com/) account
2. Get your cloud name, API key, and API secret
3. Create an upload preset for unsigned uploads
4. Update your environment variables

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google`
   - `https://yourdomain.com/api/auth/callback/google`

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### 🐛 Bug Reports

1. Check existing [issues](https://github.com/rehmanNry/Pixora/issues)
2. Create a new issue with:
   - Clear description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots (if applicable)

### 💡 Feature Requests

1. Check existing [feature requests](https://github.com/rehmanNry/Pixora/issues?q=is%3Aissue+is%3Aopen+label%3Aenhancement)
2. Create a new issue with:
   - Feature description
   - Use case explanation
   - Mockups/wireframes (if applicable)

### 🔧 Code Contributions

1. **Fork the repository**
2. **Create a feature branch:**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes:**
   - Follow the coding standards
   - Add tests for new features
   - Update documentation
4. **Commit your changes:**
   ```bash
   git commit -m 'Add amazing feature'
   ```
5. **Push to your branch:**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### 📋 Development Guidelines

- **Code Style**: ESLint + Prettier configuration
- **Commits**: Conventional commit messages
- **Testing**: Write tests for new features
- **Documentation**: Update README and code comments
- **Performance**: Consider performance implications

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```

## 🙏 Acknowledgments

Special thanks to:

- **Next.js Team** for the amazing framework
- **Vercel** for hosting and deployment tools
- **MongoDB** for the database solution
- **Cloudinary** for image management
- **Tailwind CSS** for the utility-first CSS framework
- **All Contributors** who helped make this project better

---

<div align="center">

### 🌟 Made with ❤️ by [Kaluri Himabindhu]

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Hiomio)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/kaluri-himabindhu-9378b927a/)

---


</div>

