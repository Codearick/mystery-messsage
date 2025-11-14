# 📝 Full Stack Anonymous Feedback Application

This is a **production-level full-stack application** designed to allow users to receive, manage, and engage with anonymous messages or feedback. The project emphasizes robust features and modern development best practices.

-----

## 💡 Project Overview

The application provides a platform where any user can register, receive a unique public URL, and share it to collect confidential or anonymous feedback. The system includes a secure user dashboard for managing received messages, toggling message acceptance, and utilizing AI for message suggestions.

-----

## ✨ Key Application Features

  * **Anonymous Message Submission:** Allows users to send feedback to a registered user via a public URL without requiring login.
  * **AI-Powered Message Suggestions:** Integrates the **OpenAI (ChatGPT) API** to generate suggested messages on the public submission page.
  * **Custom User Authentication:** Secure and complex sign-up and sign-in flow implemented using industry standards.
  * **Email Verification:** A secure sign-up process requiring a **Six-Digit OTP** (One-Time Password) sent via email (using Resend) to verify the user's account.
  * **User Dashboard:** A private area for users to view, manage, and copy their unique feedback link.
  * **Message Management:** Functionality to delete messages and toggle the ability to accept new anonymous feedback.

-----

## 🛠️ Technology Stack

The project utilizes the MERN stack architecture, powered by Next.js, and incorporates several modern development tools and libraries:

| Technology | Purpose |
| :--- | :--- |
| **Next.js** | Core full-stack framework for building the entire application (back-end API Routes and front-end). |
| **MongoDB** | The database used for data storage and management. |
| **NextAuth.js (Auth.js)** | Used to implement the **custom authentication** logic and session management. |
| **Zod** | Utilized for **schema validation** (schema resolvers) to define and validate data structures. |
| **React Hook Forms** | Used for efficient and advanced **form management** and handling. |
| **ShadCN** | A component library used for building the **user interface** (UI) components. |
| **OpenAI API (ChatGPT)** | Integrated for the **AI message generation** feature. |
| **Resend** | The email service provider used to send the **verification OTP**. |

-----

## 💻 Installation and Setup

1.  Clone the repository:
    ```bash
    git clone [your-repository-url]
    ```
2.  Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```
3.  Set up environment variables (`.env` file) for MongoDB connection, Auth.js secrets, and OpenAI/Resend API keys.
4.  Run the application:
    ```bash
    npm run dev
    # or
    yarn dev
    ```