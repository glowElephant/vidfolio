# Vidfolio

This project now includes a simple Node.js server so videos and bookmarks can
be stored and viewed on the web. Run the server and open `http://localhost:3000`
in your browser.

## Usage

Install dependencies and start the server:

```bash
npm install
npm start
```

Set the environment variable `ADMIN_PASSWORD` to control the admin login. Only
logged in administrators can upload videos or add bookmarks. Visitors can watch
videos and browse existing bookmarks but cannot modify them.
