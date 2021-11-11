import { Data, Key, Keys } from "types/serverSideTypes";
import { Dictionary } from "types/dataTypes";


export const dictionary = (data: Data[], key: Key) => {
   if (!data) {
      return {}
   }
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

