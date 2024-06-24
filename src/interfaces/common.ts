import IGenericErrorMessage from './error';

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};
type UploadedFile = {
  filename: string;
  path: string;
};

export type CustomRequest = {
  files?: {
    thumbnail?: UploadedFile[];
    video_thumbnail?: UploadedFile[];
    video?: UploadedFile[];
    logo?: UploadedFile[];
    image?: UploadedFile[];
  };
  params: {
    id: string;
  };
} & Request;
