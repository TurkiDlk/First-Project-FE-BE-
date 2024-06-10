
export default function Model({ props }) {
  if (props) {
    return (
      <div className="model">
        <div className="model-cont">
          <h1> Your work is perfect ! </h1>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}
