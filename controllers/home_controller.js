const home = (req, res) => {
  res.status(200).json({
    success: true,
    greeting: "Welcome to the Polling System",
  });
};

export default home;
