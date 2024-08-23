export interface UserResponse {
    status: string
    token: string
    user: User
}

export interface User {
    _id: string
    displayName: string
    password: string
    email: string
    photoURL: string
    createdAt: string
    updatedAt: string
    isAdmin: boolean
}
