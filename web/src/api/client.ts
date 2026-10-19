import { auth } from '../lib/firebase';
import { UserProfileResponse, ApiErrorResponse } from '../types/api';

const BASE_URL = (
  import.meta.env.VITE_API_URL || 'http://localhost:4000/api/v1'
).replace(/\/+$/, '');

export class ApiError extends Error {
  public status: number;
  public details?: unknown;

  constructor(status: number, message: string, details?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}

interface RequestOptions extends RequestInit {
  requiresAuth?: boolean;
}

export async function apiFetch<T>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<T> {
  const { requiresAuth = true, headers = {}, ...rest } = options;
  const requestHeaders = new Headers(headers);

  if (!requestHeaders.has('Content-Type') && !(rest.body instanceof FormData)) {
    requestHeaders.set('Content-Type', 'application/json');
  }

  if (requiresAuth) {
    const currentUser = auth.currentUser;
    if (currentUser) {
      try {
        const idToken = await currentUser.getIdToken();
        requestHeaders.set('Authorization', `Bearer ${idToken}`);
      } catch (err) {
        throw new ApiError(
          401,
          'Failed to retrieve Firebase authorization token. Please sign in again.',
          err,
        );
      }
    } else {
      throw new ApiError(
        401,
        'Authentication required. Please sign in to access this resource.',
      );
    }
  }

  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${BASE_URL}${cleanEndpoint}`;

  let response: Response;
  try {
    response = await fetch(url, {
      ...rest,
      headers: requestHeaders,
    });
  } catch (networkError) {
    throw new ApiError(
      0,
      'Network request failed. Ensure the Mohalla Signal backend is running at http://localhost:4000.',
      networkError,
    );
  }

  if (!response.ok) {
    let errorData: ApiErrorResponse | null = null;
    let errorMessage = `Request failed with status ${response.status}`;

    try {
      errorData = await response.json();
      if (errorData?.message) {
        errorMessage = Array.isArray(errorData.message)
          ? errorData.message.join(', ')
          : errorData.message;
      }
    } catch {
      // Non-JSON error response
    }

    throw new ApiError(response.status, errorMessage, errorData);
  }

  if (response.status === 204) {
    return {} as T;
  }

  return response.json() as Promise<T>;
}

export const usersApi = {
  getMe: () => apiFetch<UserProfileResponse>('/users/me'),
};
