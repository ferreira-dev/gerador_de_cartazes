import { ref, computed } from 'vue';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
    onAuthStateChanged,
    updateProfile
} from 'firebase/auth';
import { auth } from '@/firebase';

const user = ref(null);
const loading = ref(true);
const error = ref(null);

// Observa mudanças no estado de autenticação
onAuthStateChanged(auth, (firebaseUser) => {
    user.value = firebaseUser;
    loading.value = false;
});

export function useAuth() {
    const isAuthenticated = computed(() => !!user.value);

    // Criar nova conta
    const criarConta = async (email, senha, nome) => {
        try {
            error.value = null;
            loading.value = true;

            const userCredential = await createUserWithEmailAndPassword(auth, email, senha);

            // Atualizar o perfil com o nome
            if (nome) {
                await updateProfile(userCredential.user, {
                    displayName: nome
                });
            }

            return { success: true, user: userCredential.user };
        } catch (err) {
            error.value = tratarErro(err);
            return { success: false, error: error.value };
        } finally {
            loading.value = false;
        }
    };

    // Fazer login
    const fazerLogin = async (email, senha) => {
        try {
            error.value = null;
            loading.value = true;

            const userCredential = await signInWithEmailAndPassword(auth, email, senha);
            return { success: true, user: userCredential.user };
        } catch (err) {
            error.value = tratarErro(err);
            return { success: false, error: error.value };
        } finally {
            loading.value = false;
        }
    };

    // Fazer logout
    const fazerLogout = async () => {
        try {
            error.value = null;
            await signOut(auth);
            return { success: true };
        } catch (err) {
            error.value = tratarErro(err);
            return { success: false, error: error.value };
        }
    };

    // Recuperar senha
    const recuperarSenha = async (email) => {
        try {
            error.value = null;
            loading.value = true;

            await sendPasswordResetEmail(auth, email);
            return { success: true };
        } catch (err) {
            error.value = tratarErro(err);
            return { success: false, error: error.value };
        } finally {
            loading.value = false;
        }
    };

    // Tratar erros do Firebase
    const tratarErro = (err) => {
        const errorMessages = {
            'auth/email-already-in-use': 'Este e-mail já está em uso.',
            'auth/invalid-email': 'E-mail inválido.',
            'auth/operation-not-allowed': 'Operação não permitida.',
            'auth/weak-password': 'A senha deve ter pelo menos 8 caracteres.',
            'auth/user-disabled': 'Esta conta foi desabilitada.',
            'auth/user-not-found': 'Usuário não encontrado.',
            'auth/wrong-password': 'Senha incorreta.',
            'auth/invalid-credential': 'Credenciais inválidas. Verifique seu e-mail e senha.',
            'auth/too-many-requests': 'Muitas tentativas. Tente novamente mais tarde.',
            'auth/network-request-failed': 'Erro de conexão. Verifique sua internet.',
        };

        return errorMessages[err.code] || 'Ocorreu um erro. Tente novamente.';
    };

    return {
        user,
        loading,
        error,
        isAuthenticated,
        criarConta,
        fazerLogin,
        fazerLogout,
        recuperarSenha
    };
}
