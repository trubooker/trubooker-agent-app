import React from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { Button } from "./ui/button";
import { BiSolidMessageAltError } from "react-icons/bi";
import { ReloadIcon } from "@radix-ui/react-icons";

interface ResponseModalProps {
  successMessage?: string;
  errorMessage?: string;
  onClose: () => void;
  content?: string;
  content2?: string;
  handleRedirect?: () => void;
  classname?: string;
}

const ResponseModal: React.FC<ResponseModalProps> = ({
  successMessage,
  errorMessage,
  handleRedirect,
  onClose,
  content,
  content2,
  classname,
}) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 shadow-lg w-10/12 max-w-md text-center">
        {successMessage ? (
          <div className="">
            <FaCircleCheck className="w-20 h-20 mx-auto mb-4 text-green-600" />
            <h3 className="text-2xl font-bold mb-4 text-green-600 ">
              Successful
            </h3>
            <p>{successMessage}</p>
            <div className="flex justify-between items-center flex-col-reverse lg:flex-row ">
              <Button
                variant="outline"
                className="mt-6 py-2 px-4 rounded border border-gray-500"
                onClick={onClose}
              >
                {content2}
              </Button>
              <Button
                variant="secondary"
                className={`mt-6 bg-[#B24025] hover:bg-[#d5573a] text-white text-sm py-2 lg:px-6 rounded ${classname}`}
                onClick={handleRedirect}
              >
                View {content}
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-red-600">
            <BiSolidMessageAltError className="w-20 h-20 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">Error</h3>
            <p>{errorMessage}</p>
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                className="mt-6 py-2 px-4 rounded border border-red-600"
                onClick={onClose}
              >
                Try again
              </Button>
              {successMessage && (
                <Button
                  variant="secondary"
                  className="mt-6 bg-[#B24025] hover:bg-[#d5573a] text-white text-sm py-2 lg:px-6 rounded "
                  onClick={handleRedirect}
                >
                  View {content}
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Spinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
    </div>
  );
};

export default ResponseModal;
