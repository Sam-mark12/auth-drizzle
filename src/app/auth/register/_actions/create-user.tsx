'use server';

import { hash } from 'bcrypt';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';

// Updated createUser function to accept an additional role parameter
export async function createUser(email: string, password: string, role: string) {
  const hashedPassword = await hash(password, 15);
  // Use the provided role instead of determining it
  await db.insert(users).values({
    email: email,
    password: hashedPassword,
    role: role, // Use the provided role here
  });
}