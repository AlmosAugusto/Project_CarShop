export enum ErrorTypes {
  EntityNotFound = 'EntityNotFound',
  InvalidMongoId = 'InvalidMongoId',
}

type ErrorResponse = {
  status: number;
  error: string
};

export type ErrorCatalog = {
  [key in ErrorTypes]: ErrorResponse;
};

export const errorCatalog: ErrorCatalog = {
  EntityNotFound: {
    error: 'Object not found',
    status: 404,
  },
  InvalidMongoId: {
    error: 'Id must have 24 hexadecimal characters',
    status: 400,
  },
};