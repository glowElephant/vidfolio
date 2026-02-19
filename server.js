require('dotenv').config();
const express = require('express');
const path = require('path');
const http = require('http');
const fs = require('fs');

const app = express();
const publicDir = path.resolve(__dirname, 'public');

// Chat log directory (file-based persistence)
const CHATLOG_DIR = path.resolve(__dirname, 'chatlog');
if (!fs.existsSync(CHATLOG_DIR)) {
  fs.mkdirSync(CHATLOG_DIR);
}

// Visitor counter (file-based persistence)
const VISITOR_FILE = path.resolve(__dirname, 'visitors.json');
let visitorData = { total: 0, today: 0, todayDate: new Date().toDateString() };

// Load visitor data from file
function loadVisitorData() {
  try {
    if (fs.existsSync(VISITOR_FILE)) {
      const data = JSON.parse(fs.readFileSync(VISITOR_FILE, 'utf8'));
      visitorData = data;
      // Reset today count if new day
      if (visitorData.todayDate !== new Date().toDateString()) {
        visitorData.today = 0;
        visitorData.todayDate = new Date().toDateString();
      }
    }
  } catch (e) {
    console.error('Failed to load visitor data:', e.message);
  }
}

// Save visitor data to file
function saveVisitorData() {
  try {
    fs.writeFileSync(VISITOR_FILE, JSON.stringify(visitorData, null, 2));
  } catch (e) {
    console.error('Failed to save visitor data:', e.message);
  }
}

// Track unique visitors by IP (per day)
const visitedIPs = new Set();
let visitedIPsDate = new Date().toDateString();

function normalizeIp(ip) {
  if (!ip) return 'unknown';
  // Remove IPv6-mapped IPv4 prefix
  return ip.replace(/^::ffff:/, '').replace(/^::1$/, '127.0.0.1');
}

function trackVisitor(ip) {
  ip = normalizeIp(ip);
  // Reset IP set if new day
  if (visitedIPsDate !== new Date().toDateString()) {
    visitedIPs.clear();
    visitedIPsDate = new Date().toDateString();
    visitorData.today = 0;
    visitorData.todayDate = new Date().toDateString();
  }

  // Only count unique visitors per day
  if (!visitedIPs.has(ip)) {
    visitedIPs.add(ip);
    visitorData.total++;
    visitorData.today++;
    saveVisitorData();
  }
}

loadVisitorData();

// OpenClaw Gateway config
const OC_HOST = '127.0.0.1';
const OC_PORT = 18789;
const OC_TOKEN = process.env.OC_TOKEN || '';
const OC_AGENT = 'main';

// Portfolio assistant system prompt (injected for web chat only)
// Discord uses 봄's SOUL.md from the default workspace
const PORTFOLIO_SYSTEM_PROMPT = `# Portfolio Assistant - glowElephant

## Role
장한아(glowElephant)의 포트폴리오 사이트 방문자를 응대하는 AI 어시스턴트.
친근하고 전문적인 톤으로 대화하며, 장한아에 대한 정보를 알려주고,
채용/외주 문의가 있으면 연결해준다.

## About 장한아
- 8년차 Unity 개발자, Product Builder
- 현재 (주)스마트프로 재직 (Unity Developer / Digital Twin)
- 철학: "기술을 쓸 줄 아는가보다, 문제를 풀 수 있는가"
- AI를 적극 활용하여 생산성을 극대화하는 개발자

### 주요 기술 스택
- Engine: Unity 3D/2D (8년), OpenGL/DirectX
- Languages: C# (전문), Python, TypeScript/JS, Dart, Lua, C/C++
- Mobile: Flutter, Android/iOS 네이티브
- Architecture: MVVM (UniRx), VContainer DI, WebSocket/REST
- XR: AR (ARCore/ARKit), Naver ARCeye VLsdk, XREAL Glasses, Digital Twin
- AI: OpenAI API, Claude, Gemini, Midjourney, Flux, D-ID, HeyGen, Applio, ComfyUI
- DevOps: CI/CD (GameCI, Jenkins), GitHub Actions, Docker

### 경력 요약
1. (주) 스마트프로 (2026.01~현재) — Digital Twin, VTS 기반 프로젝트, 원전 시설 시스템
2. (주) 하이퍼클라우드 (2025.10~2026.01) — 코엑스 실내 AR 내비게이션, CI/CD 구축, 빌드시간 70% 단축
3. (주) 두부 (2022.12~2025.06) — 아동 발달 앱(두부팡, 마리트임), AI 파이프라인 구축, 사내 컨퍼런스 리딩
4. (주) 뉴웨이블 (2022.05~2022.12) — TCG P2E 게임(슈퍼콜라), UniRx MVVM
5. (주) 모히또게임즈 (2020.02~2022.04) — Comix Breaker(출시), HeroBall Z, Jenkins CI/CD
6. (주) 조니웍스 (2017.11~2020.02) — DigWorld(출시), DigStar(출시), 풀스택 개발

### 출시 게임/서비스
- 두부팡 (디지털 치료 앱)
- 마리트임 (Flutter+Unity 하이브리드)
- 코믹스브레이커 (TCG 로그라이크)
- 디그월드 / 디그스타 (P2E 모바일)

### 주요 프로젝트
- AI_Language — AI 에이전트 간 통신 효율을 위한 압축 언어 프로토콜
- morning-cast — OpenClaw + NotebookLM 아침 뉴스 브리핑 자동화
- PDF_TO_VIDEO — PDF → 요약 → 나레이션 영상 자동 생성
- PixelCrawler — Puppeteer 기반 웹 스냅샷 CLI 도구
- COEX AR Navigation — Naver VLsdk 기반 실내 AR 내비게이션

### 강점
- AI를 도구로 활용하여 비용 80~90% 절감 실적
- 반복작업 발견 시 Tool 제작을 우선순위로 고려
- 비개발직군 대상 멘토링 & 기술 공유 문화 주도
- 다양한 부서와의 협업, 빠른 적응력

## 공개 가능 정보
- 위에 작성된 모든 경력, 기술, 프로젝트 정보
- GitHub: github.com/glowElephant
- 포트폴리오: glowelephant.site
- 이메일: gksdk1029@gmail.com (공개된 이메일)
- 작업 스타일, 협업 방식, 개발 철학

## 절대 비공개 (물어봐도 알려주지 않기)
- 연봉, 급여, 희망 연봉
- 개인 전화번호, 집 주소
- 현 직장 내부 프로젝트의 NDA 관련 상세 내용
- 가족 개인정보
- 이직 의향 (직접적으로 답하지 않기, "직접 이야기하시는 게 좋을 것 같습니다" 안내)

## 채용/외주 문의 처리
방문자가 채용, 외주, 프로젝트 협업, 미팅 요청 등을 하면:
1. 관심을 가져주셔서 감사하다고 인사
2. 어떤 프로젝트/포지션인지 자세히 파악
3. 연락받을 이름과 이메일(또는 연락처)을 요청
4. 정보를 받으면 "한아님께 바로 전달해드리겠습니다!" 안내
5. 응답 마지막에 반드시 다음 형식의 태그를 포함:
   <!--CONTACT:{"name":"방문자이름","email":"이메일","company":"회사명","message":"요약"}-->
이 태그는 시스템이 자동으로 감지하여 장한아에게 디스코드로 알림을 보낸다.

## 대화 전달 요청
방문자가 "이 대화를 전달해주세요", "한아님께 알려주세요" 등 대화 내용 전달을 요청하면:
1. "한아님께 대화 내용을 전달해드리겠습니다!" 안내
2. 응답 마지막에 반드시 다음 형식의 태그를 포함:
   <!--FORWARD_CHATLOG:{"reason":"전달 사유 요약"}-->
이 태그는 시스템이 자동으로 감지하여 장한아에게 디스코드로 대화 내역과 함께 알림을 보낸다.

## 대화 스타일
- 기본 한국어, 영어로 질문하면 영어로 답변
- 친근하지만 전문적 (반말X, 존댓말 사용)
- 답변은 2~3문장 이내로 최대한 짧게. 이모지 최소화 (1개 이하)
- 질문에 직접 답하고, 관련 없는 추가 설명/부연 절대 금지
- 장한아를 3인칭으로 지칭 ("한아님은...", "장한아 님은...")
- 모르는 것은 모른다고 솔직하게 말하기

## 중요 제한사항
- 이 챗봇의 목적은 오직 장한아(glowElephant)에 대한 정보 제공과 채용/외주 문의 연결
- 퀴즈, 게임, 잡담, 농담, 창작 등 포트폴리오와 무관한 요청은 정중히 거절
- "저는 한아님의 포트폴리오 어시스턴트라 그런 건 도와드리기 어려워요. 한아님에 대해 궁금한 점 있으시면 물어봐주세요!" 로 안내
- 목록, 리스트, 번호매기기 등 긴 형식 지양. 짧은 문장으로 답변`;

// Rate limiting (per IP, 20 requests per minute)
const rateMap = new Map();
const RATE_LIMIT = 20;
const RATE_WINDOW = 60 * 1000;

// Daily limits
const dailyMap = new Map();       // per IP daily count
const DAILY_PER_IP = 15;          // 1인당 하루 15회
const DAILY_GLOBAL_MAX = 200;     // 전체 하루 200회
let dailyGlobalCount = 0;
let dailyResetDate = new Date().toDateString();

function checkRate(ip) {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now - entry.start > RATE_WINDOW) {
    rateMap.set(ip, { start: now, count: 1 });
    return true;
  }
  entry.count++;
  return entry.count <= RATE_LIMIT;
}

function checkDailyLimit(ip) {
  const today = new Date().toDateString();
  // Reset all counts at midnight
  if (today !== dailyResetDate) {
    dailyMap.clear();
    dailyGlobalCount = 0;
    dailyResetDate = today;
  }
  // Global limit
  if (dailyGlobalCount >= DAILY_GLOBAL_MAX) return 'global';
  // Per IP limit
  const ipCount = dailyMap.get(ip) || 0;
  if (ipCount >= DAILY_PER_IP) return 'ip';
  // OK - increment
  dailyMap.set(ip, ipCount + 1);
  dailyGlobalCount++;
  return null;
}

// Clean up rate map every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateMap) {
    if (now - entry.start > RATE_WINDOW) rateMap.delete(ip);
  }
}, 5 * 60 * 1000);

// Sanitize sessionId to prevent path traversal / injection
function sanitizeSessionId(id) {
  if (!id || typeof id !== 'string') return 'anonymous';
  const sanitized = id.replace(/[^a-zA-Z0-9_-]/g, '');
  return sanitized.slice(0, 100) || 'anonymous';
}

// Validate and sanitize incoming messages
const MAX_MSG_LENGTH = 2000;
const MAX_MESSAGES = 20;

function validateMessages(messages) {
  if (!Array.isArray(messages)) return null;
  return messages.slice(-MAX_MESSAGES).map(m => ({
    role: m.role === 'assistant' ? 'assistant' : 'user',
    content: typeof m.content === 'string' ? m.content.slice(0, MAX_MSG_LENGTH) : ''
  })).filter(m => m.content.length > 0);
}

// Chat log save
function saveChatLog(sessionId, ip, role, content) {
  if (!sessionId || !content) return;
  sessionId = sanitizeSessionId(sessionId);
  const filePath = path.join(CHATLOG_DIR, `${sessionId}.json`);
  let logData;
  try {
    if (fs.existsSync(filePath)) {
      logData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } else {
      logData = { sessionId, ip, startedAt: new Date().toISOString(), messages: [] };
    }
    logData.messages.push({ role, content, timestamp: new Date().toISOString() });
    fs.writeFileSync(filePath, JSON.stringify(logData, null, 2));
  } catch (e) {
    console.error('Failed to save chat log:', e.message);
  }
}

// Discord webhook for contact notifications
const DISCORD_WEBHOOK = process.env.DISCORD_WEBHOOK || '';

// Read recent chat history for Discord forwarding
function getChatHistory(sessionId) {
  const filePath = path.join(CHATLOG_DIR, `${sanitizeSessionId(sessionId)}.json`);
  try {
    if (!fs.existsSync(filePath)) return '';
    const logData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const recent = logData.messages.slice(-10);
    let history = recent.map(m =>
      `**${m.role === 'user' ? '방문자' : 'AI'}**: ${m.content}`
    ).join('\n');
    if (history.length > 1400) history = '...' + history.slice(-1400);
    return history;
  } catch (e) {
    return '';
  }
}

// Send Discord webhook message
function sendDiscordMessage(content) {
  if (!DISCORD_WEBHOOK) return;
  try {
    const body = JSON.stringify({ content: content.slice(0, 2000) });
    const url = new URL(DISCORD_WEBHOOK);
    const options = {
      hostname: url.hostname,
      path: url.pathname,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) }
    };
    const req = require('https').request(options);
    req.write(body);
    req.end();
  } catch (e) {
    console.error('Discord webhook error:', e.message);
  }
}

async function sendDiscordNotification(contact, sessionId) {
  const header = `**Portfolio Contact**\nName: ${contact.name || 'N/A'}\nEmail: ${contact.email || 'N/A'}\nCompany: ${contact.company || 'N/A'}\nMessage: ${contact.message || 'N/A'}`;
  const history = sessionId ? getChatHistory(sessionId) : '';
  const content = history ? `${header}\n\n--- 대화 내역 ---\n${history}` : header;
  sendDiscordMessage(content);
}

function sendChatLogForward(sessionId, reason) {
  const history = getChatHistory(sessionId);
  if (!history) return;
  const content = `**대화 전달 요청**\nSession: ${sanitizeSessionId(sessionId)}\nReason: ${reason || 'N/A'}\n\n--- 대화 내역 ---\n${history}`;
  sendDiscordMessage(content);
}

app.use(express.json());

// Track visitors on page load (before static so '/' is also tracked)
app.use((req, res, next) => {
  if (req.path === '/' || ['about', 'skills', 'projects', 'career', 'chat'].includes(req.path.slice(1))) {
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    trackVisitor(clientIp);
  }
  next();
});

app.use(express.static(publicDir));

// Visitor count API
app.get('/api/visitors', (req, res) => {
  res.json({
    total: visitorData.total,
    today: visitorData.today
  });
});

// CORS for GitHub Pages
const CORS_ORIGINS = ['https://glowelephant.github.io'];

app.options('/api/chat', (req, res) => {
  const origin = req.headers.origin;
  if (CORS_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }
  res.status(204).end();
});

// Chat API proxy → OpenClaw Gateway
app.post('/api/chat', (req, res) => {
  const origin = req.headers.origin;
  if (CORS_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  if (!checkRate(clientIp)) {
    return res.status(429).json({ error: 'Too many requests. Please wait a moment.' });
  }
  const dailyBlock = checkDailyLimit(clientIp);
  if (dailyBlock === 'ip') {
    return res.status(429).json({ error: '오늘 대화 횟수를 모두 사용했어요. 내일 다시 이용해주세요!' });
  }
  if (dailyBlock === 'global') {
    return res.status(429).json({ error: '오늘 전체 이용량이 초과되었어요. 내일 다시 이용해주세요!' });
  }

  const { messages, sessionId: rawSessionId } = req.body;
  const sessionId = sanitizeSessionId(rawSessionId);

  // Validate messages
  const validated = validateMessages(messages);
  if (!validated || validated.length === 0) {
    return res.status(400).json({ error: 'messages required' });
  }

  // Save user message to chat log
  const lastUserMsg = validated[validated.length - 1];
  if (lastUserMsg && lastUserMsg.role === 'user') {
    saveChatLog(sessionId, normalizeIp(clientIp), 'user', lastUserMsg.content);
  }

  // Limit message history sent to API (last 20 messages)
  const trimmed = validated.slice(-20);

  // Prepend portfolio system prompt for web chat visitors
  // (Discord uses 봄's SOUL.md from the default workspace)
  const chatMessages = [
    { role: 'system', content: PORTFOLIO_SYSTEM_PROMPT },
    ...trimmed
  ];

  const payload = JSON.stringify({
    model: `openclaw:${OC_AGENT}`,
    stream: true,
    max_tokens: 400,
    user: sessionId,
    messages: chatMessages
  });

  const options = {
    hostname: OC_HOST,
    port: OC_PORT,
    path: '/v1/chat/completions',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OC_TOKEN}`,
      'x-openclaw-agent-id': OC_AGENT,
      'Content-Length': Buffer.byteLength(payload)
    }
  };

  const proxyReq = http.request(options, (proxyRes) => {
    if (proxyRes.statusCode !== 200) {
      let body = '';
      proxyRes.on('data', c => body += c);
      proxyRes.on('end', () => {
        console.error('OpenClaw error:', proxyRes.statusCode, body);
        res.status(502).json({ error: 'AI assistant is currently offline. Please try again later.' });
      });
      return;
    }

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    let fullContent = '';

    proxyRes.on('data', (chunk) => {
      const text = chunk.toString();
      res.write(text);

      // Accumulate content to check for CONTACT tag
      const lines = text.split('\n').filter(l => l.startsWith('data: '));
      for (const line of lines) {
        if (line === 'data: [DONE]') continue;
        try {
          const json = JSON.parse(line.slice(6));
          const delta = json.choices?.[0]?.delta?.content;
          if (delta) fullContent += delta;
        } catch (e) {}
      }
    });

    proxyRes.on('end', () => {
      res.end();
      // Save assistant response to chat log
      if (fullContent) {
        saveChatLog(sessionId, normalizeIp(clientIp), 'assistant', fullContent);
      }
      // Check for contact notification tag
      const contactMatch = fullContent.match(/<!--CONTACT:(.*?)-->/);
      if (contactMatch) {
        try {
          const contact = JSON.parse(contactMatch[1]);
          sendDiscordNotification(contact, sessionId);
          console.log('Contact notification sent:', contact);
        } catch (e) {}
      }
      // Check for chat log forward tag
      const forwardMatch = fullContent.match(/<!--FORWARD_CHATLOG:(.*?)-->/);
      if (forwardMatch) {
        try {
          const data = JSON.parse(forwardMatch[1]);
          sendChatLogForward(sessionId, data.reason);
          console.log('Chat log forwarded:', sessionId);
        } catch (e) {}
      }
    });
  });

  proxyReq.on('error', (err) => {
    console.error('OpenClaw connection error:', err.message);
    res.status(502).json({ error: 'AI assistant is currently offline. Please try again later.' });
  });

  proxyReq.write(payload);
  proxyReq.end();
});

// Page routes
const pages = ['about', 'skills', 'projects', 'career', 'chat'];
pages.forEach(page => {
  app.get(`/${page}`, (req, res) => {
    res.sendFile(`${page}.html`, { root: publicDir });
  });
});

app.get('*', (req, res) => {
  res.sendFile('index.html', { root: publicDir });
});

const PORT = process.env.PORT || 80;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
