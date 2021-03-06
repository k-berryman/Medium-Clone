# Medium Clone

Tutorial by Sonny Sangha
https://www.youtube.com/watch?v=I2dcpatq54o&t=3583s&ab_channel=SonnySangha

frontend — in `medium-clone` main dir run `npm run dev`
backend — in `medium-clone/mediumclone` the child dir run `sanity start`

2 apps running
Next.js for the front-end
Sanity Studio for back-end

### Used Next.js, TypeScript, React, Sanity CMS, Tailwind CSS 3.0, ISR

#### What is Next.js?

#### What is React?

#### What is Tailwind CSS 3.0?
3.0 has the new colored shadowed featured

In VSCode, get `Tailwind CSS IntelliSense` extension

#### What is Sanity CMS?
Sanity CMS — managed backend, so non-devs can manage data
Sanity Studio can be deployed. We plug into the Sanity Studio with a language called Groq, which is have we query and mutate our data. It's kind of like GraphQL.

CMS is a content management system

Sanity Studio handles image uploading and all of that.

Sanity Studio is built in JS & React, so we can customize it. We can deploy this! After deployment, log-in with authorized Sanity Account. It also shows all of the changes and makes reverting to old versions easy.

They'll be providing our backend with our data. This allows us to make a development/staging dataset and a production dataset.


#### What is TypeScript?
TypeScript is a superset of JavaScript to provide strong type-checking
Declare variable types to avoid bugs

You can't give a browser TypeScript, so create-next-app transpiles TS to JS behind the scenes

#### What is GROQ?
We plug into the Sanity Studio with a language called Groq, which is have we query and mutate our data. It's kind of like GraphQL.

#### What is TypeScript?

#### What is ISR?
Incremental Static Regeneration (ISR) — Have static pages that can serve dynamic-like content

#### Notes
Fully responsive build, flexbox, grid,
Custom slugs for each article
Comments require approval
Static page is being dynamically updated every 60 seconds and is recached and served in an optimized, dynamic way with Next.js

#### Installs
`sudo npm install -g @sanity/cli`
`sanity init --coupon sonny2022`

## Set Up
`npx create-next-app --example with-tailwindcss medium-clone`

Go to `https://www.sanity.io/sonny`, log-in with Google, run `sudo npm install -g @sanity/cli`, cd `medium-clone`, run `sanity init --coupon sonny2022` That last command initializes the Sanity Studio inside this directory

If an error pops up, try running `sanity login` and then `sanity init --coupon sonny2022`. Name the project `mediumclone`. Type `y` to use the default dataset config. Confirm project path. Select `Blog (schema)` as project template.

Go back to `sanity.io` and see the project in the dashboard. Click the project

In the directories, `medium-clone/mediumclone` is where the Sanity Studio will live. In retrospect, I probably should've named it differently. Note that there's a separate package.json, so be mindful of installing dependencies in the correct directories.

Go to `pages/index.tsx`, which provides boilerplate TS!

In the main directory (`medium-clone`), run `npm run dev` to run it locally

In `pages/index.tsx`, delete everything in the main `div` **besides** the `<Head></Head>` part. Change `title` and get rid of 	div className styling

### Building the Header Component
In `medium-clone` (our main dir), create `components/` folder

In `components/`, Create `Header.tsx`
```
function Header() {
  return (
    <div>
      <h1>I'm a header!</h1>
    </div>
  );
}

export default Header;
```

In `index.tsx`,
`import Header from '../components/Header';`
`<Header />`

-----

#### Customizing our component B-)
- Change `div` to `header`
- There's 2 main divs and then we use flexbox to work out the space between them

Link component is from Next.js
If you use a Link component inside a page, it will pre-fetch the linked page by default, which speeds up page transitions
`import Link from 'next/link';` and `<Link href='/'></Link>`
Links require a `href`

Styling Notes
`object-contain` makes us keep the styling ratio

Hide `About`, `Contact`, and `Follow` on small screens with **breakpoints** (such as `md:` or `lg:`). Start with the **mobile-first** rule. Anything we write without a breakpoint is applied to mobile. Then, apply rules for the bigger screens. Use breakpoints to apply bigger sizes. From left to right, describe different styles for different screen sizes.

For example, here on a small screen it's hidden, on a medium screen and bigger it pops into the screen. `<div className='hidden md:inline-flex'>`

`px-4` means padding on the x-axis is 4

Add `flex` to `header` to put things in a horizontal line in React

### Build the Banner Component
Got it, cool

### Implementing Sanity CMS
Back-end!!!
Go to `sanity.io`, choose current project (mediumclone)

Open a new terminal, `cd mediumclone` (which is the sanity dir. once again, poor naming on my part)

Reminder — we've already done `sanity login` (if needed) and `sanity init`

Now do `sanity start` to spin up our local Sanity Studio
Go to `http://localhost:3333` and log-in

We already have some schema. See `mediumclone/schemas/` and see how it matches the Sanity Studio sidebar. `slugs` are `/the-rest-of-the-url`

#### Create a post via the UI

#### Now let's pull this post via the app
Go to the `vision` tab in the Sanity Studio
Under `Query` is where we type our GROQ syntax
Anything with the underscore is a built in attribute from Sanity
```
*[_type == "post"]{
  _id,
  title,
  description,
  slug,
  author -> {
    name,
    image
  }
}
```

#### Now we to run this query from our frontend to pull in that info.
Create `sanity.js` in the main project dir (`medium-clone/sanity.js`. This is basically our config file.

Also `npm install next-sanity`

This code is an example from the Sanity website
```
import {
  createImageUrlBuilder,
  createCurrentUserHook,
  createClient,
} from "next-sanity";

export const config = {
  /**
  * Find your project ID and dataset in `sanity.json` in your studio project.
  * These are considered "public", but you can user environent variables
  * if you want differ between local dev and production
  *
  * https://nextjs.org/docs/basic-features/environent-variables
  *
  * In my sanity folder `mediumclone/`, open `sanity.json`
  * under `api`, see the `projectId` and `dataset`.
  * I added these to my environment variables
  **/

  // this means dataset defaults to production if it can't find ours
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  projectId: proccess.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  apiVersion: '2021-03-25',

  /**
  * Set useCdn to `false` if your application requires the freshest possible
  * data always (potentially slower and a bit more expensive).
  * Authenticated request (like preview) will always bypass the CDN
  **/

  // if it's in prod, it'll use the cdn. if not, it won't
  useCdn: process.env.NODE_ENV === 'production',
};

// Set up the client for fetching data in the getProps page functions
// This is what we use to fetch info & make queries
// Needed to query to our backend
export const sanityClient = createClient(config);

/**
* Set up a helper function for generating Image URLs with only
* the asset reference data in your documents.
* Read more: https://www.sanity.io/docs/image-url
**/

// Helper function to extract img url from img
export const urlFor = (source) => createImageUrlBuilder(config).image(source);

// Helper function for using the current logged in user account
export const useCurrentUser = createCurrentUserHook(config);
```

We're going to create a const `config`

In the sanity folder `mediumclone/`, open `sanity.json` under `api`, see the `projectId` and `dataset`.

Add these to the environment variables
In the main dir, create `.env.local`, which will be where we store the environment variables

```
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_PROJECT_ID=m4ai8n6r
```

This is not private info, hence the `NEXT_PUBLIC` part and why I'm typing this here right now, lol

Restart the Next.js server (frontend) because we changed our environment variables `npm run dev`

A CDN (content distribution network) is a way of caching your local edge servers, so apps get served really fast. It loads up closer to the user.

----

Now we need to use the sanity client to make a fetch from our local set up


## Implementing Next.js Server Side Rendering (SSR)

Anytime someone comes to the homepage, it'll render per request.

### Next.js
Typically with React the entire bundle gets delivered to the user, but that gets heavy quickly. Every single page/picture/thing is inside of that one bundle, which causes scaling problems.

Next.js is here to help!

Between the user and React, Next.js intercepts the stuff and does it's logic. Next.js only gives the user the page — it page splits. That's why we have a `pages/` folder. **We call this page splitting**.

What we have now is **static rendering**, meaning everything is pre-built at build time. JS can run on the client. This is typically slow and sad.

Server-side rendering is here to help! (SSR)

When using SSR, the server renders per request. It builds with Next on the server, which means it's fastttt.

To make SSR work within Next.js, go to `index.tsx`  and use a function called `getServerSideProps`, which is where the server pre-builds the page. Remember this runs every request. Since we're putting it in our `'/'` route, this changes it into a SSR route.

-----

Add a description to our posts
Go to `mediumclone/schemas/post.js` and just add another field
Add a description in backend UI

-----

Okay back to `index.tsx`

Set `query` in `getServerSideProps`
```
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
}
```

Now set `posts`
`import { sanityClient, urlFor } from '../sanity';`
`const posts = await sanityClient.fetch(query);`

How do we move data from Next.js to React...?
Data is passed through the props!!

Now this function is done
```
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
```

Okay now we pull the props in
Scroll up to the top of `index.tsx` and pass the props in
TypeScript requires us to say the type of props `props: Props`

Okay let's make an interface that defines type `Props`, which allows extending for (type) inheritance
```
interface Props {
  // An aaray of type Post
  posts: [Post];
}
```

but now we need type Post
In the main dir, create `typings.d.ts`, which is a TypeScript Definition file to store our type definitions. We'll define Post in here.

This is modeled after what we see in our backend UI "vision" page
```
export interface Post {
  _id: string;
  _createdAt: string;
  title: string;
  author: {
    name: string;
    image: string;
  };
  description: string;
  mainImage: {
    asset: {
      url: string;
    };
  };
  slug: {
    current: string;
  };
  body: [object];
}
```

Go back to `index.tsx`
`import { Post } from '../typings';`

Now destructure the props to get the posts out `({ posts }: Props)`

Add a `console.log(posts);` to test if the SSR worked and to see if our front-end and back-end are successfully tied together

It worked :D

## Implementing the Posts Section
Found out I needed `import createImageUrlBuilder from 'sanity/image-url';` in `sanity.js` and `npm install --save @sanity/image-url` in that dir

```
{/* Go through every post. Each post will be a link */}
        {posts.map(post => (
          <Link key={post._id} href={`/post/${post.slug.current}`}>
            <div>
              {post.mainImage && (
                <img
                  src={urlFor(post.mainImage).url()!}
                  alt=''
                />                
              )}

```

That exclamation point ensures that it's not null... somehow
Protect it by also saying only render this block if there's a post.mainImage

On small screens, we want a grid column of 1. On medium, 2. On large, 3. Make the outside div a CSS Grid.

When we hover any of it, scale into the picture
Set entire div to `group`
On img, `group-hover:scale-105`

```
      {/* Posts */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 lg:p-6'>
        {posts.map((post) => (
          <Link key={post._id} href={`/post/${post.slug.current}`}>
            <div className='group cursor-pointer border rounded-lg overflow-hidden'>
              {post.mainImage && (
                <img
                  className='h-60 w-full object-cover group-hover:scale-105 transition-transform ease-in-out'
                  src={urlFor(post.mainImage).url()!}
                  alt=''
                />
              )}

              <div className='flex justify-between p-5 bg-white'>
                <div>
                  <p className='text-lg font-bold'>{post.title}</p>
                  <p className='text-xs'>{post.description} by {post.author.name}</p>
                </div>

                {post.mainImage && (
                  <img
                    className='h-12 w-12 rounded-full'
                    src={urlFor(post.author.image).url()!}
                    alt=''
                  />
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
```

## **Incremental Static Regeneration (ISR)**
An awesome feature of Next.js ... We want dynamic pages determined by the slugs (dynamic slugs). The slugs are determined by the backend. We want to prebuild all of these pages.

What do we mean by prebuild? On deployment, all pages that belong on the site should be prebuilt, so they can be cached. Meaning, when the user comes to the site, it comes up immediately -- little wait time.

Dynamic data makes this icky sticky.

When it's built at build-time, it doesn't really update, so it's an un-updated site, which is a problem. This can be fixed with SSR, but that means that every time a request is made it re-renders the app, which is a bit of a problem.

So we're going to have static pages which are cached and then combined with refreshing the page every 60 seconds, so the cache only stale for 60 seconds (or whatever time interval we select). That's how we get the best of both worlds

### Linking to the Post Page
Each slug needs it's own page
In `pages/` create a folder called `post/`
In `post/` create a file named `[slug].tsx` yes with brackets...
This corresponds to `/post/[dynamic_value_slug]`
The variable name is going to be `slug`, which we can access

Set this up as a component
```
function Post() {
  return <div></div>;
}

export default Post;

```
We're going to be using react hook form for form validation

We're going to pre-fetch all the data
1. We need to tell Next.js how it knows which posts exists (`getStaticPaths` which lets Next.js know which routes to build in advance aka pre-render)
`import { sanityClient, urlFor } from '../../sanity';`

```
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
}

```

But we cannot use `getStaticPaths` alone.
We've told Next.js which pages to prepare, but now we need to tell Next.js that when it tries to prepare that page, how will it use that slug to fetch that post's info. We need to go each page and `getStaticProps`

When returning object `notFound`  in Next.js when using `fallbacl: "blocking"`, it returns a 404 page

wohoo!!

1. It first finds the pages that exist with `getStaticPaths`
2. Then it runs `getStaticProps` which populates the info for the page

Now, it prebuilds the pages. Next, ISR. Incremental Static Regeneration.

What about when someone updates the blog? We need a new version to be updated to the cache, basically a new page.
`revalidate: 60,` in `[slug].tsx` enables ISR. This means after 60 seconds, update the old cached version. It'll SSR and then cache it and then it rendered for the next 60 seconds in a static fashion.

The old cache pages are removed from the server

### Building the Post Page
Build out the Post component in `[slug].tsx	`
To display the body, we're going to use React Portable Text
In main dir, `npm install react-portable-text` this was built to work with Sanity CMS
`import PortableText from 'react-portable-text';`

Add into the `PortableText` definition in `node_modules/react-portable-text/dist/index.d.ts` after `serializers` both dataset and projectId

serializers defines what to do when coming across a particular kind of element, like a h1

### Implementing Comments
Now we're going to use an API react-hook-form to implement and validate a form, we'll push the info to the db and then render it (the comments)

We don't need redux in this build because of the way we're pre-rendering the pages

Keep on going in `[slug].tsx`

React Hook Form
`npm install  react-hook-form` in main dir
`import { useForm, SubmitHandler } from 'react-hook-form';` in `[slug].tsx`

At the top of the Props func, `const { register, handleSubmit, formState: {errors} } = useForm();`

Let's define the form fields in TypeScript
```
interface inputFormInput {
  _id: string;
  name: string;
  email: string;
  comment: string;
}
```
If we put name? that makes it optional and not required, but let's leave it required

Then use it as a template
```
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<inputFormInput>();
```

We'll embed an invisible ID
```
          <input
            {...register('_id')}
            type='hidden'
            name='_id'
            value={post._id}
          />
```

That's the magic register function from react hook form
`{...register('name', { required: true })}`
`{...register('email', { required: true })}`
`{...register('comment', { required: true })}`

Boom that's our form validation

All these fields are required, meaning we need to print errors when the fields are left blank

{errors.name} is from
```
const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<inputFormInput>();
```

Add a submit button

Now we need to connect submit form logic to `form`
`onSubmit={handleSubmit(onSubmit)}`
Their function takes ours as an argument and ours handles the data

onSubmit will create a fetch to **our API** (we haven't created it yet) with endpoint createComment

```
const onSubmit: SubmitHandler<inputFormInput> = async(data) => {
    // push data from form to backend api
    await fetch('/api/createComment', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  };
```
Then on the backend is push it to the db

---
Now we need to
## Create API Endpoint
In Next.js, we have that intermediate server, meaning we have a **built in API** Don't believe me? Look at `pages/api/hello.ts`
Go to localhost:3000/api/hello
The dummy data comes back `{"name":"John Doe"}`!!

Create `pages/api/createComment.ts`
Copy and paste contents of hello.ts into createComment.ts

Add
 ```
const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN,
};
```

also
 `npm install @sanity/client` in main dir
 also
```
import sanityClient from '@sanity-client';
const client = sanityClient(config);
```

So we have
```
import sanityClient from '@sanity/client';

const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN,
};

const client = sanityClient(config);

```

But what's that magic token......? wonderful question
Go to the sanity dashboard https://www.sanity.io/, go to API tab, go to tokens, click Add API token, give editor permissions, copy the token

Go to `.env.local`
Add `SANITY_API_TOKEN=` to my super secret code
**THIS IS A SECRETTTT CODEEEE** so im not sharing it in this readme and .env.local is in my .gitignore. only I shall have this code.

restart next.js server because we changed the env vars

That key allows us on the API to read and write to the DB

Now we pull apart those 4 vars from the request body / form
Go to `pages/api/createComment.ts`
`const { _id, name, email, comment } = JSON.parse(req.body);`

```
  try {
    // create a document in Sanity CMS
    await client.create({
      // we're creating a new type comment, so we'll need a need schema too
      _type: 'comment',
      post: {
        _type: 'reference',
        _ref: _id
      },
      name,
      email,
      comment
    })
  }
```

We need to update the Sanity Studio Schema, so it knows to look for comments
Go to `medium-clone/mediumclone/schemas` for the backend stuffffs
Create a new schema. Create a new file in that folder `comment.js`

```
export default {
  name: "comment",
  type: "document",
  title: "Comment",
  fields: [
    {
      name: "name",
      type: "string",
    },
    {
      title: "Approved",
      name: "approved",
      type: "boolean",
      description: "Comments won't show on the site without approval",
    },
    {
      name: "email",
      type: "string",
    },
    {
      name: "comment",
      type: "text",
    },
    {
      name: "post",
      type: "reference",
      to: [{ type: "post" }],
    },
  ],
};

```

Then go to `schema.js`
`import comment from "./comment";`
`comment,` (add it to the list)

Dope

-----

Let's add some kind of confirmation that the form was successfully submitted -- feedback

Go back to `[slug].tsx`
Create state to keep track of submission status

If submitted, show success message. otherwise, show form

Yay, done

---

Now we need to show the comments, filtered by approved comments

Go to and add a `sub-query` for everything of type comment, with the post reference equal to the id of the post, and make sure approved is true

In `[slug].tsx`, check that `query` inside of `getStaticProps` has comments ... it does. We need to update our Post type definition. Go to `typings.d.ts` and add a comment type at the bottom

```

export interface Comment {
  approved: boolean;
  comment: string;
  email: string;
  name: string;
  post: {
    _ref: string;
    _type: string;
  };
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
}

```

In Post add `comments: Comment[]` it's of type Comment Array

Go back to `[slug].tsx` and underneath the form, display comments

Alrighty now we have
1. Form validation
2. Comments
3. Comment Approval
4. CMS Management
5. Fully Responsive
6. Functional

heck yeah

Sanity CMS is so good for blogs & ecommerce

### Deploy to Vercel
We want a way to always have access to our CMS backend
`cd mediumclone` (our backend folder)
`sanity deploy`
I named it `kaitlinsSanity`

```
Success! Studio deployed to https://kaitlinssanity.sanity.studio/
```

And it requires Google Auth to Sign-In

Local and deployed versions are connected in live-time

----

We've deployed our backend (Sanity Studio).
Now we need to deploy our Next.js App

Add repo to GitHub if I haven't already, lol
Connect local repo to GitHub repo
Add backend folder's node_modules to .gitignore `mediumclone/node_modules`
Push to GitHub

Go to Vercel
https://vercel.com/dashboard

Click new project, import Git Repo, pop environment variables into Vercel, click deploy
