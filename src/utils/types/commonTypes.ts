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