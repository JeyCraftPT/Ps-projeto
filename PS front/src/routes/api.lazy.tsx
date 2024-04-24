import { useQuery } from '@tanstack/react-query';

import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/api')({
  component: Api,
});

function Api() {
  const { isPending, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () => fetch('http://localhost:3000').then((res) => res.json()),
  });

  if (isPending) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  return (
    <div>
      <h1>{data.message}</h1>
    </div>
  );
}
