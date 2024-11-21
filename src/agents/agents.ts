export interface Post {
  text: string;
}

export function categorizeUserByOriginalPosts({
  posts,
}: {
  posts: Post[];
}): 'artist' | 'other' | 'unknown' {
  if (posts.length === 0) {
    return 'unknown';
  }

  for (const post of posts) {
    console.log(post.text);
  }

  return 'other';
}
