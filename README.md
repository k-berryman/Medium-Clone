# Medium Clone

Tutorial by Sonny Sangha
https://www.youtube.com/watch?v=I2dcpatq54o&t=3583s&ab_channel=SonnySangha

`npm run dev`

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
