// Components
import Layout from 'components/Layout';
import SWRStructure from 'components/SWRStructure';
import TagList from 'components/TagList';

// Next API
import { useRouter } from 'next/router';

// Modules
import { useTags } from 'modules/TagsProvider';
import { NextSeo } from 'next-seo';

const Page = () => {
  const router = useRouter();
  const { tags, error } = useTags();

  return (
    <>
      <NextSeo title='Tags' />
      <Layout>
        <section className="vertical_block_margin side_margin tagslist">
          <SWRStructure isLoading={!tags} error={error} router={router}>
            <TagList tags={tags} />
          </SWRStructure>
        </section>
      </Layout>
    </>
  );
};

export default Page;
