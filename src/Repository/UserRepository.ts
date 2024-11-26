import UserModel, { IUser } from "../Models/UserModel";
class UserRepo {
  async createUser(Data: IUser) {
    try {
      const result = await UserModel.create(Data);
      return result;
    } catch (error) {
      console.log("Error: " + error);
      return error;
    }
  }
  async findUser() {}
}
export default new UserRepo();
