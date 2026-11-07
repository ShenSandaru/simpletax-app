export type LangKey = 'en' | 'si' | 'ta';

export type AppRoute = '/' | '/get-tin' | '/verify' | '/quick-pay' | '/login' | '/dashboard';

export interface DecodedNIC {
  valid: boolean;
  birthDate: string;
  birthYear: number;
  gender: 'Male' | 'Female';
  age: number;
  formattedNIC: string;
}

export interface VerifiedTaxpayer {
  name: string;
  nic: string;
  tin: string;
  category: string;
  status: string;
  issuedDate: string;
  office: string;
  verificationCode: string;
}

export interface DocumentModalData {
  title: string;
  subtitle: string;
  code: string;
}

