import React from "react";
import { HtmlRenderer } from "../../Common";

interface ITemplateBodyProps {
  body: string;
}

const TemplateBody: React.FC<ITemplateBodyProps> = ({ body }) => {
  return (
    <div className="mt-20  mx-4 py-5  max-w-6xl md:mx-auto flex justify-center flex-col items-center xs:px-0 px-2 ">
      <h3 className="text-2xl mb-10 text-center">Template Output</h3>
      <HtmlRenderer html={body} />
    </div>
  );
};

export default TemplateBody;
