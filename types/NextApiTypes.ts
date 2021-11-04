import { NextApiRequest, NextApiResponse } from "next";

type ApiQuery = (req: NextApiRequest, res: NextApiResponse) => Promise<void>

export {
   ApiQuery
}