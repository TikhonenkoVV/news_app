import { load, save } from './storage';

export const chkRegUser = ({ email, password }) => {
    let res = {};
    let validKey;
    const loadUserData = load('bite-db');
    const keys = loadUserData.map(key => {
        if (key.hasOwnProperty(email) && key[email].password === password) {
            validKey = key;
        }
    });
    if (!loadUserData || !validKey) return false;
    console.log(validKey);
    return validKey;
};

export const regUser = ({ user, email, password }) => {
    const loadUserData = load('bite-db');
    let validKey;
    let arr = [];
    const res = {
        [email]: { user: user, password: password },
    };
    if (!loadUserData) {
        arr.push(res);
        save('bite-db', arr);
        console.log(load('bite-db'));
        return;
    }
    const keys = loadUserData.map(key => {
        if (key.hasOwnProperty(email)) {
            validKey = key;
        }
    });
    if (validKey) return false;
    loadUserData.map(el => arr.push(el));
    arr.push(res);
    save('bite-db', arr);
};
