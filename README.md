# 🚀 NextGen Job Portal

A modern, full-stack job portal application built with **Next.js 16**, **TypeScript**, and **MongoDB**. This platform enables seamless job discovery, application management, and employer-candidate interactions with enterprise-grade security and role-based access control.

---

## ✨ Features

### 🔐 Authentication & Authorization
- Secure user registration and login with **bcrypt** password hashing
- **JWT-based authentication** with HTTP-only cookies
- Role-based access control (Job Seeker, Employer, Admin)
- Protected API routes and middleware

### 💼 Job Management
- **Employers** can create, update, and delete job postings
- Advanced job search and filtering
- Job details with company information
- Real-time job status updates

### 📝 Application System
- Job seekers can apply to multiple jobs
- Application tracking and status management
- Employers can view and manage applications
- Application history for job seekers

### 👥 User Management
- User profile management
- Role-based dashboards
- Employer can view applicants for their jobs
- Admin panel for system oversight

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first styling

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM

### Authentication & Security
- **JWT (jsonwebtoken)** - Token-based authentication
- **bcryptjs** - Password hashing
- **HTTP-only cookies** - Secure token storage

### Development Tools
- **ESLint** - Code linting
- **TypeScript** - Static type checking
- **ts-node** - TypeScript execution

---

## 📁 Project Structure

```
job-portal/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── api/                  # API Routes
│   │   │   ├── auth/             # Authentication endpoints
│   │   │   │   ├── login/
│   │   │   │   ├── register/
│   │   │   │   ├── me/
│   │   │   │   └── logout/
│   │   │   ├── jobs/             # Job management
│   │   │   │   └── [id]/
│   │   │   ├── apply/            # Job applications
│   │   │   │   └── my/
│   │   │   └── employer/         # Employer-specific routes
│   │   │       ├── jobs/
│   │   │       ├── applications/
│   │   │       └── users/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── Components/               # Reusable React components
│   ├── libs/                     # Utility libraries
│   │   ├── auth.ts               # Authentication utilities
│   │   └── dbConnect.ts          # MongoDB connection
│   ├── models/                   # Mongoose schemas
│   │   ├── User.ts
│   │   ├── Job.ts
│   │   └── Application.ts
│   ├── styles/                   # Additional styles
│   └── utils/                    # Helper functions
├── public/                       # Static assets
├── .env.local                    # Environment variables (not in repo)
├── next.config.ts
├── tsconfig.json
├── tailwind.config.ts
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+ and npm/yarn/pnpm
- **MongoDB** database (local or MongoDB Atlas)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Samiurrehman-dev/NextGen-Job-portal.git
   cd NextGen-Job-portal/job-portal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/jobportal?retryWrites=true&w=majority
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - User logout

### Jobs
- `GET /api/jobs` - Get all jobs
- `GET /api/jobs/[id]` - Get job by ID
- `POST /api/jobs` - Create new job (Employer/Admin)
- `PUT /api/jobs/[id]` - Update job (Employer/Admin)
- `DELETE /api/jobs/[id]` - Delete job (Employer/Admin)

### Applications
- `POST /api/apply` - Apply to a job
- `GET /api/apply/my` - Get user's applications

### Employer
- `GET /api/employer/jobs` - Get employer's jobs
- `GET /api/employer/applications/[jobId]` - Get applications for a job
- `PUT /api/employer/applications/[applicationId]` - Update application status
- `GET /api/employer/users/[jobId]` - Get applicants for a job

---

## 🔒 Security Features

- **Password Hashing** - Passwords encrypted with bcrypt (10 rounds)
- **JWT Tokens** - Secure authentication with 7-day expiry
- **HTTP-only Cookies** - Prevents XSS attacks
- **Role-based Access** - Granular permission system
- **Input Validation** - Request body validation
- **Environment Variables** - Sensitive data protection

---

## 🧪 Development

### Running TypeScript Files
```bash
npx ts-node src/libs/dbConnect.ts
```

### Linting
```bash
npm run lint
```

### Build for Production
```bash
npm run build
npm start
```

---

## 🌐 Deployment

### Deploy on Vercel (Recommended)
1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy

### Environment Variables for Production
- `MONGODB_URI` - Production MongoDB connection string
- `JWT_SECRET` - Strong random secret key
- `NODE_ENV=production`

---

## 📚 Database Models

### User Schema
- name, email, password (hashed)
- role: `jobseeker` | `employer` | `admin`
- timestamps

### Job Schema
- title, description, company, location
- salary, jobType, requirements
- createdBy (User reference)
- timestamps

### Application Schema
- job (Job reference)
- applicant (User reference)
- status: `pending` | `reviewed` | `accepted` | `rejected`
- coverLetter
- timestamps

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Samiur Rehman**
- GitHub: [@Samiurrehman-dev](https://github.com/Samiurrehman-dev)
- Repository: [NextGen-Job-portal](https://github.com/Samiurrehman-dev/NextGen-Job-portal)

---

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Mongoose ODM](https://mongoosejs.com)

---

**⭐ If you find this project helpful, please give it a star!**
