import React from "react";
import Image from "next/image"; // Ensure you're importing from next/image
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

function CustomLoading({ loading }) {
  return (
    <AlertDialog open={loading} onOpenChange={() => {}}>
      <AlertDialogContent className="bg-white">
        <div className="bg-white flex flex-col items-center my-10 justify-center">
          <Image src="/soon.gif" alt="Loading" width={100} height={100} />
          <h2>Generating your video... Do not Refresh</h2>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default CustomLoading;
