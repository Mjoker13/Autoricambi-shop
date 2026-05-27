# Autoricambi-shop — Project Status

> Aggiornato: 2026-05-27 (sessione 3)
> Obiettivo: Portare il progetto in produzione (e-commerce ricambi auto)

---

## Stack

- **Frontend**: React — `Frontend/`
- **Backend**: Java Spring Boot porta 8080 — `Backend/`
- **Database**: MySQL schema `auto_ricambi`
- **Auth prevista**: Spring Security + JWT (da implementare)
- **Infrastruttura prevista**: Docker Compose + nginx

---

## Stato attuale: 🟡 Funzionante in locale (con fix applicati)

### ✅ Completato

- [x] Analisi completa del codebase (2026-05-27)
- [x] CLAUDE.md creato con documentazione base
- [x] Fix BLOCKER tecnici (2026-05-27):
  - `Api.js` — `PutBrand` bug risolto (`"/id"` → `"/" + id`)
  - `Api.js` — `BASE_URL` centralizzato via `process.env.REACT_APP_API_URL`
  - `App.js` — mutazioni stato React corrette (sparePart, cart) — ora usa `.map()` immutabile
  - `App.js` — `localStorage` fallback da `|| []` a `|| "[]"` (prevenuto crash su sessione fresca)
  - `PaymentPage.js` — `class=` → `className=` (JSX fix, stili Bootstrap ora funzionanti)
  - `application.properties` — password MySQL decommentata
- [x] **FASE 1 — Autenticazione JWT** (2026-05-27):
  - Backend: `pom.xml` creato, Spring Security + JJWT 0.12.5, `JwtUtil`, `JwtAuthFilter`, `SecurityConfig`
  - Backend: `DataInitializer` crea utente admin/admin123 al primo avvio (con warning cambio password)
  - Backend: `AuthController` `POST /api/v1/auth/login`, `User` entity, `application.properties` aggiornato
  - Frontend: `package.json` creato, `AuthContext`, `PrivateRoute`, `Login.js` con chiamata API reale
  - Frontend: `Api.js` riscritto con `getAuthHeaders()`, tutte le chiamate admin protette
  - Frontend: `App.js` — tutte le route admin protette con `PrivateRoute`
- [x] **FASE UI — Redesign completo Frontend** (2026-05-27):
  - Design system: CSS variables (Navy #0A1628 + Orange #F97316), font Inter + Barlow Condensed
  - `public/index.html` — Google Fonts, meta description, lang=it
  - `style.css` — riscritto completamente (~400 righe), tutte le vecchie regole rotte rimosse
  - `SearchBar.js` — navbar sticky navy, link italiani, search con stile
  - `Cart.js` — offcanvas navy, qty controls circolari, totale con Barlow Condensed
  - `Brand.js`, `Model.js`, `SparePart.js` — card con hover lift, badge stock colorati, CTA orange
  - `BrandList.js`, `ModelList.js`, `SparePartsList.js` — CSS grid responsive, empty state
  - `Homepage.js` — hero section, USP bar (4 pillars), info cards, orari table, CTA finale
  - `BrandsPage.js`, `ModelPage.js`, `SparePartsPage.js` — page header con conteggio risultati
  - `Login.js` — pagina full-screen, show/hide password, spinner loading
  - `App.js` — layout pulito, footer navy con brand + contatti + nav + copyright
  - Build: ✅ `Compiled successfully` zero warning

---

## 🔴 Blockers rimasti (da fare prima del deploy)

| # | Problema | File | Effort |
|---|----------|------|--------|
| ~~1~~ | ~~Nessuna autenticazione reale~~ | ~~Backend + Frontend~~ | ✅ Done |
| ~~2~~ | ~~Area admin senza protezione~~ | ~~`App.js` routes~~ | ✅ Done |
| 3 | `@CrossOrigin` wildcard su tutti i controller | 3 controller | 30 min |
| 4 | PaymentPage placeholder (Stripe non integrato) | `PaymentPage.js` | 1-2 gg |

---

## 📋 Roadmap verso produzione

### ✅ FASE 1 — Autenticazione — COMPLETATA

### ✅ FASE UI — Redesign Frontend — COMPLETATA

### FASE 2 — Docker + Infrastruttura (PROSSIMO STEP)
**Obiettivo**: tutto parte con `docker-compose up`

- [ ] `Dockerfile` multi-stage per il backend Spring Boot
- [ ] `Dockerfile` per il frontend React (build + nginx serve)
- [ ] `docker-compose.yml` con: MySQL + backend + nginx
- [ ] `nginx.conf` come reverse proxy (frontend su `/`, API su `/api/`)
- [ ] `.env.example` con tutte le variabili
- [ ] Script di init DB (`schema.sql` + `data.sql`)

### FASE 3 — Qualità del codice
**Obiettivo**: codebase manutenibile

- [ ] Introdurre service layer (`MarcaService`, `ModelliService`, `RicambiService`)
- [ ] DTO per tutte le API (request e response)
- [ ] Paginazione sulle API di lista (`/api/v1/ricambi?page=0&size=20`)
- [ ] Logging SLF4J in tutti i controller/service
- [ ] Spring Boot Actuator per health check
- [ ] Rimuovere codice commentato dai controller
- [ ] `@Valid` su tutti i `@RequestBody`

### FASE 4 — Pagamenti reali
**Obiettivo**: checkout funzionante

- [ ] Integrare Stripe (test mode)
- [ ] Stripe Elements nel frontend (carta mai tocca il backend)
- [ ] Backend: verificare `payment_intent_id` da Stripe
- [ ] Order entity per tracciare gli ordini

### FASE 5 — Quality Gate & Deploy
**Obiettivo**: production-ready

- [ ] Test suite backend (JUnit, almeno service layer)
- [ ] Test E2E frontend (Cypress o Playwright)
- [ ] Security review finale
- [ ] HTTPS con certificato reale (Let's Encrypt)
- [ ] Documentazione API (Swagger/OpenAPI)

---

## Decisioni architetturali prese

| Data | Decisione | Motivazione |
|------|-----------|-------------|
| 2026-05-27 | Auth: Spring Security + JWT semplice (no Keycloak) | Progetto standalone, più semplice da configurare |
| 2026-05-27 | Deploy target: Docker Compose + nginx | Demo locale prima, cloud dopo |

---

## Note / TODO per la prossima sessione

- **FASE 2** — Docker Compose + nginx: prossimo passo logico
  - Dockerfile backend (JDK 21 multi-stage)
  - Dockerfile frontend (build React + nginx serve)
  - `docker-compose.yml`: MySQL + backend + nginx
  - `nginx.conf`: frontend su `/`, API su `/api/`
- Fix CORS: rimuovere `@CrossOrigin` wildcard dai controller, spostare configurazione in `SecurityConfig`
- Unit test (FASE 5 anticipata): JwtUtil, AuthController, Login.js con `@test-engineer`
- **Ricordarsi**: per commit usare `@git-manager`, non committare automaticamente
