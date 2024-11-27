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
  async findUser(filter = {}) {
    try {
      const result = await UserModel.findOne(filter);
      return result;
    } catch (error) {
      console.log("error in fetching user : " + error);
      throw error;
    }
  }
}
export default new UserRepo();
