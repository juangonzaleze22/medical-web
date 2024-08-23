export interface RegisterUserErrorMessage {
    displayName: ValidationRule[];
    email: ValidationRule[];
    password: ValidationRule[];
    cpassword: ValidationRule[]
}

interface ValidationRule {
    type: string; 
    message: string; 
}
  