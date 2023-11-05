import React from "react";
import parse from "html-react-parser";
import DOMPurify from "dompurify";

interface IHtmlRendererProps {
  html: string;
}

const HtmlRenderer: React.FC<IHtmlRendererProps> = ({ html }) => {
  const parseHtml = (htmlInput: string) => {
    const cleanHtml = DOMPurify.sanitize(htmlInput, {
      USE_PROFILES: { html: true },
    });
    return parse(cleanHtml);
  };

  return <div className="w-full h-full unreset ">{parseHtml(html)}</div>;
};

export default HtmlRenderer;
