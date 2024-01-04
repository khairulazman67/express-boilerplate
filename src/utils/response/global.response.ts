import type { Response } from 'express';
import type { ZodError } from 'zod';
import { formatZodError } from './';

export const unauthenticatedResp = (r: Response) =>
  r.status(401).json({ message: 'Unauthenticated' });

export const invalidPayloadResp = (r: Response, err: ZodError) =>
  r.status(400).json({
    message: 'form validation error',
    error: formatZodError(err),
  });

export const notFoundEntityResp = (r: Response, prefix?: string) =>
  r.status(404).json({
    message: `${
      typeof prefix == 'string' ? `${prefix} ` : ''
    }tidak dapat ditemukan`,
  });
  
export const notAllowedResp = (r: Response) =>
  r.status(403).json({ message: 'Forbidden' });
