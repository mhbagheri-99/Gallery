import { SignedIn, SignedOut } from "@clerk/nextjs";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";

const Images = async () => {

  const images = await db.query.images.findMany({
    orderBy: (model, { desc }) => desc(model.createdAt),
  });

  return (
    <div className="flex flex-wrap gap-4">
          {images.map((image) => (
            <div key={image.id} className="flex flex-col w-48">
              <img src={image.url}/>
              <div className="text-lg">{image.name}</div>
            </div>
          ))}
        </div>
  );
}

const HomePage = () => {

  return (
    <main>
      <SignedOut>
        <div className="text-2xl font-semibold text-center">
          Please sign in to view the gallery
        </div>
      </SignedOut>
      <SignedIn>
        <Images />
      </SignedIn>
    </main>
  );
}

export default HomePage;
