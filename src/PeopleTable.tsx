import React from 'react';
import { Person } from './types';
import { PersonLink } from './PersonLink';
import { useParams } from 'react-router-dom';

export const PeopleTable: React.FC<{ people: Person[] }> = ({ people }) => {
  const { slug } = useParams(); // Получаем slug из URL для подсветки
  // eslint-disable-next-line max-len
  const getPersonByName = (name: string | null) =>
    people.find(p => p.name === name);

  return (
    <table className="table is-striped is-fullwidth">
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
        {people.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={person.slug === slug ? 'has-background-warning' : ''}
          >
            <td>
              <PersonLink person={person} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.motherName ? (
                getPersonByName(person.motherName) ? (
                  <PersonLink person={getPersonByName(person.motherName)!} />
                ) : (
                  person.motherName
                )
              ) : (
                '-'
              )}
            </td>
            <td>
              {person.fatherName ? (
                getPersonByName(person.fatherName) ? (
                  <PersonLink person={getPersonByName(person.fatherName)!} />
                ) : (
                  person.fatherName
                )
              ) : (
                '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
