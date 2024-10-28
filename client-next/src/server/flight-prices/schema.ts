import { z } from "zod";

export const getDestinationsByRegionNameSchema = z.object({
  region_name: z.string(),
});
