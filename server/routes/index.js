import authRouter from './auth.js';
import userRouter from './user-router.js';
import challengeRouter from './challenges-router.js';
import submissionRouter from './submission-router.js';

export default (app) => {
    app.use('/auth' ,  authRouter);

    app.use('/users' , userRouter);

    app.use('/challenges' , challengeRouter);

    app.use('/submissions' , submissionRouter);
}

