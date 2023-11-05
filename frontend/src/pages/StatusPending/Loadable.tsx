import { CircularLoader } from "../../components/Common";
import loadable from "../../utils/Loadable";

export default loadable(() => import("./index"), {
  fallback: <CircularLoader />,
});
