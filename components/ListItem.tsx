import useArticle from 'modules/useArticle';
import Loading from 'components/Loading';
import Article from 'components/Article';
import { articleType } from 'lib/types';

const ListItem = ({ id }: { id: number }): JSX.Element => {
  const {
    data: article,
    error,
    isLoading,
  }: {
    data: articleType | undefined;
    isLoading: boolean;
    error: Error | undefined;
  } = useArticle(id);

  if (isLoading) {
    return <Loading></Loading>;
  }

  if (error) {
    return <div>Error</div>;
  }

  if (article) {
    return <Article article={article} />;
  }

  return <></>;
};

export default ListItem;
