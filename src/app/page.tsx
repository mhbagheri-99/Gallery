import { db } from "~/server/db";

export const dynamic = "force-dynamic";

export default async function HomePage() {

  const images = await db.query.images.findMany({
    orderBy: (model, { desc }) => desc(model.createdAt),
  });
  console.log(images);

  return (
    <main>
      <div className="flex flex-wrap gap-4">
        {[...images, ...images, ...images].map((image) => (
          <div key={image.id} className="flex flex-col w-48">
            <img src={image.url}/>
            <div className="text-lg">{image.name}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
