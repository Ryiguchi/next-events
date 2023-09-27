import {
  connectDatabase,
  findDocuments,
  insertDocument,
} from '../../../helpers/db-util';

async function handler(req, res) {
  const { id } = req.query;

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

  if (req.method === 'GET') {
    let comments;
    try {
      comments = await findDocuments(
        client,
        'comments',
        { eventId: id },
        { _id: -1 }
      );
    } catch (error) {
      res.status(500).json({
        status: 'failed',
        message: 'Fetching data failed',
      });
      client.close();
      return;
    }

    res.status(200).json({
      status: 'success',
      comments: comments,
    });
  } else if (req.method === 'POST') {
    const { email, name, text } = req.body;

    if (
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !text ||
      text.trim() === ''
    ) {
      res.status(422).json({
        status: 'failed',
        message: 'Invalid input',
      });
      client.close();
      return;
    }

    const commentData = {
      eventId: id,
      email,
      name,
      text,
    };

    let result;
    try {
      result = await insertDocument(client, 'comments', commentData);
    } catch (error) {
      res.status(500).json({
        status: 'failed',
        message: 'Inserting data failed',
      });
      client.close();
      return;
    }

    commentData.id = result.insertedId;

    res.status(201).json({
      status: 'success',
      commentData,
    });
  }
  client.close();
}

export default handler;
