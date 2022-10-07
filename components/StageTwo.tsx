import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRecoilState } from "recoil";
import { complaintDetails } from "../atoms/complaintDetails";

const StageTwo = () => {
  const [complaintDetail, setComplaintDetail] =
    useRecoilState(complaintDetails);
  const router = useRouter();
  const query = router.query;

  useEffect(() => {
    setComplaintDetail({
      ...complaintDetail,
      complainantName: query.name ? String(query.name) : "",
      complainantEmail: query.email ? String(query.email) : "",
      complainantPhone: query.phoneNo ? String(query.phoneNo) : "",
      vua: query.id ? String(query.id) : "",
    });
  }, [query.id]);

  return (
    <div className="grid grid-cols-2 gap-10 w-full">
      <div className="space-y-6 border-r-[3px] border-mainColor">
        <h1 className="text-mainColor text-2xl font-bold">Step One</h1>
        <p className="text-mainColor text-sm">
          Against whom would you like to raise this grievance?
        </p>
        <div className="flex flex-col space-y-5 animate-fade">
          <label
            htmlFor="userName"
            className="text-xl text-mainColor font-medium"
          >
            Name
          </label>
          <input
            type="text"
            id="userName"
            value={complaintDetail.respondentName}
            className={`input ${
              complaintDetail.respondentName &&
              !complaintDetail.respondentName.match(/^[a-zA-Z_ ]*$/) &&
              "border-red-500 text-red-500"
            }`}
            onChange={(e) =>
              setComplaintDetail({
                ...complaintDetail,
                respondentName: e.target.value,
              })
            }
          />
          <label
            htmlFor="userEmail"
            className="text-xl text-mainColor font-medium"
          >
            Email
          </label>
          <input
            type="email"
            id="userEmail"
            value={complaintDetail.respondentEmail}
            className={`input ${
              complaintDetail.respondentEmail &&
              !complaintDetail.respondentEmail.match(
                /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
              ) &&
              "border-red-500 text-red-500"
            }`}
            onChange={(e) =>
              setComplaintDetail({
                ...complaintDetail,
                respondentEmail: e.target.value,
              })
            }
          />
          <label
            htmlFor="userPhone"
            className="text-xl text-mainColor font-medium"
          >
            Phone
          </label>
          <input
            type="text"
            id="userPhone"
            value={complaintDetail.respondentPhone}
            className={`input ${
              complaintDetail.respondentPhone &&
              !complaintDetail.respondentPhone.match(/^\d{10}$/) &&
              "border-red-500 text-red-500"
            }`}
            onChange={(e) =>
              setComplaintDetail({
                ...complaintDetail,
                respondentPhone: e.target.value,
              })
            }
          />
        </div>
      </div>
      <div className="flex flex-col justify-between h-[530px]">
        <div className="h-full pl-20">
          <div className="space-y-6">
            <h1 className="text-mainColor text-2xl font-bold">Complainant</h1>
            {complaintDetail.vua ? (
              <p className="text-white text-lg bg-mainColor w-fit px-5 py-1 rounded-[2rem] font-medium">
                <span className="font-bold">VUA - </span> {complaintDetail.vua}
              </p>
            ) : (
              <p>&nbsp;</p>
            )}

            <div className="flex flex-col space-y-5">
              <label
                htmlFor="userName"
                className="text-xl text-mainColor font-medium"
              >
                Name
              </label>
              <input
                type="text"
                id="userName"
                value={complaintDetail.complainantName}
                className="input"
                onChange={(e) =>
                  setComplaintDetail({
                    ...complaintDetail,
                    complainantName: e.target.value,
                  })
                }
              />
              <label
                htmlFor="userEmail"
                className="text-xl text-mainColor font-medium"
              >
                Email
              </label>
              <input
                type="email"
                id="userEmail"
                value={complaintDetail.complainantEmail}
                className="input"
                onChange={(e) =>
                  setComplaintDetail({
                    ...complaintDetail,
                    complainantEmail: e.target.value,
                  })
                }
              />
              <label
                htmlFor="userPhone"
                className="text-xl text-mainColor font-medium"
              >
                Phone
              </label>
              <input
                type="text"
                id="userPhone"
                value={complaintDetail.complainantPhone}
                className="input"
                onChange={(e) =>
                  setComplaintDetail({
                    ...complaintDetail,
                    complainantPhone: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </div>
        <div className="flex items-end justify-end space-x-2">
          <button className="button bg-secondaryColor">Prev</button>
          <button
            className="button bg-mainColor"
            onClick={() =>
              complaintDetail.respondentName.match(/^[a-zA-Z_ ]*$/) &&
              complaintDetail.respondentEmail.match(
                /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
              ) &&
              complaintDetail.respondentPhone.match(/^\d{10}$/)
                ? setComplaintDetail({
                    ...complaintDetail,
                    stage: complaintDetail.stage + 1,
                  })
                : toast.error("Please fill all the fields correctly")
            }
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default StageTwo;
