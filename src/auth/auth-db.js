import 'server-only';

import { SignJWT, jwtVerify } from 'jose';


const secretKey = process.env.SECRET;
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1hr')
    .sign(key);
}

export async function decrypt(token) {
  try {
    const claims = jwtDecode(token);
    return claims;
  } catch (error) {
    console.log('Failed to verify session');
    return null;
  }
}

// export async function createSession(id) {
//   const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

//   // 1. Create a session in the database
//   const data = await db
//     .insert(sessions)
//     .values({
//       userId: id,
//       expiresAt,
//     })
//     // Return the session ID
//     .returning({ id: sessions.id });

//   const sessionId = data[0].id;

//   // 2. Encrypt the session ID
//   const session = await encrypt({ userId: id, expiresAt });

//   // 3. Store the session in cookies for optimistic auth checks
//   cookies().set('session', session, {
//     httpOnly: true,
//     secure: true,
//     expires: expiresAt,
//     sameSite: 'lax',
//     path: '/',
//   });
// }