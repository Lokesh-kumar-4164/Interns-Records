import { create } from 'zustand'


type User = {
    id:string,
    email:string,
    user:string,
    role:string
}

type LoginStore = {
    user:User|null,
    login:(user:User) => void,
    logout:() => void
}


export const useLoginStore = create<LoginStore>((set) => ({
    user: null,
    login:(user:User) => set({user:user}),
    logout:() => set({user:null})
}))
