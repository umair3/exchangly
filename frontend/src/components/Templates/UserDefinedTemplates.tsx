import { usePagination } from "../../hooks";
import { useUserTemplates } from "../../services/Api/Templates/hooks";
import Templates from "./Templates";

interface IUserDefinedTemplatesProps {}

const UserDefinedTemplates: React.FC<IUserDefinedTemplatesProps> = () => {
  const { changeCount, currentPage, changeCurrentPage } = usePagination({
    count: 10,
    pageToShow: 1,
  });
  const { isLoading, isFetching, templates, nextPage } = useUserTemplates({
    currentPage,
    callback: (response) => changeCount(response.data.count),
  });

  const loadMoreTemplate = () => {
    changeCurrentPage(currentPage + 1);
  };

  return (
    <Templates
      isLoading={isLoading || isFetching}
      templates={templates}
      load={loadMoreTemplate}
      next={nextPage}
      title="User Templates"
      description="Updated or saved templates exists in user defined templates"
      preLoader={false}
    />
  );
};

export default UserDefinedTemplates;
