import { getSession } from 'next-auth/react';
import { getCookie } from 'cookies-next/client';
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:7001';

// Create a custom fetch function that automatically adds the accessToken
export async function fetchClient(endpoint, options = {}) {
  // Get the current session to access the accessToken
  const session = await getSession();
  
  // Prepare headers with authorization if we have an accessToken
  const headers = {
    'Content-Type': 'Application/json',
    ...(options.headers || {}),
  };

  const cookie = getCookie('JWT');
  console.log("Cookie data ---------------- :", cookie);
  // Add Authorization header if we have an accessToken
  if (session?.accessToken) {
    headers['Authorization'] = `Bearer ${session.accessToken}`;
  } else if (cookie) {
    headers['Authorization'] = `Bearer ${cookie}`;
  }
  
  console.log("Fetch request to:", `${BASE_URL}${endpoint}`);
  console.log("With headers:", headers);
  
  // Make the fetch request with the updated headers
  try { 
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers,
      // credentials: 'include',
    });

    console.log("Response data ---------------- :", res.status);
  
  // Handle 401 Unauthorized responses (token expired)
  if (res.status === 401) {
    console.error("Unauthorized request - token may be expired");
    // You could implement token refresh logic here if needed
  }

  return res;
} catch (error) { 
  console.error("Error fetching data:%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%", error);
  return error;
}

}

// Helper function to parse JSON response
export async function fetchJson(endpoint, options = {}) {
  const response = await fetchClient(endpoint, options);
  const data= await response.json();
  console.log(data);
  return data;
}

// Helper function for GET requests
export async function get(endpoint, options = {}) {
  return fetchJson(endpoint, { ...options, method: 'GET' });
}

// Helper function for POST requests
export async function post(endpoint, data, options = {}) {
  return fetchJson(endpoint, {
    ...options,
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// Helper function for PUT requests
export async function put(endpoint, data, options = {}) {
  return fetchJson(endpoint, {
    ...options,
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

// Helper function for DELETE requests
export async function del(endpoint, options = {}) {
  return fetchJson(endpoint, { ...options, method: 'DELETE' });
}

