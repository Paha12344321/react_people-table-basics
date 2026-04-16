import { useEffect, useState } from 'react';
import { Loader } from './components/Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from './api';
import { Person } from './types';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setIsError(false);
    getPeople()
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      {/* 1. Loader должен иметь data-cy="loader" */}
      {loading && (
        <div data-cy="loader">
          <Loader />
        </div>
      )}

      {/* 2. Ошибка должна иметь data-cy="peopleLoadingError" */}
      {!loading && isError && (
        <p data-cy="peopleLoadingError">Something went wrong</p>
      )}

      {/* 3. Сообщение "пусто" должно иметь data-cy="noPeopleMessage"
          и СТРОГИЙ текст из теста */}
      {!loading && !isError && people.length === 0 && (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      )}

      {/* 4. Таблица должна иметь data-cy="peopleTable" */}
      {!loading && !isError && people.length > 0 && (
        <div data-cy="peopleTable">
          <PeopleTable people={people} />
        </div>
      )}
    </>
  );
};
