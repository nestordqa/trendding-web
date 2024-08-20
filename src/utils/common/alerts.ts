import Swal from "sweetalert2";

export const warningAlert = async (cb: any, title: string, text: string, response: string, style: string) => {
    let background;
    let color;
    if (style === 'dark') {
        background = '#373139';
        color = '#FFFFFF';
    } else {
        background = '#FFFFFF';
        color = '#373139'; 
    }
    const options = {
        title,
        text,
        background,
        color,
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#D372FC',
        cancelButtonColor: '#939393',
        preConfirm: cb,
        allowOutsideClick: false,
        allowEscapeKey: false
    };
    const alert = await Swal.fire(options);
    if (alert && alert.isConfirmed) {
        await Swal.fire({
            title: 'Bien hecho!',
            text: response,
            background,
            color,
            showConfirmButton: true,
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#D372FC',
            allowOutsideClick: false,
            allowEscapeKey: false
        });
    }
};

export const simpleWarningAlert = async (title: string, text: string, style: string) => {
    let background;
    let color;
    if (style === 'dark') {
        background = '#373139';
        color = '#FFFFFF';
    } else {
        background = '#FFFFFF';
        color = '#373139'; 
    }
    const options = {
        title,
        text,
        background,
        color,
        showConfirmButton: true,
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#D372FC',
        allowOutsideClick: false,
        allowEscapeKey: false,
    };
    await Swal.fire(options);
};

export const successAlert = async (cb: any, title: string, text: string, style: string) => {
    let background;
    let color;
    if (style === 'dark') {
        background = '#373139';
        color = '#FFFFFF';
    } else {
        background = '#FFFFFF';
        color = '#373139'; 
    }
    const options = {
        title,
        text,
        background,
        color,
        showConfirmButton: true,
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#D372FC',
        preConfirm: cb,
        allowOutsideClick: false,
        allowEscapeKey: false
    };
    await Swal.fire(options);
};