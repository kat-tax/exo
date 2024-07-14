import {createExpressApp} from '@evolu/server';
import {Effect} from 'effect';

Effect.runPromise(createExpressApp).then(app => {
  const port = process.env.PORT || 6306;
  app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
  });
});
