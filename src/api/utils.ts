export const baseUrlApi = (url: string) =>
  `/api/v1/admin/${url.startsWith("/") ? url.slice(1) : url}`;
