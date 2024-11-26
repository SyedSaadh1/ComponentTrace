import mongoose from "mongoose";
export interface IUser {
  userName: string;
  userId: string;
}

class User {
  private UserSchema: mongoose.Schema<IUser>;

  constructor() {
    this.UserSchema = new mongoose.Schema({
      userName: { type: String, required: true },
      userId: { type: String, default: "USERXXX" },
    });
  }
  getModel() {
    return mongoose.model<IUser>("UserDetails", this.UserSchema);
  }
}

export default new User().getModel();
