"use client";

import { useRouter } from "next/navigation";
import { useUploadThing } from "~/utils/uploadthing";
import { toast } from "sonner";
import { usePostHog } from "posthog-js/react";

// inferred input off useUploadThing
type Input = Parameters<typeof useUploadThing>;

const useUploadThingInputProps = (...args: Input) => {
  const $ut = useUploadThing(...args);

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);
    const result = await $ut.startUpload(selectedFiles);

    console.log("uploaded files", result);
    // TODO: persist result in state maybe?
  };

  return {
    inputProps: {
      onChange,
      multiple: ($ut.permittedFileInfo?.config?.image?.maxFileCount ?? 1) > 1,
      accept: "image/*",
    },
    isUploading: $ut.isUploading,
  };
};

const UploadIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-6 w-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75"
      />
    </svg>
  );
};

const UploadAnimation = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="white"
    >
      <circle className="spinner_98HH" cx="12" cy="12" r="0" />
      <circle className="spinner_98HH spinner_roCJ" cx="12" cy="12" r="0" />
      <circle className="spinner_98HH spinner_q4Oo" cx="12" cy="12" r="0" />
    </svg>
  );
};

export const SimpleUploadButton = () => {
  const router = useRouter();
  const posthog = usePostHog();

  const { inputProps } = useUploadThingInputProps("imageUploader", {
    onUploadBegin: () => {
      posthog.capture("upload_started");
      toast(
        <div className="flex items-center gap-2">
          <UploadAnimation />
          Uploading...
        </div>,
        {
          duration: 100000,
          id: "uploading-toast",
        },
      );
    },
    onClientUploadComplete: () => {
      toast.dismiss("uploading-toast");
      toast("Upload complete");
      router.refresh();
    },
    onUploadError: (err) => {
      posthog.capture("upload_error", { err });
      toast.dismiss("uploading-toast");
      toast.error("Error uploading file");
    },
  });

  return (
    <div>
      <label htmlFor="upload-button" className="cursor-pointer">
        <UploadIcon />
      </label>
      <input
        id="upload-button"
        type="file"
        className="sr-only"
        {...inputProps}
      />
    </div>
  );
};
