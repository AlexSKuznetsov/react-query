import { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { getTodos } from './getTodos';

const QueryKeys = {
  getTodoList: '@Api/getTodosList',
};

function App() {
  const [page, setPage] = useState(1);
  const { status, data, error } = useQuery(
    [QueryKeys.getTodoList, page],
    () => getTodos(page),
    {
      staleTime: 2000,
      keepPreviousData: true,
    }
  );

  const queryClient = useQueryClient();

  // prefetching data for the next page
  useEffect(() => {
    if (page < 10) {
      const nextPage = page + 1;
      queryClient.prefetchQuery([QueryKeys.getTodoList, nextPage], () =>
        getTodos(nextPage)
      );
    }
  }, [page, queryClient]);

  if (error) return <p>Something went wrong!</p>;
  if (status === 'loading') return <p>Loading...</p>;

  return (
    <div className='container mt-4'>
      <ul className='list-group'>
        {data.map((el) => (
          <li className='list-group-item' key={el.id} data-testid='todo-item'>
            {el.title}
          </li>
        ))}
      </ul>
      <div className='mt-4'>
        <button
          disabled={page === 1}
          type='button'
          className='btn btn-success'
          onClick={() => setPage((prev) => prev - 1)}
        >
          Prev
        </button>

        <span className='mx-4'>Currnet page: {page}</span>

        <button
          disabled={page === 10}
          type='button'
          className='btn btn-primary'
          onClick={() => setPage((next) => next + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
