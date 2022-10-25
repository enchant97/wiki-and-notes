import { LoginDetails } from "./types";

const API_URL_KEY = 'api-url';

export function defaultApiUrl(): string {
  return (new URL("/api", window.location.origin)).toString()
}

export function setLoginDetails(details: LoginDetails) {
  window.localStorage.setItem(API_URL_KEY, details.apiUrl);
}

export function getLoginDetails(): LoginDetails | null {
  let apiUrl = window.localStorage.getItem(API_URL_KEY);
  if (!apiUrl) { return null }
  return { apiUrl }
}

export function clearLoginDetails() {
  window.localStorage.removeItem(API_URL_KEY);
}
