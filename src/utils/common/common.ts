import { GlobalContext } from '../types/commonTypes';
import S3 from 'react-aws-s3-typescript';

// import { useNavigate } from "react-router-dom";

export const setDataLocalStorage = async (datos: GlobalContext) => {
    try {
        const data = await JSON.parse(localStorage.getItem('data') as string);
        if (data) {
            localStorage.removeItem('data');
        }
        localStorage.setItem('data', JSON.stringify(datos));
    } catch (error) {
        console.error(error);      
    }
};

export const cleanDataLocalStorage = async () => {
    try {
        const data = localStorage.getItem('data');
        if (data) {
            localStorage.removeItem('data');
        }
    } catch (error) {
        console.error(error);      
    }
};

export const getLocalStorageData = ()  => {
    try {
        const data = localStorage.getItem('data');
        if (data) {
            return JSON.parse(data);
        }
        return false;
        
    } catch (error) {
        console.error(error);
        return false;
    }
};

export const changeThemeLocalStorage = (theme: string)  => {
    try {
        const data = localStorage.getItem('data');
        if (data) {
            localStorage.removeItem('data');
            const parser = JSON.parse(data);
            localStorage.setItem('data', JSON.stringify({
                ...parser,
                theme: theme
            }));
        }
        return false;
        
    } catch (error) {
        console.error(error);
        return false;
    }
};

export const validateSession = (): boolean  => {
    try {
        const data = localStorage.getItem('data');
        if (data) {
            return true;
        }
        return false;
        
    } catch (error) {
        console.error(error);
        return false;
    }
};

export const isAdmin = (data: any): boolean => {
    if (data.role === 'USER') return false;
    return true;
};

export const getTokenData = (token: string) => {
        // Split the token into its parts
        const base64Url = token.split('.')[1];
        // Decode the base64Url string
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        // Parse the JSON string into an object
        return JSON.parse(atob(base64)).data[0];
};

export const avatarUrl = (str: string): string => {
    return `${process.env.REACT_APP_AVATAR_API}/${str}`;
};

export const uploadImage = async (data: any) => {
    try {
        const ReactS3Client = new S3({
            accessKeyId: 'AKIA3FLD3JMFIJ4K72MF',
            secretAccessKey: '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',
            bucketName: 'bucket-images-trendding',
            region: 'us-east-2',
        });
        console.info(ReactS3Client, 'Cliente React AWS');
        const newImg = await ReactS3Client.uploadFile(data);
        if (newImg && newImg.location) {
            return newImg;
        }
    } catch (error) {
        console.error('Ocurrio un errror al subir la imagen', error);
    }
};