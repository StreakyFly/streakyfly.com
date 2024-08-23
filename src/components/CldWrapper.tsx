'use client';

import { CldImage as CldImageDefault, CldImageProps } from 'next-cloudinary';

const CldImage = (props: CldImageProps) => {
    return <CldImageDefault {...props} />
}

export { CldImage };


// TODO: other wrappers, like video wrapper go here as well
