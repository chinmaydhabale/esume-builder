import { Box, Button, Divider, IconButton, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { setWorkexp } from '../redux/slice/resumeinfoslice';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';


const Workexp = () => {

    const dispatch = useDispatch()
    const state = useSelector((state) => state.resumeinfo.workexp)
    const [submited, setSubmited] = useState(true)


    const [jobtitle, setJobTitle] = useState("")
    const [Organization, setOrganization] = useState("")
    const [startyear, setStartyear] = useState("")
    const [endyear, setEndyear] = useState("")


    const [listworkexp, setListWorkExp] = useState([])

    //to add item
    const handleaddnew = () => {

        if (jobtitle === '' || Organization === '' || startyear === '' || endyear === '') {
            toast.error("Fill all the component.")
        } else {
            dispatch(state === null ? setWorkexp([...listworkexp, {
                id: Date.now(),
                title: jobtitle,
                Organization: Organization,
                startyear: startyear,
                endyear: endyear,
            }]) : setWorkexp([...state, {
                id: Date.now(),
                title: jobtitle,
                Organization: Organization,
                startyear: startyear,
                endyear: endyear,
            }]))

            setJobTitle("")
            setOrganization("")
            setEndyear("")
            setStartyear("")
        }
    }


    const handledelete = (id) => {

        dispatch(setWorkexp(state.filter((work) => {
            return work.id !== id
        })))
    }

    const Handlesubmit = (e) => {
        e.preventDefault();
        if (state === null) {
            toast.error("Add the information first.")
        } else {

            setSubmited(false)
        }
    }

    const onEdit = (e) => {
        setSubmited(true)
    }

    return (
        <Box display={'flex'}>

            <Box width={'100%'}>
                <Box border={1}>
                    <Box sx={{ p: 3 }}>
                        <Typography variant='h4'>
                            Work Expirience
                        </Typography>
                        <Typography variant='h6'>
                            Expirience 1
                        </Typography>
                    </Box>
                    <Divider />

                    <Box>
                        {state && state.map((val) => {
                            return (<Box key={val.id} display={"flex"} border={"1px solid"} justifyContent={"space-between"} padding={"5px"}>
                                <Box>
                                    <Typography marginTop={"6px"}>
                                        Type: {val.title}
                                    </Typography>
                                    <Typography marginTop={"6px"}>
                                        University: {val.Organization}
                                    </Typography>
                                    <Typography marginTop={"6px"}>
                                        Startyear:  {val.startyear}
                                    </Typography>
                                    <Typography marginTop={"6px"}>
                                        Endyear: {val.endyear}
                                    </Typography>
                                </Box>
                                {submited && <Stack display={"inline"}>
                                    <IconButton onClick={() => handledelete(val.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Stack>}
                            </Box>)
                        })}
                    </Box>



                    {submited && <Box sx={{ p: 3 }}>

                        <Stack direction={'row'} spacing={3} sx={{ py: 3 }}>
                            <TextField
                                label="Job Title"
                                name='title'
                                fullWidth
                                value={jobtitle}
                                onChange={(e) => setJobTitle(e.target.value)}
                                required
                            />
                            <TextField
                                label="Organization Name"
                                name='Organization'
                                fullWidth
                                value={Organization}
                                onChange={(e) => setOrganization(e.target.value)}
                                required
                            />
                        </Stack>
                        <Stack direction={'row'} spacing={3}>
                            <TextField
                                label="Start year"
                                name='startyear'
                                fullWidth
                                value={startyear}
                                onChange={(e) => setStartyear(e.target.value)}
                                required
                            />
                            <TextField
                                label="End year"
                                name='endyear'
                                fullWidth
                                value={endyear}
                                onChange={(e) => setEndyear(e.target.value)}
                                required
                            />
                        </Stack>



                    </Box>}


                    {submited && <Box sx={{ display: 'flex', justifyContent: 'center', paddingTop: '9px' }}>
                        {state === null ? (<Button variant="text" onClick={handleaddnew}>Add</Button>) : (<Button variant="text" onClick={handleaddnew}>Add new</Button>)}

                    </Box>}


                    <Box sx={{ display: "flex", mt: 3, margin: "5px", alignItems: "center", justifyContent: "center" }}>
                        {submited ? (<Button onClick={Handlesubmit} variant='contained'>Submit</Button>) : (<Button onClick={onEdit} variant='contained'>Edit</Button>)}

                    </Box>

                </Box>
            </Box>
        </Box >
    )
}

export default Workexp