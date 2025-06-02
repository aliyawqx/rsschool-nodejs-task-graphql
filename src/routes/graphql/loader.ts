import DataLoader from 'dataloader';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export function createUserSubsLoader() {
  return new DataLoader(async (userIds: readonly string[]) => {
    const relations = await prisma.subscribersOnAuthors.findMany({
      where: { authorId: { in: userIds as string[] } },
      include: { subscriber: true },
    });

    return userIds.map((authorId) =>
      relations
        .filter((relation) => relation.authorId === authorId)
        .map((relation) => relation.subscriber)
    );
  });
}
