# Autoricambi-shop — Project Status

> Aggiornato: 2026-05-27
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

---

## 🔴 Blockers rimasti (da fare prima del deploy)

| # | Problema | File | Effort |
|---|----------|------|--------|
| 1 | Nessuna autenticazione reale | Backend + Frontend | 2-3 gg |
| 2 | Area admin senza protezione | `App.js` routes + Spring Security | incluso in #1 |
| 3 | `@CrossOrigin` wildcard su tutti i controller | 3 controller | 30 min |
| 4 | PaymentPage placeholder (Stripe non integrato) | `PaymentPage.js` | 1-2 gg |

---

## 📋 Roadmap verso produzione

### FASE 1 — Autenticazione (PROSSIMO STEP)
**Obiettivo**: login reale con JWT, area admin protetta

Backend:
- [ ] Aggiungere dipendenze: `spring-boot-starter-security`, `jjwt`
- [ ] Creare entity `User` (username, password_hash, role)
- [ ] Creare `AuthController` con `POST /api/v1/auth/login` → ritorna JWT
- [ ] Configurare `SecurityFilterChain`: GET pubblici, POST/PUT/DELETE richiedono ruolo ADMIN
- [ ] Restringere `@CrossOrigin` a `http://localhost:3000`

Frontend:
- [ ] Aggiornare `Login.js` con vera chiamata API + gestione token
- [ ] Creare `AuthContext` per gestire lo stato di autenticazione
- [ ] Creare componente `PrivateRoute` che verifica il token
- [ ] Aggiungere header `Authorization: Bearer {token}` in Api.js per le chiamate admin
- [ ] Proteggere le route `/admin`, `/BrandAdminPage`, `/ModelAdminPage`, `/SparePartsAdminPage`

### FASE 2 — Docker + Infrastruttura
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

- Iniziare da FASE 1 — autenticazione JWT
- User admin iniziale: creare script SQL in `data.sql` con utente `admin` / password hashata
- Ricordarsi di creare `.env` locale prima di avviare (variabili `MYSQL_HOST`, `MYUSER`, `MYPSW`)
