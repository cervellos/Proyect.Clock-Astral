const uploadImagen = (req, res, next) => {
  const file = req.file;
  if (!file) {
    const err = new Error("nuevo archivo");
    err.httpStatuscode = 400;
    return next(err);
  }
  res.json({ nombre: file.filename });
};

module.exports = { uploadImagen };
