import Image from "next/image";
import urlFor from "../lib/urlFor";
import { ArrowUpRightIcon } from "@heroicons/react/24/solid";
import ClientSideRoute from "./ClientSideRoute";

type Props = {
  posts: Post[];
};

function BlogList({ posts }: Props) {
  return (
    <div>
      <hr className="border-[#F7AB0A] mb-10" />

      <div className="grid grid-cols-1 md:grid-cols-2 px-10 gap-10 gap-y-16 pb-24">
        {posts.map((post) => (
          <ClientSideRoute key={post._id} route={`/post/${post.slug.current}`}>
            <div className="group cursor-pointer flex flex-col">
              <div className="relative w-full h-96 drop-shadow-xl group-hover:scale-105 transition-transform duration-200 ease-out">
                  <Image
                    className="object-cover object-left lg:object-top"
                    src={urlFor(post.mainImage).url()}
                    fill
                    alt={post.author.name}
                  />
                <div className="absolute bottom-0 w-full bg-opacity-20 bg-black backdrop-blur-lg rounded drop-shadow-lg text-white py-5 px-10 flex justify-between">
                  <div>
                    <p className="font-bold">{post.title}</p>
                    <p>
                      {new Date(post.publishedAt).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>

                  <div className="flex flex-col md:flex-row gap-y-2 md:gap-x-2 items-center">
                    <div className="bg-[#F7Ab0A] text-center text-black px-3 py-1 rounded-full text-sm font-semibold">
                      <p>{post.author.name}</p>
                    </div>
                  </div>
                </div>
              </div>

              {post.articles.map((article) => (
                <div key={article._id} className="mt-5 flex-1">
                  <p className="underline text-lg font-bold h-14 line-clamp-2">
                    {article.title}
                  </p>
                  <p className="text-gray-500 line-clamp-3">
                    {article.description}
                  </p>
                </div>
              ))}

              <p className="mt-5 font-bold flex items-center group-hover:underline">
                Read Post
                <ArrowUpRightIcon className="ml-2 h-4 w-4" />
              </p>
            </div>
          </ClientSideRoute>
        ))}
      </div>
    </div>
  );
}

export default BlogList;
