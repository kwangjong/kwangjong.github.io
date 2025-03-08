import { redirect } from '@sveltejs/kit';
import { BACKEND_API } from 'src/lib/config';

export async function authGuard() {
    let tok: string|null = getToken();
    if (tok != null) {
        await fetch(`${BACKEND_API}/auth`, {
            method: 'POST',
            headers: {
                'Token': tok,
            }
        }).then(response => response.status == 401 ? false : true)
        .then(pass => {
            if (pass) {
                return;
            } else {
                throw redirect(307, '/admin');
            }
        })
    } else {
        throw redirect(307, '/admin');
    }
}

export async function isAuthed() {
    let tok: string|null = getToken();
    if (tok != null) {
        let result : boolean = await fetch(`${BACKEND_API}/auth`, {
            method: 'POST',
            headers: {
                'Token': tok,
            }
        }).then(response => response.status == 401 ? false : true)
        .then(pass => {
            if (pass) {
                return true;
            } else {
                return false;
            }
        })
        return result;
    } else {
        return false;
    }
}

export function getToken(): string|null {
    return document.cookie
        .split(';')
        .map(c => c.trim())
        .filter(cookie => {
            return cookie.substring(0, 6) === `token=`;
        })
        .map(cookie => {
            return decodeURIComponent(cookie.substring(6));
        })[0] || null;
}
