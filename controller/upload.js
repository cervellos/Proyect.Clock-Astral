const uploadImagen = (req, res, next) => {
  const file = req.file;
  if (!file) {
    const err = new Error("name arch");
    err.httpStatuscode = 400;
    return next(err);
  }
  res.json({ name: file.filename });
};

module.exports = { uploadImagen };
