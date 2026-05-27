import { useState } from "react";
import { BsTrash, BsPlusLg, BsFillPencilFill } from "react-icons/bs";
import Modal from "react-bootstrap/Modal";
import "../components/style.css";

const EMPTY = { marca: "", name: "", image: "", yearOfProduction: "" };

// Validazione per ADD (richiede marca)
const validateAdd = (s) => {
  const e = {};
  if (!s.marca)         e.marca = "Seleziona una marca";
  if (!s.name.trim())   e.name  = "Nome modello obbligatorio";
  if (!s.image.trim())  e.image = "URL immagine obbligatorio";
  if (!s.yearOfProduction || s.yearOfProduction < 1894 || s.yearOfProduction > new Date().getFullYear())
    e.yearOfProduction = "Anno non valido (min 1894)";
  return e;
};

// Validazione per EDIT (marca non modificabile)
const validateEdit = (s) => {
  const e = {};
  if (!s.name.trim())   e.name  = "Nome modello obbligatorio";
  if (!s.image.trim())  e.image = "URL immagine obbligatorio";
  if (!s.yearOfProduction || s.yearOfProduction < 1894 || s.yearOfProduction > new Date().getFullYear())
    e.yearOfProduction = "Anno non valido (min 1894)";
  return e;
};

export const ModelAdmin = ({ data, insertModel, delModel, updateModel, brand }) => {
  const [form,      setForm]      = useState(EMPTY);
  const [errors,    setErrors]    = useState({});
  const [showAdd,   setShowAdd]   = useState(false);
  const [showEdit,  setShowEdit]  = useState(false);
  const [editingId, setEditingId] = useState(null);

  const handleChange = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  // ── Aggiungi ──────────────────────────────────────────────────────────────
  const handleSubmitAdd = (e) => {
    e.preventDefault();
    const err = validateAdd(form);
    if (Object.keys(err).length) { setErrors(err); return; }
    insertModel(form, form.marca);
    setForm(EMPTY);
    setErrors({});
    setShowAdd(false);
  };

  // ── Modifica ──────────────────────────────────────────────────────────────
  const openEdit = (el) => {
    setEditingId(el.id);
    setForm({
      marca: el.marcaId || el.marca || "",
      name: el.name || "",
      image: el.image || "",
      yearOfProduction: el.yearOfProduction || "",
    });
    setErrors({});
    setShowEdit(true);
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    const err = validateEdit(form);
    if (Object.keys(err).length) { setErrors(err); return; }
    updateModel({ name: form.name, image: form.image, yearOfProduction: form.yearOfProduction }, editingId);
    setForm(EMPTY);
    setErrors({});
    setShowEdit(false);
    setEditingId(null);
  };

  const handleDel = (id, name) => {
    if (window.confirm(`Elimina il modello "${name}"? L'operazione non è reversibile.`)) delModel(id);
  };

  // Trova il nome della marca dal suo id
  const getBrandName = (marcaId) =>
    brand.find((b) => b.id === Number(marcaId))?.name || "—";

  // ── Form campi comuni (tranne marca che è read-only in edit) ──────────────
  const CommonFields = ({ isEdit = false }) => (
    <>
      {!isEdit && (
        <div className="mb-3">
          <label className="ar-form-label">Marca *</label>
          <select
            className={`form-select ar-form-input${errors.marca ? " is-invalid" : ""}`}
            value={form.marca}
            onChange={(e) => handleChange("marca", e.target.value)}
            autoFocus={!isEdit}
          >
            <option value="">— Seleziona marca —</option>
            {brand.map((b) => (
              <option value={b.id} key={b.id}>{b.name}</option>
            ))}
          </select>
          {errors.marca && <div className="invalid-feedback">{errors.marca}</div>}
        </div>
      )}

      <div className="mb-3">
        <label className="ar-form-label">Nome modello *</label>
        <input
          type="text"
          className={`form-control ar-form-input${errors.name ? " is-invalid" : ""}`}
          placeholder="es. Giulia, A4, 500…"
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
          autoFocus={isEdit}
        />
        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
      </div>

      <div className="mb-3">
        <label className="ar-form-label">URL immagine *</label>
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
        <label className="ar-form-label">Anno di produzione *</label>
        <input
          type="number"
          className={`form-control ar-form-input${errors.yearOfProduction ? " is-invalid" : ""}`}
          placeholder="es. 2015"
          min="1894"
          max={new Date().getFullYear()}
          value={form.yearOfProduction}
          onChange={(e) => handleChange("yearOfProduction", Number(e.target.value))}
        />
        {errors.yearOfProduction && <div className="invalid-feedback">{errors.yearOfProduction}</div>}
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
          <BsPlusLg /> Aggiungi modello
        </button>
      </div>

      {/* ── Tabella ── */}
      <div className="ar-admin-table-wrap">
        <table className="table table-borderless mb-0">
          <thead>
            <tr>
              <th>#</th>
              <th>Modello</th>
              <th>Logo</th>
              <th>Marca</th>
              <th>Anno</th>
              <th style={{ textAlign: 'right' }}>Azioni</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', color: 'var(--color-text-muted)', padding: '2rem' }}>
                  Nessun modello presente. Clicca "Aggiungi modello" per iniziare.
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
                  <td style={{ color: 'var(--color-text-muted)' }}>{getBrandName(el.marcaId || el.marca)}</td>
                  <td style={{ color: 'var(--color-text-muted)' }}>{el.yearOfProduction || '—'}</td>
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
          <Modal.Title>Nuovo Modello</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmitAdd}>
          <Modal.Body><CommonFields isEdit={false} /></Modal.Body>
          <Modal.Footer>
            <button type="button" className="btn btn-outline-secondary" onClick={() => setShowAdd(false)}>
              Annulla
            </button>
            <button type="submit" className="btn ar-btn-primary">
              Salva modello
            </button>
          </Modal.Footer>
        </form>
      </Modal>

      {/* ── Modal Modifica ── */}
      <Modal show={showEdit} onHide={() => setShowEdit(false)} className="ar-admin-modal" centered>
        <Modal.Header closeButton>
          <Modal.Title>Modifica Modello</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmitEdit}>
          <Modal.Body>
            {editingId && (
              <div className="mb-3 p-2 rounded" style={{ background: 'var(--color-bg)', fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                Marca: <strong style={{ color: 'var(--color-text)' }}>{getBrandName(form.marca)}</strong>
                <span style={{ marginLeft: 8, opacity: 0.6 }}>(non modificabile qui)</span>
              </div>
            )}
            <CommonFields isEdit={true} />
          </Modal.Body>
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
