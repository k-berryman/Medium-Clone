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
