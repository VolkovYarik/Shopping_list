import { Data, Key, Keys } from "types/serverSideTypes";

interface Dictionary<T extends object> {
   [key: string]: T;
}

const dictionary = (data: Data[], key: Key) => {
   return data.reduce((acc: Dictionary<Data>, item): Dictionary<Data> => {
      if (key === Keys.ID) {
         acc[item._id] = item
         return acc
      } else {
         acc[item.category] = item
         return acc
      }
   }, {});
}

export {
   dictionary,
   Dictionary
};