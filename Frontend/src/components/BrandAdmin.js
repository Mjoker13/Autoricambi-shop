import { useState } from "react";
import { BsTrash, BsPlusLg, BsFillPencilFill } from "react-icons/bs";
import Modal from "react-bootstrap/Modal";
import "../components/style.css";

const EMPTY = { name: "", image: "", yearOfFondation: "" };

const validate = (s) => {
  const e = {};
  if (!s.name.trim())                                              e.name = "Nome marca obbligatorio";
  if (!s.image.trim())                                             e.image = "URL immagine obbligatorio";
  const yr = Number(s.yearOfFondation);
  if (!yr || yr < 1882 || yr > new Date().getFullYear())
    e.yearOfFondation = "Anno non valido (min 1882)";
  return e;
};

export const BrandAdmin = ({ data, insertBrand, delBrand, updateBrand }) => {
  const [form,      setForm]      = useState(EMPTY);
  const [errors,    setErrors]    = useState({});
  const [showAdd,   setShowAdd]   = useState(false);
  const [showEdit,  setShowEdit]  = useState(false);
  const [editingId, setEditingId] = useState(null);

  const handleChange = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  // ── Aggiungi ──────────────────────────────────────────────────────────────
  const handleSubmitAdd = (e) => {
    e.preventDefault();
    const err = validate(form);
    if (Object.keys(err).length) { setErrors(err); return; }
    insertBrand(form);
    setForm(EMPTY);
    setErrors({});
    setShowAdd(false);
  };

  // ── Modifica ─────────────────────────────────────────────────────────────
  const openEdit = (el) => {
    setEditingId(el.id);
    setForm({ name: el.name, image: el.image || "", yearOfFondation: el.yearOfFondation || "" });
    setErrors({});
    setShowEdit(true);
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    const err = validate(form);
    if (Object.keys(err).length) { setErrors(err); return; }
    updateBrand(form, editingId);
    setForm(EMPTY);
    setErrors({});
    setShowEdit(false);
    setEditingId(null);
  };

  const handleDel = (id, name) => {
    if (window.confirm(`Elimina la marca "${name}"? L'operazione non è reversibile.`))
      delBrand(id);
  };

  // ── Form condiviso ────────────────────────────────────────────────────────
  const FormFields = () => (
    <>
      <div className="mb-3">
        <label className="ar-form-label">Nome marca *</label>
        <input
          type="text"
          className={`form-control ar-form-input${errors.name ? " is-invalid" : ""}`}
          placeholder="es. Alfa Romeo, Audi, Ferrari…"
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
          autoFocus
        />
        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
      </div>

      <div className="mb-3">
        <label className="ar-form-label">URL immagine / logo *</label>
        <input
          type="url"
          className={`form-control ar-form-input${errors.image ? " is-invalid" : ""}`}
          placeholder="https://…"
          value={form.image}
          onChange={(e) => handleChange("image", e.target.value)}
        />
        {errors.image && <div className="invalid-feedback">{errors.image}</div>}
        {form.image && (
          <div className="mt-2" style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
            Anteprima:{" "}
            <img
              src={form.image}
              alt="preview"
              style={{ height: 32, marginLeft: 6, borderRadius: 4, verticalAlign: 'middle' }}
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>
        )}
      </div>

      <div className="mb-1">
        <label className="ar-form-label">Anno di fondazione *</label>
        <input
          type="number"
          className={`form-control ar-form-input${errors.yearOfFondation ? " is-invalid" : ""}`}
          placeholder="es. 1910"
          min="1882"
          max={new Date().getFullYear()}
          value={form.yearOfFondation}
          onChange={(e) => handleChange("yearOfFondation", Number(e.target.value))}
        />
        {errors.yearOfFondation && <div className="invalid-feedback">{errors.yearOfFondation}</div>}
      </div>
    </>
  );

  return (
    <>
      {/* ── Toolbar ── */}
      <div className="d-flex justify-content-end mb-3">
        <button
          className="ar-add-cart-btn btn d-flex align-items-center gap-2"
          style={{ fontSize: '0.9rem', padding: '0.55rem 1.1rem' }}
          onClick={() => { setForm(EMPTY); setErrors({}); setShowAdd(true); }}
        >
          <BsPlusLg /> Aggiungi marca
        </button>
      </div>

      {/* ── Tabella ── */}
      <div className="ar-admin-table-wrap">
        <table className="table table-borderless mb-0">
          <thead>
            <tr>
              <th>#</th>
              <th>Nome</th>
              <th>Logo</th>
              <th>Anno fondazione</th>
              <th style={{ textAlign: 'right' }}>Azioni</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', color: 'var(--color-text-muted)', padding: '2rem' }}>
                  Nessuna marca presente. Clicca "Aggiungi marca" per iniziare.
                </td>
              </tr>
            ) : (
              data.map((el, i) => (
                <tr key={el.id}>
                  <td style={{ color: 'var(--color-text-muted)', width: 40 }}>{i + 1}</td>
                  <td><span style={{ fontWeight: 600 }}>{el.name}</span></td>
                  <td>
                    {el.image ? (
                      <img
                        src={el.image}
                        alt={el.name}
                        style={{ height: 28, maxWidth: 60, objectFit: 'contain' }}
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    ) : (
                      <span style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>—</span>
                    )}
                  </td>
                  <td style={{ color: 'var(--color-text-muted)' }}>{el.yearOfFondation || '—'}</td>
                  <td style={{ textAlign: 'right' }}>
                    <div className="d-flex gap-1 justify-content-end">
                      <button
                        className="ar-admin-btn-edit btn"
                        title="Modifica"
                        onClick={() => openEdit(el)}
                      >
                        <BsFillPencilFill />
                      </button>
                      <button
                        className="ar-admin-btn-del btn"
                        title={`Elimina ${el.name}`}
                        onClick={() => handleDel(el.id, el.name)}
                      >
                        <BsTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ── Modal Aggiungi ── */}
      <Modal show={showAdd} onHide={() => setShowAdd(false)} className="ar-admin-modal" centered>
        <Modal.Header closeButton>
          <Modal.Title>Nuova Marca</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmitAdd}>
          <Modal.Body><FormFields /></Modal.Body>
          <Modal.Footer>
            <button type="button" className="btn btn-outline-secondary" onClick={() => setShowAdd(false)}>
              Annulla
            </button>
            <button type="submit" className="btn ar-btn-primary">
              Salva marca
            </button>
          </Modal.Footer>
        </form>
      </Modal>

      {/* ── Modal Modifica ── */}
      <Modal show={showEdit} onHide={() => setShowEdit(false)} className="ar-admin-modal" centered>
        <Modal.Header closeButton>
          <Modal.Title>Modifica Marca</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmitEdit}>
          <Modal.Body><FormFields /></Modal.Body>
          <Modal.Footer>
            <button type="button" className="btn btn-outline-secondary" onClick={() => setShowEdit(false)}>
              Annulla
            </button>
            <button type="submit" className="btn ar-btn-primary">
              Salva modifiche
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};
