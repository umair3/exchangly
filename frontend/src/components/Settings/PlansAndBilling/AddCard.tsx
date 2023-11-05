import { MdAddCircle } from "react-icons/md";
import { useToggle } from "../../../hooks";
import { CustomModal } from "../../Common";
import AddPaymentMethod from "./AddPaymentMethod";

interface IAddCardProps {}

const AddCard: React.FC<IAddCardProps> = () => {
  const [displayAddCard, setDisplayAddCard] = useToggle(false);
  return (
    <div className="w-full flex justify-center p-4 ">
      <button
        onClick={setDisplayAddCard}
        className="flex flex-col gap-2 items-center max-w-sm mx-auto text-secondary/80 hover:text-secondary/100 font-bold"
      >
        <MdAddCircle fontSize="2.5rem" />
        <span className="text-lg md:text-xl">Add a card</span>
      </button>
      <CustomModal
        open={displayAddCard}
        handleClose={setDisplayAddCard}
        className=" w-11/12 md:w-4/6 lg:w-4/12 !p-6  !top-2/4 sm:!top-1/3 !bg-white overflow-auto"
        closeIcon
      >
        <AddPaymentMethod closeModal={setDisplayAddCard} />
      </CustomModal>
    </div>
  );
};

export default AddCard;
