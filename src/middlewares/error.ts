import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { ErrorTypes, errorCatalog } from '../errors/catalogs';

const errorHandler: ErrorRequestHandler = (err: Error | ZodError, _req, res, _next) => {
  if (err instanceof ZodError) {
    return res.status(400).json({ message: err.issues });
  }
  const messageAsErrorType = err.message as keyof typeof ErrorTypes;

  const mappedError = errorCatalog[messageAsErrorType];
  
  if (mappedError) {
    const { status, error } = mappedError;
    return res.status(status).json({ error });
  }
  console.error(err);
  return res.status(500).json({ message: 'internal error' });
};

export default errorHandler;