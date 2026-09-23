const API_URL = "http://localhost:5194/api";

export interface RuralProperty {
    id: number;
    name: string;
    location: string;
    areaInHectares: number;
    organizationId: number;
    createdAt: string;
}

// Buscar todas as propriedades rurais
export async function getRuralProperties(): Promise<RuralProperty[]> {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Token não encontrado.");
    }

    const response = await fetch(`${API_URL}/RuralProperties`, {
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
            "Não foi possível carregar as propriedades rurais."
        );
    }

    return response.json();
}

// Dados necessários para criar uma propriedade rural
export interface CreateRuralPropertyRequest {
    name: string;
    location: string;
    areaInHectares: number;
    organizationId: number;
}

// Criar uma nova propriedade rural
export async function createRuralProperty(
    data: CreateRuralPropertyRequest
): Promise<RuralProperty> {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Token não encontrado.");
    }

    const response = await fetch(`${API_URL}/RuralProperties`, {
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
            "Não foi possível cadastrar a propriedade rural."
        );
    }

    return responseData;
}

export async function deleteRuralProperty(id: number): Promise<void> {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Token não encontrado.");
    }

    const response = await fetch(`${API_URL}/RuralProperties/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (response.status === 401) {
        throw new Error("SESSION_EXPIRED");
    }

    if (!response.ok) {
        const responseData = await response.json().catch(() => null);

        throw new Error(
            responseData?.message ||
            "Não foi possível excluir a propriedade rural."
        );
    }
}
