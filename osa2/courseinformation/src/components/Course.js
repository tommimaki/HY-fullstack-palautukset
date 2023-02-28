import Content from "./Content";
import Header from "./Header";
import Total from "./Total";

const Course = ({ course }) => {
  const total = course.parts.reduce((sum, part) => part.exercises + sum, 0);
  console.log(total);
  return (
    <div>
      <Header name={course.name} />
      <Content content={course.parts} />
      <Total total={total} />
    </div>
  );
};

export default Course;
