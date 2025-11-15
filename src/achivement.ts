import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()


export async function createAchievement(name: string, description: string, icon: string, userId: number) {
  return prisma.achivement.create({
    data: {
      name,
      description,
      icon,
      userId
    }
  })
}

export async function getUserAchievements(userId: number) {
  return prisma.achivement.findMany({
    where: {
      userId: userId
    }
  })
}

export async function deleteAchievement(id: number) {
  return prisma.achivement.delete({
    where: {
      id: id
    }
  })
}