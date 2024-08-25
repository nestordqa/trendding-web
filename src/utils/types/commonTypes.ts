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

export interface TeacherType {
    CategorieId: null | number,
    active: boolean,
    categories: any,
    categoriesId: number,
    course: any[],
    createdAt: string,
    description: string,
    document: string,
    email: string,
    especialidad: string,
    id: number,
    lection: any[],
    name: string,
    phone: string,
    updatedAt: string
}

export interface ImageObject {
    preview: string,
    data: File
} 

export interface ImageDataCourse {
    url: string,
    coursesId: number
}

export interface ImageDataLection {
    url: string,
    lectionId: number
}

export interface ImageDataTeachers {
    url: string,
    teachersId: number
}