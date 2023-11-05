import ConnectedItem from "./ConnectedItem";

const ConnectedList = () => {
  return (
    <div className="mt-4 w-full max-w-5xl flex flex-col gap-4">
      <h3 className=" mb-2 text-gray-800 font-semibold text-xl ">
        Connected Accounts
      </h3>

      <ConnectedItem
        name="Facebook"
        types={["Mail to Social", "Social to Mail", "Two way"]}
      />
      <ConnectedItem
        name="LinkedIn"
        types={["Mail to Social", "Social to Mail"]}
      />
    </div>
  );
};

export default ConnectedList;
