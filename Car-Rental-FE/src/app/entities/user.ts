export class User {
  id:string;
  lastName: string;
  firstName: string;
  address: string;
  email: string;
  motDePasse: string;
  role: string;
phoneNumber: string;
  authStatus: string;
  constructor(
    id?:string,
    lastName?: string,
    firstName?: string,
    address?: string,
    email?: string,
    motDePasse?: string,
    role?: string,
    phoneNumber?: string,
    authStatus?: string
  ) {
    this.id = id || '';
    this.lastName = lastName || '';
    this.firstName = firstName  || '';
    this.address = address  || '';
    this.email = email || '';
    this.motDePasse = motDePasse || '';
    this.role = role || '';
    this.phoneNumber = phoneNumber || '';
    this.authStatus = authStatus || '';
  }
}
