const logger = ((req, res, next) => {
  console.log({
      path: req.path,
      method: req.method,
      ip: req.ip
  });
  next();
});

const handlerNotFound = (req, res) => res.status(404).json({err: "PathNotFoundError", msg: { es: "Ruta no encontrada.", en: "Path not found." } });

const handlerError = (err, req, res, next) => {
  res.status(err.status).json({ err: err.name, msg: err.msg });
  next();
};

module.exports = { logger, handlerNotFound, handlerError };