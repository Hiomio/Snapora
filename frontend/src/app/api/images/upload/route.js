import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { cookies } from 'next/headers';

export async function POST(request) {
  try {
    // Get the incoming formData
    const formData = await request.formData();
    
    // Get authentication token using next-auth
    const token = await getToken({ 
      req: request,
      secret: process.env.NEXTAUTH_SECRET
    });
    
    // Get auth token - either from NextAuth session or from cookies
    let authToken = token?.backendToken;
    
    // If no token from NextAuth, try to get from cookies as fallback
    if (!authToken) {
      const cookieStore = cookies();
      // Check for token in various possible cookie names
      const possibleCookies = ['token', 'auth-token', 'next-auth.session-token'];
      
      for (const cookieName of possibleCookies) {
        const cookie = cookieStore.get(cookieName);
        if (cookie?.value) {
          authToken = cookie.value;
          break;
        }
      }
      
      if (!authToken) {
        return NextResponse.json(
          { message: 'Authentication required' },
          { status: 401 }
        );
      }
    }

    // Create a new FormData object to forward
    const forwardData = new FormData();
    
    // Copy all form fields from the incoming request
    for (const [key, value] of formData.entries()) {
      forwardData.append(key, value);
    }
    
    // Forward the request to our backend API
    try {
      // Try both auth methods to handle different backend authentication schemes
      const headers = {};
      
      if (authToken) {
        // Try both authentication methods that the backend might expect
        headers['Authorization'] = `Bearer ${authToken}`;
        // Also send as a cookie in case backend expects that
        headers['Cookie'] = `token=${authToken}`;
      }
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/images/upload`, {
        method: 'POST',
        headers,
        body: forwardData,
        credentials: 'include',
      });
      
      // Get the response data
      const data = await response.json();
      
      // If response is not ok, return error
      if (!response.ok) {
        return NextResponse.json(
          { message: data.message || 'Failed to upload image' },
          { status: response.status }
        );
      }
      
      // Return successful response
      return NextResponse.json(data, { status: 201 });
    } catch (fetchError) {
      console.error('Error forwarding request to backend:', fetchError);
      return NextResponse.json(
        { message: 'Error connecting to backend service' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in image upload API route:', error);
    return NextResponse.json(
      { message: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
} 