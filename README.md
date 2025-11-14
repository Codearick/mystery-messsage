# 🎭 Mystery Message — Anonymous Feedback Platform

**Mystery Message** is a production-ready full-stack platform that enables users to receive, manage, and engage with anonymous messages.
Designed with strong security, clean UI, and modern full-stack practices, it provides a seamless way to collect honest feedback without revealing identities.

---

## 🌟 Overview

Mystery Message gives every registered user a **unique public URL** that can be shared anywhere — social media, emails, portfolios, or resumes.
Anyone can send anonymous feedback through this link, while the user manages everything from a private, secure dashboard.

The platform also incorporates **AI-powered message suggestions**, making message submission more interactive and engaging.

---

## ✨ Features

### 🔐 Authentication & Security

* Custom-built authentication with **NextAuth (Auth.js)**.
* **Email-based OTP verification** using a Six-Digit code sent via **Resend**.
* Secure session handling and protected dashboard pages.

### 📨 Anonymous Feedback Collection

* Public route for sending messages — **no login required**.
* Users can **toggle acceptance** of new anonymous messages.
* Ability to **delete messages** individually from the dashboard.
* Real-time UI updates for smooth management.

### 🤖 AI-Assisted Messaging

* Integrates **OpenAI (ChatGPT)** to provide message suggestions.
* Helps users submit more thoughtful and engaging feedback.

### 🧩 User Dashboard

* Personalized and protected dashboard.
* Displays all received messages.
* Shows and allows copying of the user's unique **Mystery Message link**.
* Clean, accessible UI built using **ShadCN components**.

---

## 🛠️ Tech Stack

| Technology             | Purpose                                         |
| ---------------------- | ----------------------------------------------- |
| **Next.js**            | Full-stack framework (API + frontend).          |
| **MongoDB**            | Primary database for users, OTPs, and messages. |
| **NextAuth (Auth.js)** | Authentication and session management.          |
| **Zod**                | Validation for forms, payloads, and APIs.       |
| **React Hook Form**    | Efficient form handling and validation.         |
| **ShadCN UI**          | UI components for dashboards and forms.         |
| **OpenAI API**         | AI message suggestions.                         |
| **Resend**             | OTP email delivery.                             |

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone [your-repository-url]
cd mystery-message
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Set environment variables

Create a `.env` file and include:

```
MONGODB_URI=
AUTH_SECRET=
NEXTAUTH_URL=

RESEND_API_KEY=

OPENAI_API_KEY=
OPENAI_MODEL=

EMAIL_FROM=
```

---

## ▶️ Development

```bash
npm run dev
```

---

## 📦 Production Build

```bash
npm run build
npm start
```

---

# 📁 Placeholder Sections

*(You can fill these out whenever you're ready.)*

---

## 📸 Screenshots / UI Preview

*Add screenshots here.*

---

## 🔀 API Routes Documentation

*Add API endpoint descriptions here.*

---

## 📂 Folder Structure

*Add folder hierarchy and explanation here.*

---

## 🧪 Testing Instructions

*Add test setup, scripts, and examples here.*

---

## 🚀 Deployment Guide

*Add steps for Vercel / Docker / Render / Railway here.*

---

## 📝 License



