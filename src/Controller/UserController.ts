import { Request, Response } from "express-serve-static-core";
import UserRepo from "../Repository/UserRepository";
import { UserSession } from "../Security/SecurityContext";

class UserController {
  registerUser = async (req: Request, res: Response): Promise<Response> => {
    try {
      const data = req.body;
      const userName = data.UserSession.getUsername();
      //   const isExist
      const result = await UserRepo.createUser(userName);
      console.log("User Registered");
      return res.status(201).send(result);
    } catch (error) {
      console.log("Error registering user");
      return res.status(500).send({ msg: "Error : " + error });
    }
  };
}
export default new UserController();
