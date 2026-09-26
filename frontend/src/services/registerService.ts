const API_URL = "http://localhost:5194/api";

export interface RegisterUserRequest {
    name: string;
    email: string;
    password: string;
}

export interface RegisterUserResponse {
    id: number;
    name: string;
    email: string;
    createdAt: string;
}

export async function registerUser(
    data: RegisterUserRequest
): Promise<RegisterUserResponse> {
    const response = await fetch(`${API_URL}/Users/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    const responseData = await response.json().catch(() => null);

    if (!response.ok) {
        throw new Error(
            responseData?.message ||
            "Não foi possível criar a conta."
        );
    }

    return responseData;
}