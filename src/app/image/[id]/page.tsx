import FullPageImageView from "~/components/FullPageImageView";

export default function PhotoModal({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  const id = Number(photoId);
  if (Number.isNaN(id)) throw new Error("Invalid photo ID");

  return <FullPageImageView id={id} />;
}
