interface IHeaderProps {
  title: string;
}

const Header: React.FC<IHeaderProps> = ({ title }) => {
  return (
    <div className="text-xl md:text-2xl font-bold leading-5 text-secondary px-4 ">
      {title}
    </div>
  );
};

export default Header;
