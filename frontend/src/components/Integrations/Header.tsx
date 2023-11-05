import React from "react";
import { useToggle } from "../../hooks";
import AddIntegrationModal from "./AddIntegrationModal";
import HeroSection from "./HeroSection";

interface IHeaderProps {}

const Header: React.FC<IHeaderProps> = (props) => {
  const [showAddIntegration, setShowAddIntegration] = useToggle(false);

  return (
    <React.Fragment>
      <HeroSection onButtonClick={setShowAddIntegration} />
      <AddIntegrationModal
        handleClose={setShowAddIntegration}
        open={showAddIntegration}
      />
    </React.Fragment>
  );
};

export default Header;
