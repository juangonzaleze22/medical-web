import { STATUS_CITE } from "../enums/cite.enum"

export interface Cite {
  _id: string
  title: string
  description: string
  date: string
  user: User
  createdAt: string
  updatedAt: string
  status: STATUS_CITE,
  reason_cancel?: string,
  backgroundColor?: string
  medical_response?: MedicalResponse;
}

interface User {
  displayName: string
  userId: string
  email: string
  photoURL: string
}

export interface MedicalResponse {
  observation: string
  recipe: string
}

export interface CiteDataSend { 
  title: string;
  description: string;
  date: string;
  idUserReserved: string | undefined;
}

export interface ResponseCite {
  status: string
  message?: string
  cites: Cite[]
}

export interface ResponseCiteUpdate {
  status: string
  data: Cite
}

export interface UpdateStatusCite {
  status: string,
  reason_cancel?: string
}

export interface GroupedCite {
  date: string;
  cites: Cite[]; 
}