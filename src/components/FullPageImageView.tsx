import { getImage } from "~/server/queries";

export default async function PhotoModal( { id }: { id: number }) {
  const image = await getImage(id);
  return (
    <div className="flex w-full h-full min-w-0">
      <div className="flex-shrink flex justify-center items-center">
        <img src={image.url} alt={image.name} className="object-contain"/>
      </div>
      <div className="w-48 flex flex-col flex-shrink-0 border-l">
        <div className="text-xl font-bold">{image.name}</div>
      </div>
    </div>
  );
}