const BASE_URL = "http://localhost:5000/api";

const getToken = () => localStorage.getItem("AuthToken") || "";

// GET
export const getReq = async (path: string) => {
    const res = await fetch(`${BASE_URL}${path}`, {
        headers: {
            Authorization: "Bearer " + getToken(),
        }
    });

    if(!res.ok) {
        throw new Error("Kunde inte hämta data");
    }

    return res.json();
}

// POST
export const postReq = async (path: string, body: unknown) => {
    const res = await fetch(`${BASE_URL}${path}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getToken(),
        },
        body: JSON.stringify(body)
    });

    if(!res.ok) {
        throw new Error("Kunde inte hämta data");
    }

    return res.json();
}

// PUT
export const putReq = async (path: string, body: unknown) => {
    const res = await fetch(`${BASE_URL}${path}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getToken(),
        },
        body: JSON.stringify(body)
    });

    if(!res.ok) {
        throw new Error("Kunde inte hämta data");
    }

    return res.json();
}

// DELETE
export const deleteReq = async (path: string) => {
    const res = await fetch(`${BASE_URL}${path}`, {
        method: "DELETE",
        headers: {
            Authorization: "Bearer " + getToken(),
        }
    });

    if(!res.ok) {
        throw new Error("Kunde inte hämta data");
    }

    return res.json();
}