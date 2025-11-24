interface JWTUser{
    id: number,
    email: email,
    role: "patient" | "physio" | "admin"
}

declare namespace Express{
    export interface Request{
        user?: JWTUser;
    }
}