import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { sql } from '@vercel/postgres';
import { z } from 'zod';
import type { User } from '@/app/lib/definitions';
import { authConfig } from './auth.config';

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export function regist(
  prevState: string | undefined,
  formData: FormData,
) {
  console.log("testtestest")
  //console.log(formData)
  //const parsedFormData  = z.object( {email: z.string().email().nullish(), password: z.string().min(6).nullish() }).safeParse(formData)
  //const parsedFormData  = z.object( {email: z.string().email(), password: z.string().min(6) }).safeParse(formData.entries())
  const parsedFormData  = z.object( {email: z.string().email(), password: z.string().min(6) }).parse(formData)
  //console.log(parsedFormData)
 if (parsedFormData){
  const {email ,password} = parsedFormData;
  console.log(email + " / " + password);
 }else{
  console.log(parsedFormData);
  return null;
 }
  // const res = createUser(email:string, password: string):Primise
}

export const { auth, signIn, signOut} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
        console.log(parsedCredentials)
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          const user = await getUser(email);
          if (!user) return null;
          
          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) return user;
        }
        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});
