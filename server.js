
require('dotenv').config();

const express = require('express');
const session = require('express-session');
const sqlite3 = require('sqlite3').verbose();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
// Store the SQLite database in the same directory as this script so it works
// regardless of the working directory when the server starts.
const db = new sqlite3.Database(path.join(__dirname, 'data.db'));
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

  db.run(`CREATE TABLE IF NOT EXISTS categories(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    parent_id INTEGER,
    position INTEGER
  )`);

  db.all('PRAGMA table_info(categories)', (err, rows) => {
    if (err) return console.error('Failed to read categories table info:', err.message);
    const cols = rows.map(r => r.name);
    if (!cols.includes('position')) {
      db.run('ALTER TABLE categories ADD COLUMN position INTEGER');
      db.run('UPDATE categories SET position = id');
    }
  });

  db.all('PRAGMA table_info(videos)', (err, rows) => {
    if (err) return console.error('Failed to read videos table info:', err.message);
    const cols = rows.map(r => r.name);
    if (!cols.includes('category_id')) {
      db.run('ALTER TABLE videos ADD COLUMN category_id INTEGER');
    }
    if (!cols.includes('position')) {
      db.run('ALTER TABLE videos ADD COLUMN position INTEGER');
      db.run('UPDATE videos SET position = id');
    }
  });

  const createBookmarks = () => {
    db.run(`CREATE TABLE IF NOT EXISTS bookmarks(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      video_id INTEGER,
      time REAL,
      title TEXT,
      content TEXT,
      FOREIGN KEY(video_id) REFERENCES videos(id)
    )`);
  };

  db.all('PRAGMA table_info(bookmarks)', (err, rows) => {
    if (err) {
      console.error('Failed to read bookmarks table info:', err.message);
      return createBookmarks();
    }
    const cols = rows.map(r => r.name);
    const expected = ['id', 'video_id', 'time', 'title', 'content'];
    const valid = expected.every(c => cols.includes(c));
    if (!valid) {
      console.warn('Recreating bookmarks table with correct schema');
      db.run('DROP TABLE IF EXISTS bookmarks', recreateErr => {
        if (recreateErr) console.error(recreateErr.message);
        createBookmarks();
      });
    } else {
      createBookmarks();
    }
  });
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
  db.all('SELECT id,title,filename,category_id,position FROM videos ORDER BY position', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/videos', requireAdmin, upload.single('video'), (req, res) => {
  const title = req.body.title || req.file.originalname;
  const filename = req.file.filename;
  const categoryId = req.body.category_id || null;
  db.run('INSERT INTO videos(title,filename,category_id,position) VALUES(?,?,?,NULL)', [title, filename, categoryId], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    const id = this.lastID;
    db.run('UPDATE videos SET position=? WHERE id=?', [id, id]);
    res.json({ id, title, filename, category_id: categoryId, position: id });
  });
});

app.put('/api/videos/:id', requireAdmin, (req, res) => {
  const { title, category_id, position } = req.body;
  const fields = [];
  const params = [];
  if (title !== undefined) {
    fields.push('title=?');
    params.push(title);
  }
  if (category_id !== undefined) {
    fields.push('category_id=?');
    params.push(category_id);
  }
  if (position !== undefined) {
    fields.push('position=?');
    params.push(position);
  }
  if (!fields.length) return res.json({ ok: true });
  params.push(req.params.id);
  db.run(`UPDATE videos SET ${fields.join(', ')} WHERE id=?`, params, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ ok: true });
  });
});

app.delete('/api/videos/:id', requireAdmin, (req, res) => {
  db.get('SELECT filename FROM videos WHERE id=?', [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Not found' });
    const filepath = path.join(__dirname, 'uploads', row.filename);
    fs.unlink(filepath, unlinkErr => {
      if (unlinkErr && unlinkErr.code !== 'ENOENT') console.error('Failed to remove file', unlinkErr);
      db.run('DELETE FROM bookmarks WHERE video_id=?', [req.params.id], err2 => {
        if (err2) return res.status(500).json({ error: err2.message });
        db.run('DELETE FROM videos WHERE id=?', [req.params.id], function (err3) {
          if (err3) return res.status(500).json({ error: err3.message });
          res.json({ ok: true });
        });
      });
    });
  });
});

// category APIs
app.get('/api/categories', (req, res) => {
  db.all('SELECT id,name,parent_id,position FROM categories ORDER BY position', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/categories', requireAdmin, (req, res) => {
  const { name, parent_id } = req.body;
  db.run('INSERT INTO categories(name,parent_id,position) VALUES(?,?,NULL)', [name, parent_id || null], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    const id = this.lastID;
    db.run('UPDATE categories SET position=? WHERE id=?', [id, id]);
    res.json({ id, name, parent_id: parent_id || null, position: id });
  });
});

app.put('/api/categories/:id', requireAdmin, (req, res) => {
  const { name, parent_id, position } = req.body;
  const fields = [];
  const params = [];
  if (name !== undefined) { fields.push('name=?'); params.push(name); }
  if (parent_id !== undefined) { fields.push('parent_id=?'); params.push(parent_id); }
  if (position !== undefined) { fields.push('position=?'); params.push(position); }
  if (!fields.length) return res.json({ ok: true });
  params.push(req.params.id);
  db.run(`UPDATE categories SET ${fields.join(', ')} WHERE id=?`, params, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ ok: true });
  });
});

app.delete('/api/categories/:id', requireAdmin, (req, res) => {
  const id = req.params.id;
  db.serialize(() => {
    db.run('UPDATE videos SET category_id=NULL WHERE category_id=?', [id]);
    db.run('UPDATE categories SET parent_id=NULL WHERE parent_id=?', [id]);
    db.run('DELETE FROM categories WHERE id=?', [id], function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ ok: true });
    });
  });
});

app.put('/api/videos/reorder', requireAdmin, (req, res) => {
  const { ids } = req.body;
  if (!Array.isArray(ids)) return res.status(400).json({ error: 'ids required' });
  db.serialize(() => {
    ids.forEach((id, idx) => {
      db.run('UPDATE videos SET position=? WHERE id=?', [idx, id]);
    });
    res.json({ ok: true });
  });
});

app.put('/api/categories/reorder', requireAdmin, (req, res) => {
  const { ids } = req.body;
  if (!Array.isArray(ids)) return res.status(400).json({ error: 'ids required' });
  db.serialize(() => {
    ids.forEach((id, idx) => {
      db.run('UPDATE categories SET position=? WHERE id=?', [idx, id]);
    });
    res.json({ ok: true });
  });
});

app.get('/video/:filename', (req, res) => {
  const filepath = path.join(__dirname, 'uploads', req.params.filename);
  res.set('Cache-Control', 'public, max-age=86400');
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
