import Cards from '../molecules/humanCard'
import Data from '../../data/human/dataHuman.json'

export default function CardsPart() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mx-20">
            {Data.map((person, index) => (
                <Cards
                    key={index}
                    title={person.title}
                    age={person.age}
                    personality={person.personality}
                    description={person.description}
                    search={person.search}
                />
            ))}
        </div>
    )
    // return (
    //     <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mx-20"><Cards
    //         title="John Doe"
    //         age={30}
    //         personality="Friendly"
    //         description="A friendly person who enjoys teamwork, mentoring juniors, and creating positive work environments."
    //         search="Full-stack developer, React, Node.js, team player, puis blabla merde j'ia pas d'inspii il est tard là"
    //     />

    //         <Cards
    //             title="Jane Smith"
    //             age={25}
    //             personality="Creative"
    //             description="A creative individual with a passion for UI/UX design, prototyping, and building visually engaging experiences."
    //             search="UX designer, Figma, Adobe XD, creative thinker,puis blabla merde j'ia pas d'inspii il est tard là"
    //         />

    //         <Cards
    //             title="Mike Johnson"
    //             age={40}
    //             personality="Analytical"
    //             description="An analytical thinker experienced in project management, process optimization, and data-driven decision making."
    //             search="Project manager, Agile, data analysis, leadership, puis blabla merde j'ia pas d'inspii il est tard là"
    //         />
    //     </div>
    // )
}
