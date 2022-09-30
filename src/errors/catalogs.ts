export enum ErrorTypes {
  EntityNotFound = 'EntityNotFound',
  InvalidMongoId = 'InvalidMongoId',
}

type ErrorResponse = {
  status: number;
  message: string
};

export type ErrorCatalog = {
  [key in ErrorTypes]: ErrorResponse;
};

export const errorCatalog: ErrorCatalog = {
  EntityNotFound: {
    message: 'Entity not found',
    status: 404,
  },
  InvalidMongoId: {
    message: 'Id must be a 24 characters hexadecimal',
    status: 400,
  },
};