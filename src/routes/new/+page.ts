import { authGuard } from 'src/components/auth';
export async function load() {
    console.log("Loading")
    return await authGuard();
}