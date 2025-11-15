import { PrismaClient } from "@prisma/client";
import { createUser, deleteUser } from "../src/user"
import { createAchievement, getUserAchievements, deleteAchievement } from "../src/achivement";

const prisma = new PrismaClient();

describe("Achievement model tests", () => {
  let user: any;
  let achievement: any;

  beforeAll(async () => {
    user = await createUser("achievement@test.com", "1234", "achievement user");
  });

  test("Create achievement", async () => {
    achievement = await createAchievement("Первая привычка", "Создал первую привычку", "🏆", user.id);
    expect(achievement).toHaveProperty("id");
  });

  test("Get user achievements", async () => {
    const achievements = await getUserAchievements(user.id);
    expect(achievements.length).toBeGreaterThan(0);
  });

  test("Delete achievement", async () => {
    const deletedAchievement = await deleteAchievement(achievement.id);
    expect(deletedAchievement.id).toBe(achievement.id);
  });

  afterAll(async () => {
    await deleteUser(user.id);
    await prisma.$disconnect();
  });
});
