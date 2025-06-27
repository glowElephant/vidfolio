
require('dotenv').config();

const express = require('express');
const session = require('express-session');
const sqlite3 = require('sqlite3').verbose();
const multer = require('multer');
const path = require('path');

const app = express();
const db = new sqlite3.Database('data.db');
const upload = multer({ dest: path.join(__dirname, 'uploads') });
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'password';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false
}));

// initialize tables
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS videos(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    filename TEXT
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS bookmarks(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    video_id INTEGER,
    time REAL,
    title TEXT,
    content TEXT,
    FOREIGN KEY(video_id) REFERENCES videos(id)
  )`);
});

app.use(express.static('public'));

app.post('/login', (req, res) => {
  if (req.body.password === ADMIN_PASSWORD) {
    req.session.admin = true;
    res.json({ ok: true });
  } else {
    res.status(401).json({ error: 'Invalid password' });
  }
});

app.post('/logout', (req, res) => {
  req.session.destroy(() => res.json({ ok: true }));
});

app.get('/me', (req, res) => {
  res.json({ admin: !!req.session.admin });
});

const requireAdmin = (req, res, next) => {
  if (req.session.admin) return next();
  res.status(403).json({ error: 'Forbidden' });
};

app.get('/api/videos', (req, res) => {
  db.all('SELECT id,title,filename FROM videos', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/videos', requireAdmin, upload.single('video'), (req, res) => {
  const title = req.body.title || req.file.originalname;
  const filename = req.file.filename;
  db.run('INSERT INTO videos(title,filename) VALUES(?,?)', [title, filename], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, title, filename });
  });
});

app.put('/api/videos/:id', requireAdmin, (req, res) => {
  const { title } = req.body;
  db.run('UPDATE videos SET title=? WHERE id=?', [title, req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ ok: true });
  });
});

app.get('/video/:filename', (req, res) => {
  const filepath = path.join(__dirname, 'uploads', req.params.filename);
  res.sendFile(filepath);
});

app.get('/api/videos/:id/bookmarks', (req, res) => {
  db.all('SELECT * FROM bookmarks WHERE video_id=? ORDER BY time', [req.params.id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/videos/:id/bookmarks', requireAdmin, (req, res) => {
  const { time, title, content } = req.body;
  db.run('INSERT INTO bookmarks(video_id,time,title,content) VALUES (?,?,?,?)',
    [req.params.id, time, title, content], function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, time, title, content });
    });
});

app.put('/api/bookmarks/:id', requireAdmin, (req, res) => {
  const { title, content } = req.body;
  db.run('UPDATE bookmarks SET title=?, content=? WHERE id=?',
    [title, content, req.params.id], function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ ok: true });
    });
});

app.delete('/api/bookmarks/:id', requireAdmin, (req, res) => {
  db.run('DELETE FROM bookmarks WHERE id=?', [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ ok: true });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
