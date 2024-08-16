import courses from '../../assets/images/courses-logo.png';
import home from '../../assets/images/home-logo.png';
import lessons from '../../assets/images/lessons-logo.png';
import teachers from '../../assets/images/teachers-logo.png';
import memberships from '../../assets/images/memberships-logo.png';
import tests from '../../assets/images/tests-logo.png';
import users from '../../assets/images/users-logo.png';
import afiliates from '../../assets/images/afiliates-logo.png';
import plus from '../../assets/images/plus-button.png';
import payments from '../../assets/images/payments.png';
import categories from '../../assets/images/courses-categories-logo.png';
import ads from '../../assets/images/ads-logo.png';
import user from '../../assets/images/user-logo.png';
import roles from '../../assets/images/roles-logo.png';
import settings from '../../assets/images/settings-logo.png';
import support from '../../assets/images/support-logo.png';

export const linksArray = [
    {
        url: '/admin/dashboard',
        image: home,
        name: 'Dashboard',
        secondImage: null
    },
    {
        url: '/admin/dashboard/courses',
        image: courses,
        name: 'Gestión de Cursos',
        secondImage: null
    },
    {
        url: '/admin/dashboard/lessons',
        image: lessons,
        name: 'Gestión de Lecciones',
        secondImage: null
    },
    {
        url: '/admin/dashboard/teachers',
        image: teachers,
        name: 'Gestión de Profesores',
        secondImage: plus
    },
    {
        url: '/admin/dashboard/memberships',
        image: memberships,
        name: 'Gestión de Planes',
        secondImage: null
    },
    {
        url: '/admin/dashboard/test',
        image: tests,
        name: 'Gestión de Profesores',
        secondImage: null
    },
    {
        url: '/admin/dashboard/users',
        image: users,
        name: 'Gestión de Usuarios',
        secondImage: plus
    },
    {
        url: '/admin/dashboard/afiliates',
        image: afiliates,
        name: 'Gestión de Afiliados',
        secondImage: plus
    },
    {
        url: '/admin/dashboard/payments',
        image: payments,
        name: 'Gestión de Pagos',
        secondImage: null
    },
    {
        url: '/admin/dashboard/courses-categories',
        image: categories,
        name: 'Categorías de cursos',
        secondImage: null
    },
    {
        url: '/admin/dashboard/ads',
        image: ads,
        name: 'Publicidad',
        secondImage: null
    },
    {
        url: '/admin/dashboard/user',
        image: user,
        name: 'Usuarios',
        secondImage: null
    },
    {
        url: '/admin/dashboard/roles',
        image: roles,
        name: 'Roles',
        secondImage: null
    },
];

export const linksSettings = [
    {
        url: '/admin/dashboard/settings',
        image: settings,
        name: 'Ajustes',
        secondImage: null
    },
    {
        url: '/admin/dashboard/support',
        image: support,
        name: 'Soporte y asistencia',
        secondImage: null
    },
];