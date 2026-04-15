import { isAxiosError } from 'axios';
import { showToastNative } from '@utils';

export const handleAxiosError = (
  error: unknown,
  customErrorMessage?: string,
  showToastError: boolean = true,
) => {
  if (!isAxiosError(error)) {
    return 'Unknown error occurred';
  }

  // Network/timeout or request never reached server
  if (!error.response) {
    const fallbackMessage =
      error.message || customErrorMessage || 'An error occurred';
    if (showToastError && typeof fallbackMessage === 'string') {
      showToastNative(fallbackMessage);
    }
    return fallbackMessage;
  }

  const data = error.response?.data as any;
  let errMessage: string =
    (typeof data === 'string' ? data : data?.error?.message) ||
    data?.error ||
    error.message ||
    customErrorMessage ||
    'An error occurred';

  if (error.response.status === 500) {
    errMessage = 'Server error occurred';
  }

  if (showToastError && typeof errMessage === 'string') {
    showToastNative(errMessage);
  }

  return errMessage;
};
