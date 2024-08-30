import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUploadedFiles } from "../../actions/fileAction";
import Hero from "../layout/Hero";
import  Pagination  from 'react-js-pagination';
import './Pagination.css'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { Fade, TextField } from "@mui/material";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Backdrop from '@mui/material/Backdrop';
import {writeContract,readContract,waitForTransaction} from "wagmi/actions"
import {abi,contractAddress} from'../../constants/contractConstants'
import { useAccount } from "wagmi";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


function GetFiles() {
  const [index, setindex] = useState(0);
  const {address,isConnected} = useAccount()
  const { resultPerPage,fileCount,files, loading } = useSelector((state) => state.file);
  const [searchValue, setsearchValue] = useState("")
  const [keyword, setkeyword] = useState("")
  const dispatch = useDispatch();
  const [currentPage,setCurrentPage]=useState(1);
  const [open, setOpen] = React.useState(false);
  const [receiverAddress,setReceiverAddress] = useState("")
  const [fileLink,setFileLink] = useState(null)

  

  const handleOpen = (file) => {
    setOpen(true)
    setFileLink(file)
  };
  const handleClose = () => setOpen(false);

  const handleSubmit = async(file)=>{
      try {
        const tx = await writeContract({
          address : contractAddress,
          abi : abi,
          functionName : "mint",
          args : [`${receiverAddress}`,"C2cDev","You're a C2C graduate Now..!",`${file}`]
        })
        await waitForTransaction(tx)
      } catch (error) {
        console.log(error);
        window.alert(error)
      }
  }

  const setCurrentPageNo=(e)=>{
    setCurrentPage(e)
  }
 

  
  useEffect(() => {
    dispatch(getUploadedFiles(currentPage,keyword));
  }, [dispatch,currentPage,keyword]);

  if (files === "You need to add the data") {
    return (
      <>
      
        <Hero text="Get Your uploaded files here" />
        <div class="flex justify-center mt-8">
        <div class="w-full md:w-1/2 lg:w-1/3 px-4 h-54">
            <div
              class="wow fadeInUp relative z-10 mb-10 overflow-hidden rounded-xl bg-primary bg-gradient-to-b from-primary to-[#179BEE] py-10 px-8 text-center shadow-pricing sm:p-12 lg:py-10 lg:px-6 xl:p-12"
              data-wow-delay=".1s
              "
            >
           
              <span
                class="mb-2 block text-base font-medium uppercase text-white"
              >
              Upload 
              </span>
            
              <div class="mb-10">
                <p class="mb-1 text-base font-medium leading-loose text-white">
                 You don't have uploaded any files Please Upload
                </p>
             
                <p
                  class="mb-1 text-base font-medium leading-loose text-white"
                >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto perferendis distinctio rerum.
                </p>
              </div>
              <div class="w-full">
                <a
                  href="/file/uploadfile"
                  class="inline-block rounded-full border border-white bg-white py-4 px-11 text-center text-base font-medium text-dark transition duration-300 ease-in-out hover:border-dark hover:bg-dark hover:text-white"
                >
                  Upload
                </a>
              </div>
            </div>
            </div>
          </div>
      </>
    );
  } else {
    return (
      <>
      
        <Hero text="Get Your uploaded files here" />
        <div class="flex justify-center mt-8">
          <div class="mb-3 xl:w-96">
            <div class="relative mb-4 flex w-full flex-wrap items-stretch">
              <input  onChange={(e)=>{
                  setsearchValue(e.target.value)
                }} value={searchValue} 
                type="search" 
                class="relative m-0 -mr-px block w-[1%] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-1.5 text-base font-normal text-neutral-700 outline-none transition duration-300 ease-in-out focus:border-primary-600 focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="button-addon3" />
              <button onClick={()=>{setkeyword(searchValue)}}
                class="relative z-[2] rounded-r border-2 border-gray-700 bg-gray-600 px-6 py-2 text-xs font-medium uppercase text-white hover:text-black transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0"
                type="button"
                id="button-addon3"
                data-te-ripple-init>
                Search
              </button>
            </div>
          </div>
        </div>

        <div className="container my-8">
          <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-400">
              <thead className="text-xs uppercase bg-gray-700 text-gray-400">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    Orignail Name
                  </th>
                  <th scope="col" className="py-3 px-6">
                    New File Name
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Your CID
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Uploaded At
                  </th>
                  <th scope="col" className="py-3 px-6">
                    <span className="">Action</span>
                  </th>
                  <th scope="col" className="py-3 px-6">
                    <span className="">Want NFT?</span>
                  </th>
                </tr>
              </thead>
              <tbody>
          
                {files &&
                  Array.from(files).map((file) => (
                    <tr class="bg-gray-800 border-gray-700 hover:bg-gray-600">
                      <td class="py-4 px-6">{file.originalfileName}</td>
                      <td class="py-4 px-6">{file.newfileName}</td>
                      <td class="py-4 px-6">{file.cid}</td>
                      <td class="py-4 px-6">
                        {String(file.createdAt).slice(0, 10)}
                      </td>
                      <td class="py-2 px-4 text-right">
                        <a
                          href={`https://${file.cid}.ipfs.w3s.link/${file.originalfileName}`}
                          class="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-2"
                        >
                          {" "}
                          Your File
                        </a>
                      </td>
                      <td class="py-4 px-6">{file.Cert ? 
                          <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                          onClick={()=>handleOpen(`https://${file.cid}.ipfs.w3s.link/${file.originalfileName}`)}>
                            MINT..!
                          </button> : 
                          <p>You gotta upload as a Certificate</p>}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className='paginationBox'>
                <Pagination activePage={currentPage} itemsCountPerPage={resultPerPage}
                totalItemsCount={fileCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="First"
                lastPageText="Last"
                itemClass='page-item'
                linkClass='page-link'
                activeClass='pageItemActive'
                activeLinkClass='pageLinkActive'
                />
                </div>
        <div className="flex justify-center items-center">
          <a href="/file/uploadFile" className="outline-none">
            <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
              Upload Files
            </button>
          </a>
        </div>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}> 
        <div className="bg-white text-black w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 rounded-lg shadow-lg transform -translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2">
        <div className="flex justify-between bg-primary bg-gradient-to-r from-primary text-white  p-6">
              <div >
                <h1 id="modal-modal-title" className="text-2xl font-semibold mb-4">
                  Get An NFTee
                </h1>
              </div>
              <div className="inline-block px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ">
                <ConnectButton />
              </div>
            </div>

              <div className="p-8">
              <TextField
                margin="dense"
                id="name"
                label="Receiver address"
                type="text"
                fullWidth
                variant="outlined"
                defaultValue={address}
                onChange={(e) => setReceiverAddress(e.target.value)}
                InputProps={{
                  style: { color: 'black' },
                }}
                InputLabelProps={{
                  style: { color: 'black' },
                }}
                className="mb-4"
              />
              
              <button
                onClick={() => handleSubmit(fileLink)}
                className="bg-blue-500 mt-5 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mb-2 w-full"
              >
                NFT MINT
              </button>
              <Button onClick={handleClose} variant="outlined" className="w-full text-white border-white hover:bg-white hover:text-black">
                Close
              </Button>
              </div>
            </div>
            </Fade>
      </Modal>
      
      </>
    );
  }
}

export default GetFiles;
