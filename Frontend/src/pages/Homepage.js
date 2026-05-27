import "../components/style.css";
import { Link } from "react-router-dom";
import {
  BsShieldCheck,
  BsTruck,
  BsHeadset,
  BsFillPinMapFill,
  BsArrowRight,
  BsClock,
  BsCheckCircle,
  BsTelephone,
  BsFacebook,
} from "react-icons/bs";

const MAP_URL = "https://goo.gl/maps/fNGPe8YLToUBTTN8A";

const USP_ITEMS = [
  {
    icon: <BsShieldCheck />,
    title: "Ricambi certificati",
    desc: "Originali e compatibili garantiti",
  },
  {
    icon: <BsTruck />,
    title: "Spedizione rapida",
    desc: "Consegna in 24/48h su tutto il territorio",
  },
  {
    icon: <BsHeadset />,
    title: "Supporto tecnico",
    desc: "Consulenza specializzata sempre disponibile",
  },
  {
    icon: <BsCheckCircle />,
    title: "Reso facile",
    desc: "30 giorni per restituire il prodotto",
  },
];

const OPENING_HOURS = [
  { day: "Lunedì",    am: "09:00 – 13:00", pm: "14:30 – 18:00" },
  { day: "Martedì",   am: "09:00 – 13:00", pm: "14:30 – 18:00" },
  { day: "Mercoledì", am: "09:00 – 13:00", pm: "14:30 – 18:00" },
  { day: "Giovedì",   am: "09:00 – 13:00", pm: "14:30 – 18:00" },
  { day: "Venerdì",   am: "09:00 – 13:00", pm: "14:30 – 18:00" },
];

export const Homepage = () => (
  <>
    {/* ── Hero ── */}
    <section className="ar-hero">
      <div className="container">
        <span className="ar-hero-tag">
          Ricambi auto originali e compatibili
        </span>

        <h1 className="ar-hero-title">
          Il ricambio giusto<br />
          per la tua <span>auto</span>
        </h1>

        <p className="ar-hero-subtitle">
          Trova velocemente il pezzo che ti serve tra migliaia di ricambi
          originali e compatibili. Consegna rapida, qualità garantita.
        </p>

        <div className="d-flex flex-wrap gap-3">
          <Link to="/SpareParts" className="ar-hero-cta">
            Trova ricambi <BsArrowRight />
          </Link>
          <Link to="/Brand" className="ar-hero-cta-outline">
            Sfoglia le marche
          </Link>
        </div>
      </div>
    </section>

    {/* ── USP Bar ── */}
    <section className="ar-usp-bar">
      <div className="container">
        <div className="row g-0">
          {USP_ITEMS.map((item, i) => (
            <div key={i} className="col-12 col-sm-6 col-lg-3">
              <div className="ar-usp-item">
                <div className="ar-usp-icon">{item.icon}</div>
                <div className="ar-usp-text">
                  <strong>{item.title}</strong>
                  <small>{item.desc}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ── Info + Orari ── */}
    <section className="container mb-5">
      <div className="row g-4 align-items-start">
        {/* Info cards */}
        <div className="col-lg-6">
          <h2 className="page-title">Come funziona</h2>
          <div className="row g-3">
            <div className="col-12 col-sm-6">
              <div className="ar-info-card">
                <div className="ar-info-card-icon"><BsShieldCheck /></div>
                <div className="ar-info-card-title">Qualità garantita</div>
                <p className="ar-info-card-text">
                  Tutti i ricambi sono verificati e certificati per il tuo veicolo.
                </p>
              </div>
            </div>
            <div className="col-12 col-sm-6">
              <div className="ar-info-card">
                <div className="ar-info-card-icon"><BsTruck /></div>
                <div className="ar-info-card-title">Spedizione veloce</div>
                <p className="ar-info-card-text">
                  Ordina entro le 14:00 e ricevi il pezzo già il giorno dopo.
                </p>
              </div>
            </div>
            <div className="col-12 col-sm-6">
              <div className="ar-info-card">
                <div className="ar-info-card-icon"><BsHeadset /></div>
                <div className="ar-info-card-title">Supporto esperto</div>
                <p className="ar-info-card-text">
                  Il nostro team tecnico ti aiuta a trovare il ricambio corretto.
                </p>
              </div>
            </div>
            <div className="col-12 col-sm-6">
              <div className="ar-info-card">
                <div className="ar-info-card-icon"><BsFillPinMapFill /></div>
                <div className="ar-info-card-title">Vienici a trovare</div>
                <p className="ar-info-card-text">
                  Puoi ritirare il tuo ordine direttamente in negozio.{" "}
                  <a href={MAP_URL} target="_blank" rel="noreferrer" style={{ color: 'var(--color-accent)', fontWeight: 600 }}>
                    Vedi mappa →
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Orari */}
        <div className="col-lg-6">
          <h2 className="page-title">
            <BsClock style={{ marginRight: '0.5rem', fontSize: '1.2rem' }} />
            Orari di apertura
          </h2>
          <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>
            <table className="ar-hours-table">
              <thead>
                <tr>
                  <th>Giorno</th>
                  <th>Mattina</th>
                  <th>Pomeriggio</th>
                </tr>
              </thead>
              <tbody>
                {OPENING_HOURS.map((row) => (
                  <tr key={row.day}>
                    <th>{row.day}</th>
                    <td>{row.am}</td>
                    <td>{row.pm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Contatti rapidi */}
          <div
            className="mt-4 p-4"
            style={{
              background: 'var(--color-primary)',
              borderRadius: 'var(--radius-lg)',
              color: 'rgba(255,255,255,.85)',
            }}
          >
            <h5
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: '1.15rem',
                marginBottom: '1rem',
                color: '#fff',
              }}
            >
              Contattaci direttamente
            </h5>
            <div className="d-flex flex-column gap-2">
              <a
                href="tel:4738338484"
                style={{ color: 'rgba(255,255,255,.8)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}
              >
                <BsTelephone style={{ color: 'var(--color-accent)' }} />
                Tel: 473 833 8484
              </a>
              <a
                href="tel:6272383933"
                style={{ color: 'rgba(255,255,255,.8)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}
              >
                <BsTelephone style={{ color: 'var(--color-accent)' }} />
                Cell: 627 238 3933
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                style={{ color: 'rgba(255,255,255,.8)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}
              >
                <BsFacebook style={{ color: 'var(--color-accent)' }} />
                Auto_Ricambi su Facebook
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ── CTA finale ── */}
    <section
      style={{
        background: 'linear-gradient(135deg, var(--color-accent) 0%, #FBBF24 100%)',
        padding: '3.5rem 1.5rem',
        textAlign: 'center',
        marginBottom: 0,
      }}
    >
      <div className="container">
        <h2
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: 800,
            color: '#fff',
            marginBottom: '0.75rem',
          }}
        >
          Pronto a trovare il tuo ricambio?
        </h2>
        <p style={{ color: 'rgba(255,255,255,.85)', marginBottom: '1.75rem', fontSize: '1rem' }}>
          Oltre 10.000 ricambi disponibili per tutte le marche e modelli.
        </p>
        <Link
          to="/SpareParts"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'var(--color-primary)',
            color: '#fff',
            fontWeight: 700,
            padding: '0.9rem 2.25rem',
            borderRadius: 'var(--radius-md)',
            textDecoration: 'none',
            fontSize: '1rem',
          }}
        >
          Inizia a cercare <BsArrowRight />
        </Link>
      </div>
    </section>
  </>
);
