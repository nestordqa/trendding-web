const baseUrl = process.env.REACT_APP_API_BASE_URL;

export const getAllCategories = async(jwt: string) => {
    try {
        const categories = await fetch(`${baseUrl}categories`, {
            method: 'GET',
            headers: {
                "Authorization": jwt,
                "Content-Type": "application/json",
            }
        });
        return categories;
    } catch (error) {
        console.error(error);
    }
};