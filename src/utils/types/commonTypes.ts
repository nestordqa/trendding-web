// interface User {
//     id: number | null,
//     active: boolean | null,
//     createdAt: string | null,
//     email: string | null,
//     firstName: string | null,
//     lastName: string | null,
//     password: string | null,
//     role: string | null,
//     updatedAt: string | null,
//     username: string | null,
// }
export interface GlobalContext {
    theme: string,
    toggleTheme: ()=>void,
    jwt: string,
    setToken: (str: string)=>void,
    user: any,
    setUsuario: (user: any)=>void
}

export interface NavlinksProps {
    url: string,
    image: string | null,
    name: string,
    secondImage: string | null
}

export interface ChipType {
    name: string,
    type: string
};

export interface TooltipType {
    text: string,
    idTooltip: string
}