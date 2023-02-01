import Image from "next/image";
import Link from "next/link";
import UrlFor from "../lib/urlFor";
import {PortableTextComponents} from '@portabletext/react'

export const RichTextComponent: PortableTextComponents = {
  types: {
    image: ({ value }) => (
      <div className="relative w-full h-96 m-10 mx-auto">
        <Image src={UrlFor(value).url()} fill alt="Blog Post Image" />
      </div>
    ),
  },
    marks: {
      link: ({ children, value }) => {
        const rel = !value.href.startsWith("/")
          ? "noreferrer noopener"
          : undefined;
        return (
          <Link href={value.href} rel={rel} className="underline decoration-[#F7AB0A] hover:decoration-black">
            {children}
          </Link>
        );
      },
    },
    block: {
      blockquote: ({children}) => <blockquote className="border-l-purple-500">{children}</blockquote>,
      h1: ({children}) => (
        <h1 className="text-4xl py-10 font-bold">{children}</h1>
      ),
      h2: ({children}) => (
        <h1 className="text-5xl py-10 font-bold">{children}</h1>
      ),
      h3: ({children}) => (
        <h1 className="text-3xl py-10 font-bold">{children}</h1>
      ),
      h4: ({children}) => (
        <h1 className="text-4xl py-10 font-bold">{children}</h1>
      ),
    },
    list: {
      bullet: ({children}) => <ul className="ml-10 py-5 list-disc space-y-5">{children}</ul>,
      number: ({children}) => <ol className="">{children}</ol>,
    },
    listItem: {
      // Ex. 1: customizing common list types
      bullet: ({children}) => <li style={{listStyleType: 'disclosure-closed'}}>{children}</li>,
    },
};
