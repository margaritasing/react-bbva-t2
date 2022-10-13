import * as React from 'react';

import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import { Link } from 'react-router-dom'

const CardMUI = ({ title, link, img }) => {

  return (
    <Card sx={{ minWidth: 160 }}>
      
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <CardMedia
        component="img"
        alt="green iguana"
        height="300"
        image={img}
      />
      </CardContent>
      <CardActions>
          <div className="btn-card">
            {/* <button className="btn-screendashboard">{link}Ir</button> */}
            <Link to={`/backoffice/${link}`}> <button className="btn-screendashboard">Ir</button></Link>
          </div>
      </CardActions>
    </Card>
  );
}

export default CardMUI;