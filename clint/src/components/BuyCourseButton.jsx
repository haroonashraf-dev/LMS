import { useCreateCheckoutSessionMutation } from "@/features/apis/purchaseApi";
import { Loader2 } from "lucide-react";
import React, { useEffect } from "react";
import { toast } from "sonner";

const BuyCourseButton = ({courseId}) => {
  const [createCheckoutSession, {data, isLoading, isSuccess, isError, error }] =
    useCreateCheckoutSessionMutation();
  const purchaseCourseHandler = async () => {
    await createCheckoutSession({courseId});
  };
  useEffect(() => {
    if(isSuccess){
       if(data?.url){
        window.location.href = data.url; // redirect to stripe checkout page
       }else{
        toast.error("Invalid Response from server");
       }
    }
    if(isError){
      toast.error(error?.data?.message || "Failed to create checkout");
    }
      
  },[data, isSuccess, isError, error])
  return (
    <button
      disabled={isLoading}
      onClick={purchaseCourseHandler}
      className="bg-[#2D2F31] w-full text-white px-4 py-2 rounded-md"
    >
      {isLoading ? (
        <>
          <Loader2 className="animate-spin mr-2 w-4 h-4" />
          please wait...
        </>
      ) : (
        "Purchase Course"
      )}
    </button>
  );
};

export default BuyCourseButton;
