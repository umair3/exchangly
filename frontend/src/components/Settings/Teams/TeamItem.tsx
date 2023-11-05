import { MdCancel, MdDelete, MdDone, MdEdit } from "react-icons/md";
import { useToggle } from "../../../hooks";
import { CustomModal, CustomTooltip } from "../../Common";
import DeleteTeamMember from "./DeleteTeamMember";
import EditTeamMember from "./EditTeamMember";

export interface ITeamItemProps {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  active: boolean;
  roles: string[];
  id: number;
}

const InfoItem = ({ subject, value }: { subject: string; value: string }) => (
  <div className="flex flex-col items-center py-1 gap-1 m md:py-0 md:gap-3 md:flex-row text-base font-bold  ">
    <div className="md:w-1/2  text-gray-500">{subject}</div>
    <div className="md:w-1/2 md:text-right">{value}</div>
  </div>
);

const Icon = ({ value }: { value: boolean }) => {
  if (!value) {
    return <MdCancel fontSize="2rem" className="md:ml-auto text-secondary" />;
  }
  return <MdDone fontSize="2rem" className="md:ml-auto text-secondary" />;
};

const TeamItem = (props: ITeamItemProps) => {
  const [showDeleteModal, setShowDeleteModal] = useToggle(false);
  const [showEditModal, setShowEditModal] = useToggle(false);

  const { first_name, last_name, email, roles, active, id } = props;

  return (
    <div className="w-full relative border flex flex-col gap-2 rounded-md bg-white p-2 xs:p-4 md:p-6 ">
      <InfoItem subject="Name" value={`${first_name} ${last_name}`} />

      <InfoItem subject="Email" value={email} />

      <InfoItem subject="Roles assigned" value={roles.join(",")} />

      <div className="flex flex-col items-center text-base font-semibold md:flex-row justify-between mb-8">
        <h2 className="text-gray-500">Active</h2>
        <div className="flex-none">
          <Icon value={active} />
        </div>
      </div>

      <div className="absolute max-w-fit ml-auto p-2 bg-gray-100/50 rounded bottom-0 left-0 right-0 flex  items-center text-base font-semibold md:flex-row justify-end">
        <CustomTooltip
          arrow
          title={
            <h3 style={{ fontWeight: "bold", fontSize: "0.9rem" }}>
              Edit member
            </h3>
          }
        >
          <div>
            <MdEdit
              onClick={setShowEditModal}
              className="text-2xl transition hover:text-secondary cursor-pointer"
            />
          </div>
        </CustomTooltip>

        <CustomTooltip
          arrow
          title={
            <h3 style={{ fontWeight: "bold", fontSize: "0.9rem" }}>
              delete member
            </h3>
          }
        >
          <div>
            <MdDelete
              onClick={setShowDeleteModal}
              className="text-2xl transition hover:text-secondary cursor-pointer"
            />
          </div>
        </CustomTooltip>

        {showDeleteModal && (
          <CustomModal
            open={showDeleteModal}
            handleClose={setShowDeleteModal}
            className="!p-4 overflow-auto !max-w-lg "
            style={{ width: "min(600px,98%)" }}
            closeIcon
          >
            <DeleteTeamMember
              closeModal={setShowDeleteModal}
              name={`${first_name} ${last_name}`}
              id={id}
            />
          </CustomModal>
        )}

        {showEditModal && (
          <CustomModal
            open={showEditModal}
            handleClose={setShowEditModal}
            className="!p-4 overflow-auto !max-w-lg "
            style={{ width: "min(600px,98%)" }}
            closeIcon
          >
            <EditTeamMember closeModal={setShowEditModal} team={props} />
          </CustomModal>
        )}
      </div>
    </div>
  );
};

export default TeamItem;
