# Medium Clone

Tutorial by Sonny Sangha
https://www.youtube.com/watch?v=I2dcpatq54o&t=3583s&ab_channel=SonnySangha

`npm run dev`

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
