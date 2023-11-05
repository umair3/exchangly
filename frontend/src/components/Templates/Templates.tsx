import React from "react";
import { CustomButton, LoadMore, SimpleLoader } from "../Common";
import TemplateItem, { ITemplateItem } from "./TemplateItem";

interface ITemplatesProps {
  templates: ITemplateItem[];
  load: () => void;
  next: null | string;
  isLoading: boolean;
  title: string;
  description?: string;
  preLoader?: boolean;
}

const Templates: React.FC<ITemplatesProps> = ({
  templates,
  load,
  next,
  title,
  description,
  isLoading,
  preLoader = false,
}) => {
  if (!templates.length && isLoading && preLoader) {
    return (
      <div className="my-10">
        <SimpleLoader />
      </div>
    );
  }

  if (!templates.length) {
    return null;
  }

  return (
    <>
      <div className="bg-gray-50">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center max-w-7xl   py-5 rounded px-4 md:px-6 xl:px-4  my-16 mx-auto">
          <div>
            <h2
              className="font-bold text-secondary text-2xl sm:text-3xl  mb-1"
              style={{ textShadow: "0px 0px 1px var(--secondary)" }}
            >
              {title}
            </h2>
            {description && (
              <p className="text-base md:text-lg">{description}</p>
            )}
          </div>
        </div>
      </div>
      <div className="px-4 md:px-6 xl:px-4 max-w-7xl my-16 mx-auto ">
        <div className="my-10 grid gap-2 md:gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {templates.map((template) => (
            <TemplateItem key={template.id} {...template} />
          ))}
        </div>
        {isLoading && <SimpleLoader />}

        {next && (
          <div className="my-10">
            <LoadMore loadMore={load} />
          </div>
        )}
      </div>
    </>
  );
};

export default Templates;
