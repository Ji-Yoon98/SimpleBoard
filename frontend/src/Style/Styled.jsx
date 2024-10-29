import styled from "styled-components";
import { Link } from "react-router-dom";
import Modal from "react-modal";

export const Container = styled.div`
  height: 100%;
  align-content: center;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 450px;
  margin: 0 auto;
  border: 3px solid #ffd000;
  border-radius: 20px;
  padding: 40px 0;
`;

export const BoardContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 700px;
  margin: 0 auto;
`;

export const WriteContent = styled.div`
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 700px;
    margin: 0 auto;
  }

  label {
    margin-bottom: 5px;
  }

  input[type="text"] {
    padding: 7px;
    border: 2px solid #ffd000;
    border-radius: 5px;
    margin-bottom: 10px;
  }

  input[type="file"] {
    display: none;
  }

  textarea {
    padding: 7px;
    border: 2px solid #ffd000;
    border-radius: 5px;
    min-height: 15rem;
    resize: none;
  }
`;

export const DetailContent = styled.div`
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 700px;
    margin: 0 auto;
  }

  label {
    margin-bottom: 5px;
  }

  input[type="text"] {
    padding: 7px;
    border: 2px solid #ffd000;
    border-radius: 5px;
    margin-bottom: 10px;
  }

  input[type="file"] {
    display: none;
  }

  textarea {
    padding: 7px;
    border: 2px solid #ffd000;
    border-radius: 5px;
    min-height: 15rem;
    resize: none;
  }
`;

export const FileBox = styled.div`
  margin: 20px 0;

  span {
    font-size: 14px;
  }
`;

export const FileLable = styled.label`
  color: #fff;
  padding: 5px 10px;
  margin-right: 10px;
  background: #ffd000;
  border: 0;
  border-radius: 5px;
  cursor: pointer;
`;

export const Buttons = styled.div`
  display: flex;
  margin: 20px 0 80px 0;
  align-items: center;
  font-size: 14px;
  gap: 10px;

  div {
    display: flex;
    gap: 10px;
  }
`;

export const Title = styled.h2`
  color: #555;
  text-align: center;
  flex: 2;
  padding-bottom: 10px;
`;

export const Search = styled.div`
  display: flex;
  margin-bottom: 15px;
  width: 60%;
  select {
    border: 1px solid #ffd000;
    border-radius: 5px;
    margin-right: 5px;
  }

  input {
    border: 1px solid #ffd000;
    border-radius: 5px;
    margin-right: 5px;
    padding-left: 10px;
    flex: 7;
  }

  button {
    flex: 1;
  }
`;

export const Ul = styled.ul`
  display: flex;
  justify-content: center;
`;

export const Li = styled.li`
  list-style: none;
  padding: 5px;

  button {
    background-color: #fff;
    border: none;
    cursor: pointer;
  }

  button.active {
    color: #ffa600;
    font-weight: bold;
  }
`;

export const Form = styled.form`
  width: 350px;
  display: flex;
  flex-direction: column;
`;

export const FormGroup = styled.div`
  margin-bottom: 1rem;

  div {
    display: flex;

    input {
      flex: 3;
    }
  }
`;

export const Label = styled.label`
  display: block;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  outline: none;
`;

export const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #fff;
  border: 2px solid #ffd000;
  color: #000;
  border-radius: 5px;
  margin-left: 5px;
  cursor: pointer;

  &:hover {
    background-color: #ffd000;
    color: #fff;
    transition: 0.2s;
  }
`;

export const SubmitBtn = styled.button`
  padding: 0.5rem 1rem;
  background-color: #ffd000;
  border: none;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
`;

export const DeleteButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #982e29;
  border: none;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
`;

export const TableTop = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 8px;
  align-items: center;

  button {
    background: none;
    border: none;
    cursor: pointer;
  }
`;

export const ArrayBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

export const TotalCount = styled.p`
  margin-right: auto;
  margin-bottom: 5px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
`;

export const TableHeader = styled.thead`
  background-color: #ffd000;
  color: #fff;
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid #ddd;
`;

export const TableCell = styled.td`
  padding: 8px;
  text-align: center;
`;

export const TbodyRow = styled.tr`
  border-bottom: 1px solid #ddd;
  cursor: pointer;

  &:hover {
    background-color: #0f0f0f;

    td {
      color: #fff;
    }
  }

  .users {
    &:hover {
      color: #ffd000 !important ;
      font-weight: bold;
    }
  }
`;

export const TableCellTitle = styled.td`
  padding: 8px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    height: 25px;
    width: 25px;
    margin-left: 5px;
  }

  &:hover {
    color: #ffd000 !important ;
    font-weight: bold;
  }
`;

export const BackBtnBox = styled.div`
  width: 450px;
  margin: 0 auto;
  margin-bottom: 10px;
  img {
    border: 3px solid #ffd000;
    border-radius: 50px;
    padding: 5px;
    height: 40px;
    width: 40px;
  }
`;

export const BoardBackBtnBox = styled.div`
  display: flex;
  width: 100%;

  h2 {
    margin-left: -40px;
  }
  img {
    position: relative;
    border: 3px solid #ffd000;
    border-radius: 50px;
    padding: 5px;
    height: 40px;
    width: 40px;
    z-index: 9999;
  }
`;

export const JoinLink = styled(Link)`
  color: #000;
  text-align: right;
  font-size: 14px;
`;

export const LinkBtn = styled(Link)`
  padding: 0.5rem 1rem;
  background-color: #ffd000;
  border: none;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  margin-left: auto;
`;

export const WriteBtn = styled.button`
  padding: 0.5rem 1rem;
  background-color: #ffd000;
  border: none;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  margin-left: auto;
`;

export const DetailBox = styled.div`
  width: 1000px;
  margin: 0 auto;

  .prev,
  .next {
    color: #000;
    padding: 10px 0;
    &:hover {
      color: #ff2a2a;
    }
  }
  .prev {
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
  }
`;

export const Details = styled.div`
  padding: 7px;
  border: 2px solid #ffd000;
  border-radius: 5px;
  min-height: 15rem;
  max-height: 25rem;
  white-space: pre-wrap;
  word-break: break-all;
  overflow-y: auto;

  img {
    display: block;
    margin-top: 15px;
    width: 120px;
    height: 120px;
    object-fit: cover;
  }
`;

export const FileList = styled.div`
  ul {
    display: flex;
    flex-wrap: wrap;
  }

  li {
    margin-top: 20px;
    border: 1px solid #ffd000;
    border-radius: 10px;
    align-items: center;
    width: 120px;
    height: 120px;
    position: relative;
    margin-left: 25px;
  }

  li:nth-child(5n + 1) {
    margin-left: 0;
  }

  img {
    border: none;
    border-radius: 10px;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  button {
    position: absolute;
    top: 5px;
    right: 5px;
    background-color: rgba(255, 255, 255, 0.8); /* 반투명 배경 */
    border: none;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    font-size: 14px;
    text-align: center;
    line-height: 20px;
    cursor: pointer;
  }
`;

export const LoginOut = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 700px;
  margin: 0 auto;

  button {
    margin-left: auto;
    background: none;
    border: none;
    margin-top: 10px;
    cursor: pointer;

    img {
      width: 30px;
      height: 30px;
      object-fit: cover;
    }
  }
`;

export const TextCount = styled.p`
  margin-left: auto;
`;

export const ModalOverlay = styled(Modal)`
  background: rgba(0, 0, 0, 0.5);
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  border: 5px solid #ffd000;
  border-radius: 10px;
  padding: 20px;
  width: 400px;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  margin-left: auto;
`;

export const UserInfo = styled.div`
  p {
    margin-bottom: 35px;
  }
`;
