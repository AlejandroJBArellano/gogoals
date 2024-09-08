import { NextApiRequest, NextApiResponse } from "next";

// generate a nextjs 14 route
export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
    const { body } = req;
    const { name } = body;
    if (!name) {
        return res.status(400).json({ error: "Name is required" });
    }
    return res.status(200).json({ message: `Hello ${name}` });
    }