const baseUrl = process.env.REACT_APP_API_BASE_URL;

function fileToSimpleObject(file: any) {
    if (!(file instanceof File)) {
        throw new Error("The provided input is not a File object.");
    }

    return {
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified,
        // You can add more properties if needed
    };
}

export const postImage = async(jwt: string, file: FormData) => {
    try {
        const image = await fetch(`${baseUrl}images`, {
            method: 'POST',
            headers: {
                "Authorization": jwt,
                // "Content-Type": "multipart/form-data",
            },
            body: file
        });
        console.warn('ENTRANDO 2')
        return image;
    } catch (error) {
        console.error(error);
    }
};