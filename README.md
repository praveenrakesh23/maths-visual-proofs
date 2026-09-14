I'll help you understand the project requirements. Let me explore the project structure and files to get a comprehensive understanding.   

Read 

Read 

Read 

Read , lines 1 to 100

Read 

Read 

Perfect! Now I understand this project. Let me create a comprehensive requirements document for you:

## 📊 **Maths Universe — Interactive Visual Proofs**

---

### **🎯 Core Requirements**

#### **1. Content & Functionality**
- **32 Interactive Lessons** covering mathematical proofs and animated geometry concepts
- Each lesson includes:
  - Interactive visual demonstrations
  - Step-by-step exploration guides
  - Geometric animations
  - Mathematical explanations

#### **2. Technology Stack**
- **Frontend Framework**: React 19 + TypeScript
- **Build Tool**: Vite 6 (multi-page HTML setup for 32 lessons)
- **Styling**: Tailwind CSS 4
- **Runtime**: Node.js
- **Additional Libraries**: 
  - Motion (for animations)
  - Lucide React (icons)
  - Express.js (backend support)

#### **3. Architecture**
- **Multi-Page Setup**: 32 separate `.html` lesson files (lesson-01.html to `lesson-32.html`) + `index.html`
- **Sidebar Navigation**: Left sidebar (230px) with lesson navigation
- **Component Structure**: React components in `src` directory
- **Dynamic Rendering**: Scripts for generating lesson content (`generate_all.js`, renderers, etc.)

#### **4. Key Features**
- 🎨 **Interactive Canvas**: SVG-based geometric visualizations
- 🎬 **Animations**: Motion library for step-by-step proofs
- 🌍 **Multilingual Support**: Scripts for multilingual AI agent (`multilingual_agent.js`)
- 🎓 **Pedagogical Design**: Student pedagogy framework for learning optimization
- 🔊 **Microphone Permission**: Required for potential audio features

#### **5. Development Environment**
- **Dev Server**: Runs on port 3000 with hot module reloading
- **Configuration**:
  - `.env.local` required with `GEMINI_API_KEY`
  - TypeScript strict mode enabled
  - Path alias: `@` points to root directory

#### **6. Build & Deployment**
- **Development**: `npm run dev` → http://localhost:3000
- **Production**: `npm run build` → creates optimized dist folder
- **AI Studio Integration**: App deployed/viewable in Google AI Studio

---

### **📋 Project Files Structure**
```
📁 Lessons:           32 HTML lesson files (lesson-01 to lesson-32)
📁 Scripts:           Content generation & rendering utilities
📁 src/:              React components & styling
   ├─ App.tsx        Main React entry point
   ├─ main.tsx       Vite app initialization
   └─ index.css      Global styles
🔧 Configuration:     package.json, vite.config.ts, tsconfig.json
📝 Metadata:          metadata.json (project info)
```

---

### **✅ Current Status**
✓ Server running on port 3000  
✓ Dependencies installed  
✓ Ready for development/customization

