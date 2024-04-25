export interface signUp{
    name: string,
    password: string,
    email: string
}
export interface logIn{
    email: string,
    password: string
}
export interface product {
    name: string,
    price: number,
    color: string,
    category: string,
    description: string,
    image: string,
    id: number,
    quantity: undefined | number
    ProductId: number |undefined
}
export interface cart{
    name: string,
    price: number,
    color: string,
    category: string,
    description: string,
    image: string,
    id: undefined |number,
    quantity: undefined | number,
    ProductId: number,
    userId: number
}
export interface priceSummary {
    price: number,
    discount: number,
    tax: number,
    delivery: number,
    totalPrice: number
}
export interface order {
    email: string,
    address: string,
    contact: string,
    userId: number| undefined,
    totalPrice: number,
    id:number| undefined
}