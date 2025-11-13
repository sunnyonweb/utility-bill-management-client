# ⚡ BillManager Pro: MERN Stack Utility Bill Management System

[![Live Site URL](https://utility-bill-management-c718d.web.app/)]

---

## 🎯 Project Overview

**BillManager Pro** হলো একটি সুরক্ষিত MERN Stack অ্যাপ্লিকেশন, যা ব্যবহারকারীদের মাসিক ইউটিলিটি বিল (যেমন ইলেকট্রিসিটি, গ্যাস, পানি, ইন্টারনেট ইত্যাদি) সহজে দেখতে, ট্র্যাক করতে এবং পরিশোধ করতে সাহায্য করে। এই সিস্টেমটি দ্রুত নেভিগেশন, কঠোর নিরাপত্তা এবং ব্যবহারকারী-নির্দিষ্ট রিপোর্ট ডাউনলোডের সুবিধা দেয়।

## ✨ Key Features (অ্যাসাইনমেন্টের ৫টি বুলেট পয়েন্ট)

1.  **JWT-Secured Private Routes:** সকল স্পর্শকাতর রুট (`/my-bills`) কাস্টম **JWT (JSON Web Token)** দ্বারা সুরক্ষিত, যা Firebase Authentication এর মাধ্যমে সিঙ্ক্রোনাইজ করা হয়।
2.  **Current Month Payment Validation:** বিল পরিশোধ বাটনটি **স্বয়ংক্রিয়ভাবে নিষ্ক্রিয়** থাকে যদি বিলের তারিখ বর্তমান মাসের না হয়।
3.  **Dynamic PDF Report Generation:** লগইন করা ব্যবহারকারী তার **সম্পূর্ণ পরিশোধিত বিলের ইতিহাস (Total Bills Paid, Total Amount)** একটি কাস্টম PDF রিপোর্ট হিসেবে ডাউনলোড করতে পারে।
4.  **Unique & Responsive UI (Teal Aesthetic):** প্রজেক্টটি একটি আকর্ষণীয়, পরিষ্কার **Teal/Cyan** ডিজাইন অনুসরণ করে এবং সকল ডিভাইসের জন্য সম্পূর্ণভাবে প্রতিক্রিয়াশীল (Responsive)।
5.  **Robust Error Handling:** সকল CRUD অপারেশন এবং API কলগুলিতে ডিফল্ট অ্যালার্টের পরিবর্তে **Toast/SweetAlert** ব্যবহার করা হয়েছে।

---

## 🚀 Technologies Used

| Category            | Technology                      | Purpose                                                                    |
| :------------------ | :------------------------------ | :------------------------------------------------------------------------- |
| **Frontend**        | **React.js, React Router DOM**  | SPA development and dynamic routing.                                       |
| **Styling**         | **Tailwind CSS, DaisyUI**       | Unique, modern, and theme-compatible UI.                                   |
| **Backend**         | **Node.js, Express.js**         | Building RESTful API endpoints.                                            |
| **Database**        | **MongoDB Atlas**               | Flexible, scalable data storage (`bills`, `myBills`, `users` collections). |
| **Auth & Security** | **Firebase Auth, jsonwebtoken** | User authentication and token-based route protection.                      |
| **PDF Generation**  | **jsPDF, jspdf-autotable**      | ক্লায়েন্ট-সাইড PDF রিপোর্ট তৈরির জন্য।                                    |

---

## ⚙️ Setup and Run Locally

### Prerequisites

- Node.js (v18+)
- MongoDB Atlas Account
- Firebase Project

### Backend Setup (`/server`)

1.  Clone the repository and navigate to the `/server` directory.
2.  Install dependencies: `npm install`
3.  Create a `.env` file and add your secret keys:
    ```
    PORT=4000
    ACCESS_TOKEN_SECRET="YOUR_STRONG_RANDOM_JWT_SECRET"
    DATABASE_URI="YOUR_MONGODB_CONNECTION_STRING"
    ```
4.  Run the server (uses `dotenv/config` to load variables):
    ```bash
    npm run start
    # Or for development: npm run dev
    ```

### Frontend Setup (`/client`)

1.  Navigate to the `/client` directory.
2.  Install dependencies: `npm install`
3.  Ensure your Firebase configuration file (`firebase.config.js`) is correctly set up.
4.  Start the client application:
    ```bash
    npm run dev
    ```

The client application will typically open on `http://localhost:5173` and communicate with the server at `https://utility-bill-management-sable.vercel.app/`.
