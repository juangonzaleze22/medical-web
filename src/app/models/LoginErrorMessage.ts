export interface LoginErrorMessage {
    email: ValidationRule[];
    password: ValidationRule[];
}

interface ValidationRule {
    type: string; 
    message: string; 
}
  