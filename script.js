# UniVoice Hub

UniVoice Hub is a full-stack student support website built for a university project. It includes:

- Campus Lost & Found
- Career Path Guidance
- Anonymous Academic Feedback

## Tech Stack

- Frontend: HTML, CSS, Vanilla JavaScript
- Backend: Node.js, Express
- Data Storage: JSON files

## Project Structure

```
univoice-hub/
├── data/
│   ├── careers.json
│   ├── feedback.json
│   └── lostfound.json
├── public/
│   ├── index.html
│   ├── script.js
│   └── style.css
├── package.json
├── README.md
└── server.js
```

## How to Run

1. Open the project folder in VS Code.
2. Open terminal.
3. Run:

```bash
npm install
npm start
```

4. Visit:

```bash
http://localhost:3000
```

## Features

### 1. Campus Lost & Found
- Create lost or found item posts
- Search by keyword
- Filter by type and category
- Mark an item as resolved

### 2. Career Path Guidance
- Select department
- View roadmap by year/stage
- See skills, tools, suggested courses, and career roles

### 3. Anonymous Academic Feedback
- Submit feedback without user identity
- Rate courses from 1 to 5
- View recent comments and summary metrics

## Notes

- This project uses local JSON files as a simple database for academic submission/demo purposes.
- You can later upgrade it to MongoDB or MySQL if needed.
