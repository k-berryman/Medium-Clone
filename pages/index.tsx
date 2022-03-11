import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Header from '../components/Header';
import Banner from '../components/Banner';
import { sanityClient, urlFor } from '../sanity';
import { Post } from '../typings';

interface Props {
  // An aaray of type Post
  posts: [Post];
}


const Home: NextPage = ({ posts }: Props) => {
  console.log(posts);
  return (
    <div className='max-w-7xl mx-auto'>
      <Head>
        <title>Medium Blog Clone</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header />
      <Banner />

      {/* Posts */}


    </div>
  )
}

export default Home

export const getServerSideProps = async () => {
  // fetch info from Sanity
  const query = `*[_type == "post"]{
  _id,
  title,
  description,
  mainImage,
  slug,
  author -> {
    name,
    image
  }
}`;

  const posts = await sanityClient.fetch(query);

  return {
    props: {
      posts,
    }
  };
};
