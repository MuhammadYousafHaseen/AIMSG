# AIMSG - Anonymous AI-Powered Messaging Platform

AIMSG is a full-stack web application built using **Next.js** that enables anonymous messaging with **AI-generated message suggestions**. It leverages **OpenAI's GPT-4o** model to generate engaging questions, ensuring a seamless and interactive user experience. The project follows **best coding practices**, integrating **Next.js App Router, MongoDB, Axios, and Tailwind CSS** for an optimized, secure, and responsive UI.

---

## 🚀 Features

✅ **AI-Powered Messaging:** Get dynamic AI-generated message suggestions using OpenAI's GPT-4o.  
✅ **Anonymous Messaging:** Users can send messages anonymously to others.  
✅ **Real-Time Streaming:** AI-generated responses are streamed in real-time for instant feedback.  
✅ **Dark Mode & Responsive UI:** Built with **Tailwind CSS**, ensuring a modern, fully responsive design.  
✅ **Secure Authentication:** NextAuth integration for seamless authentication.  
✅ **Database with MongoDB:** Uses Mongoose for efficient data storage.  
✅ **Optimized API Routes:** Next.js **App Router** with structured API endpoints for better performance.  
✅ **Error Handling & Logging:** Robust error handling for a smooth user experience.  

---

## 🛠️ Technologies Used

- **Frontend:** Next.js (App Router), React, TypeScript  
- **Backend:** Next.js API Routes, OpenAI API  
- **Database:** MongoDB with Mongoose  
- **Styling:** Tailwind CSS, Dark Mode support  
- **State Management:** React Hooks  
- **Validation:** Zod, React Hook Form  
- **Networking:** Axios for API calls  
- **Authentication:** NextAuth  

---

## 📂 Folder Structure

```
AIMSG/
├── public/                # Static assets (images, fonts, etc.)
├── src/
│   ├── app/               # Next.js App Router (pages, layouts, API routes)
│   │   ├── api/           # Backend API routes (e.g., send-message, accept-message)
│   ├── components/        # Reusable UI components (Button, Form, Input, Card, etc.)
│   ├── hooks/             # Custom React hooks (e.g., use-toast)
│   ├── lib/               # Utility functions (e.g., dbConnect)
│   ├── model/             # Mongoose models (e.g., UserModel)
│   ├── schemas/           # Zod schemas for form validation
│   ├── types/             # TypeScript types (e.g., ApiResponse)
├── .env.local             # Environment variables (not committed)
├── next.config.ts         # Next.js configuration
├── package.json           # Project configuration and scripts
├── README.md              # This file
└── tsconfig.json          # TypeScript configuration
```

---

## 🛋️ Dependencies

### Main Dependencies

```json
"dependencies": {
  "@ai-sdk/openai": "^1.0.0",
  "@hookform/resolvers": "^3.6.7",
  "@next-auth/react": "^4.22.1",
  "ai": "^2.2.0",
  "axios": "^1.6.7",
  "mongodb": "^6.0.0",
  "mongoose": "^7.6.5",
  "next": "14.0.0",
  "next-auth": "^4.22.1",
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-hook-form": "^7.46.3",
  "zod": "^3.21.4"
}
```

### Dev Dependencies

```json
"devDependencies": {
  "@types/node": "^20.11.21",
  "@types/react": "^18.2.54",
  "eslint": "8.35.0",
  "eslint-config-next": "14.0.0",
  "typescript": "^5.4.0"
}
```

---

## 🔐 Environment Variables

Create a `.env.local` file in the root of your project and add the following:

```env
# OpenAI API Key for AI functionalities
OPENAI_API_KEY=your_openai_api_key_here

# MongoDB Connection URI
MONGODB_URI=your_mongodb_connection_string_here

# NextAuth Secret Key
NEXTAUTH_SECRET=your_nextauth_secret_here
```

---

## 🚀 Installation & Setup

1. **Clone the Repository:**  
```bash
git clone https://github.com/MuhammadYousafHaseen/AIMSG.git
cd AIMSG
```

2. **Install Dependencies:**  
Using npm:  
```bash
npm install
```
Or using yarn:  
```bash
yarn install
```

3. **Run the Development Server:**  
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 💪 Contributing

Contributions are welcome! Follow these steps to contribute:

1. **Fork the Repository**  
2. **Create a Branch** (`git checkout -b feature-branch`)  
3. **Make Your Changes** and **Commit** (`git commit -m "Add new feature"`)  
4. **Push to Your Branch** (`git push origin feature-branch`)  
5. **Create a Pull Request** 🚀  

Ensure your code follows the **existing coding style** and **includes comments** where necessary.

---

## 👨‍💻 Developer

**Muhammad Yousaf Haseen**  
🚀 GitHub: [MuhammadYousafHaseen](https://github.com/MuhammadYousafHaseen)  
🌐 Portfolio / Contact: [aimsgedu.online](https://aimsgedu.online)  

---

## 🐝 License

This project is licensed under the **MIT License**. Feel free to modify and distribute it as per the license terms.

---

🎉 **Enjoy Coding!** If you like this project, don't forget to ⭐ star the repository! 🚀

