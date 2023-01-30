/* eslint-disable no-unused-vars */
import React, { useCallback, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import './Background.css';
import styled from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

// Import React FilePond
import { FilePond, File, registerPlugin } from 'react-filepond';

// Import FilePond styles
import 'filepond/dist/filepond.min.css';

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';

import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import axios from 'axios';

import { BsX } from 'react-icons/bs';
import Cartoonize from './Cartoonize';
import PhotoReSizing from './PhotoReSizing';

const backBaseUrl = process.env.REACT_APP_BACKEND_URL;

const SumbitBtn = styled.button`
  width: 100px;
  height: 35px;
  border-radius: 15px;
  background: #9f8772;
  font-size: 20px;
  font-weight: 500;
  text-align: center;
  margin: 1rem auto 0 auto;
  display: block;
  :active {
    // 버튼 클릭시 효과
    box-shadow: inset -0.1rem -0.1rem 0.1rem #fbfbfb,
      inset 0.1rem 0.1rem 0.1rem #bec5d0;
    cursor: pointer;
  }
`;
const CloseBtn = styled.button`
  background-color: red;
  margin: 0 0 1rem auto;
  padding-top: 0;
  display: block;
`;

// Register the plugins
registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType,
);

// 모달 스타일
const modalStyle = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.45)',
    zIndex: 9998,
  },
  content: {
    // display: 'flex',
    justifyContent: 'center',
    // background: '#ffffe7',
    overflow: 'auto',
    top: '16vh',
    left: '16vw',
    right: '20vw',
    bottom: '20vh',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '14px',
    outline: 'none',
    zIndex: 9999,
  },
};
function PhotoModal({
  isOpen,
  closeModal,
  setPhoto,
  setIsPhoto,
  setIsActive,
  setRawLog,
  setLoading,
}) {
  const location = useLocation();
  const paperId = location.pathname.slice(9); // 이거 url에서 paperId를 가져옴
  const [files, setFiles] = useState([]);

  const ClickUpload = async () => {
    setLoading(true);
    const formData = new FormData();
    const resizeFile = await PhotoReSizing(files[0].file);
    await formData.append('image', resizeFile);

    const res = await axios.post(
      `${backBaseUrl}/api/v1/papers/${paperId}/photos`,
      formData,
    );
    setLoading(false);
    setPhoto(res.data);
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={modalStyle}
        ariaHideApp={false}
      >
        <CloseBtn
          type="button"
          onClick={() => {
            closeModal();
          }}
        >
          <BsX />
        </CloseBtn>
        <ToastContainer />
        <FilePond
          // files={files}
          acceptedFileTypes={['image/*']}
          allowMultiple={false}
          onupdatefiles={setFiles} // 파일을 업로드하면 files에 저장해줌
          imagePreviewHeight={400}
          labelIdle=""
        />

        <SumbitBtn
          type="button"
          onClick={() => {
            // console.log(files[0].file);
            ClickUpload();
            closeModal();
            setIsPhoto(true);
            setIsActive(true);
          }}
          variant="contained"
          component="label"
        >
          업로드
        </SumbitBtn>
        <Cartoonize
          files={files}
          closeModal={closeModal}
          setIsActive={setIsActive}
          setIsPhoto={setIsPhoto}
          setPhoto={setPhoto}
          setRawLog={setRawLog}
          setLoading={setLoading}
        />
      </Modal>
    </div>
  );
}

export default PhotoModal;
