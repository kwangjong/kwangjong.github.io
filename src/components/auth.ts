import { redirect } from '@sveltejs/kit';

export async function authGuard() {
    let tok: string|null = localStorage.getItem('token');
    if (tok != null) {
        await fetch(`https://107106.xyz/auth`, {
            method: 'DELETE',
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
    let tok: string|null = localStorage.getItem('token');
    if (tok != null) {
        let result : boolean = await fetch(`https://107106.xyz/auth`, {
            method: 'DELETE',
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