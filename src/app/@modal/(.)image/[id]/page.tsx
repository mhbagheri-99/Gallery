// import { Modal } from './modal';

import { getImage } from "~/server/queries";

export default async function PhotoModal({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  const id = Number(photoId);
  if (Number.isNaN(id)) throw new Error("Invalid photo ID");
  const image = await getImage(Number(photoId));
  // return <Modal>{photoId}</Modal>;
  return (
    <div>
      <img src={image.url} alt={image.name} className="w-96"/>
      <div>{image.name}</div>
    </div>
  );
}