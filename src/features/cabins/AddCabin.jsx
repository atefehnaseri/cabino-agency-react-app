import CreateCabinForm from "./CreateCabinForm";
// import CabinTable from "./CabinTable";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";

function AddCabin() {
  return (
    <Modal>
      <Modal.Opener opens="cabin-form">
        <Button>Add new cabin</Button>
      </Modal.Opener>
      <Modal.Window name="cabin-form">
        <CreateCabinForm />
      </Modal.Window>

      {/* //🔴since it is possible to open multiple modals so it need to have identifiers props like name or opens to specify those modals */}

      {/* <Modal.Opener opens="cabin-table">
        <Button>Show cabins</Button>
      </Modal.Opener>
      <Modal.Window name="cabin-table">
        <CabinTable />
      </Modal.Window> */}
    </Modal>
  );
}

export default AddCabin;
