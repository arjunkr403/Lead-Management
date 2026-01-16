import mongoose from "mongoose";
import dotenv from "dotenv";
import { faker } from "@faker-js/faker";
import Lead from "../models/Lead.js";

dotenv.config({ path: "./backend/.env" });

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
};
const SOURCES = ["Website", "Ads", "Referral"];
const STATUSES = ["New", "Contacted", "Converted"];
const STAGES = ["Lead", "Prospect", "Customer"];

const generateLeads = (count = 500) => {
  const leads = [];

  for (let i = 0; i < count; i++) {
    leads.push({
      name: faker.person.fullName(),
      email: faker.internet.email().toLocaleLowerCase(),
      phone: faker.phone.number(),
      source: faker.helpers.arrayElement(SOURCES),
      status: faker.helpers.arrayElement(STATUSES),
      stage: faker.helpers.arrayElement(STAGES),
      createdAt: faker.date.past({ years: 1 }),
    });
  }
  return leads;
};

const seedLeads = async () => {
  try {
    await connectDB();
    console.log("connected to DB in seeds");

    await Lead.deleteMany();
    console.log("existing leads cleared");

    const leads = generateLeads(500);
    await Lead.insertMany(leads);
    console.log("500 leads inserted");

    process.exit();
  } catch (err) {
    console.error("seeding error: ", err.message);
    process.exit(1);
  }
};

seedLeads();
