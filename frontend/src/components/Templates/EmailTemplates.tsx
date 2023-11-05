import { MdUnfoldMore } from "react-icons/md";
import { usePagination } from "../../hooks";
import { useEmailTemplates } from "../../services/Api/Templates/hooks";
import { LoadMore, SimpleLoader } from "../Common";
import TemplateItem from "./TemplateItem";
import Templates from "./Templates";

interface IEmailTemplatesProps {}

const EmailTemplates: React.FC<IEmailTemplatesProps> = () => {
  const { changeCount, currentPage, changeCurrentPage } = usePagination({
    count: 10,
    pageToShow: 1,
  });
  const { isLoading, isFetching, templates, nextPage } = useEmailTemplates({
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
      title="Responsive Email Templates"
      description="Proudly made with HTML"
      preLoader={true}
    />
  );
};

export default EmailTemplates;
