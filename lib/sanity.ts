import { createClient } from 'next-sanity';

const config = {
  projectId: `${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`,
  dataset: `${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
  useCdn: false,
  apiVersion: '2023-03-27'
};

const sanityClient = createClient(config);
export default sanityClient;