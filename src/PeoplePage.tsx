import React, { useEffect, useState } from 'react';
import { Loader } from './components/Loader';
import { allUsers } from './App';
import { Person } from './types';
import { useParams, Link } from 'react-router-dom';

export const PeoplePage: React.FC = () => {
  const [users, setUsers] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  const { slug } = useParams();

  useEffect(() => {
    if (slug) {
      setSelectedUser(slug);
    } else {
      setSelectedUser(null);
    }
  }, [slug]);

  useEffect(() => {
    allUsers()
      .then(response => {
        setUsers(response);
        setIsError(false);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const getPersonByName = (name: string | null) => {
    if (!name) {
      return null;
    }

    return users.find(u => u.name === name);
  };

  return (
    <div className="container">
      <div className="content">
        <h1 className="title">People Page</h1>
      </div>
      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}

          {!loading && isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!loading && !isError && users.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!loading && !isError && users.length > 0 && (
            <table
              data-cy="peopleTable"
              className="table is-striped is-hoverable is-narrow is-fullwidth"
            >
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Sex</th>
                  <th>Born</th>
                  <th>Died</th>
                  <th>Mother</th>
                  <th>Father</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr
                    data-cy="person"
                    key={user.slug}
                    className={
                      selectedUser === user.slug ? 'has-background-warning' : ''
                    }
                  >
                    <td>
                      <Link
                        to={`/people/${user.slug}`}
                        onClick={() => setSelectedUser(user.slug)}
                        className={user.sex === 'f' ? 'has-text-danger' : ''}
                      >
                        {user.name}
                      </Link>
                    </td>
                    <td>{user.sex}</td>
                    <td>{user.born}</td>
                    <td>{user.died}</td>
                    {/* Столбец Матери */}
                    <td>
                      {(() => {
                        const mother = users.find(
                          u => u.name === user.motherName,
                        );

                        if (!user.motherName) {
                          return '-';
                        }

                        if (mother) {
                          return (
                            <Link
                              to={`/people/${mother.slug}`}
                              onClick={() => setSelectedUser(mother.slug)}
                              className={`has-text-link ${mother.sex === 'f' ? 'has-text-danger' : ''}`}
                            >
                              {user.motherName}
                            </Link>
                          );
                        }

                        return user.motherName;
                      })()}
                    </td>

                    <td>
                      {(() => {
                        const father = getPersonByName(user.fatherName);

                        if (!user.fatherName) {
                          return '-';
                        }

                        return father ? (
                          <Link
                            to={`/people/${father.slug}`}
                            onClick={() => setSelectedUser(father.slug)}
                            className="has-text-link"
                          >
                            {user.fatherName}
                          </Link>
                        ) : (
                          user.fatherName
                        );
                      })()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
