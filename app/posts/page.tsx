import { createPost } from "@/actions/actions";
import prisma from "@/lib/db";
import Link from "next/link";

export default async function page() {
  const posts = await prisma.post.findMany();
  const postsCount = await prisma.post.count();
  return (
    <main className="flex flex-col items-center gap-y-5 pt-24">
      <h1 className="text-3xl font-bold">All Posts {postsCount}</h1>
      <ul className="border-t border-b border-black/10 py-5 leading-8">
        {posts.map((post: any) => (
          <li key={post.id} className="flex items-center justify-between px-5">
            <Link href={`/posts/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
      <form action={createPost} className="flex flex-col w-[300px] gap-y-2">
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="px-2 py-2 rounded-sm"
        />
        <textarea
          name="content"
          id="content"
          placeholder="content"
          rows={5}
          className="px-2 py-1 rounded-sm"
        />
        <button
          type="submit"
          className="bg-blue-500 py-2 text-white rounded-sm"
        >
          Create Post
        </button>
      </form>
    </main>
  );
}
