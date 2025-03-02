import prisma from "../orm/prisma";

export async function create(user: any) {
  await prisma.user.create({
    data: user,
  });
}

export async function findByEmail(email: string) {
  return await prisma.user.findUnique({
    where: {
      email
    }
  })
}