import { AxiosError } from "axios";

export function axiosErrorMessageHandler(error: Error) {
  if (error instanceof AxiosError) {
    const data = error.response?.data;

    if (data?.message) {
      const errorMessage = error.response?.data?.message;
      if (errorMessage instanceof Array) return errorMessage[0];
      return errorMessage;
    }
  }

  return 'Erro inesperado, tente novamente mais tarde.';
}