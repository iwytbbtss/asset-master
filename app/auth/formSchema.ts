import { z } from 'zod';

const formSchema = z.object({
  password: z.string(),
});

export type FormSchema = z.infer<typeof formSchema>;

export default formSchema;
