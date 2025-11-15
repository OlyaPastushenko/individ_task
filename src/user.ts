import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()


export async function createUser(email: string, password: string, name: string) {
  return await prisma.user.create({
    data: {
      email,
      password,
      name
    }
  })
}

export async function getUserById(id: number) {
  return await prisma.user.findUnique({
    where: {
      id: id
    }
  })
}

export async function getUserByEmail(email: string) {
  return await prisma.user.findUnique({
    where: {
      email: email
    }
  })
}

export async function updateUserName(id: number, newName: string) {
  return await prisma.user.update({
    where: {
      id: id
    },
    data: {
      name: newName
    }
  })
}

export async function deleteUser(id: number) {
  return await prisma.user.delete({
    where: {
      id: id
    }
  })
}