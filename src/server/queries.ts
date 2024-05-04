import 'server-only';
import { db } from './db';
import { auth } from '@clerk/nextjs/server';

export const getImages = async () => {

  const user = auth();
  if (!user.userId) {
    throw new Error('User not authenticated');
  }
  
  const images = await db.query.images.findMany({
    where: (model , { eq }) => eq(model.userId, user.userId),
    orderBy: (model, { desc }) => desc(model.createdAt),
  });
  return images;
}