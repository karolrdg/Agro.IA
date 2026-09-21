const API_URL = "http://localhost:5194/api";

export interface ProtectedResponse {
    message: string;
    user: string;
}

export async function getProtectedData(): Promise<ProtectedResponse> {

    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Token não encontrado.");
    }

    const response = await fetch(`${API_URL}/Users/protected`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    // Verifica se o token expirou ou é inválido
    if (response.status === 401) {
        throw new Error("SESSION_EXPIRED");
    }

    // Trata outros erros da API
    if (!response.ok) {
        throw new Error("Não foi possível acessar a API protegida.");
    }

    // Converte a resposta JSON em um objeto.
    return response.json();
}