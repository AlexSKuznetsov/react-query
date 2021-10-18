import { rest } from 'msw';
import posts from './posts.json';

export const handlers = [
  rest.get('https://jsonplaceholder.typicode.com/posts/', (_, res, ctx) => {
    return res(
      // Respond with a 200 status code
      ctx.status(200),
      // respond data
      ctx.json(posts)
    );
  }),
];
