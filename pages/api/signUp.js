import { connectDatabase, insertDocument } from '../../helpers/db-util';

async function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;

    if (!email || !email.includes('@')) {
      res.status(422).json({
        status: 'failed',
        message: 'Invalid Email',
      });
      return;
    }

    let client;

    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({
        status: 'failed',
        message: 'Connecting to database failed',
      });
      return;
    }

    try {
      await insertDocument(client, 'newsletter', { email });
      client.close();
    } catch (err) {
      res.status(500).json({
        status: 'failed',
        message: 'Inserting data failed',
      });
      return;
    }

    res.status(201).json({
      message: 'Sign-up successful',
      email,
    });
  } else {
    res.status(401).json({
      message: 'Sign-up failed',
    });
  }
}

export default handler;
