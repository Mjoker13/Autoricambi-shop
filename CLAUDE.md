# Autoricambi-shop — CLAUDE.md

## Cos'è questo progetto

E-commerce per la vendita di ricambi auto usati/originali. Permette agli utenti di navigare per marca e modello di auto, visualizzare i ricambi disponibili e aggiungerli al carrello. Include un'area admin per la gestione del catalogo (marche, modelli, ricambi).

## Stack

- **Backend**: Java / Spring Boot — porta 8080
- **Frontend**: React (React Router, React Bootstrap, react-icons) — porta 3000
- **Database**: MySQL — schema: `auto_ricambi`
- **Auth**: nessuna autenticazione reale implementata (la pagina Login è un placeholder)
- **Nessun Docker Compose** — avvio manuale dei singoli componenti

## Come avviarlo

```powershell
# Backend — richiede variabili d'ambiente (vedi sezione sotto)
cd C:\progetti\Autoricambi-shop\Backend
mvn spring-boot:run

# Frontend
cd C:\progetti\Autoricambi-shop\Frontend
npm install
npm start   # dev server su http://localhost:3000
```

Il frontend chiama il backend direttamente su `http://localhost:8080` (nessun API gateway intermedio).

## Endpoint principali

Tutti gli endpoint sono aperti, nessuna autenticazione richiesta. CORS abilitato con `@CrossOrigin` su tutti i controller.

### Marche (`/api/v1/marche`)

| Metodo | Path | Descrizione |
|--------|------|-------------|
| GET | /api/v1/marche | Lista tutte le marche (opzionale: `?keyword=`) |
| GET | /api/v1/marche/{id} | Singola marca per ID |
| POST | /api/v1/marche | Crea nuova marca |
| PUT | /api/v1/marche/{id} | Aggiorna marca |
| DELETE | /api/v1/marche/{id} | Elimina marca |
| POST | /api/v1/marche/{id}/model | Crea modello associato a una marca |

### Modelli (`/api/v1/modelli`)

| Metodo | Path | Descrizione |
|--------|------|-------------|
| GET | /api/v1/modelli | Lista tutti i modelli (opzionale: `?keyword=`) |
| POST | /api/v1/modelli/{marca_id} | Crea modello per la marca indicata |
| PUT | /api/v1/modelli/{marca_id}/{id} | Aggiorna modello |
| DELETE | /api/v1/modelli/{id} | Elimina modello |

### Ricambi (`/api/v1/ricambi`)

| Metodo | Path | Descrizione |
|--------|------|-------------|
| GET | /api/v1/ricambi | Lista tutti i ricambi (opzionale: `?keyword=`, cerca su name/category/reference) |
| GET | /api/v1/ricambi/{id} | Singolo ricambio per ID |
| POST | /api/v1/ricambi/{modelli_id} | Crea ricambio associato a un modello |
| PUT | /api/v1/ricambi/{id} | Aggiorna ricambio (senza cambiare modello) |
| PUT | /api/v1/ricambi/{modelli_id}/{id} | Aggiorna ricambio e riassegna modello |
| DELETE | /api/v1/ricambi/{id} | Elimina ricambio |

## Struttura package Backend

```
Final_project.finalproject/
├── FinalprojectApplication.java        ← main class
├── Controller/
│   ├── MarcaController.java            ← /api/v1/marche
│   ├── ModelliController.java          ← /api/v1/modelli
│   └── RicambiController.java          ← /api/v1/ricambi
├── Entity/
│   ├── Marca.java                      ← tabella marca_auto
│   ├── Modelli.java                    ← tabella modelli
│   ├── Ricambi.java                    ← tabella ricambi
│   └── RicambiDTO.java                 ← DTO (attualmente non usato — metodi commentati)
└── Repository/
    ├── MarcaRepo.java
    ├── ModelliRepo.java
    └── RicambiRepo.java
```

Nota: il progetto non segue la struttura Controller/Service/Repository standard — la business logic è direttamente nei Controller. Non c'è livello Service.

## Struttura Frontend

```
Frontend/src/
├── Api.js                   ← tutte le chiamate HTTP centralizzate qui
├── App.js                   ← routing e stato globale (brand, model, sparePart, cart)
├── index.js
├── components/
│   ├── Brand.js / BrandList.js / BrandAdmin.js
│   ├── Model.js / ModelList.js / ModelAdmin.js
│   ├── SparePart.js / SparePartsList.js / SparePartAdmin.js
│   ├── Cart.js              ← componente carrello (sidebar/dropdown)
│   ├── SearchBar.js         ← barra di ricerca + icona carrello
│   └── style.css
└── pages/
    ├── Homepage.js
    ├── BrandsPage.js        ← /Brand
    ├── ModelPage.js         ← /Model
    ├── SparePartsPage.js    ← /SpareParts
    ├── Admin.js             ← /admin (dashboard admin)
    ├── BrandAdminPage.js    ← /BrandAdminPage
    ├── ModelAdminPage.js    ← /ModelAdminPage
    ├── SpareAdminPage.js    ← /SparePartsAdminPage
    ├── PaymentPage.js       ← /PaymentPage
    └── Login.js             ← /Login (placeholder, nessuna auth reale)
```

## Schema Database (`auto_ricambi`)

| Tabella | Entità | Campi chiave |
|---------|--------|--------------|
| marca_auto | Marca | id, name, image, year_of_fondation |
| modelli | Modelli | id, name, year_of_production, image, marca_id (FK) |
| ricambi | Ricambi | id, name, price, category, quantity, reference, modelli_id (FK) |

Relazioni: Marca 1→N Modelli 1→N Ricambi.

Il file `Backend/src/main/resources/data.sql` contiene dati iniziali realistici: 10 marche (Alfa Romeo, BMW, Audi, Mercedes, Fiat, Renault, Ford, Opel, Nissan, Lancia) con circa 40 modelli e 30+ ricambi.

DDL gestione: `spring.jpa.hibernate.ddl-auto=none` — lo schema deve esistere prima dell'avvio. Cambiare in `update` per far generare le tabelle a Hibernate in sviluppo.

## Variabili d'ambiente richieste

| Variabile | Descrizione | Esempio dev |
|-----------|-------------|-------------|
| MYSQL_HOST | Host MySQL | localhost |
| MYUSER | Username MySQL | root |
| MYPSW | Password MySQL | (commentata in application.properties — vedi nota) |

**Attenzione**: la riga `spring.datasource.password=${MYPSW}` è commentata in `application.properties`. Se il tuo MySQL ha una password, decommentarla e impostare la variabile d'ambiente `MYPSW`.

## Carrello

Il carrello è gestito interamente lato frontend tramite `localStorage` — nessuna persistenza server-side. Lo stato del carrello vive in `App.js` e viene propagato ai componenti via props.

## Aree critiche (trattare con cura)

- `App.js` — contiene tutto lo stato globale e le funzioni cart; è il componente radice, modificarlo impatta tutta l'app
- `Api.js` — base URL hardcoded a `http://localhost:8080`; se la porta cambia va aggiornato qui
- `application.properties` — la password DB è commentata; attenzione a non avviare senza configurare correttamente le variabili d'ambiente
- `data.sql` — viene eseguito solo se `spring.sql.init.mode=always` è attivo (attualmente commentato); in caso di re-run su DB non vuoto genererebbe duplicati

## TODO noti

- [ ] Nessuna autenticazione reale — la pagina Login non ha backend, l'area admin è accessibile senza credenziali
- [ ] Nessun Docker Compose — impossibile avviare lo stack con un solo comando
- [ ] `RicambiDTO.java` e i metodi `/api/v1/ricambi/dto` sono completamente commentati nel controller — da decidere se rimuovere o implementare
- [ ] `spring.jpa.hibernate.ddl-auto=none` richiede creazione manuale dello schema — aggiungere script DDL o cambiare in `update` per dev
- [ ] Password MySQL commentata in application.properties — va decommentata e gestita via env var
- [ ] URL backend hardcoded in `Api.js` — estrarre in variabile d'ambiente React (`REACT_APP_API_URL`)
- [ ] Nessuna gestione pagamento reale in `PaymentPage.js`
- [ ] Nessun `.env.example` — aggiungere per documentare le variabili necessarie
- [ ] La logica business è nei Controller anziché in un livello Service separato
- [ ] `decrementQuantity` e `incrementQuantity` in `App.js` modificano oggetti state direttamente (mutation) — bug potenziale React
