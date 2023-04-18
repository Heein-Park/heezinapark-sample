import type { PortableTextBlock } from '@portabletext/types';

export type articleType = {
  body: PortableTextBlock[];
  tags: string[];
  title: string;
  _createdAt: string;
  id: number;
  _updatedAt: string;
};
