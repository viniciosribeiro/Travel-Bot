const { extractTextFromDoc } = require('../utils/docProcessor');
const { updateDatabase } = require('../utils/database');
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).send('Unauthorized');

  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, user) => {
    if (err) return res.status(403).send('Forbidden');

    const file = req.files.doc;
    const text = await extractTextFromDoc(file.tempFilePath);
    await updateDatabase(user.username, text);
    res.send('File uploaded and data updated');
  });
};
