import { z } from 'zod'

export const contactPurposeSchema = z.enum(['general', 'course', 'service', 'other'])

export const contactBodySchema = z
  .object({
    firstName: z.string().trim().min(1).max(100),
    lastName: z.string().trim().max(100).optional(),
    email: z.string().trim().email().max(254),
    phone: z.string().trim().min(5).max(30),
    country: z.string().trim().min(1).max(100),
    city: z.string().trim().min(1).max(100),
    purpose: contactPurposeSchema.default('general'),
    appliedFor: z.string().trim().max(200).optional(),
    message: z.string().trim().min(10).max(5000),
    turnstileToken: z.string().optional(),
    /** Honeypot — bots fill this; must be empty or omitted */
    website: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if ((data.purpose === 'course' || data.purpose === 'service') && !data.appliedFor) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'appliedFor required for course/service',
        path: ['appliedFor'],
      })
    }
  })

export type ContactBody = z.infer<typeof contactBodySchema>

export const PURPOSE_LABEL: Record<ContactBody['purpose'], string> = {
  general: 'General Inquiry',
  course: 'Course Enrollment',
  service: 'Service Request',
  other: 'Other',
}
