const baseUrl = process.env.REACT_APP_API_BASE_URL;

export const getTeachers = async(jwt: string) => {
    try {
        const courses = await fetch(`${baseUrl}teachers`, {
            method: 'GET',
            headers: {
                "Authorization": jwt,
                "Content-Type": "application/json",
            }
        });
        return courses;
    } catch (error) {
        console.error(error);
    }
};

export const getTeacherById = async(jwt: string, id: number) => {
    try {
        const courses = await fetch(`${baseUrl}teachers/${id}`, {
            method: 'GET',
            headers: {
                "Authorization": jwt,
                "Content-Type": "application/json",
            }
        });
        return await courses.json();
    } catch (error) {
        console.error(error);
    }
};