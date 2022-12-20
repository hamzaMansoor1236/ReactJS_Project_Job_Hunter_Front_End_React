function ManageJobs({ handleDisplay, sectionHeading }) {
  function handleChanges() {
    handleDisplay(false);
    sectionHeading("Please select action ");
  }
  return (
    <div>
      <h1>hello</h1>
      <div>
      
        <button
          id="buttonSubmit"
          className="btn btn-outline-success customSubmit mx-3"
          onClick={handleChanges}
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default ManageJobs;
