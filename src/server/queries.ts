import "server-only";
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";
import { images } from "./db/schema";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import analyticsServerClient from "./analytics";

export const getUserImages = async () => {
  const user = auth();
  if (!user.userId) {
    throw new Error("User not authenticated");
  }

  const images = await db.query.images.findMany({
    where: (model, { eq }) => eq(model.userId, user.userId),
    orderBy: (model, { desc }) => desc(model.createdAt),
  });
  return images;
};

export const getImage = async (id: number) => {
  const user = auth();
  if (!user.userId) {
    throw new Error("User not authenticated");
  }

  const image = await db.query.images.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });
  if (!image) {
    throw new Error("Image not found");
  }

  if (image.userId !== user.userId) {
    throw new Error("User not authorized to view this image");
  }

  return image;
};

export const deleteImage = async (id: number) => {
  const user = auth();
  if (!user.userId) {
    throw new Error("User not authenticated");
  }

  const image = await db.query.images.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });
  if (!image) {
    throw new Error("Image not found");
  }

  if (image.userId !== user.userId) {
    throw new Error("User not authorized to delete this image");
  }

  await db.delete(images).where(and(eq(images.id, id), eq(images.userId, user.userId)));

  analyticsServerClient.capture({
    event: "delete image",
    distinctId: user.userId,
    properties: {
      imageId: id,
    },
  });

  redirect("/");
}