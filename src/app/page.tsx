import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { getUserImages } from "~/server/queries";

export const dynamic = "force-dynamic";

const Images = async () => {
  const images = await getUserImages();

  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
      {images.map((image) => (
        <div key={image.id} className="flex w-48 flex-col">
          <Link href={`/image/${image.id}`}>
            <Image
              src={image.url}
              alt={image.name}
              style={{ objectFit: "contain" }}
              width={192}
              height={192}
            />
          </Link>
          <div className="text-lg">{image.name}</div>
        </div>
      ))}
    </div>
  );
};

const HomePage = () => {
  return (
    <main>
      <SignedOut>
        <div className="text-center text-2xl font-semibold">
          Please sign in to view the gallery
        </div>
      </SignedOut>
      <SignedIn>
        <Images />
      </SignedIn>
    </main>
  );
};

export default HomePage;
