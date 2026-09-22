const API_URL = "http://localhost:5194/api";

export interface RuralProperty {
    id: number;
    name: string;
    location: string;
    areaInHectares: number;
    organizationId: number;
    createdAt: string;
}

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
            "Não foi possível carregar as propriedades rurais.",
        );
    }

    return response.json();
}