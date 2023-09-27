import { useRef, useContext } from 'react';

import classes from './newsletter-registration.module.css';
import NotificationContext from '../../store/notification-context';

function NewsletterRegistration() {
  const emailInputRef = useRef();
  const notificationCtx = useContext(NotificationContext);

  function registrationHandler(event) {
    event.preventDefault();

    const email = { email: emailInputRef.current.value };

    notificationCtx.showNotification({
      title: 'Signing up...',
      message: 'Registering for newsletter.',
      status: 'pending',
    });

    fetch('/api/signUp', {
      method: 'POST',
      body: JSON.stringify(email),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return res.json().then(data => {
          throw new Error(data.messsage || 'Something went wrong!');
        });
      })
      .then(data => {
        notificationCtx.showNotification({
          title: 'Success!',
          message: 'Successfully registered for newsletter.',
          status: 'success',
        });
      })
      .catch(err => {
        notificationCtx.showNotification({
          title: 'Error!',
          message: err.messsage || 'Registration failed.',
          status: 'error',
        });
      });
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailInputRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
