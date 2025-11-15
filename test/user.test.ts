import { PrismaClient } from "@prisma/client";
import { createUser, getUserById, getUserByEmail, updateUserName, deleteUser } from "../src/user";

const prisma = new PrismaClient();

describe("User model tests", () => {
  let user: any;

  test("Create user", async () => {
    user = await createUser("test@test.com", "1234", "test");
    expect(user).toHaveProperty("id");
  });

  test("Get user by ID and Email", async () => {
    const fetchedById = await getUserById(user.id);
    expect(fetchedById?.id).toBe(user.id);

    const fetchedByEmail = await getUserByEmail(user.email);
    expect(fetchedByEmail?.email).toBe(user.email);
  });

  test("Update user name", async () => {
    const updatedUser = await updateUserName(user.id, "Новое имя");
    expect(updatedUser.name).toBe("Новое имя");
  });

  test("Delete user", async () => {
    const deletedUser = await deleteUser(user.id);
    expect(deletedUser.id).toBe(user.id);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
