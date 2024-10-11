import { createClerkClient } from '@clerk/backend';

export const clerkPlantAppClient = createClerkClient({ secretKey: process.env.CLERK_PLANT_APP_USERS_SECRET_KEY });

