export interface GlobalContext {
    theme: string,
    toggleTheme: ()=>void,
    jwt: string,
    setToken: (str: string)=>void,
    user: any,
    setUsuario: (user: any)=>void
}