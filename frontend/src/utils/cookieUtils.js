import Cookies from 'js-cookie';

export const saveProfileToCookie = (profile) => {
    Cookies.set('userProfile', JSON.stringify(profile), { expires: 7 });
};

export const getProfileFromCookie = () => {
    const cookie = Cookies.get('userProfile');
    return cookie ? JSON.parse(cookie) : null;
};
