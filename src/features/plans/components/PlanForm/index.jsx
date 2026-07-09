// import { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { motion, AnimatePresence } from "framer-motion";
// import { X } from "lucide-react";
// import { toast } from "sonner";

// import {
//   useCreatePlan,
//   useEditPlan,
// } from "@/features/plans/hooks/usePlansAdmin";
// import { useCategories } from "@/features/plans/hooks/useCategories";
// import { planFormSchema } from "@/features/plans/schemas/planFormSchema";

// import { STEPS, buildDefaultValues } from "./constants";
// import { Stepper } from "./Stepper";
// import { usePlanFormMedia } from "./hooks/usePlanFormMedia";
// import { BasicInfoStep } from "./steps/BasicInfoStep";
// import { SpecificationsStep } from "./steps/SpecificationsStep";
// import { DescriptionStep } from "./steps/DescriptionStep";
// import { FeaturesStep } from "./steps/FeaturesStep";
// import { ImagesStep } from "./steps/ImagesStep";

// export function PlanForm({ plan, onClose }) {
//   const isEditing = !!plan;
//   const [currentStep, setCurrentStep] = useState(0);

//   const { data: categories } = useCategories();
//   const { mutate: createPlan, isPending: isCreating } = useCreatePlan();
//   const { mutate: editPlan, isPending: isEditingPlan } = useEditPlan();
//   const isSubmitting = isCreating || isEditingPlan;

//   const media = usePlanFormMedia(plan);

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     watch,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(planFormSchema),
//     defaultValues: buildDefaultValues(plan),
//   });

//   // Auto-generate slug from title — create mode only. In edit mode the slug
//   // is fixed and comes from buildDefaultValues(plan) instead.
//   const title = watch("title");
//   useEffect(() => {
//     if (!isEditing && title) {
//       const slug = title
//         .toLowerCase()
//         .replace(/[^a-z0-9]+/g, "-")
//         .replace(/(^-|-$)/g, "");
//       setValue("slug", slug);
//     }
//   }, [title, isEditing, setValue]);

//   const onSubmit = (data) => {
//     const planData = {
//       ...data,
//       slug: data.slug || plan?.slug,
//       features: media.features,
//       images: media.images,
//     };

//     if (isEditing) {
//       editPlan(
//         { id: plan.id, data: planData },
//         {
//           onSuccess: () => {
//             toast.success("Plan updated successfully");
//             onClose();
//           },
//           onError: (err) => toast.error(err.message || "Failed to update plan"),
//         },
//       );
//     } else {
//       createPlan(planData, {
//         onSuccess: () => {
//           toast.success("Plan created successfully");
//           onClose();
//         },
//         onError: (err) => toast.error(err.message || "Failed to create plan"),
//       });
//     }
//   };

//   const nextStep = () => {
//     if (currentStep < STEPS.length - 1) setCurrentStep(currentStep + 1);
//   };
//   const prevStep = () => {
//     if (currentStep > 0) setCurrentStep(currentStep - 1);
//   };

//   const renderStep = () => {
//     switch (STEPS[currentStep].id) {
//       case "basic":
//         return (
//           <BasicInfoStep
//             register={register}
//             errors={errors}
//             isEditing={isEditing}
//             categories={categories}
//           />
//         );
//       case "specs":
//         return <SpecificationsStep register={register} errors={errors} />;
//       case "description":
//         return <DescriptionStep register={register} />;
//       case "features":
//         return (
//           <FeaturesStep
//             features={media.features}
//             newFeature={media.newFeature}
//             setNewFeature={media.setNewFeature}
//             addFeature={media.addFeature}
//             removeFeature={media.removeFeature}
//           />
//         );
//       case "images":
//         return (
//           <ImagesStep
//             images={media.images}
//             uploading={media.uploading}
//             handleImageUpload={media.handleImageUpload}
//             removeImage={media.removeImage}
//             setImageType={media.setImageType}
//           />
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         className="absolute inset-0 bg-black/60 backdrop-blur-sm"
//         onClick={onClose}
//       />

//       <motion.div
//         initial={{ opacity: 0, scale: 0.95, y: 20 }}
//         animate={{ opacity: 1, scale: 1, y: 0 }}
//         exit={{ opacity: 0, scale: 0.95, y: 20 }}
//         transition={{ type: "spring", damping: 25, stiffness: 300 }}
//         className="relative w-full max-w-2xl bg-gray-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
//           <div>
//             <h2 className="text-[18px] font-bold text-white">
//               {isEditing ? "Edit Plan" : "Create New Plan"}
//             </h2>
//             <p className="text-[12px] text-white/40">
//               Step {currentStep + 1} of {STEPS.length}
//             </p>
//           </div>
//           <button
//             onClick={onClose}
//             className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors text-white/40"
//           >
//             <X className="w-5 h-5" />
//           </button>
//         </div>

//         <Stepper
//           steps={STEPS}
//           currentStep={currentStep}
//           onStepClick={setCurrentStep}
//           errors={errors}
//         />

//         <div className="flex-1 overflow-y-auto p-6">
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={currentStep}
//                 initial={{ opacity: 0, x: 20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: -20 }}
//                 transition={{ duration: 0.2 }}
//               >
//                 {renderStep()}
//               </motion.div>
//             </AnimatePresence>
//           </form>
//         </div>

//         <div className="flex items-center justify-between px-6 py-4 border-t border-white/10">
//           <button
//             type="button"
//             onClick={prevStep}
//             disabled={currentStep === 0}
//             className="px-4 py-2 rounded-lg text-[13px] font-medium text-white/60 hover:text-white hover:bg-white/5 transition-colors disabled:opacity-30"
//           >
//             Previous
//           </button>

//           <div className="flex gap-2">
//             {currentStep === STEPS.length - 1 ? (
//               <button
//                 type="button"
//                 onClick={handleSubmit(onSubmit)}
//                 disabled={isSubmitting}
//                 className="bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-hover)] text-white px-6 py-2 rounded-lg text-[13px] font-medium transition-colors disabled:opacity-50"
//               >
//                 {isSubmitting ? (
//                   <div className="flex items-center gap-2">
//                     <div className="w-3 h-3 border-2 border-white/20 border-t-white rounded-full animate-spin" />
//                     {isEditing ? "Saving..." : "Creating..."}
//                   </div>
//                 ) : isEditing ? (
//                   "Save Changes"
//                 ) : (
//                   "Create Plan"
//                 )}
//               </button>
//             ) : (
//               <button
//                 type="button"
//                 onClick={nextStep}
//                 className="bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-hover)] text-white px-6 py-2 rounded-lg text-[13px] font-medium transition-colors"
//               >
//                 Next
//               </button>
//             )}
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { toast } from "sonner";

import {
  useCreatePlan,
  useEditPlan,
} from "@/features/plans/hooks/usePlansAdmin";
import { useCategories } from "@/features/plans/hooks/useCategories";
import { planFormSchema } from "@/features/plans/schemas/planFormSchema";

import { STEPS, buildDefaultValues } from "./Constants";
import { Stepper } from "./Stepper";
import { usePlanFormMedia } from "./hooks/usePlanFormMedia";
import { BasicInfoStep } from "./steps/BasicInfoStep";
import { SpecificationsStep } from "./steps/SpecificationsStep";
import { DescriptionStep } from "./steps/DescriptionStep";
import { FeaturesStep } from "./steps/FeaturesStep";
import { ImagesStep } from "./steps/ImagesStep";

export function PlanForm({ plan, onClose }) {
  const isEditing = !!plan;
  const [currentStep, setCurrentStep] = useState(0);

  const { data: categories } = useCategories();
  const { mutate: createPlan, isPending: isCreating } = useCreatePlan();
  const { mutate: editPlan, isPending: isEditingPlan } = useEditPlan();
  const isSubmitting = isCreating || isEditingPlan;

  const media = usePlanFormMedia(plan);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(planFormSchema),
    defaultValues: buildDefaultValues(plan),
  });

  const title = watch("title");
  useEffect(() => {
    if (!isEditing && title) {
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setValue("slug", slug);
    }
  }, [title, isEditing, setValue]);

  const onSubmit = (data) => {
    const planData = {
      ...data,
      slug: data.slug || plan?.slug,
      features: media.features,
      images: media.images,
    };

    if (isEditing) {
      editPlan(
        { id: plan.id, data: planData },
        {
          onSuccess: () => {
            toast.success("Plan updated successfully");
            onClose();
          },
          onError: (err) => toast.error(err.message || "Failed to update plan"),
        },
      );
    } else {
      createPlan(planData, {
        onSuccess: () => {
          toast.success("Plan created successfully");
          onClose();
        },
        onError: (err) => toast.error(err.message || "Failed to create plan"),
      });
    }
  };

  const nextStep = () => {
    if (currentStep < STEPS.length - 1) setCurrentStep(currentStep + 1);
  };
  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const renderStep = () => {
    switch (STEPS[currentStep].id) {
      case "basic":
        return (
          <BasicInfoStep
            register={register}
            errors={errors}
            isEditing={isEditing}
            categories={categories}
          />
        );
      case "specs":
        return <SpecificationsStep register={register} errors={errors} />;
      case "description":
        return <DescriptionStep register={register} />;
      case "features":
        return (
          <FeaturesStep
            features={media.features}
            newFeature={media.newFeature}
            setNewFeature={media.setNewFeature}
            addFeature={media.addFeature}
            removeFeature={media.removeFeature}
          />
        );
      case "images":
        return (
          <ImagesStep
            images={media.images}
            uploading={media.uploading}
            handleImageUpload={media.handleImageUpload}
            removeImage={media.removeImage}
            setImageType={media.setImageType}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-2xl bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div>
            <h2 className="text-[18px] font-bold text-gray-900">
              {isEditing ? "Edit Plan" : "Create New Plan"}
            </h2>
            <p className="text-[12px] text-gray-400">
              Step {currentStep + 1} of {STEPS.length}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors text-gray-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <Stepper
          steps={STEPS}
          currentStep={currentStep}
          onStepClick={setCurrentStep}
          errors={errors}
        />

        <div className="flex-1 overflow-y-auto p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>
          </form>
        </div>

        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
          <button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="px-4 py-2 rounded-lg text-[13px] font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-30"
          >
            Previous
          </button>

          <div className="flex gap-2">
            {currentStep === STEPS.length - 1 ? (
              <button
                type="button"
                onClick={handleSubmit(onSubmit)}
                disabled={isSubmitting}
                className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg text-[13px] font-medium transition-colors disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {isEditing ? "Saving..." : "Creating..."}
                  </div>
                ) : isEditing ? (
                  "Save Changes"
                ) : (
                  "Create Plan"
                )}
              </button>
            ) : (
              <button
                type="button"
                onClick={nextStep}
                className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg text-[13px] font-medium transition-colors"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
