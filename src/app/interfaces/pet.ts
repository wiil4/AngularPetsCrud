export interface Pet{
    id?: number, // "?" notation is used because backend is going to generate the id
    name: string,
    age: number,
    race: string,
    color: string,
    weight: number
}