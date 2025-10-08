# WillBeeDone Frontend

This is the **frontend** of the WillBeeDone project – a service marketplace for finding local contractors.  
The frontend works with the **backend** via RESTful APIs and uses a MySQL database.

🌎 **Deployment:** [Live Demo](https://willbeedone.up.railway.app/)

---

## 📋 Features

- Display of offers (Ads)  
- Location selection  
- Price sorting (ascending and descending)  
- Keyword search  
- User registration, login, and password recovery  
- CRUD for **favorites**  
- CRUD for creating new offers  
- Image uploads and gallery support  

---

## 🛠️ Tech Stack

- **TypeScript** 5.7.2  
- **React** 19  
- **Vite**, **npm**  
- **React Router Dom** (routing)  
- **Axios** (HTTP client)  
- **Redux Toolkit + React Redux** (state management)  
- **Redux Slice Architecture** (structured state architecture)  
- **Context API** (data sharing between components)  
- **Formik** (forms and validation)  
- **Yup** (declarative validation schema)  
- **Validator** (data validation)  
- **DOMPurify** (sanitize HTML)  
- **CKEditor 5** (WYSIWYG editor)  
- **CSS Modules** (component-scoped styles)  

## 🔒 Security

Input validation with Yup, Validator, and DOMPurify
Forms handled securely via Formik
Secure communication with backend via JWT token

## ✅ Notes

This frontend is designed to work with the WillBeeDone Backend.
Supports all CRUD operations and favorites management.
Responsive design with state management via Redux Toolkit and Context API.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+  
- npm 9+  

### Installation
```bash
git clone https://github.com/LutsDM/willbeedone-frontend.git
cd willbeedone-frontend
npm install
npm run dev
