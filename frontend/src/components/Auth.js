import { createClient } from '@supabase/supabase-js'

const SUPABASE_KEY = 'SUPABASE_CLIENT_API_KEY'
const SUPABASE_URL = "https://whankgfzkrzlxlqfqege.supabase.co"

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function loginWithGoogle() {
    try {
        const { user, session, error } = await supabase.auth.signInWithOAuth({
            provider: 'google'
        });

        if (error) {
            throw error; 
        }

        console.log('Logged in successfully:', user);
        return { user, session };
    } catch (err) {
        console.error('Login failed:', err.message);
        return { error: err.message };
    }
}

async function logout() {
    try {
        const { error } = await supabase.auth.signOut();

        if (error) {
            throw error;
        }

        console.log('Logged out successfully');
        return { success: true };
    } catch (err) {
        console.error('Logout failed:', err.message);
        return { error: err.message };
    }
}

export default loginWithGoogle
