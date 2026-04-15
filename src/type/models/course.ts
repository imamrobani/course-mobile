export type Course = {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  duration: string;
  level: string;
  author: string;
  image: string;
  rating: number;
  createdAt: string;
};

export type Comment = {
  id: string;
  courseId: string;
  user: {
    id: string;
    name: string;
    avatar?: string;
  };
  message: string;
  createdAt: string;
  likesCount: number;
  likedByUser?: boolean;
};
