const Address = require("../models/Address");

exports.saveAddress = async (req, res) => {
  try {
    const { userId, name, addr, city, phone } = req.body;
    if (!userId || !name || !addr || !city || !phone)
      return res.status(400).json({ success: false, message: "All fields required" });

    const address = new Address({ userId, name, addr, city, phone });
    await address.save();

    res.json({ success: true, address });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
