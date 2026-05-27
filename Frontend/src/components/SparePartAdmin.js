import { useState } from "react";
import { BsFillPencilFill, BsTrash, BsPlusLg } from "react-icons/bs";
import Modal from "react-bootstrap/Modal";
import "../components/style.css";

const EMPTY = { name: "", quantity: "", category: "", reference: "", price: "", modelli: "" };

const validate = (s) => {
  const e = {};
  if (!s.name.trim())      e.name      = "Nome obbligatorio";
  if (!s.category.trim())  e.category  = "Categoria obbligatoria";
  if (!s.reference.trim()) e.reference = "Riferimento obbligatorio";
  if (!s.price || Number(s.price) <= 0) e.price = "Prezzo non valido";
  if (s.quantity === "" || Number(s.quantity) < 0) e.quantity = "Quantità non valida";
  return e;
};

const getStockStyle = (qty) => {
  if (qty > 5)  return { color: 'var(--color-success)',  fontWeight: 600 };
  if (qty > 0)  return { color: 'var(--color-warning)',  fontWeight: 600 };
  return              { color: 'var(--color-danger)',   fontWeight: 600 };
};

export const SparePartAdmin = ({ data, model, insertSparePart, delSparePart, updateSparePart }) => {
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
    insertSparePart(form, form.modelli);
    setForm(EMPTY);
    setErrors({});
    setShowAdd(false);
  };

  // ── Modifica ─────────────────────────────────────────────────────────────
  const openEdit = (el) => {
    setEditingId(el.id);
    setForm({
      name:      el.name,
      category:  el.category,
      reference: el.reference,
      price:     el.price,
      quantity:  el.quantity,
      modelli:   el.modelli || "",
    });
    setErrors({});
    setShowEdit(true);
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    const err = validate(form);
    if (Object.keys(err).length) { setErrors(err); return; }
    updateSparePart(form, editingId);
    setForm(EMPTY);
    setErrors({});
    setShowEdit(false);
    setEditingId(null);
  };

  const handleDel = (id, name) => {
    if (window.confirm(`Elimina il ricambio "${name}"?`)) delSparePart(id);
  };

  // ── Form condiviso (modale Add + Edit) ───────────────────────────────────
  const FormFields = ({ isEdit }) => (
    <>
      {!isEdit && (
        <div className="mb-3">
          <label className="ar-form-label">Modello *</label>
          <select
            className={`form-select ar-form-input${errors.modelli ? " is-invalid" : ""}`}
            value={form.modelli}
            onChange={(e) => handleChange("modelli", e.target.value)}
            autoFocus
          >
            <option value="">— Seleziona modello —</option>
            {model.map((m) => (
              <option value={m.id} key={m.id}>{m.name}</option>
            ))}
          </select>
          {errors.modelli && <div className="invalid-feedback">{errors.modelli}</div>}
        </div>
      )}

      <div className="row g-3">
        <div className="col-12">
          <label className="ar-form-label">Nome ricambio *</label>
          <input
            type="text"
            className={`form-control ar-form-input${errors.name ? " is-invalid" : ""}`}
            placeholder="es. Sportello dx, Cofano, Filtro aria…"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            autoFocus={isEdit}
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>

        <div className="col-6">
          <label className="ar-form-label">Categoria *</label>
          <input
            type="text"
            className={`form-control ar-form-input${errors.category ? " is-invalid" : ""}`}
            placeholder="es. Carrozzeria, Motore…"
            value={form.category}
            onChange={(e) => handleChange("category", e.target.value)}
          />
          {errors.category && <div className="invalid-feedback">{errors.category}</div>}
        </div>

        <div className="col-6">
          <label className="ar-form-label">Riferimento *</label>
          <input
            type="text"
            className={`form-control ar-form-input${errors.reference ? " is-invalid" : ""}`}
            placeholder="es. AR-2021-FX"
            value={form.reference}
            onChange={(e) => handleChange("reference", e.target.value)}
          />
          {errors.reference && <div className="invalid-feedback">{errors.reference}</div>}
        </div>

        <div className="col-6">
          <label className="ar-form-label">Prezzo (€) *</label>
          <input
            type="number"
            step="0.01"
            min="0.01"
            className={`form-control ar-form-input${errors.price ? " is-invalid" : ""}`}
            placeholder="es. 29.90"
            value={form.price}
            onChange={(e) => handleChange("price", e.target.value)}
          />
          {errors.price && <div className="invalid-feedback">{errors.price}</div>}
        </div>

        <div className="col-6">
          <label className="ar-form-label">Quantità *</label>
          <input
            type="number"
            min="0"
            className={`form-control ar-form-input${errors.quantity ? " is-invalid" : ""}`}
            placeholder="es. 10"
            value={form.quantity}
            onChange={(e) => handleChange("quantity", e.target.value)}
          />
          {errors.quantity && <div className="invalid-feedback">{errors.quantity}</div>}
        </div>
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
          <BsPlusLg /> Aggiungi ricambio
        </button>
      </div>

      {/* ── Tabella ── */}
      <div className="ar-admin-table-wrap">
        <table className="table table-borderless mb-0">
          <thead>
            <tr>
              <th>#</th>
              <th>Nome</th>
              <th>Categoria</th>
              <th>Rif.</th>
              <th>Prezzo</th>
              <th>Qtà</th>
              <th style={{ textAlign: 'right' }}>Azioni</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', color: 'var(--color-text-muted)', padding: '2rem' }}>
                  Nessun ricambio presente.
                </td>
              </tr>
            ) : (
              data.map((el, i) => (
                <tr key={el.id}>
                  <td style={{ color: 'var(--color-text-muted)', width: 40 }}>{i + 1}</td>
                  <td><span style={{ fontWeight: 600 }}>{el.name}</span></td>
                  <td style={{ color: 'var(--color-text-muted)' }}>{el.category}</td>
                  <td>
                    <code style={{ background: 'var(--color-surface-2)', padding: '0.15rem 0.4rem', borderRadius: 4, fontSize: '0.8rem' }}>
                      {el.reference}
                    </code>
                  </td>
                  <td style={{ fontWeight: 700, color: 'var(--color-accent)' }}>
                    &euro;{Number(el.price).toFixed(2)}
                  </td>
                  <td>
                    <span style={getStockStyle(el.quantity)}>{el.quantity}</span>
                  </td>
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
                        title="Elimina"
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
      <Modal show={showAdd} onHide={() => setShowAdd(false)} className="ar-admin-modal" centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Nuovo Ricambio</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmitAdd}>
          <Modal.Body><FormFields isEdit={false} /></Modal.Body>
          <Modal.Footer>
            <button type="button" className="btn btn-outline-secondary" onClick={() => setShowAdd(false)}>
              Annulla
            </button>
            <button type="submit" className="btn ar-btn-primary">
              Salva ricambio
            </button>
          </Modal.Footer>
        </form>
      </Modal>

      {/* ── Modal Modifica ── */}
      <Modal show={showEdit} onHide={() => setShowEdit(false)} className="ar-admin-modal" centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Modifica Ricambio</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmitEdit}>
          <Modal.Body><FormFields isEdit={true} /></Modal.Body>
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
