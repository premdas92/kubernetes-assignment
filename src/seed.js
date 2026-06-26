const mongoose = require("mongoose");

const mongoURI =
  "mongodb+srv://admin:secretpassword@cluster0.prfsjmu.mongodb.net/nagp_db?retryWrites=true&w=majority";

const userSchema = new mongoose.Schema({
  name: String,
  role: String,
});

const User = mongoose.model("User", userSchema);

async function seedDatabase() {
  try {
    await mongoose.connect(mongoURI);

    console.log("Connected to MongoDB for seeding...");

    await User.deleteMany({});

    await User.insertMany([
      { name: "Rahul Sharma", role: "Associate Engineer" },
      { name: "Ananya Iyer", role: "Senior Developer" },
      { name: "Amit Patel", role: "DevOps Architect" },
      { name: "Priya Nair", role: "QA Automation Lead" },
      { name: "Vikram Singh", role: "Product Manager" },
    ]);

    console.log("Successfully seeded 5 records.");
  } catch (err) {
    console.error("Seeding failed:", err);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
}

seedDatabase();