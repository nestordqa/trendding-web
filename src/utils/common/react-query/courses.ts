const baseUrl = process.env.REACT_APP_API_BASE_URL;

export const getCourses = async(jwt: string) => {
    try {
        const courses = await fetch(`${baseUrl}courses`, {
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

export const getCourseById = async(jwt: string, id: number) => {
    try {
        const courses = await fetch(`${baseUrl}courses/${id}`, {
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