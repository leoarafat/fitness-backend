import fs from 'fs';
import path from 'path';

const unlinkFile = (file: string | undefined) => {
  const files = JSON.parse(file as string);

  for (const img of files) {
    const fileName = img!.split('/').pop();
    const filePath = path.join('uploads', 'images', 'image', fileName!);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
};

export default unlinkFile;
