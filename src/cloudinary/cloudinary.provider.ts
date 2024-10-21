// cloudinary.provider.ts

import { v2 as cloudinary } from 'cloudinary';

export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  useFactory: () => {
    return cloudinary.config({
      cloud_name: 'dubkggu6n',
      api_key: '676258175555285',
      api_secret: 'GUbm66ZG0nf50Uzjo4BMGM_hUwY',
    });
  },
};
