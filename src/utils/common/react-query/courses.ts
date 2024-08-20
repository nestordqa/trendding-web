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