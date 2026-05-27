const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

// --- Auth ---

export const loginUser = async (credentials) => {
  const response = await fetch(`${BASE_URL}/api/v1/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) {
    throw new Error("Login fallito");
  }
  return response.json();
};

const getAuthHeaders = () => {
  const token = localStorage.getItem("authToken");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

// --- Marche ---

export const searchMarca = async (key) => {
  let url = `${BASE_URL}/api/v1/marche`;
  if (key !== null && key !== undefined && key !== "") {
    url += "?keyword=" + key;
  }
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const PostBrand = async (brand) => {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/marche`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(brand),
    });
    if (!response.ok) return { ok: false, data: await response.json() };
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const PutBrand = async (brand, id) => {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/marche/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(brand),
    });
    if (!response.ok) return { ok: false, data: await response.json() };
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const DeleteBrand = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/marche/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    if (response.ok) {
      return { ok: true, data: "Success" };
    } else {
      return { ok: false, data: await response.json() };
    }
  } catch (error) {
    return { ok: false, data: error };
  }
};

// --- Modelli ---

export const searchModel = async (key) => {
  let url = `${BASE_URL}/api/v1/modelli`;
  if (key !== null && key !== undefined && key !== "") {
    url += "?keyword=" + key;
  }
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const PostModel = async (model, id) => {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/marche/${id}/model`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(model),
    });
    if (!response.ok) return { ok: false, data: await response.json() };
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

/**
 * PutModel — aggiorna nome, anno e immagine di un modello.
 * Usa PUT /api/v1/modelli/{id} (non richiede marca_id).
 */
export const PutModel = async (model, id) => {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/modelli/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(model),
    });
    if (!response.ok) return { ok: false, data: await response.json() };
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export const DeleteModel = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/modelli/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    if (response.ok) {
      return { ok: true, data: "Success" };
    } else {
      return { ok: false, data: await response.json() };
    }
  } catch (error) {
    return { ok: false, data: error };
  }
};

// --- Ricambi ---

export const searchSparePart = async (key) => {
  let url = `${BASE_URL}/api/v1/ricambi`;
  if (key !== null && key !== undefined && key !== "") {
    url += "?keyword=" + key;
  }
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const PostSparePart = async (sparePart, modelId) => {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/ricambi/${modelId}`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(sparePart),
    });
    if (!response.ok) return { ok: false, data: await response.json() };
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const PutSparePart = async (sparePart, id) => {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/ricambi/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(sparePart),
    });
    if (!response.ok) return { ok: false, data: await response.json() };
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const DeleteSparePart = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/ricambi/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    if (response.ok) {
      return { ok: true, data: "Success" };
    } else {
      return { ok: false, data: await response.json() };
    }
  } catch (error) {
    return { ok: false, data: error };
  }
};

export const getSparePartById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/ricambi/${id}`);
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

/**
 * purchaseRicambio — acquisto atomico di 1 unità.
 *
 * Il backend decrementa la quantità con una UPDATE atomica (WHERE quantity > 0).
 * Se la quantità è già 0 (race condition), il backend risponde 409 Conflict.
 *
 * Ritorna:
 *   { ok: true,  data: <Ricambi aggiornato> }   → acquisto OK
 *   { ok: false, status: 409, message: '...' }   → esaurito (preso da un altro utente)
 *   { ok: false, status: N,   message: '...' }   → altro errore
 */
export const purchaseRicambio = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/ricambi/${id}/purchase`, {
      method: "POST",
      headers: getAuthHeaders(),
    });
    if (response.ok) {
      return { ok: true, data: await response.json() };
    }
    const errBody = await response.json().catch(() => ({}));
    return {
      ok: false,
      status: response.status,
      message: errBody.message || (response.status === 409
        ? "Ricambio esaurito: un altro utente lo ha appena acquistato"
        : "Errore durante l'acquisto"),
    };
  } catch (error) {
    return { ok: false, status: 0, message: "Errore di rete" };
  }
};
