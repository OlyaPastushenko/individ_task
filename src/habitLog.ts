import { PrismaClient, type Statuses } from "@prisma/client";

const prisma = new PrismaClient()

export async function createHabitLog(
  status: Statuses,
  mood: string | null,
  note: string,
  habitId: number
) {
  return prisma.habitLog.create({
    data: {
      status,
      mood,
      note,
      habitId
    }
  })
}

export async function updateHabitLogStatus(id: number, newStatus: Statuses) {
  return prisma.habitLog.update({
    where: {
      id: id
    },
    data: {
      status: newStatus
    }
  })
}

export async function updateHabitLogNote(id: number, newNote: string) {
  return prisma.habitLog.update({
    where: {
      id: id
    },
    data: {
      note: newNote
    }
  })
}

export async function updateHabitLogMood(id: number, newMood: string) {
  return prisma.habitLog.update({
    where: {
      id: id
    },
    data: {
      mood: newMood
    }
  })
}

export async function deleteHabitLog(id: number) {
  return prisma.habitLog.delete({
    where: {
      id: id
    }
  })
}