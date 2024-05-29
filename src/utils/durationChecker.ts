import { execFile } from 'child_process';
import util from 'util';

const execFilePromise = util.promisify(execFile);

export const getVideoDuration = async (filePath: string): Promise<number> => {
  try {
    const { stdout } = await execFilePromise('ffprobe', [
      '-v',
      'error',
      '-show_entries',
      'format=duration',
      '-of',
      'default=noprint_wrappers=1:nokey=1',
      filePath,
    ]);
    return parseFloat(stdout);
  } catch (error) {
    throw new Error('Error extracting video duration');
  }
};
