import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import { getImages } from "~/server/queries";

export const dynamic = "force-dynamic";

const Images = async () => {

  const images = await getImages();

  return (
    <div className="flex flex-wrap gap-4">
          {images.map((image) => (
            <div key={image.id} className="flex flex-col w-48">
              <Image 
                src={image.url}
                alt={image.name}
                style={{objectFit: "contain"}}
                width={200}
                height={200}
              />
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
