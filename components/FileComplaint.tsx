// @ts-nocheck

import toast from "react-hot-toast";
import { useRecoilState } from "recoil";
import { complaintDetails } from "../atoms/complaintDetails";
import ComplaintSummary from "./ComplaintSummary";
import ProgressBar from "./ProgressBar";
import StageFour from "./StageFour";
import StageOne from "./StageOne";
import StageThree from "./StageThree";
import StageTwo from "./StageTwo";

const FileComplaint = () => {
  const [complaintDetail, setComplaintDetail] =
    useRecoilState(complaintDetails);

  return (
    <div className="ml-32 mr-24 mb-10 mt-24">
      <div className="flex space-x-28">
        {complaintDetail.stage < 4 && <ProgressBar />}
        {complaintDetail.stage == 0 && <StageOne />}
        {complaintDetail.stage == 1 && <StageTwo />}
        {complaintDetail.stage == 2 && <StageThree />}
        {complaintDetail.stage == 3 && <StageFour />}
      </div>
    </div>
  );
};

export default FileComplaint;
