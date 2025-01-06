import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { z } from "zod";

const createIssueSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = createIssueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 404 });

  const newIssue = await prisma.issue.create({
    data: { title: body.title, description: body.description },
  });

  return NextResponse.json(newIssue, { status: 201 });
}


import { z } from 'zod'; const UserSchema = z.object({ username: z.string().min(5, 'Username must be at least 5 characters'), email: z.string().email('Invalid email format'), password: z.string().min(8, 'Password must contain at least 8 characters'), age: z.number().optional(), }); // Type inference in action const validUserData = { username: 'johnsmith', email: 'john@example.com', password: 'strongpassword123' }; const myUser = UserSchema.parse(validUserData); // TypeScript infers the type of 'myUser' as: // { username: string; email: string; password: string; age?: number }

https://medium.com/@weidagang/zod-schema-validation-made-easy-195f86d82d44
