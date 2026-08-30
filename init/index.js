const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const User = require("../models/user.js");

const MONGO_URL = process.env.ATLASDB_URL || "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
  await mongoose.connect(MONGO_URL);
  console.log("connected to db");
  await initDB();
  await mongoose.connection.close();
  console.log("database connection closed");
}

function getCategory(item) {
    const text = `${item.title} ${item.description} ${item.location}`.toLowerCase();
    if (text.includes("mountain") || text.includes("cabin") || text.includes("chalet") || text.includes("ski") || text.includes("aspen")) return "mountains";
    if (text.includes("castle") || text.includes("villa") || text.includes("historic") || text.includes("palace") || text.includes("heritage")) return "castles";
    if (text.includes("pool") || text.includes("beach") || text.includes("lake") || text.includes("island") || text.includes("resort") || text.includes("cancun")) return "amazing-pools";
    if (text.includes("camp") || text.includes("treehouse") || text.includes("tent") || text.includes("nature") || text.includes("park") || text.includes("safari")) return "camping";
    if (text.includes("farm") || text.includes("countryside") || text.includes("ranch") || text.includes("cottage") || text.includes("vineyard")) return "farms";
    if (text.includes("arctic") || text.includes("snow") || text.includes("ice") || text.includes("igloo") || text.includes("nordic") || text.includes("alps")) return "arctic";
    if (text.includes("dome") || text.includes("yurt") || text.includes("glamping") || text.includes("pod")) return "domes";
    if (text.includes("boat") || text.includes("yacht") || text.includes("canal") || text.includes("harbor") || text.includes("water") || text.includes("fiji")) return "boats";
    if (text.includes("city") || text.includes("loft") || text.includes("apartment") || text.includes("downtown") || text.includes("penthouse") || text.includes("tokyo") || text.includes("york") || text.includes("amsterdam")) return "iconic-cities";
    if (text.includes("room") || text.includes("studio") || text.includes("suite") || text.includes("bed")) return "rooms";
    return "trending";
}

const initDB = async () => {
    await Listing.deleteMany({});
    
    let demoUser = await User.findOne({ username: "admin" });
    if (!demoUser) {
        demoUser = new User({ email: "admin@wanderlust.com", username: "admin" });
        demoUser = await User.register(demoUser, "admin123");
        console.log("Created default demo user: admin / admin123");
    }

    initData.data = initData.data.map((obj) => ({ 
      ...obj,
      category: obj.category || getCategory(obj),
      owner: demoUser._id
    }));
    await Listing.insertMany(initData.data);
    console.log("data was initialized with sample listings and categories");
};

main().catch(err => console.log(err));

