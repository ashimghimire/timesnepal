import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import { cookies } from 'next/headers';
import { use } from 'react';

const auth= NextAuth({
        providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
            username: {
                label: 'Username',
                type: 'text',
            },
            password: {
                label: 'Password',
                type: 'password',
            },
            },
            async authorize(credentials) {
            console.log("------->>>>>>>>>>>",credentials);
                
                try {
                    // Call your user-defined function here
                    const response = await fetch('http://localhost:7001/login-news', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        username: credentials.username,
                        password: credentials.password,
                      }),
                    });
                    
                    if (response.status === 401) {
                        return null;
                    }
                    
                    const userData = await response.json();
                    console.log("User data from API:", userData);
                    
                    // Make sure we're returning an object with the accessToken
                    return {
                        id: userData.id || '1',
                        name: userData.username || credentials.username,
                        email: userData.email || `${credentials.username}@example.com`,
                        accessToken: userData.accessToken || userData.token || userData.jwt,
                    };
                } catch (error) {
                    console.error("Login error:", error);
                    return null;
                }
            },
        }),
    ],
    pages: {
      signIn: '/login', // Custom login page (optional)
      error: "/error"
    },
    session: {
      strategy: "jwt", // Use JWT for session
    },
    callbacks: {
      async jwt({ token, user }) {
        console.log("JWT callback - user:", user);
        console.log("JWT callback - token:", token);
        
        if (user) {
            // Make sure we're setting the accessToken from the user object
            token.accessToken = user.accessToken;
        }
        return token;
      },
      async session({ session, token }) {
        console.log("Session callback - token:", token);
        console.log("Session callback - session before:", session);
        
        // Set the accessToken in the session
        session.accessToken = token.accessToken;
        
        console.log("Session callback - session after:", session);
        return session;
      },
    },
  });

  export { auth as GET, auth as POST };
