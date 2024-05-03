import { db } from "~/server/db";

const mockDataURLs = [
  "https://utfs.io/f/01536242-d567-4810-8837-02c3cfa9ee9f-su2y94.png",
  "https://utfs.io/f/0f369f3b-c2df-4c8c-ac29-d63a5ce52257-extgcp.png",
  "https://utfs.io/f/da6460e6-07b3-4aec-abc8-692f4485c7e7-tnvrco.png",
  "https://utfs.io/f/9fbd5770-9dbf-46d5-bb13-8e60d2183c47-yj8b2o.png"
];

const mockImages = mockDataURLs.map((url, index) => ({
  id: index + 1,
  url
}));

export default async function HomePage() {

  const posts = await db.query.posts.findMany();

  return (
    <main>
      <div className="flex flex-wrap gap-4">
        {/* {posts.map((post) => (
          <div key={post?.id} className="w-48">
            <h1>{post.name}</h1>
          </div>
        ))} */}
        {mockImages.map((image) => (
          <div key={image?.id} className="w-48">
            <img src={image.url}/>
          </div>
        ))}
      </div>
    </main>
  );
}
