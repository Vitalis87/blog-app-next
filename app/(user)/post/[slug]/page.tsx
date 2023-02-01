import { groq } from "next-sanity";
import { client } from "../../../../lib/sanity.client";
import Image from "next/image";
import urlFor from "../../../../lib/urlFor";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import { RichTextComponent } from "../../../../components/RichTextComponent";

type Props = {
  params: {
    slug: string;
  };
};

async function Post({ params: { slug } }: Props) {
  const query = groq`
  *[_type=='post' && slug.current == $slug][0] 
  {
  ...,
  author->,
  articles[]->
}
`;

  const post: Post = await client.fetch(query, { slug });

  return (
    <article className="px-10 pb-28">
      <section className="border border-[#F7AB0A] text-white space-y-2">
        <div className="relative min-h-[56px] flex flex-col md:flex-row justify-between">
          <div className="absolute top-0 w-full h-full opacity-10 blur-sm p-10">
            <Image
              src={urlFor(post.mainImage).url()}
              alt={post.author.name}
              fill
              className="object-cover object-center mx-auto"
            />
          </div>

          <section className="p-5 bg-[#F7AB0A] w-full">
            <div className="flex flex-col md:flex-row justify-between gap-y-5">
              <div>
                <h1 className="text-4xl font-extrabold">{post.title}</h1>

                <p>
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Image
                  src={urlFor(post.author.image).url()}
                  alt={post.author.name}
                  className="rounded-full"
                  height={40}
                  width={40}
                />

                <div className="w-64">
                  <h3 className="text-lg font-bold">{post.author.name}</h3>
                  <p className="text-xs">{post.author.bio[0].children[0].text}</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="italic pt-10">
                {post.articles.map((item) => item.description)}
              </h2>
            </div>
          </section>
        </div>
      </section>

      <hr className="border-1 border-[#F7AB0A] mt-5 mb-5" />
      <PortableText value={post.body} components={RichTextComponent} />
    </article>
  );
}

export default Post;

export const revalidate = 60; //revalidate this page every 60 seconds

export async function generalStaticParams() {
  const query = groq`
    *[_type=='post']{
      slug
    }
  `;

  const slugs: Post[] = await client.fetch(query);
  const slugRoutes = slugs.map((slug) => slug.slug.current);

  return slugRoutes.map((slug) => ({
    slug,
  }));
}
