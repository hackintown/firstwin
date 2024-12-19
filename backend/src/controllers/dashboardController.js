export const adminDashboard = async (req, res) => {
  try {
    // Add your admin dashboard logic here
    res.status(200).json({
      success: true,
      message: "Admin Dashboard",
      user: req.user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error accessing admin dashboard",
      error: error.message,
    });
  }
};

export const userDashboard = async (req, res) => {
  try {
    // Add your user dashboard logic here
    res.status(200).json({
      success: true,
      message: "User Dashboard",
      user: req.user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error accessing user dashboard",
      error: error.message,
    });
  }
};
