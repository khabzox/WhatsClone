# 💬 WhatsClone | Chat App Clone

A modern Chat App clone built with Next.js and real-time messaging capabilities.

## 🚀 Tech Stack

![Next.js](https://img.shields.io/badge/Next.js-15.4.4-black?style=for-the-badge&logo=next.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socket.io)
![Clerk](https://img.shields.io/badge/Clerk-6C5CE7?style=for-the-badge&logo=clerk&logoColor=white)

### Frontend

- **Next.js 15.4.4** - React framework
- **Tailwind CSS v4** - Styling
- **shadcn/ui** - Component library
- **Zustand** - State management

### Backend & Database

- **Supabase** - PostgreSQL database with real-time features
- **Clerk** - Authentication

### Media & Utils

- **Cloudinary** - Media storage & optimization
- **React Dropzone** - File upload UI
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **date-fns** - Date formatting
- **Emoji Mart** - Emoji picker

## 🏗️ Implementation Roadmap

- [x] **Phase 1**: Basic chat UI with static data
- [ ] **Phase 2**: Supabase database + Clerk authentication
- [ ] **Phase 3**: Real-time messaging with Socket.io
- [ ] **Phase 4**: Media uploads (Cloudinary + Dropzone)
- [ ] **Phase 5**: Polish (emojis, date formatting, etc.)
- [ ] **Phase 6**: Advanced features (WebRTC voice/video calls)

## ✨ Features

- 💬 Real-time messaging
- 📱 Responsive design (mobile & desktop)
- 🖼️ Image & video sharing
- 😀 Emoji support
- 👥 Group chats
- ✅ Message status (sent, delivered, read)
- 🟢 Online status indicators
- 🔍 Message search
- 🌙 Dark/Light mode

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/khabzox/WhatsClone.git

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

⭐ **Star this repo if you found it helpful!**
