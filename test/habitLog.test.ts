import { PrismaClient } from "@prisma/client";
import { createUser, deleteUser } from "../src/user"
import { createHabit, deleteHabit } from "../src/habit"
import { createHabitLog, updateHabitLogStatus, updateHabitLogNote, updateHabitLogMood, deleteHabitLog } from "../src/habitLog";

const prisma = new PrismaClient();

describe("HabitLog model tests", () => {
  let user: any;
  let habit: any;
  let habitLog: any;

  beforeAll(async () => {
    user = await createUser("log@test.com", "1234", "log user");
    habit = await createHabit("Утренняя зарядка", "Описание", "#FF0000", 30, "daily", user.id);
  });

  test("Create habit log", async () => {
    habitLog = await createHabitLog("Completed", "Хорошее настроение", "Отлично позанимался", habit.id);
    expect(habitLog).toHaveProperty("id");
  });

  test("Update habit log status, note, mood", async () => {
    const updatedStatus = await updateHabitLogStatus(habitLog.id, "Missed");
    expect(updatedStatus.status).toBe("Missed");

    const updatedNote = await updateHabitLogNote(habitLog.id, "Новая заметка");
    expect(updatedNote.note).toBe("Новая заметка");

    const updatedMood = await updateHabitLogMood(habitLog.id, "Отличное настроение");
    expect(updatedMood.mood).toBe("Отличное настроение");
  });

  test("Delete habit log", async () => {
    const deletedLog = await deleteHabitLog(habitLog.id);
    expect(deletedLog.id).toBe(habitLog.id);
  });

  afterAll(async () => {
    await deleteHabit(habit.id);
    await deleteUser(user.id);
    await prisma.$disconnect();
  });
});
