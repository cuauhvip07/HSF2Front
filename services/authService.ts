import { fetchApi } from '@/lib/api';
import { LoginFormData } from '@/types/main/auth';

export const loginUsuario = async (credentials: LoginFormData): Promise<string> => {
  // Mapeo explicito al backend en inglés
  const payload = {
    email: credentials.email,
    password: credentials.password,
  };

  return await fetchApi<string>('/user/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
};