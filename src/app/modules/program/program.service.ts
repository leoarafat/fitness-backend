import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IProgram } from './program.interface';
import { Program } from './program.model';
import { IGenericResponse } from '../../../interfaces/paginations';
import QueryBuilder from '../../../builder/QueryBuilder';

const addProgram = async (payload: IProgram) => {
  if (!payload.title || !payload.image) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Title and image is required');
  }
  return await Program.create(payload);
};

const getAllProgram = async (
  query: Record<string, unknown>,
): Promise<IGenericResponse<IProgram[]>> => {
  const userQuery = new QueryBuilder(Program.find(), query)
    .search(['title'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await userQuery.modelQuery;
  const meta = await userQuery.countTotal();

  return {
    meta,
    data: result,
  };
};
const singleProgram = async (id: string) => {
  const program = await Program.findById(id);
  if (!program) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Program not found');
  }
  //here return the series
};
export const programService = {
  addProgram,
  getAllProgram,
  singleProgram,
};
