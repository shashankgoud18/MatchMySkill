# MatchMySkill - AI Resume Gap Analyzer

## Overview
MatchMySkill is an advanced AI-powered resume analysis tool that helps job seekers optimize their resumes by comparing them against specific job descriptions. Using cutting-edge AI technology, it provides detailed insights, recommendations, and gap analysis to improve job application success rates.

## Features 🚀

- **Smart Resume Upload**
  - Support for multiple file formats (PDF, DOCX, TXT)
  - Intelligent text extraction and processing
  - Drag-and-drop interface

- **AI-Powered Analysis**
  - Advanced skill gap identification
  - Keyword matching and optimization
  - Industry alignment assessment
  - Personalized recommendations

- **Comprehensive Reports**
  - Match score calculation
  - Detailed skill analysis
  - Interactive visualization
  - Downloadable PDF reports

## Tech Stack 💻

- **Frontend:**
  - React.js
  - Tailwind CSS
  - Lucide Icons
  - HTML2PDF.js

- **Backend:**
  - Node.js
  - Express
  - Multer
  - Cloudinary

- **AI/ML:**
  - Google Gemini AI
  - OpenAI Integration (Optional)

## Getting Started 🏁

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Google Gemini API key (https://makersuite.google.com/app/apikey)
- Cloudinary account (https://cloudinary.com)

### Local Development

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/resume-gap-analyzer.git
cd resume-gap-analyzer
```

2. **Install dependencies**
```bash
# Frontend
cd Frontend
npm install

# Backend (in another terminal)
cd Backend
npm install
```

3. **Environment Setup**
```bash
# Frontend/.env
REACT_APP_GEMINI_API_KEY=your_gemini_api_key_here
REACT_APP_BACKEND_URL=http://localhost:10000

# Backend/.env
NODE_ENV=development
PORT=10000
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
FRONTEND_URL=http://localhost:3000
```

4. **Start Development Servers**
```bash
# Terminal 1 - Backend
cd Backend
npm install
npm start
# Should see: "Server running on port 10000"

# Terminal 2 - Frontend
cd Frontend
npm start
# Should open http://localhost:3000 automatically
```

### Production Deployment

For deploying to Vercel (Frontend) and Render (Backend), see the comprehensive guide in [DEPLOYMENT.md](./DEPLOYMENT.md).

**Quick Links:**
- [Deployment Guide](./DEPLOYMENT.md) - Step-by-step production deployment
- [Changes Summary](./CHANGES.md) - All production-ready improvements made

4. **Run the application**
```bash
# Start Backend
cd Backend
npm start

# Start Frontend (in a new terminal)
cd Frontend
npm start
```

## Usage 📝

1. Visit the application at `https://match-my-skill-plby.vercel.app/`
2. Upload your resume (PDF, DOCX, or TXT format)
3. Paste the target job description
4. Click "Analyze Resume" to get detailed insights
5. Download the comprehensive analysis report

## Project Structure 📂

```
resume-gap-analyzer/
├── Frontend/
│   ├── public/
│   ├── src/
│   │   ├── utils/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── Backend/
    ├── server.js
    └── package.json
```

## Contributing 🤝

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments 🙏

- Google Gemini AI for powering the analysis
- Cloudinary for file storage
- React and Node.js communities

## Contact 📧

Your Name - Shashank.
Project Link: [https://github.com/yourusername/resume-gap-analyzer](https://github.com/yourusername/resume-gap-analyzer)
