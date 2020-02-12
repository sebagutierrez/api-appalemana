module.exports = {
  index: (req, res) => {
    return res.status(200).json({
      message: `API Boilerplate ${process.env.API_VERSION}`,
      currentLang: 'es_CL',
    });
  },
};
