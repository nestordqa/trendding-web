import { getCourseById } from "./courses";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export const getLessons = async(jwt: string) => {

    try {
        const lections = await fetch(`${baseUrl}lections`, {
            method: 'GET',
            headers: {
                "Authorization": jwt,
                "Content-Type": "application/json",
            }
        });
        const lectionsResponse = await lections.json();

        const response = [];

        for (let i = 0; i < await lectionsResponse.length; i++) {
            const item = lectionsResponse[i];
            const course = await getCourseById(jwt, item.courseId);
            response.push({
                ...item,
                course: course[0]
            });
        }
        return response;
    } catch (error) {
        console.error(error);
    }
};