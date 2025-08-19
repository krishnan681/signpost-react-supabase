import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";

const FavoriteModal = ({ show, onClose, onSave, selectedItem }) => {
  const [selectedOption, setSelectedOption] = React.useState("");

  const handleSave = () => {
    if (selectedOption) {
      onSave(selectedOption, selectedItem);
      onClose();
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <div className="p-3 d-flex justify-content-between align-items-center border-bottom">
        <h5 className="mb-0">Save to Favorites</h5>
        <FaTimes
          role="button"
          onClick={onClose}
          className="text-muted"
          style={{ cursor: "pointer" }}
        />
      </div>

      <Modal.Body>
        <Form>
          {["Option 1", "Option 2", "Option 3", "Option 4"].map((option, i) => (
            <Form.Check
              key={i}
              type="radio"
              label={option}
              name="favoriteOption"
              value={option}
              checked={selectedOption === option}
              onChange={(e) => setSelectedOption(e.target.value)}
              className="mb-3"
            />
          ))}
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FavoriteModal;
