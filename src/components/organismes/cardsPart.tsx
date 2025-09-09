import Cards from '../molecules/humanCard';
import Data from '../../data/human/dataHuman.json';

type Props = {
  data: typeof Data;
};

export default function CardsPart({ data }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mx-20">
      {data.map((person, index) => (
        <Cards
          key={index}
          id={person.id}
          title={person.title}
          age={person.age}
          personality={person.personality}
          description={person.description}
          search={person.search}
        />
      ))}
    </div>
  );
}

