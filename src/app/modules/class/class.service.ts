/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request } from 'express';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { Classes } from './class.model';
import { IGenericResponse } from '../../../interfaces/paginations';
import { IClass } from './class.interface';
import QueryBuilder from '../../../builder/QueryBuilder';
import getVideoDurationInSeconds from 'get-video-duration';
import { formatDuration } from '../../../utils/duration';
import { IReqUser } from '../user/user.interface';
import { WatchList } from '../watch-list/watch-list.model';

const createClass = async (req: Request) => {
  const { ...classData } = req.body as IClass;
  console.log(classData);
  const { files } = req;
  console.log(files);
  let pdfFile = undefined;
  //@ts-ignore
  if (files?.pdf) {
    //@ts-ignore
    // pdfFile = files?.pdf[0].path;
    pdfFile = `/documents/${files.pdf[0].filename}`;
  }
  let docFile = undefined;
  //@ts-ignore
  if (files?.docs) {
    //@ts-ignore
    docFile = `/documents/${files.docs[0].filename}`;
  }
  let video = undefined;
  //@ts-ignore
  if (files?.video) {
    //@ts-ignore
    video = `/videos/${files.video[0].filename}`;
  }

  if (!video) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'All file is required');
  }
  //@ts-ignore
  classData.date = classData.date.split('T')[0];
  //@ts-ignore
  const duration = await getVideoDurationInSeconds(`${files.video[0].path}`);
  const formattedDuration = formatDuration(duration);

  const result = await Classes.create({
    ...classData,
    pdfFile,
    docFile,
    video,
    videoDuration: formattedDuration,
  });
  return result;
};

const allClasses = async (
  query: Record<string, unknown>,
): Promise<IGenericResponse<IClass[]>> => {
  const classQuery = (
    await new QueryBuilder(Classes.find(), query)
      .search(['topic', 'title'])
      .filter()
  )
    .sort()
    .paginate()
    .fields();

  const result = await classQuery.modelQuery;
  const meta = await classQuery.countTotal();

  return {
    meta,
    data: result,
  };
};

const getClassBySeries = async (id: string, query: Record<string, unknown>) => {
  const userQuery = (
    await new QueryBuilder(Classes.find({ series: id }), query)
      .search(['topic', 'title'])
      .filter()
  )
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
const deleteClass = async (id: string) => {
  const classes = await Classes.findById(id);
  if (!classes) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Class not found');
  }
  const result = await Classes.findByIdAndDelete(id);
  return result;
};
const updateClass = async (req: Request) => {
  const { id } = req.params;
  const classes = await Classes.findById(id);
  if (!classes) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Class not found');
  }

  const { ...classData } = req.body;

  //@ts-ignore
  const video = req.files?.video;
  //@ts-ignore
  const pdf = req.files?.pdf;
  //@ts-ignore
  const docs = req.files?.docs;

  if (video) {
    // classData.video = video[0].path;
    classData.video = `/videos/${video[0].filename}`;
  }
  if (pdf) {
    classData.pdfFile = `/documents/${pdf[0].filename}`;
  }
  if (docs) {
    classData.docFile = `/documents/${docs[0].filename}`;
  }

  const updateClass = await Classes.findByIdAndUpdate(id, classData, {
    new: true,
    runValidators: true,
  });
  return updateClass;
};

const addWatchList = async (req: Request) => {
  const classId = req.params.id;
  const { userId } = req.user as IReqUser;

  const isExistClass = await WatchList.findOne({ classId, user: userId });

  if (!isExistClass) {
    return await WatchList.create({
      user: userId,
      classId,
    });
  } else {
    return null;
  }
};
//!
// const getReadUnreadAnalytics = async (req: Request) => {
//   const { id } = req.params;

//   const myWatchedClass = await WatchList.find({ classId: id });

//   const classes = await Classes.find({ program: id });

//   if (classes.length === 0) {
//     throw new ApiError(404, 'No classes found for the specified program');
//   }

//   const totalClasses = classes.length;
//   const readCount = classes.filter(cls => cls.isRead).length;
//   const unreadCount = totalClasses - readCount;

//   const readPercentage = (readCount / totalClasses) * 100;
//   const unreadPercentage = (unreadCount / totalClasses) * 100;

//   return {
//     totalClasses,
//     readCount,
//     unreadCount,
//     readPercentage: readPercentage.toFixed(2),
//     unreadPercentage: unreadPercentage.toFixed(2),
//   };
// };

const getReadUnreadAnalytics = async (req: Request) => {
  const { id: programId } = req.params;
  const { userId } = req.user as IReqUser;

  const allClasses = await Classes.find({ program: programId });

  const allClassIds = allClasses.map(cls => cls._id);

  const myWatchedClasses = await WatchList.find({
    user: userId,
    classId: { $in: allClassIds },
  });

  const watchedClassIds = myWatchedClasses.map(watch =>
    watch.classId.toString(),
  );

  const totalClasses = allClasses.length;
  const readCount = watchedClassIds.length;
  const realClasses = watchedClassIds;
  const unreadCount = totalClasses - readCount;

  const readPercentage = (readCount / totalClasses) * 100;
  const unreadPercentage = (unreadCount / totalClasses) * 100;

  return {
    totalClasses,
    realClasses,
    readCount,
    unreadCount,
    readPercentage: readPercentage.toFixed(2),
    unreadPercentage: unreadPercentage.toFixed(2),
  };
};

export const ClassService = {
  createClass,
  allClasses,
  addWatchList,
  deleteClass,
  updateClass,
  getReadUnreadAnalytics,
  getClassBySeries,
};
