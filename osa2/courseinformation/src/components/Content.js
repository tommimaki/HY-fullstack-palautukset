import Part from "./Part";
const Content = ({ content }) => {
  return (
    <div>
      {content.map((part) => {
        return (
          <Part key={part.id} name={part.name} excercises={part.exercises} />
        );
      })}
    </div>
  );
};

export default Content;
