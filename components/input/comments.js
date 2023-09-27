import { useState, useEffect, useContext } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import NotificationContext from '../../store/notification-context';

function Comments(props) {
  const notificationCtx = useContext(NotificationContext);
  const [commentsLoading, setCommentsLoading] = useState(false);

  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (!showComments) return;
    setCommentsLoading(true);

    fetch(`/api/comments/${eventId}`)
      .then(res => res.json())
      .then(data => {
        setComments(data.comments);
        setCommentsLoading(false);
      });
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments(prevStatus => !prevStatus);
  }

  function addCommentHandler(commentData) {
    notificationCtx.showNotification({
      title: 'Saving...',
      message: 'Saving comment.',
      status: 'pending',
    });

    fetch(`/api/comments/${eventId}`, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return res.json().then(data => {
          throw new Error(data.message || 'something went wrong');
        });
      })
      .then(data => {
        notificationCtx.showNotification({
          title: 'Success!',
          message: 'Successfully saved your comment.',
          status: 'success',
        });
      })
      .catch(err => {
        notificationCtx.showNotification({
          title: 'Error',
          message: err.message || 'An error occurred',
          status: 'error',
        });
      });
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !commentsLoading && <CommentList comments={comments} />}
      {showComments && commentsLoading && <p>Loading...</p>}
    </section>
  );
}

export default Comments;
