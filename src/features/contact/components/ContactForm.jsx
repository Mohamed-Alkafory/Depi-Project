import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const contactSchema = z.object({
  fullName:    z.string().min(2, 'Name must be at least 2 characters').max(100),
  email:       z.string().min(1, 'Email is required').email('Please enter a valid email'),
  projectType: z.string().min(1, 'Please select a project type'),
  message:     z.string().min(10, 'Message must be at least 10 characters').max(2000),
});

/* Base class sets shared to avoid repetition */
const fieldBase =
  'w-full bg-surface-container-low border-none rounded-sm p-4 font-body text-base text-on-surface outline-none transition-shadow duration-[250ms] appearance-none placeholder:text-outline focus:shadow-[0_0_0_2px_rgba(0,101,101,0.20)]';
const fieldError =
  'shadow-[0_0_0_2px_rgba(186,26,26,0.30)] bg-[#fff5f5]';

const selectArrowStyle = {
  backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%233e4949' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 1rem center',
  backgroundSize: '1rem',
};

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName:    '',
      email:       '',
      projectType: 'Residential',
      message:     '',
    },
  });

  const onSubmit = async (data) => {
    console.log('Form submitted:', data);
    reset();
    alert('Message sent successfully!');
  };

  /* Label-focus colour micro-interaction */
  const handleFocus = (e) => {
    const label = e.target.closest('[data-form-group]')?.querySelector('label');
    if (label) label.style.color = '#006565';
  };
  const handleBlur = (e) => {
    const label = e.target.closest('[data-form-group]')?.querySelector('label');
    if (label) label.style.color = '';
  };

  return (
    <div className="bg-surface-container-lowest p-8 md:p-12 rounded-lg border border-[rgba(189,201,200,0.30)] shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)} noValidate>

        {/* Row: Full Name + Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div data-form-group className="flex flex-col gap-2">
            <label
              htmlFor="fullName"
              className="font-body text-sm font-semibold tracking-[0.1em] text-on-surface-variant transition-colors duration-200"
            >
              FULL NAME
            </label>
            <input
              type="text"
              id="fullName"
              placeholder="John Doe"
              {...register('fullName')}
              className={`${fieldBase} ${errors.fullName ? fieldError : ''}`}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {errors.fullName && (
              <span className="text-[13px] text-error mt-[2px] block">{errors.fullName.message}</span>
            )}
          </div>

          <div data-form-group className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="font-body text-sm font-semibold tracking-[0.1em] text-on-surface-variant transition-colors duration-200"
            >
              EMAIL ADDRESS
            </label>
            <input
              type="email"
              id="email"
              placeholder="john@example.com"
              {...register('email')}
              className={`${fieldBase} ${errors.email ? fieldError : ''}`}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {errors.email && (
              <span className="text-[13px] text-error mt-[2px] block">{errors.email.message}</span>
            )}
          </div>
        </div>

        {/* Project Type */}
        <div data-form-group className="flex flex-col gap-2">
          <label
            htmlFor="projectType"
            className="font-body text-sm font-semibold tracking-[0.1em] text-on-surface-variant transition-colors duration-200"
          >
            PROJECT TYPE
          </label>
          <select
            id="projectType"
            {...register('projectType')}
            className={`${fieldBase} pr-10 cursor-pointer ${errors.projectType ? fieldError : ''}`}
            style={selectArrowStyle}
            onFocus={handleFocus}
            onBlur={handleBlur}
          >
            <option value="Residential">Residential</option>
            <option value="Commercial">Commercial</option>
            <option value="Interior">Interior</option>
            <option value="Other">Other</option>
          </select>
          {errors.projectType && (
            <span className="text-[13px] text-error mt-[2px] block">{errors.projectType.message}</span>
          )}
        </div>

        {/* Message */}
        <div data-form-group className="flex flex-col gap-2">
          <label
            htmlFor="message"
            className="font-body text-sm font-semibold tracking-[0.1em] text-on-surface-variant transition-colors duration-200"
          >
            YOUR MESSAGE
          </label>
          <textarea
            id="message"
            placeholder="Tell us about your architectural vision..."
            rows={5}
            {...register('message')}
            className={`${fieldBase} resize-none min-h-[140px] ${errors.message ? fieldError : ''}`}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          {errors.message && (
            <span className="text-[13px] text-error mt-[2px] block">{errors.message.message}</span>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center gap-3 bg-primary text-on-primary border-none py-5 px-12 rounded-full font-body text-sm font-semibold tracking-[0.1em] cursor-pointer w-fit transition-[box-shadow,transform] duration-300 hover:shadow-[0_12px_32px_rgba(0,101,101,0.30)] active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:shadow-none"
        >
          {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>arrow_forward</span>
        </button>

      </form>
    </div>
  );
};

export default ContactForm;