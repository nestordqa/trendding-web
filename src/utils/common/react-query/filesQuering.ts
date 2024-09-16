import { ImageDataCourse, ImageDataLection, ImageDataTeachers } from "../../types/commonTypes";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export const postImageCourse = async(jwt: string, data: ImageDataCourse) => {
    try {
        const image = await fetch(`${baseUrl}images/courses/`, {
            method: 'POST',
            headers: {
                "Authorization": jwt,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
            
        });
        return image;
    } catch (error) {
        console.error(error);
    }
};

export const postImageLection = async(jwt: string, data: ImageDataLection) => {
    try {
        const image = await fetch(`${baseUrl}images/lections/`, {
            method: 'POST',
            headers: {
                "Authorization": jwt,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
            
        });
        return image;
    } catch (error) {
        console.error(error);
    }
};

export const getImageCourse = async(jwt: string, idCourse: number) => {
    try {
        const image = await fetch(`${baseUrl}images/courses/${idCourse}`, {
            method: 'GET',
            headers: {
                "Authorization": jwt,
                "Content-Type": "application/json",
            }            
        });
        return image;
    } catch (error) {
        console.error(error);
    }
};

export const getImageLesson = async(jwt: string, idLesson: number) => {
    try {
        const image = await fetch(`${baseUrl}images/lections/${idLesson}`, {
            method: 'GET',
            headers: {
                "Authorization": jwt,
                "Content-Type": "application/json",
            }            
        });
        return image;
    } catch (error) {
        console.error(error);
    }
};

export const postImageTeacher = async(jwt: string, data: ImageDataTeachers) => {
    try {
        const image = await fetch(`${baseUrl}images/teachers/`, {
            method: 'POST',
            headers: {
                "Authorization": jwt,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
            
        });
        return image;
    } catch (error) {
        console.error(error);
    }
};

export const getImageTeacher = async(jwt: string, idTeacher: number) => {
    try {
        const image = await fetch(`${baseUrl}images/teachers/${idTeacher}`, {
            method: 'GET',
            headers: {
                "Authorization": jwt,
                "Content-Type": "application/json",
            }            
        });
        return image;
    } catch (error) {
        console.error(error);
    }
};

export const postVideoCourse = async(jwt: string, data: ImageDataCourse) => {
    try {
        const image = await fetch(`${baseUrl}videos/courses/`, {
            method: 'POST',
            headers: {
                "Authorization": jwt,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
            
        });
        return image;
    } catch (error) {
        console.error(error);
    }
};

export const postVideoLection = async(jwt: string, data: ImageDataLection) => {
    try {
        const image = await fetch(`${baseUrl}videos/lections/`, {
            method: 'POST',
            headers: {
                "Authorization": jwt,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
            
        });
        return image;
    } catch (error) {
        console.error(error);
    }
};
