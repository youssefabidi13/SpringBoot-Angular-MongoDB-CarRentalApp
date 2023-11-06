
export class Client {
    id!: string
    cin!: string
    lastName!: string
    address!: string
    email!: string
    reviews!: Review[]
    firstName!: string
    phoneNumber!: string
  }
  
  export class Review {
    id!: string
    comment!: string
    rating!: number
    user!: User
  }
  export class User {
    id!: string
    lastName!: string
    address!: string
    email!: string
    firstName!: string
    phoneNumber!: string
    passord!: string
    role!: string
  }
  
