import path from 'path';
// import fs from 'fs';
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);

// const __dirname = path.dirname(__filename);

const handler = (req, res) => {
  if (req.method === 'GET') {
    const fontPath = path.resolve(path.join(process.cwd(), 'api', 'fonts', 'decovar.woff2'));
    res.send(fontPath);
  }
  else {
    res.status(401).json({ message: 'Not allowed duder' });
  }
};

export default handler;
