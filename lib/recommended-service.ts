import { db } from './db';
import { getSelf } from './auth-service';

export const getRecommended = async () => {
  const users = db.user.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return users;
};
