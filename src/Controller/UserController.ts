import { Request, Response } from "express";
import UserRepo from "../Repository/UserRepository";

class UserController {
  registerUser = async (req: Request, res: Response) => {
    try {
      const userSession = req.userSession;
      if (!userSession) {
        return res.status(400).send({ msg: "Invalid User Session" });
      }
      const { userName } = userSession;
      const isExist = await UserRepo.findUser({ userName });
      if (isExist) {
        return res.status(200).send({ msg: `Welcome ${userName}` });
      }

      const result = await UserRepo.createUser(userSession);
      console.log("User Registered");
      return res.status(201).send(result);
    } catch (error) {
      console.log("Error registering user");
      return res.status(500).send({ msg: "Error : " + error });
    }
  };
}
export default new UserController();
