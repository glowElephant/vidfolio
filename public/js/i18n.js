/**
 * i18n Translation Dictionary
 * Korean (ko) = default HTML content, English (en) = translated
 */
window.I18N = {
  ko: {
    // Page Titles
    'page.home.title': '장한아 | Product Builder',
    'page.about.title': 'About | 장한아',
    'page.skills.title': 'Skills | 장한아',
    'page.projects.title': 'Projects | 장한아',
    'page.career.title': 'Career | 장한아',
    'page.chat.title': 'Chat | 장한아',

    // Home
    'home.name': '장한아 (Jang HanAh)',
    'home.tagline': '기술을 쓸 줄 아는가보다, 문제를 풀 수 있는가',
    'footer.copyright': '\u00A9 2025 장한아 | glowElephant',

    // About
    'about.philosophy.title': 'Product Builder 철학',
    'about.philosophy.1': 'AI가 세상을 지배하는 시대. 코드를 짜는 것이 아닌 <span class="hl">문제를 정의하고 제품을 만드는 사람</span>이 필요',
    'about.philosophy.2': '"이 기술을 사용할 줄 아는가?" &rarr; "<span class="hl">이 문제를 풀 수 있는가?</span>"로 패러다임 전환',
    'about.philosophy.3': '상용화된 AI를 최대한 활용하여 <span class="hl">가치를 창출하는 인재</span>',
    'about.ai.title': 'AI 활용 실전 사례',
    'about.ai.1': 'Unity NPC에 <span class="hl">OpenAI API</span> 연동 &rarr; 질문답변, 이미지 분석',
    'about.ai.2': '나레이션 파이프라인: <span class="hl">Applio</span>로 음성모델 학습 &rarr; API 자동합성 (비용 80% 절감)',
    'about.ai.3': '아동 발음 영상: <span class="hl">Midjourney/Flux</span> &rarr; <span class="hl">Applio</span> &rarr; <span class="hl">D-ID/HeyGen</span> 파이프라인 구축',
    'about.ai.4': '<span class="hl">OpenClaw + NotebookLM</span> 아침 뉴스 브리핑 자동화',
    'about.ai.5': '<span class="hl">Claude Code + tmux</span> 멀티세션 병렬 개발: 메인 에이전트와 실시간 대화하며 서브 에이전트에 태스크 위임',
    'about.ai.6': '에이전트 간 <span class="hl">AI_Language</span> 압축 통신 프로토콜 &rarr; 토큰 절감 + 효율적 협업',
    'about.ai.7': 'AI 에이전트를 도구가 아닌 <span class="hl">팀원으로 활용</span>하는 AI-First 개발 방식',
    'about.problem.title': '문제 해결 DNA',
    'about.problem.1': '카드 연출 수정: 연출자가 Inspector에서 직접 수정 가능한 <span class="hl">Tool 개발</span> &rarr; 시간 코스트 대폭 절감',
    'about.problem.2': '나레이션 외주 파이프라인: 외주&rarr;프리랜서&rarr;검수&rarr;수정 의 비효율 &rarr; <span class="hl">Applio 기반 자체 생성 파이프라인</span> 구축',
    'about.problem.3': '반복작업 발견 시 <span class="hl">Tool 제작을 우선순위</span>로 고려하는 마인드',
    'about.collab.title': '협업 &amp; 커뮤니케이션',
    'about.collab.1': '다양한 부서와의 협업, 빠른 적응력, <span class="hl">라포 형성</span>',
    'about.collab.2': '전체 흐름을 인지하고 <span class="hl">병목 지점을 발견</span>해 능동적으로 역할 조정',
    'about.collab.3': '사내 컨퍼런스 리딩, 비개발직군 <span class="hl">Git 멘토링</span>, 기술 공유 문화 주도',

    // Skills (Korean tool tags)
    'skills.tool.tmux_parallel': 'tmux 병렬 세션',
    'skills.tool.multi_agent': 'Multi-Agent 오케스트레이션',
    'skills.tool.ai_language': 'AI_Language 프로토콜',

    // Projects
    'proj.ai_language.desc': 'AI 에이전트 간 효율적 통신을 위한 압축 언어 프로토콜. 자연어 대비 토큰 사용량을 대폭 줄여 멀티 에이전트 시스템의 통신 효율을 극대화.',
    'proj.the_agents.desc': '에이전트들끼리 뚝딱뚝딱. 여러 LLM 에이전트가 협업하여 복잡한 태스크를 분담 처리하는 멀티 에이전트 시스템.',
    'proj.bom_factory.desc': 'AI 기반 콘텐츠 생성 파이프라인. 텍스트에서 이미지, 영상까지 자동화된 제작 플로우.',
    'proj.pdf_to_video.desc': 'PDF 내용을 요약 → 알맞는 이미지와 텍스트 생성 → 지정한 나레이터로 나레이션 영상을 자동 제작하는 파이프라인.',
    'proj.llm_local.desc': 'Facebook LLaMA 모델 로컬 배포. Ollama를 활용한 오프라인 LLM 추론 환경 구축.',
    'proj.veo_loop.desc': '8초는 너무 짧다. AI 영상 생성 결과물을 이어붙여 더 긴 영상을 만드는 실험 프로젝트.',
    'proj.pixelcrawler.desc': '그대로 가져온다... 전부. 웹 페이지를 실제 브라우저로 렌더링하여 MHTML, PNG, PDF 스냅샷을 생성하는 CLI 도구.',
    'proj.snap_path.desc': '단축키로 캡쳐 → 저장 → 클립보드 경로 복사. 빠른 스크린샷 워크플로우 자동화.',
    'proj.claude_usage.desc': 'Claude API 사용량 모니터링 위젯. 실시간 토큰 소비량 및 비용 추적.',
    'proj.universal_converter.desc': 'YouTube, 로컬 비디오/오디오/이미지/텍스트 변환 및 요약까지 지원하는 범용 파일 변환 CLI 도구.',
    'proj.news_reporter.desc': '매일매일 뉴스 리포팅. RSS 기반 키워드 뉴스 크롤링 → 원하는 카테고리와 시간에 이메일 리포팅.',
    'proj.simple_tcp.desc': 'TCP로 통신해서 메세지를 주고받는 간단한 예제. 네트워크 프로그래밍 기초 실습.',
    'proj.dubupang.desc': '발달이 느린 아이들을 위한 디지털 치료 앱. 사용자 데이터 기반 난이도 자동 조절, 맞춤형 놀이 컨텐츠로 아동 발달을 지원하는 디지털 헬스케어 제품.',
    'proj.comix.desc': 'TCG 로그라이크 장르 모바일 게임. 카드 연출 시스템 (Quadratic Bezier Curve), Admob 연동, Jenkins CI/CD.',
    'proj.digworld.desc': '캐주얼 P2E 장르 모바일 게임. 땅을 파며 자원을 수집하는 디깅 시뮬레이션.',
    'proj.digstar.desc': '수집형 캐주얼 모바일 게임. Gamespark 서버 연동 풀스택 개발, 빌드 엔지니어링.',
    'proj.minigame.desc': '게임 포트폴리오 모음. 다양한 미니게임 프로토타입 컬렉션.',
    'proj.coex_ar.desc': '코엑스 실내 AR 내비게이션 앱. Naver ARCeye VLsdk 기반 실내 정밀 측위, 실시간 3D 경로 안내, 확장형 컨텐츠 아키텍처.',
    'proj.vidfolio.desc': '개인 포트폴리오 사이트. CLI 터미널 스타일 인터랙티브 사이트. OpenClaw 기반 AI 실시간 상담 챗봇 탑재. Cloudflare Tunnel로 직접 호스팅.',
    'proj.private_cctv.desc': '남는 Android 기기로 CCTV를 만들어보자. 개인용 실시간 모니터링 & 스트리밍 시스템.',
    'proj.tiktok_clone.desc': 'Flutter로 만든 TikTok 클론 앱. 모바일 앱 개발 실습 프로젝트.',

    // Career - SmartPro
    'career.smartpro.name': '(주) 스마트프로 (SmartPro)',
    'career.smartpro.role': 'Unity Developer / Digital Twin',
    'career.smartpro.1': 'Digital Twin 솔루션 전문 기업 (대전 유성구 대덕테크노밸리)',
    'career.smartpro.2': 'VTS (Virtual Twin Studio) 기반 디지털 트윈 프로젝트',
    'career.smartpro.3': '원전 시설 실시간 데이터 통합 및 예측 유지보수 시스템',
    'career.smartpro.4': '메타버스 협업 플랫폼 (VTS Meta) 개발',

    // Career - HyperCloud
    'career.hypercloud.name': '(주) 하이퍼클라우드',
    'career.hypercloud.role': 'XR팀 / Unity Developer',
    'career.hypercloud.1': 'Naver ARCeye VLsdk 기반 코엑스 실내 AR 내비게이션 앱 개발',
    'career.hypercloud.2': 'Unity 기반 실내 정밀 측위 시스템 + 실시간 경로 안내',
    'career.hypercloud.3': 'XREAL AR 글래스 컨텐츠 연동 프로토타입',
    'career.hypercloud.4': 'UniRx 리액티브 프로그래밍 + VContainer DI 패턴',
    'career.hypercloud.5': 'Game CI + GitHub Actions + Docker 기반 CI/CD 파이프라인 구축',
    'career.hypercloud.6': '빌드 시간 70% 단축 (Android APK/AAB, iOS, React 라이브러리)',

    // Career - DUBU
    'career.dubu.name': '(주) 두부 (DUBU Inc.)',
    'career.dubu.role': '개발팀 / Unity Developer',
    'career.dubu.1': '<span class="output-accent">마리트임</span> (2024.08~2025.05) \u2014 Flutter + Unity 하이브리드 아동 발달 앱',
    'career.dubu.2': 'Applio 기반 나레이션 자동 생성 파이프라인 구축 (비용 80% 절감)',
    'career.dubu.3': 'Midjourney/Flux + D-ID/HeyGen 영상 제작 파이프라인 (제작시간 90% 단축)',
    'career.dubu.4': 'ComfyUI 워크플로우 설계, 생성형 AI R&D 리딩',
    'career.dubu.5': '<span class="output-accent">사내 컨퍼런스</span> (2024.07~2025.03) \u2014 주간 기술 세미나 운영, Flutter 미니앱, Boids 알고리즘',
    'career.dubu.6': '<span class="output-accent">두부팡</span> (2023.06~2024.07) \u2014 느린 발달 아동 디지털 치료 앱',
    'career.dubu.7': '사용자 데이터 기반 난이도 자동 조절 시스템',
    'career.dubu.8': '<span class="output-accent">두브레인</span> (2022.12~2023.06) \u2014 아동 발달 맞춤형 놀이 앱',
    'career.dubu.9': '비개발직군 대상 파이썬 멘토링 & Git 가이드 리딩',
    'career.dubu.launched.1': '두부팡 출시',
    'career.dubu.launched.2': '마리트임',

    // Career - Newavel
    'career.newavel.name': '(주) 뉴웨이블 (Newavel)',
    'career.newavel.role': '개발부 / Unity Developer',
    'career.newavel.1': '<span class="output-accent">슈퍼콜라</span> \u2014 TCG P2E 게임 (캐리와 슈퍼콜라 IP)',
    'career.newavel.2': '크로스 플랫폼 빌드 환경 구축 (PC/Mobile)',
    'career.newavel.3': '아바타 제작 Tool 개발 \u2192 제작시간 70% 단축, 스킬 모듈화',
    'career.newavel.4': 'UniRx MVVM 패턴, Jenkins 빌드 자동화',
    'career.newavel.5': 'Python Excel \u2192 JSON 데이터 익스포트 Tool',
    'career.newavel.6': 'Addressable 패치 시스템 구축',

    // Career - Mohito Games
    'career.mohito.name': '(주) 모히또게임즈',
    'career.mohito.role': '개발팀 / Unity Developer',
    'career.mohito.1': '<span class="output-accent">HeroBall Z / CryptoBall Z</span> \u2014 NFT Commander 시스템 설계/개발',
    'career.mohito.2': 'Socket \u2192 Web 프로토콜 마이그레이션',
    'career.mohito.3': '<span class="output-accent">Comix Breaker</span> \u2014 TCG 로그라이크 전투 시스템 코어 개발',
    'career.mohito.4': '카드 연출 시스템 (Quadratic Bezier Curve), Inspector 편집 Tool 제작',
    'career.mohito.5': 'Google Admob + Mediation, IAP 연동',
    'career.mohito.6': 'Jenkins CI/CD 파이프라인 구축',
    'career.mohito.launched.1': '코믹스브레이커 출시',

    // Career - JohnyWorks
    'career.johnyworks.name': '(주) 조니웍스',
    'career.johnyworks.role': '개발팀 / Unity Developer',
    'career.johnyworks.1': '<span class="output-accent">Dig Star / Dig World</span> \u2014 P2E 모바일 게임',
    'career.johnyworks.2': 'Unity(C#) + Gamespark(TypeScript/JS) 풀스택 개발',
    'career.johnyworks.3': 'Android Studio, XCode 빌드 엔지니어링',
    'career.johnyworks.4': '광고 SDK, IAP, 리모트 푸시 연동',
    'career.johnyworks.5': '<span class="output-accent">Mystic Marble</span> \u2014 Corona(Lua) 엔진 캐주얼 퍼즐',
    'career.johnyworks.launched.1': '디그월드 출시',
    'career.johnyworks.launched.2': '디그스타 출시',

    // Education
    'career.edu.knut.name': '한국교통대학교',
    'career.edu.knut.detail': '컴퓨터정보공학과 (2010 ~ 2016)',
    'career.edu.sga.name': '서울 게임 아카데미',
    'career.edu.sga.detail': '2D/3D 게임프로그래밍 과정 수료',

    // Certifications
    'career.cert.eip': '정보처리기사',
    'career.cert.oracle': 'OCP, OCJP, OCWCD',
    'career.cert.oracle.date': 'Oracle Certified | 2015.08',
    'career.cert.kosa': 'KOSA 소프트웨어 공모전 최우수상',
    'career.cert.minister': '문화교육부 위원장 표창',
    'career.cert.minister.date': '봉사활동 | 2014',
    'career.cert.startup': '한국교통대 창업캠프 아이디어 공모전 최우수상',

    // Chat
    'chat.welcome': '장한아에 대해 궁금한 점을 물어보세요.',
    'chat.welcome_dim': '경력, 기술 스택, 프로젝트, 협업 문의 등',
    'chat.suggestion.stack': '기술 스택',
    'chat.suggestion.stack.msg': '어떤 기술 스택을 사용하나요?',
    'chat.suggestion.project': '프로젝트 소개',
    'chat.suggestion.project.msg': '주요 프로젝트를 소개해주세요',
    'chat.suggestion.outsource': '외주 문의',
    'chat.suggestion.outsource.msg': '외주 개발 가능한가요?',
    'chat.suggestion.career': '경력 소개',
    'chat.suggestion.career.msg': '경력이 어떻게 되나요?',
    'chat.input_placeholder': '메시지를 입력하세요...',
    'chat.error_connection': 'AI 어시스턴트에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.',
    'chat.error_daily_ip': '오늘 대화 횟수를 모두 사용했어요. 내일 다시 이용해주세요!',
    'chat.error_daily_global': '오늘 전체 이용량이 초과되었어요. 내일 다시 이용해주세요!'
  },

  en: {
    // Page Titles
    'page.home.title': 'HanAh Jang | Product Builder',
    'page.about.title': 'About | HanAh Jang',
    'page.skills.title': 'Skills | HanAh Jang',
    'page.projects.title': 'Projects | HanAh Jang',
    'page.career.title': 'Career | HanAh Jang',
    'page.chat.title': 'Chat | HanAh Jang',

    // Home
    'home.name': 'HanAh Jang',
    'home.tagline': "It's not about knowing the tech \u2014 it's about solving the problem.",
    'footer.copyright': '\u00A9 2025 HanAh Jang | glowElephant',

    // About
    'about.philosophy.title': 'Product Builder Philosophy',
    'about.philosophy.1': 'In the age of AI, we need people who <span class="hl">define problems and build products</span>, not just write code',
    'about.philosophy.2': 'Paradigm shift: "Can you use this tech?" \u2192 "<span class="hl">Can you solve this problem?</span>"',
    'about.philosophy.3': 'Leveraging commercial AI to <span class="hl">create real value</span>',
    'about.ai.title': 'AI in Practice',
    'about.ai.1': 'Integrated <span class="hl">OpenAI API</span> into Unity NPCs \u2192 Q&A and image analysis',
    'about.ai.2': 'Narration pipeline: <span class="hl">Applio</span> voice model training \u2192 auto-synthesis (80% cost reduction)',
    'about.ai.3': 'Child pronunciation videos: <span class="hl">Midjourney/Flux</span> \u2192 <span class="hl">Applio</span> \u2192 <span class="hl">D-ID/HeyGen</span> pipeline',
    'about.ai.4': '<span class="hl">OpenClaw + NotebookLM</span> automated morning news briefing',
    'about.ai.5': '<span class="hl">Claude Code + tmux</span> multi-session parallel dev: real-time main agent + delegated sub-agents',
    'about.ai.6': '<span class="hl">AI_Language</span> compressed inter-agent protocol \u2192 token savings + efficient collaboration',
    'about.ai.7': 'AI-First development: treating AI agents as <span class="hl">team members, not just tools</span>',
    'about.problem.title': 'Problem-Solving DNA',
    'about.problem.1': 'Card animation editing: built an Inspector <span class="hl">Tool for directors</span> to tweak directly \u2192 massive time savings',
    'about.problem.2': 'Narration outsourcing was inefficient \u2192 replaced with <span class="hl">Applio-based in-house generation pipeline</span>',
    'about.problem.3': 'Mindset: when spotting repetitive work, <span class="hl">building a tool comes first</span>',
    'about.collab.title': 'Collaboration &amp; Communication',
    'about.collab.1': 'Cross-department collaboration, quick adaptation, <span class="hl">rapport building</span>',
    'about.collab.2': 'Sees the full picture, <span class="hl">identifies bottlenecks</span>, and proactively adjusts roles',
    'about.collab.3': 'Led internal conferences, <span class="hl">Git mentoring</span> for non-dev teams, tech-sharing culture',

    // Skills (Korean tool tags)
    'skills.tool.tmux_parallel': 'tmux Parallel Sessions',
    'skills.tool.multi_agent': 'Multi-Agent Orchestration',
    'skills.tool.ai_language': 'AI_Language Protocol',

    // Projects
    'proj.ai_language.desc': 'A compressed language protocol for efficient inter-agent communication. Drastically reduces token usage compared to natural language, maximizing multi-agent system efficiency.',
    'proj.the_agents.desc': 'Agents doing the heavy lifting. A multi-agent system where multiple LLM agents collaborate to divide and conquer complex tasks.',
    'proj.bom_factory.desc': 'AI-powered content generation pipeline. Automated production flow from text to images to video.',
    'proj.pdf_to_video.desc': 'PDF \u2192 summary \u2192 generate matching images & text \u2192 auto-produce narrated video with a chosen narrator.',
    'proj.llm_local.desc': 'Local deployment of Facebook LLaMA. Offline LLM inference environment built with Ollama.',
    'proj.veo_loop.desc': '8 seconds is too short. An experimental project that chains AI-generated video clips into longer sequences.',
    'proj.pixelcrawler.desc': 'Capture it all. A CLI tool that renders web pages in a real browser to produce MHTML, PNG, and PDF snapshots.',
    'proj.snap_path.desc': 'Hotkey \u2192 capture \u2192 save \u2192 copy path to clipboard. Quick screenshot workflow automation.',
    'proj.claude_usage.desc': 'Claude API usage monitoring widget. Real-time token consumption and cost tracking.',
    'proj.universal_converter.desc': 'A universal file converter CLI supporting YouTube, local video/audio/image/text conversion and AI-powered summarization.',
    'proj.news_reporter.desc': 'Daily news reporting. RSS-based keyword news crawling \u2192 email reports at your preferred time and category.',
    'proj.simple_tcp.desc': 'A simple TCP chat example for basic network programming practice.',
    'proj.dubupang.desc': 'A digital therapy app for children with developmental delays. Adaptive difficulty based on user data, with personalized play content supporting child development.',
    'proj.comix.desc': 'TCG roguelike mobile game. Card animation system (Quadratic Bezier Curve), Admob integration, Jenkins CI/CD.',
    'proj.digworld.desc': 'Casual P2E mobile game. A digging simulation where you mine resources underground.',
    'proj.digstar.desc': 'Collectible casual mobile game. Full-stack dev with Gamespark server, build engineering.',
    'proj.minigame.desc': 'Game portfolio collection. A variety of mini-game prototypes.',
    'proj.coex_ar.desc': 'COEX indoor AR navigation app. Naver ARCeye VLsdk-based indoor positioning, real-time 3D path guidance, extensible content architecture.',
    'proj.vidfolio.desc': 'Personal portfolio site. Interactive CLI-terminal-style site with OpenClaw AI chatbot. Self-hosted via Cloudflare Tunnel.',
    'proj.private_cctv.desc': 'Turn a spare Android device into a CCTV. Personal real-time monitoring & streaming system.',
    'proj.tiktok_clone.desc': 'TikTok clone built with Flutter. A mobile app development practice project.',

    // Career - SmartPro
    'career.smartpro.name': 'SmartPro Inc.',
    'career.smartpro.role': 'Unity Developer / Digital Twin',
    'career.smartpro.1': 'Digital Twin solutions company (Daedeok Technovalley, Daejeon)',
    'career.smartpro.2': 'Digital Twin projects based on VTS (Virtual Twin Studio)',
    'career.smartpro.3': 'Nuclear facility real-time data integration & predictive maintenance system',
    'career.smartpro.4': 'Metaverse collaboration platform (VTS Meta) development',

    // Career - HyperCloud
    'career.hypercloud.name': 'HyperCloud Inc.',
    'career.hypercloud.role': 'XR Team / Unity Developer',
    'career.hypercloud.1': 'COEX indoor AR navigation app using Naver ARCeye VLsdk',
    'career.hypercloud.2': 'Unity-based indoor precision positioning + real-time path guidance',
    'career.hypercloud.3': 'XREAL AR glasses content integration prototype',
    'career.hypercloud.4': 'UniRx reactive programming + VContainer DI pattern',
    'career.hypercloud.5': 'Game CI + GitHub Actions + Docker CI/CD pipeline setup',
    'career.hypercloud.6': '70% build time reduction (Android APK/AAB, iOS, React libraries)',

    // Career - DUBU
    'career.dubu.name': 'DUBU Inc.',
    'career.dubu.role': 'Dev Team / Unity Developer',
    'career.dubu.1': '<span class="output-accent">MariTime</span> (2024.08~2025.05) \u2014 Flutter + Unity hybrid child development app',
    'career.dubu.2': 'Applio-based narration auto-generation pipeline (80% cost reduction)',
    'career.dubu.3': 'Midjourney/Flux + D-ID/HeyGen video production pipeline (90% time reduction)',
    'career.dubu.4': 'ComfyUI workflow design, generative AI R&D lead',
    'career.dubu.5': '<span class="output-accent">Internal Conference</span> (2024.07~2025.03) \u2014 weekly tech seminars, Flutter mini-apps, Boids algorithm',
    'career.dubu.6': '<span class="output-accent">DubuPang</span> (2023.06~2024.07) \u2014 digital therapy app for children with developmental delays',
    'career.dubu.7': 'Adaptive difficulty system based on user data',
    'career.dubu.8': '<span class="output-accent">DuBrain</span> (2022.12~2023.06) \u2014 personalized play app for child development',
    'career.dubu.9': 'Python mentoring & Git guide for non-dev teams',
    'career.dubu.launched.1': 'DubuPang launched',
    'career.dubu.launched.2': 'MariTime',

    // Career - Newavel
    'career.newavel.name': 'Newavel Inc.',
    'career.newavel.role': 'Dev Dept. / Unity Developer',
    'career.newavel.1': '<span class="output-accent">SuperCola</span> \u2014 TCG P2E game (Carry & SuperCola IP)',
    'career.newavel.2': 'Cross-platform build environment setup (PC/Mobile)',
    'career.newavel.3': 'Avatar creation Tool \u2192 70% production time reduction, skill modularization',
    'career.newavel.4': 'UniRx MVVM pattern, Jenkins build automation',
    'career.newavel.5': 'Python Excel \u2192 JSON data export Tool',
    'career.newavel.6': 'Addressable patch system setup',

    // Career - Mohito Games
    'career.mohito.name': 'Mohito Games Inc.',
    'career.mohito.role': 'Dev Team / Unity Developer',
    'career.mohito.1': '<span class="output-accent">HeroBall Z / CryptoBall Z</span> \u2014 NFT Commander system design & development',
    'career.mohito.2': 'Socket \u2192 Web protocol migration',
    'career.mohito.3': '<span class="output-accent">Comix Breaker</span> \u2014 TCG roguelike combat system core development',
    'career.mohito.4': 'Card animation system (Quadratic Bezier Curve), Inspector editing Tool',
    'career.mohito.5': 'Google Admob + Mediation, IAP integration',
    'career.mohito.6': 'Jenkins CI/CD pipeline setup',
    'career.mohito.launched.1': 'Comix Breaker launched',

    // Career - JohnyWorks
    'career.johnyworks.name': 'JohnyWorks Inc.',
    'career.johnyworks.role': 'Dev Team / Unity Developer',
    'career.johnyworks.1': '<span class="output-accent">Dig Star / Dig World</span> \u2014 P2E mobile game',
    'career.johnyworks.2': 'Full-stack: Unity(C#) + Gamespark(TypeScript/JS)',
    'career.johnyworks.3': 'Android Studio, Xcode build engineering',
    'career.johnyworks.4': 'Ad SDK, IAP, remote push notification integration',
    'career.johnyworks.5': '<span class="output-accent">Mystic Marble</span> \u2014 Corona(Lua) engine casual puzzle',
    'career.johnyworks.launched.1': 'DigWorld launched',
    'career.johnyworks.launched.2': 'DigStar launched',

    // Education
    'career.edu.knut.name': 'Korea National Univ. of Transportation',
    'career.edu.knut.detail': 'Computer Information Engineering (2010 ~ 2016)',
    'career.edu.sga.name': 'Seoul Game Academy',
    'career.edu.sga.detail': '2D/3D Game Programming Course',

    // Certifications
    'career.cert.eip': 'Engineer Information Processing',
    'career.cert.oracle': 'OCP, OCJP, OCWCD',
    'career.cert.oracle.date': 'Oracle Certified | 2015.08',
    'career.cert.kosa': 'KOSA Software Competition Grand Prize',
    'career.cert.minister': "Ministry of Culture & Education Chairman\u2019s Award",
    'career.cert.minister.date': 'Volunteer Service | 2014',
    'career.cert.startup': 'KNUT Startup Camp Idea Competition Grand Prize',

    // Chat
    'chat.welcome': 'Ask me anything about HanAh Jang.',
    'chat.welcome_dim': 'Career, tech stack, projects, collaboration inquiries, etc.',
    'chat.suggestion.stack': 'Tech Stack',
    'chat.suggestion.stack.msg': 'What tech stack do you use?',
    'chat.suggestion.project': 'Projects',
    'chat.suggestion.project.msg': 'Tell me about your key projects',
    'chat.suggestion.outsource': 'Hire / Freelance',
    'chat.suggestion.outsource.msg': 'Are you available for freelance work?',
    'chat.suggestion.career': 'Career',
    'chat.suggestion.career.msg': 'What is your career background?',
    'chat.input_placeholder': 'Type a message...',
    'chat.error_connection': 'Cannot connect to AI assistant. Please try again later.',
    'chat.error_daily_ip': "You've used all your chats for today. Please come back tomorrow!",
    'chat.error_daily_global': "Today's global chat limit has been reached. Please come back tomorrow!"
  }
};
