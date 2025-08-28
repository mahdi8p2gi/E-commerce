import Address from "../models/Address.js";

/**
 * Add a new address for a user
 * POST /api/address/add
 */
export const addAddress = async (req, res) => {
  try {
    const { address, userId } = req.body;

    if (!userId || !address) {
      return res.status(400).json({
        success: false,
        message: "User ID and address are required",
      });
    }

    await Address.create({ ...address, userId });

    return res.json({
      success: true,
      message: "Address added successfully",
    });
  } catch (error) {
    console.error("Add address error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while adding address",
    });
  }
};

/**
 * Get all addresses for a user
 * POST /api/address/get
 */
export const getAddress = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const addresses = await Address.find({ userId });

    return res.json({
      success: true,
      addresses,
    });
  } catch (error) {
    console.error("Get addresses error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching addresses",
    });
  }
};
