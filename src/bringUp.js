import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Box, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTheme } from '@mui/material';
import { fetchCategories } from '../../Categories/categorySlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLecturers } from '../../Lecturers/lecturerSlice';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios'
import { addPodcast } from '../podcastSlice';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

 function FillDetailPodcastForm() {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  const theme = useTheme();
  const categories = useSelector(state => state.categories.categories)
  const statusCategory = useSelector(state => state.categories.status)
  const lecturers = useSelector(state => state.lecturers.lecturers)
  const statusLecturer = useSelector(state => state.lecturers.status)
  const current_User = useSelector(state => state.users.currentUser);
  const dispatch = useDispatch();

  let LecturerNames = lecturers.map((lecturer) => lecturer.firstName + " " + lecturer.lastName + " ");
  let CategoryNames = categories.map((category) => category.nameOfCategory);
  let [name, setName] = useState('');
  let [content, setContent] = useState('');
  let [lecturer, setLecturer] = useState('');
  let [category, setCategory] = useState('');
  let [isVideoPodcast, setIsVideoPodcast] = useState(false);
  let [length, setLength] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const [allPodcast, setallPodcast] = useState(undefined)

  useEffect(() => {
    const fetchCategoriesAfterLecturers = () => {
      if (statusCategory !== 'fulfilled') {
        dispatch(fetchCategories());
      }
    };

    if (statusLecturer !== 'fulfilled') {
      console.log("if");
      dispatch(fetchLecturers());
    } else {
    console.log("else");
      fetchCategoriesAfterLecturers();
    }

  }, [statusCategory, statusLecturer, dispatch]);

  const handleSubmit = async (event) => {
    event.preventDefault(); // מנע התנהגות ברירת מחדל של שליחת טופס

    const currentCategory = categories.find((c) => { return c.nameOfCategory === category })
    const currentLecturer = lecturers.find((l) => { return l.firstName + " " + l.lastName + " " === lecturer })

    // const durationInMinutes = await getDuration(selectedFile, isVideoPodcast);
    // console.log("Duration in minutes:", durationInMinutes);
    console.log("file",selectedFile);
    setallPodcast({
      name1: name,
      content1: content,
      selectedFile1: selectedFile,
      isVideoPodcast1: isVideoPodcast,
      length1: 3,
      uploadingDate1: new Date().toLocaleDateString(),
      category1: currentCategory.id,
      lecturer1: currentLecturer.id,
      user1: current_User.id
    })
  }

  useEffect(() => {
    if (allPodcast != undefined) {
      console.log("itemmm");
      dispatch(addPodcast(allPodcast))
    }
  }, [allPodcast])



  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        היי,תודה שבחרת לשתף פודקאסט עם כולם
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '5%' }}>
        <Typography variant="h6" gutterBottom sx={{ mr: 1, my: 3 }}>
          *שם הפודקאסט:
        </Typography>
        <TextField
          id="standard-basic"
          variant="standard"
          value={name}
          onChange={(e) => setName(e.target.value)}
          helperText=" יופיע ככותרת של הפודקאסט שלך"
          sx={{ paddingRight: '4%' }}
        />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '5%' }}>
        <Typography variant="h6" gutterBottom sx={{ mr: 1, my: 9 }}>
          תוכן הפודקאסט:
        </Typography>

        <TextField
          id="outlined-multiline-static"
          // label="Multiline"
          multiline
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}

          label="טקסט חופשי"
          sx={{ paddingRight: '4%' }}
          helperText="תיאור קצר על תוכן הפודקאסט"
        />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '5%' }}>
        <Typography variant="h6" gutterBottom sx={{ mr: 1, my: 3 }}>
          מרצה/מגיש:
        </Typography>
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="demo-simple-select-label">בחירת מרצה/מגיש</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={lecturer}
            label="בחירת מרצה/מגיש"
            onChange={(e) => setLecturer(e.target.value)}
          >
            {LecturerNames.map((name, index) => (
              <MenuItem
                key={name}
                value={name}
                id={index}
              >
                {name}

              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '5%' }}>
        <Typography variant="h6" gutterBottom sx={{ mr: 1, my: 3 }}>
          קטגוריה:
        </Typography>
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="demo-simple-select-label">בחירת קטגוריה</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            label="בחירת קטגוריה"
          >

            {CategoryNames.map((name) => (
              <MenuItem
                key={name}
                value={name}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '5%' }}>
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
        >
          העלה פודקסאסט
          <VisuallyHiddenInput type="file"              
            onChange={(e) => setSelectedFile(e.target.files[0])} />
        </Button>
        
        <Typography variant="h6" gutterBottom sx={{ fontSize: 12, mr: 1 }}>
          {selectedFile && selectedFile.name}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '5%' }}>
        <Typography variant="h6" gutterBottom sx={{ mr: 1, my: 1 }}>
          הפודקאסט  מסוג וידאו?
        </Typography>
        <div>
          <Checkbox value={isVideoPodcast} onChange={(e) => setIsVideoPodcast(e.target.value)} {...label} />

        </div>
      </Box>

      <Button
        variant="contained"
        sx={{ mt: 3, ml: 1 }}
        onClick={handleSubmit}

      >
        אישור
      </Button>
      {/* length? */}

    </React.Fragment>
  );
}


