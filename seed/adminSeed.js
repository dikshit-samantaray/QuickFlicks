import User from "../models/User.js";
import bcrypt from "bcryptjs";

const seedAdmin = async () => {
  const exists = await User.findOne({ email: "admin@quickflicks.com" });
  if (exists) return;
  const hash = await bcrypt.hash("admin123", 10);
  await User.create({
    email: "admin@quickflicks.com",
    password: hash,
    role: "admin",
  });
  console.log("Admin seeded");
};
export default seedAdmin;
