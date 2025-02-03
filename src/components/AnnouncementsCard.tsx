/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import Modal from "./BlurryBackModal/Modal";
// import { MdOutlineNavigateNext } from "react-icons/md";
import { useGetAnnouncementsQuery } from "@/redux/services/Slices/Dashboard/announcementApiSlice";

// interface Announcement {
//   id: string;
//   title: string;
//   body: string;
//   attachment: string;
//   target: string;
//   created_at: string;
// }

// interface AnnouncementsCardProps {
//   announcements: Announcement[];
// }

export default function AnnouncementsCard() {
  // const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const {
    isLoading: loading,
    data: data,
    isFetching,
    error,
  } = useGetAnnouncementsQuery(null);

  console.log("Announcement", data);

  const connectorsAnnouncement = data?.data;
  // Filter announcements based on the target key

  // const handleNext = () => {
  //   setCurrentIndex((prev) =>
  //     prev < connectorsAnnouncement?.length - 1 ? prev + 1 : 0
  //   );
  // };

  // const handlePrevious = () => {
  //   setCurrentIndex((prev) =>
  //     prev > 0 ? prev - 1 : connectorsAnnouncement?.length - 1
  //   );
  // };

  if (!connectorsAnnouncement || loading || isFetching) return null;

  return (
    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2">
          {connectorsAnnouncement?.title}
        </h2>
        <p className="text-gray-700 mb-4">{connectorsAnnouncement?.body}</p>
        <div className="relative py-5">
          {connectorsAnnouncement.attachment ||
          connectorsAnnouncement.attachment !== "" ? (
            <img
              src={connectorsAnnouncement?.attachment}
              alt={connectorsAnnouncement?.title}
              className="w-full h-96 object-cover rounded-md mb-4"
            />
          ) : (
            <img
              src={
                "https://develop.trubooker.com/storage/25/447805898_286777.jpg"
              }
              alt={connectorsAnnouncement?.title}
              className="w-full h-96 object-cover rounded-md mb-4"
            />
          )}
        </div>
        {connectorsAnnouncement.duration && (
          <p className="text-sm text-[--primary] text-end w-full">
            This announcement expires in {connectorsAnnouncement.duration}.
          </p>
        )}
        {/* <div className="flex justify-between items-center">
          <button
            onClick={handlePrevious}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          >
            <MdOutlineNavigateNext className="rotate-180" />
          </button>
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <MdOutlineNavigateNext />
          </button>
        </div> */}
      </div>
    </Modal>
  );
}
