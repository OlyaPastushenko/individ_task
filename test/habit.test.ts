import { PrismaClient } from "@prisma/client";
import { createUser, deleteUser } from "../src/user"
import { createHabit, getUserHabits, updateHabitTitle, updateHabitDescription, deleteHabit } from "../src/habit";

const prisma = new PrismaClient();

describe("Habit model tests", () => {
  let user: any;
  let habit: any;

  beforeAll(async () => {
    user = await createUser("habit@test.com", "1234", "habit user");
  });

  test("Create habit", async () => {
    habit = await createHabit("Утренняя зарядка", "Описание", "#FF0000", 30, "daily", user.id);
    expect(habit).toHaveProperty("id");
  });

  test("Get user habits", async () => {
    const habits = await getUserHabits(user.id);
    expect(habits.length).toBeGreaterThan(0);
  });

  test("Update habit title and description", async () => {
    const updatedTitle = await updateHabitTitle(habit.id, "Новое название");
    expect(updatedTitle.title).toBe("Новое название");

    const updatedDescription = await updateHabitDescription(habit.id, "Новое описание");
    expect(updatedDescription.description).toBe("Новое описание");
  });

  test("Delete habit", async () => {
    const deletedHabit = await deleteHabit(habit.id);
    expect(deletedHabit.id).toBe(habit.id);
  });

  afterAll(async () => {
    await deleteUser(user.id);
    await prisma.$disconnect();
  });
});
