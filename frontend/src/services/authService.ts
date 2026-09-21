const API_URL = "http://localhost:5194/api";

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    userId: number;
    name: string;
    email: string;
}

export async function login(
    data: LoginRequest
): Promise<LoginResponse> {

    console.log("1. Enviando login:", data);

    const response = await fetch(`${API_URL}/Users/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    console.log("2. API respondeu:", response.status);

    const text = await response.text();

    console.log("3. Resposta da API:", text);

    if (!response.ok) {
        throw new Error("Login não autorizado.");
    }

    return JSON.parse(text);
}