import './App.css';
import "./index.css";

//Mui.com
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import axios from "axios";
//icons MUI.com
import CloudIcon from '@mui/icons-material/Cloud';
//react
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from "uuid";
let ville = [
  {
   id:uuidv4(),
   Name : "NKTT",
   log:-15.96,
   lat :18.07
  },
  {
      id:uuidv4(),
      Name :"Nema",
      lat:16.61,
      log:-7.25
  },
  {
      id:uuidv4(),
      Name :"BTT",
      lat:17.51,
      log:-14.77
  },
  {
      id:uuidv4(),
      Name :"ATAR",
      lat:20.51,
      log:-13.04
  },
  {
      id:uuidv4(),
      Name :"NDB",
      lat:20.93,
      log:-17.03
  },
  
  {
      id:uuidv4(),
      Name :"Zouerate",
      lat:22.73,
      log:-12.47
  },
  
  {
      id:uuidv4(),
      Name :"Kaedi",
      lat:16.15,
      log:-13.50
  },
  {
      id:uuidv4(),
      Name :"Rosso",
      lat:16.51,
      log:-15.80
  },
]
function App() {
  const [tamperature , setTamperature] = useState("")
  const [date , setdate] = useState("")
  const [petit , setpetit] = useState("")
  const [grand , setgrand] = useState("")
  const [nameFille , setNameFille] = useState("")
  const [srs , setsrs] = useState("bb.png")
  const [index , setIndex ] = useState(0);
  const [classDisplay , setclass ] = useState("no-observe");
  const [Logo , setLogo ] = useState(KeyboardArrowDownIcon);
  useEffect(()=>{
  let log=ville[index].log
  let lat=ville[index].lat
 axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${log}&appid=311b5c6055277ced57a5d79eea116c6e`)
  .then(function (response) {
 
    let tempe = response.data.main.temp - 273.15;
    let petits = response.data.main.temp_min - 273.15;
    let grands = response.data.main.temp_max - 273.15;
    
    const dt = response.data.dt;
    let srcs = response.data.weather[0].icon
    console.log(srcs)
    setsrs("https://openweathermap.org/img/wn/"+srcs+".png")

// convertir en millisecondes
const date = new Date(dt * 1000);
setNameFille(response.data.name)
setdate(date.toLocaleDateString("fr-FR", { timeZone: "UTC" }))
    setTamperature(Math.round(tempe))
    setgrand(Math.round(grands))
    setpetit(Math.round(petits))
  }

  )
    
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  },[index]);
function change(e)
{
  // console.log(e)
  let i=0;
for( let vill of ville)
{
 if(vill.Name === e)
 {
  setIndex(i);
  setclass("no-observe");
  setLogo(KeyboardArrowDownIcon)
 }
 i++;
}
}
function chgre()
{
  if(classDisplay=== "obser")
  {
setclass("no-observe")
setLogo(KeyboardArrowDownIcon)
  }

  else{
setclass("obser")
setLogo(ExpandLessIcon)
  }
      
}
  return (
    <div className="App">
      <h1>MétéoDuJour</h1>
      {/* debut de ville */}
      <div >
        <p className='direction_fliche' onClick={chgre} >Sélectionner une ville < Logo onClick={chgre} sx={{color:"white",marginBottom:"-5px"}} /></p> 
        <div className={classDisplay}> 
        <p className='p-style'   onClick={()=>{change(ville[0].Name)}}>Nktt</p>
        <p className='p-style'  onClick={()=>{change(ville[1].Name)}}>Nema</p>
        <p  className='p-style'  onClick={()=>{change(ville[2].Name)}}>BTT</p>
        <p  className='p-style'  onClick={()=>{change(ville[3].Name)}}>ATAR</p>
        <p  className='p-style'  onClick={()=>{change(ville[4].Name)}}>NDB</p>
        <p  className='p-style'  onClick={()=>{change(ville[5].Name)}}>Zouerate</p>
        <p  className='p-style'  onClick={()=>{change(ville[6].Name)}}>Kaedi</p>
        <p  className='p-style'  onClick={()=>{change(ville[7].Name)}}>Rosso</p>
        </div>
      </div>
      {/* fin de ville */}
      <div>
   <Card sx={{ minWidth: 275,backgroundColor:"blue",borderRadius:"20px" }}>
      <CardContent>
        <div className='medina'>
        <Typography variant="h4" sx={{color:"white"}} >
          {nameFille}
        </Typography>
       <p style={{color:"white"}}>{date}</p>
       
        
        </div>
        <hr/>
        <div className='body-div'>
          <div>
            <div style={{display:"flex",gap:"2px",alignItems:"center"}}>
              <p style={{fontSize:"40px",marginBottom:"20px",color:"white"}}>{tamperature+" "}∘C</p>
      {/* <CloudIcon  sx={{fontSize:"20px",color:"white"}}/> */}
      <img  src={srs} alt="sak"/>
            </div>
            <div>
        <Typography sx={{ color: 'white'}}>La température Min et Max</Typography>
        <Typography sx={{color:"white"}} variant="body2">
          Max:{" "+grand} ∘C | Min:{" "+petit} ∘C
        </Typography>
        </div>
        </div>
        <div>
          <CloudIcon  sx={{fontSize:"80px",color:"white"}}/>
        </div>
        </div>
      </CardContent>
    </Card>
    </div>
    </div>
  );
}

export default App;
