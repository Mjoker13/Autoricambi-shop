export const searchMarca = async (key) => {
  let url = "http://localhost:8080/api/v1/marche";
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

export const searchModel = async (key) => {
  let url = "http://localhost:8080/api/v1/modelli";
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

export const searchSparePart = async (key) => {
  let url = "http://localhost:8080/api/v1/ricambi";
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
  let url = "http://localhost:8080/api/v1/marche";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(brand),
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const PutBrand = async (brand, id) => {
  let url = "http://localhost:8080/api/v1/marche";
  if (id !== null && id !== undefined && id !== "") {
    url += "/id";
  }
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(brand),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const DeleteBrand = async (id) => {
  let url = "http://localhost:8080/api/v1/marche";
  if (id !== 0) {
    url += "/" + id;
  }
  try {
    const response = await fetch(url, {
      method: "DELETE",
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

export const PostModel = async (model, id) => {
  let url = "http://localhost:8080/api/v1/modelli";
  if (id !== 0) {
    url += "/" + id;
  }
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(model),
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const DeleteModel = async (id) => {
  let url = "http://localhost:8080/api/v1/modelli";
  if (id !== 0) {
    url += "/" + id;
  }
  try {
    const response = await fetch(url, {
      method: "DELETE",
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

export const PostSparePart = async (sparePart, id) => {
  let url = "http://localhost:8080/api/v1/ricambi";
  if (id !== 0) {
    url += "/" + id;
  }
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sparePart),
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const DeleteSparePart = async (id) => {
  let url = "http://localhost:8080/api/v1/ricambi";
  if (id !== "") {
    url += "/" + id;
  }
  try {
    const response = await fetch(url, {
      method: "DELETE",
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

export const searchSparePartDto = async (key) => {
  let url = "http://localhost:8080/api/v1/ricambi/dto";
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

export const PostSparePartDto = async (sparePart) => {
  let url = "http://localhost:8080/api/v1/ricambi/dto";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sparePart),
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const PutSparePart = async (sparePart, id) => {
  let url = "http://localhost:8080/api/v1/ricambi";
  if (id !== null && id !== undefined && id !== "") {
    url += "/" + id;
  }
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sparePart),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getSparePartById = async (id) => {
  let url = "http://localhost:8080/api/v1/ricambi";
  if (id !== null && id !== undefined && id !== "") {
    url += "/" + id;
  }
  try {
    const response = await fetch(url);
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};
