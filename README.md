# 📝 Full Stack Anonymous Feedback Application

This repository contains the code for a production-level, full-stack application designed to allow users to receive and manage anonymous messages or feedback. This project is built as part of a comprehensive course to teach modern, **freelance-ready** development practices using Next.js and the MERN stack.

---

## 💡 Project Overview

The application functions as an anonymous messaging platform, allowing any user to send feedback without revealing their identity. Registered users get a unique public URL to share, a dashboard to manage their received messages, and can toggle the acceptance of new feedback. The app demonstrates robust authentication, modern API practices, and unique features like AI integration.

---

## ✨ Key Application Features

* **Anonymous Message Submission:** The public page allows anyone to submit feedback to a registered user without logging in.
* **AI-Powered Message Suggestions:** Uses the **OpenAI (ChatGPT) API** to suggest message content on the public submission page.
* **Custom Authentication Flow:** Robust sign-up and sign-in functionality is implemented.
* **Email Verification:** A secure process where a **Six-Digit OTP** (One-Time Password) is sent via email (using Resend) to verify the user during sign-up.
* **User Dashboard:** A private area where registered users can copy their unique feedback link, view all received messages, and manage their settings.
* **Message Management:** Users can delete messages and toggle whether they are currently accepting anonymous feedback.

---

## 🛠️ Technology Stack

The project utilizes the MERN stack (MongoDB, Express, React, Node.js) architecture, powered by Next.js, and incorporates several modern development tools and libraries:

| Technology | Purpose |
| :--- | :--- |
| **Next.js** | Core full-stack framework for building both the complete back-end (API Routes) and front-end. |
| **MongoDB** | The database used for data storage, focusing on best practices for data modeling and design. |
| **NextAuth.js (Auth.js)** | Implemented for custom authentication, managing the complex sign-up and sign-in logic. |
| **Zod** | Utilized for **schema validation** (schema resolvers) to ensure data integrity and define data models. |
| **React Hook Forms** | Used for efficient and advanced **form management** and handling throughout the application. |
| **ShadCN** | A component library used for building a clean, modern **user interface** (UI). |
| **OpenAI API (ChatGPT)** | Integrated for the **AI message generation** feature. |
| **Resend** | The email service provider used to send the **verification OTP** during the sign-up process. |

---

## 🚀 Getting Started

This project is part of a free video series by the **Chai aur Code** channel. For full instructions on setup, installation, and step-by-step building of the application, please follow the complete course tutorial.

**Video URL:** [http://www.youtube.com/watch?v=OgS1ZWZItno](http://www.youtube.com/watch?v=OgS1ZWZItno)