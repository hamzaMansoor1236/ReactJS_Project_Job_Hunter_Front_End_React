function TrackApplicants({ handleDisplay, sectionHeading }) {


    //function that hides the component on the back button press
  function handleChanges() {
    handleDisplay(false);
    sectionHeading("Please select action ");
  }
  ///////////////////////////////////////////////////////////////////
  return (
    <div>
      <h1>Hello this is track applicants page</h1>
      <div>
        <button
          id="buttonSubmit"
          className="btn btn-outline-success customSubmit  mt-5"
          onClick={handleChanges}
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default TrackApplicants;
