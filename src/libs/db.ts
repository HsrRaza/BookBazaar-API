
import { PrismaClient } from '@prisma/client';


const prismaClient = new PrismaClient().$extends({
  result: {
    address: {
      formattedAddress: {
        needs: {
          lineOne: true,
          lineTwo: true,
          city: true,
          country: true,
          pincode: true,
        },
        compute: (addr) => {
          return `${addr.lineOne}, ${addr.lineTwo ?? ''}, ${addr.city}, ${addr.country}, ${addr.pincode}`;
        },
      },
    },
  },
});


declare global {
  
  var prisma: typeof prismaClient | undefined;
}


export const db = globalThis.prisma ?? prismaClient;

if (process.env.NODE_ENV !== 'production') globalThis.prisma = db;
