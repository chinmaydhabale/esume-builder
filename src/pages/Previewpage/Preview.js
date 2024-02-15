import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Navbar from '../../Component/Navbar';
import './Preview.css'
import toast from 'react-hot-toast';
import { setsaveresume } from '../../redux/slice/templateslice';
import { setresumename } from '../../redux/slice/templateslice';
// import temp from '../data/resumedata'

const Preview = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const state = useSelector((state) => state.template.selectresume)
  const [FileName, setFileName] = useState("")

  const handleback = () => {
    navigate('/Detailfilling')
  }

  const handlesave = () => {
    const input = document.getElementById("print");
    console.log(document);
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        var width = pdf.internal.pageSize.getWidth();
        var height = pdf.internal.pageSize.getHeight();
        pdf.addImage(imgData, "JPEG", 0, 0, width, height);
        // pdf.output('dataurlnewwindow');
        pdf.save(`${FileName}.pdf`);
        toast.success("resume saved successfully")
        dispatch(setsaveresume(state))
        dispatch(setresumename(FileName))
        navigate('/')
      })
      .catch(function (error) {
        toast.error(error)

      });
  }

  return (
    <div>
      <div >

        <Navbar />
      </div>
      <div className='resumepreview' >
        <div className='resume' id='print' >
          {state.data}

        </div>
        <Box sx={{ border: '2px solid blue', padding: '18px', margin: 'auto', width: "50%" }}>
          <Box>
            <TextField onChange={(e) => setFileName(e.target.value)} />
          </Box>
          <Box>
            <Button onClick={handleback}>Back</Button>
            <Button onClick={handlesave}>Save</Button>
          </Box>
        </Box>
      </div>
    </div>
  )
}

export default Preview