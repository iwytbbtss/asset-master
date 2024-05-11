import { z } from 'zod';

const formSchema = z.object({
  password: z.string(),
});

export default formSchema;
