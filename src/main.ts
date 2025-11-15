import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

async function main() {
}


export enum Statuses {
  Completed,
  Missed,
  NotCompleted
}