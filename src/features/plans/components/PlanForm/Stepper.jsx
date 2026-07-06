// export function Stepper({ steps, currentStep, onStepClick, errors }) {
//   return (
//     <div className="flex items-center px-6 py-3 border-b border-white/10 gap-1">
//       {steps.map((step, index) => {
//         const hasError = step.fields.some((field) => errors[field]);
//         return (
//           <div key={step.id} className="flex items-center">
//             <button
//               type="button"
//               onClick={() => onStepClick(index)}
//               className={`px-3 py-1 rounded-full text-[11px] font-medium transition-colors ${
//                 index === currentStep
//                   ? "bg-[var(--brand-primary)] text-white"
//                   : index < currentStep
//                     ? "bg-white/10 text-white/70"
//                     : "text-white/30"
//               }`}
//             >
//               {step.label}
//               {hasError && <span className="ml-1 text-red-400">•</span>}
//             </button>
//             {index < steps.length - 1 && (
//               <div
//                 className={`w-4 h-px mx-1 ${
//                   index < currentStep ? "bg-white/30" : "bg-white/10"
//                 }`}
//               />
//             )}
//           </div>
//         );
//       })}
//     </div>
//   );
// }

export function Stepper({ steps, currentStep, onStepClick, errors }) {
  return (
    <div className="flex items-center px-6 py-3 border-b border-gray-200 gap-1 bg-gray-50">
      {steps.map((step, index) => {
        const hasError = step.fields.some((field) => errors[field]);
        return (
          <div key={step.id} className="flex items-center">
            <button
              type="button"
              onClick={() => onStepClick(index)}
              className={`px-3 py-1 rounded-full text-[11px] font-medium transition-colors ${
                index === currentStep
                  ? "bg-teal-600 text-white"
                  : index < currentStep
                    ? "bg-teal-100 text-teal-700"
                    : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {step.label}
              {hasError && <span className="ml-1 text-red-500">•</span>}
            </button>
            {index < steps.length - 1 && (
              <div
                className={`w-4 h-px mx-1 ${
                  index < currentStep ? "bg-teal-300" : "bg-gray-300"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
