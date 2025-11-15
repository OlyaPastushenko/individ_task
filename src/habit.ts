import { PrismaClient, Statuses } from "@prisma/client";
import { createHabitLog, updateHabitLogStatus } from "./habitLog";

const prisma = new PrismaClient()


export async function createHabit(title: string, description: string | null, color: string, targetDays: number, schedule: string, userId: number) {
  return prisma.habit.create({
    data: {
      title,
      description,
      color,
      targetDays,
      schedule,
      userId
    }
  })
}

export async function getHabitById(id: number) {
  return await prisma.habit.findUnique({
    where: { id }
  });
}

export async function getUserHabits(userId: number) {
  return prisma.habit.findMany({
    where: {
      userId: userId
    }
  })
}

export async function updateHabitTitle(id: number, newTitle: string) {
  return prisma.habit.update({
    where: {
      id: id
    },
    data: {
      title: newTitle
    }
  })
}

export async function updateHabitDescription(id: number, newDescription: string) {
  return prisma.habit.update({
    where: {
      id: id
    },
    data: {
      description: newDescription
    }
  })
}

export async function deleteHabit(id: number) {
  return prisma.habit.delete({
    where: {
      id: id
    }
  })
}

export async function markHabitForDate(
  userId: number,
  habitId: number,
  date: Date,
  status: Statuses
) {
  
  const habit = await getUserHabits(userId)
  
  if (!habit) return
  
  const normalizedDate = new Date(date);
  normalizedDate.setHours(0, 0, 0, 0);

  const existingLog = await prisma.habitLog.findFirst({
    where: {
      habitId,
      date: normalizedDate
    }
  });

  if (existingLog) {
    return updateHabitLogStatus(existingLog.id, status)
  }

  return createHabitLog(status, null, "", habitId)
}

export async function getTodayHabits(userId: number, date: Date) {
  const dayName = date.toLocaleString("en-US", { weekday: "short" })
  const normalizedDate = new Date(date)
  normalizedDate.setHours(0, 0, 0, 0)

  const habits = await prisma.habit.findMany({
    where: {
      userId,
      OR: [
        { schedule: "daily" },
        { schedule: { contains: dayName } }
      ]
    },
    include: {
      habitLogs: {
        where: { date: normalizedDate }
      }
    }
  });

  return habits;
}

export async function calculateCurrentStreak(habitId: number) {
  const logs = await prisma.habitLog.findMany({
    where: { habitId },
    orderBy: { date: "desc" }
  });

  let streak = 0;
  let current = new Date();
  current.setHours(0, 0, 0, 0);

  for (const log of logs) {
    const logDate = new Date(log.date);
    logDate.setHours(0, 0, 0, 0);

    if (log.status === "Completed" && logDate.getTime() === current.getTime()) {
      streak++;
      current.setDate(current.getDate() - 1);
    } 
    else {
      break;
    }
  }

  return streak;
}


export async function getHabitStats(habitId: number) {
  const totalCompleted = await prisma.habitLog.count({
    where: { habitId, status: "Completed" }
  });

  const habit = await getHabitById(habitId)

  if (!habit) return

  const successRate =
    habit.targetDays > 0
      ? Math.round((totalCompleted / habit.targetDays) * 100)
      : 0

  return {
    totalCompleted,
    target: habit.targetDays,
    successRate
  };
}