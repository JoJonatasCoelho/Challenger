export const datasetController = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'File is required' });
  }

  res.status(201).json({
    message: 'File uploaded successfully',
    file: {
      originalName: req.file.originalname,
      storedName: req.file.filename,
      path: req.file.path,
      size: req.file.size
    }
  });
};
