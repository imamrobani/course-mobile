/**
 * API Helper utilities for common request configurations
 */

/**
 * Headers for multipart/form-data requests
 * Used for file uploads and form data submissions
 */
export const FORM_HEADERS = {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
};

export const newAbortSignal = (timeoutMs: number) => {
  const abortController = new AbortController();
  setTimeout(() => abortController.abort(), timeoutMs || 0);

  return abortController.signal;
};
