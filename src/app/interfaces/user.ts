export interface User {
    id: number,
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    address: UserAddress,
    phone: string,
    website: string,
    company: UserCompany,
    saved: boolean

}

interface UserAddress {
    street: string,
    building: string,
    city: string,
    zipcode: string
}

interface UserCompany {
    name: string,
    scope: string
}