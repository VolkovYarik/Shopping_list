import Image from "next/image";
import * as images from 'assets';

export const Img = ({ name }) => {
   const src = images[name]?.src || images.noImage.src;
   return <Image src={src} alt={name} width="70" height={'70'} />;

};