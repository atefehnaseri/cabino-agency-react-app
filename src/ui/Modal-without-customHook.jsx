import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { HiXMark } from "react-icons/hi2";
import { createPortal } from "react-dom";
import styled from "styled-components";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

//create a context
const ModalContext = createContext();

function Modal({ children }) {
  const [openModalName, setOpenModalName] = useState("");

  function onClose() {
    setOpenModalName("");
  }
  const onOpen = setOpenModalName;

  return (
    <ModalContext.Provider value={{ openModalName, onClose, onOpen }}>
      {children}
    </ModalContext.Provider>
  );
}

function Opener({ children, opens: opensWindowName }) {
  const { onOpen } = useContext(ModalContext);
  return (
    <>
      {cloneElement(children, {
        onClick: () => onOpen(opensWindowName),
      })}
    </>
  );
}

function Window({ children, name }) {
  const { openModalName, onClose } = useContext(ModalContext);
  const modalWindowRef = useRef();

  //close modal when click outside the modal window
  useEffect(() => {
    function handleClick(e) {
      if (
        modalWindowRef.current &&
        !modalWindowRef.current.contains(e.target)
      ) {
        onClose();
        modalWindowRef.current = null;
      }
    }
    //handling event in capturing phase to move down event in DOM tree
    document.addEventListener("click", handleClick, true);
    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [onClose, openModalName]);

  if (name !== openModalName) return null;

  return createPortal(
    <Overlay>
      <StyledModal ref={modalWindowRef}>
        <Button onClick={onClose}>
          <HiXMark />
        </Button>
        <div>{cloneElement(children, { handleCloseForm: onClose })}</div>
      </StyledModal>
    </Overlay>,
    document.body
  );
}

Modal.Opener = Opener;
Modal.Window = Window;

export default Modal;
