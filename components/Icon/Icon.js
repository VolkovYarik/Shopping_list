import { specs } from "/components/Specs";


export const Icon = ({ name, className }) => {
   if (!specs[name]) {
      return null;
   }

   const Component = specs[name];

   return <Component className={className} />;
};

