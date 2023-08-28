import { authGuard } from 'src/components/auth';

export async function load() {
    return await authGuard();
}