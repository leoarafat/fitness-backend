/* eslint-disable @typescript-eslint/ban-ts-comment */
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IProgram } from './program.interface';
import { Program } from './program.model';
import { IGenericResponse } from '../../../interfaces/paginations';
import QueryBuilder from '../../../builder/QueryBuilder';
import { Series } from '../series/series.model';
import { Request } from 'express';
import { Classes } from '../class/class.model';

const addProgram = async (req: Request) => {
  const payload = req.body;
  const { files } = req;
  //@ts-ignore
  if (!files?.image) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'image is required');
  }
  //@ts-ignore
  // const image = files?.image[0].path;
  const image = `/images/image/${files?.image[0].filename}`;

  if (!payload.title) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Title is required');
  }
  if (!image) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'image is required');
  }
  payload.image = image;
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

//!
// const singleProgram = async (id: string, query: Record<string, unknown>) => {
//   const program = await Program.findById(id);
//   if (!program) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Program not found');
//   }

//   const serieses = await Series.find({ program: id });

//   const seriesWithClasses = await Promise.all(
//     serieses.map(async series => {
//       const classQuery = new QueryBuilder(
//         Classes.find({ series: series._id }),
//         query,
//       )
//         .search(['topic', 'title'])
//         .filter()
//         .sort()
//         .paginate()
//         .fields();

//       const classes = await classQuery.modelQuery;

//       return {
//         ...series.toObject(),
//         classes,
//       };
//     }),
//   );

//   const totalClasses = seriesWithClasses.reduce(
//     (acc, series) => acc + series.classes.length,
//     0,
//   );
//   const result = {
//     program,
//     series: seriesWithClasses,
//   };
//   const meta = {
//     totalSeries: serieses.length,
//     totalClasses,
//   };
//   return {
//     meta,
//     data: result,
//   };
// };
//!
const singleProgram = async (id: string, query: Record<string, unknown>) => {
  const program = await Program.findById(id);
  if (!program) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Program not found');
  }

  const serieses = await Series.find({ program: id });

  const seriesWithClasses = await Promise.all(
    serieses.map(async series => {
      const classQuery = new QueryBuilder(
        Classes.find({ series: series._id }),
        query,
      )
        .search(['topic', 'title'])
        .filter()
        .sort()
        .paginate()
        .fields();

      const classes = await classQuery.modelQuery;
      const totalVideoDuration = classes.reduce(
        (acc, currentClass) =>
          acc + (parseFloat(currentClass.videoDuration) || 0),
        0,
      );
      return {
        ...series.toObject(),
        classes,
        totalVideoDuration,
      };
    }),
  );
  const filteredSeries = seriesWithClasses.filter(
    series => series.classes.length > 0,
  );
  const totalClasses = filteredSeries.reduce(
    (acc, series) => acc + series.classes.length,
    0,
  );
  const result = {
    program,
    series: filteredSeries.length > 0 ? filteredSeries : [],
  };
  const meta = {
    totalSeries: Number(filteredSeries.length),
    totalClasses,
  };
  return {
    meta,
    data: result,
  };
};
const deleteProgram = async (id: string) => {
  const program = await Program.findById(id);
  if (!program) {
    throw new ApiError(httpStatus.NOT_FOUND, 'program not found');
  }
  const result = await Program.findByIdAndDelete(id);
  return result;
};
const updateProgram = async (req: Request) => {
  const { id } = req.params;
  const programs = await Program.findById(id);
  if (!programs) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Program not found');
  }

  const { ...programData } = req.body;

  //@ts-ignore
  const image = req.files?.image;

  if (image) {
    // programData.image = image[0].path;
    programData.image = `/images/image/${image[0].filename}`;
  }

  const result = await Program.findByIdAndUpdate(id, programData, {
    new: true,
    runValidators: true,
  });
  return result;
};
export const programService = {
  addProgram,
  getAllProgram,
  singleProgram,
  deleteProgram,
  updateProgram,
};
