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
    <div className="ml-52 mr-24 mb-10">
      <div className="flex justify-center my-[3%] space-x-8">
        <h1
          className={`${
            complaintDetail.stage < 4 ? "text-mainColor" : "text-purple-300"
          } text-4xl font-bold underline cursor-pointer`}
          onClick={() =>
            setComplaintDetail({
              ...complaintDetail,
              stage: 0,
            })
          }
        >
          File
        </h1>
        <h1
          className={`${
            complaintDetail.stage > 3 ? "text-mainColor" : "text-purple-300"
          } text-4xl font-bold underline cursor-pointer`}
          onClick={() =>
            complaintDetail.consent
              ? setComplaintDetail({
                  ...complaintDetail,
                  stage: 4,
                })
              : toast.error("Please fill all the fields")
          }
        >
          Confirm
        </h1>
      </div>
      <div className="flex space-x-28">
        {complaintDetail.stage < 4 && <ProgressBar />}
        {complaintDetail.stage == 0 && <StageOne />}
        {complaintDetail.stage == 1 && <StageTwo />}
        {complaintDetail.stage == 2 && <StageThree />}
        {complaintDetail.stage == 3 && <StageFour />}
        {complaintDetail.stage == 4 && <ComplaintSummary />}
      </div>
    </div>
  );
};

export default FileComplaint;
