## 20260312-154732

Вот резюме из прежних чатов, для понимания контекста задачи.

#### 1

PROJECT CONTEXT SUMMARY

Goal:
Birthday gift project — small personal web service (MVP) for a girl. Core idea: personal diary web app on a custom domain.

Constraints:

- Time: 6 days
- Available time: ~2 hours/day (~12 hours total max)
- Skillset: HTML, CSS, JS, beginner React, understands REST requests
- No backend experience
- SQL knowledge: none
- AI agents may be used to assist coding
- Priority: fast MVP, not production-grade system

Core functionality (MVP):

- Personal diary
- Entries (title + text)
- Optional images
- Feed of entries
- Page for individual entry

Architecture decision:
Use WordPress as headless CMS.

Reasons:

- ready admin panel
- built-in CRUD
- media upload
- REST API
- easy for non-technical user
- installable on typical hosting

System architecture:

Frontend:
React app (Vite build)

Backend/CMS:
WordPress

Deployment layout:

domain.com → React frontend
cms.domain.com → WordPress admin/CMS

Admin access:
cms.domain.com/wp-admin

API source:
cms.domain.com/wp-json/wp/v2/posts

React consumes WordPress REST API.

User interaction:
Girl can log in to WordPress admin and create/edit diary entries via UI.

Frontend responsibility:

- fetch posts
- render feed
- render single entry page

Backend responsibility:

- store entries
- manage media
- authentication
- admin interface

Tech stack:

- React
- Vite
- WordPress
- REST API
- hosting + domain

Optional deployment:
React on Vercel or static hosting.

Design philosophy:
Keep MVP extremely small and achievable within ~12 hours.
Focus on emotional value (personal domain + private space).
Avoid complex architecture, state systems, or backend coding.

#### 2

PROJECT EXTENSION SUMMARY

MVP setup:

- React frontend (Vite build)
- WordPress CMS headless
- Deployment layout:
  domain.com → React app
  cms.domain.com → WordPress
- WordPress admin: cms.domain.com/wp-admin
- React fetches API: cms.domain.com/wp-json/wp/v2/posts

WordPress installation:

- Recommended: subdomain cms.domain.com
- No index.php/.htaccess edits required
- URL settings: WordPress Address = Site Address = cms.domain.com
- Subdomain DNS:
  - created on hosting
  - if only 1 domain, "all additional domains" checkbox doesn't change outcome
  - API and admin accessible immediately

React frontend:

- build outputs static files (index.html + assets)
- SPA routing works via index.html
- Server must redirect unknown routes to index.html (.htaccess for Apache)
- No Node.js server needed
- Fetches posts/media from WordPress API

Alternative deployment notes:

- React can also be hosted on Vercel/Netlify, connecting to cms.domain.com API
- Images served via WordPress media library, accessible in React

Private access:

- WordPress REST API is public by default
- Can add password protection or token if diary should be private

Folder structure example:
/public_html
index.html (React build)
/public_html/cms
wp-admin
wp-content
wp-includes

Simplifications for MVP:

- Use default Posts + category "Diary"
- Avoid custom post types, backend coding, or complex routing
- Focus on fast, personal, functional MVP

#### 3

PROJECT CONTEXT SUMMARY – WP + React API

Goal:
Use WordPress on subdomain (cms.alena15world.ru) as headless CMS for a personal diary React app on main domain. MVP: fast, simple, personal diary with optional images, feed, and single entry view.

Current setup:

WP 6.9.1 installed on cms.alena15world.ru

React frontend fetches posts via REST API: /wp-json/wp/v2/posts, can filter by category (Diary, ID 2)

Admin interface is standard WP, unchanged

Roles: built-in (Admin, Editor, Author, Contributor, Subscriber); assign via Users → select user → Role → Update

React can read posts without auth; creating/editing posts requires auth

Authorization options:

WP session (same domain, uses cookies + nonce) – works but inconvenient

JWT plugin (recommended) – separate React login form, token used in headers for POST/PUT/DELETE

Settings / Extensions:

Permalinks, media, categories: mostly default for MVP

Images stored via WP media library, accessible through API

Expanding React app (media upload, publishing) does not require additional WP backend coding

Design philosophy:

Keep MVP small and achievable (~12 hours)

WP acts as storage + admin panel

React provides interactive frontend

Future: secure POST/PUT via JWT, optional aesthetic enhancements for diary

Tech stack:

Frontend: React (Vite build)

Backend/CMS: WordPress

API: WP REST API

Hosting: main domain + subdomain for WP admin

---

###

Permalinks настроены на post name

vite проект подготовлен (установлены)

Сейчас надо простоесть связь бэка и фронта -- простой код для react который должен дёгать ручки базы из wp -- создавать посты на основе имеющихся и добавлять новые в базу -- и создавать на основе их уже дополнительные
