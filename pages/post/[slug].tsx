import { sanityClient, urlFor } from '../../sanity';
import Header from '../../components/Header';
import { GetStaticProps } from 'next';
import { Post } from '../../typings';

// We need to define our prop types
interface Props {
  post: Post;
}

// Was props: Props before destructuring
function Post({ post }: Props) {
  console.log(post);

  return (
    <main>
      <Header />
    </main>
  );
}

export default Post;

export const getStaticPaths =  async () => {
  // pre-fetch all routes with a query from Sanity CMS to find all posts for us
  // GROQ syntax from Sanity CMS
  const query = `*[_type =="post"]{
    _id,
    slug {
      current
    }
  }`;

  const posts = await sanityClient.fetch(query);

  // figure out the paths
  // we need to pass Next.js the paths as an array where each object
  // has a key called params and then the path inside of it
  // this creates a list of paths. this is the structure Next.js expects
  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current
    }
  }));

  return {
    paths,
    // show 404 page if it doesn't exist
    fallback: 'blocking'
  };
};

// destructure context to get params out
export const getStaticProps: GetStaticProps = async ({ params }) => {
  // query for post
  // the slug is a placeholder for the actual slug
  // this will return an array back and [0] specifies the first post

  const query = `*[_type == "post" && slug.current == $slug][0]{
    _id,
    _createdAt,
    title,
    author-> {
      name,
      image
    },
    'comments': *[
      _type == "comment" &&
      post._ref == ^._id &&
      approved == true],
    description,
    mainImage,
    slug,
    body
  }`
  // pass in value to replace slug placeholder
  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  });

  // return a 404 page if page isn't found
  if(!post) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      post,
    },
    // after 60 seconds, update the old cached version
    revalidate: 60,
  }
}
