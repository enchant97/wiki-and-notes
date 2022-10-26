import { LoginDetails } from "./types";

const API_URL_KEY = 'api-url';
const API_TOKEN_KEY = 'api-token';

export function defaultApiUrl(): string {
  return (new URL("/api", window.location.origin)).toString()
}

export function setLoginDetails(details: LoginDetails) {
  window.localStorage.setItem(API_URL_KEY, details.apiUrl);
  window.localStorage.setItem(API_TOKEN_KEY, details.token);
}

export function getLoginDetails(): LoginDetails | null {
  let apiUrl = window.localStorage.getItem(API_URL_KEY);
  let token = window.localStorage.getItem(API_TOKEN_KEY)
  if (!apiUrl || !token) { return null }
  return { apiUrl, token }
}

export function clearLoginDetails() {
  window.localStorage.removeItem(API_URL_KEY);
  window.localStorage.removeItem(API_TOKEN_KEY);
}
