
const API_URL = "http://localhost:5194/api";

// Dados de uma safra
export interface CropSeason {
    id: number;
    name: string;
    year: number;
    ruralPropertyId: number;
    createdAt: string;
}

// Dados necessários para criar uma safra
export interface CreateCropSeasonRequest {
    name: string;
    year: number;
    ruralPropertyId: number;
}

// Buscar todas as safras
export async function getCropSeasons(): Promise<CropSeason[]> {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Token não encontrado.");
    }

    const response = await fetch(`${API_URL}/CropSeasons`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (response.status === 401) {
        throw new Error("SESSION_EXPIRED");
    }

    if (!response.ok) {
        throw new Error(
            "Não foi possível carregar as safras."
        );
    }

    return response.json();
}

// Criar uma nova safra
export async function createCropSeason(
    data: CreateCropSeasonRequest
): Promise<CropSeason> {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Token não encontrado.");
    }

    const response = await fetch(`${API_URL}/CropSeasons`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });

    if (response.status === 401) {
        throw new Error("SESSION_EXPIRED");
    }

    const responseData = await response.json();

    if (!response.ok) {
        throw new Error(
            responseData?.message ||
            "Não foi possível cadastrar a safra."
        );
    }

    return responseData;
}

export async function deleteCropSeason(
    id: number
): Promise<void> {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Token não encontrado.");
    }

    const response = await fetch(`${API_URL}/CropSeasons/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (response.status === 401) {
        throw new Error("SESSION_EXPIRED");
    }

    const responseText = await response.text();

    let responseData: { message?: string } | null = null;

    if (responseText) {
        try {
            responseData = JSON.parse(responseText);
        } catch {
            responseData = null;
        }
    }

    if (!response.ok) {
        throw new Error(
            responseData?.message ||
            "Não foi possível excluir a safra."
        );
    }
}
