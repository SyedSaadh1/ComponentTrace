import mongoose from "mongoose";
export interface IUser {
  userName: string;
  password: string;
}

class User {
  private UserSchema: mongoose.Schema<IUser>;

  constructor() {
    this.UserSchema = new mongoose.Schema({
      userName: { type: String, required: true },
      password: { type: String, required: true },
    });
  }
  getModel() {
    return mongoose.model<IUser>("UserDetails", this.UserSchema);
  }
}

export default new User().getModel();
