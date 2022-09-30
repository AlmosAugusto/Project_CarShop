import { z } from 'zod';
import { VehicleZodSchema } from './IVehicle';

const MotoZodZchema = VehicleZodSchema.extend({
  category: z.enum(['Street', 'Custom', 'Trail']), // ref: https://zod.dev/?id=zod-enums
  engineCapacity: z.number().int().positive().lte(2500),
});

type IMotorcycle = z.infer<typeof MotoZodZchema>;
export { IMotorcycle, MotoZodZchema }; 