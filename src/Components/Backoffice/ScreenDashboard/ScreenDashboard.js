import "../ScreenDashboard/ScreenDashboard.css";
import CardMUI from '../ScreenDashboard/CardMUI'
import Grid from "@mui/material/Grid";
import Paper from '@mui/material/Paper';
import { experimentalStyled as styled } from '@mui/material/styles';

const ScreenDashboard = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const sectionData = [
    {
      title: "Novedades",
      img:
        "https://images.vexels.com/media/users/3/147149/isolated/preview/b80672b8545a4c8d9a04e7df58d4dc1b-icono-de-periodico-de-noticias.png",
      link: "news"
    },
    {
      title: "Actividades",
      img:
        "https://i.pinimg.com/originals/01/04/8c/01048c13b26dae56c0f27227b1da2f98.png",
      link: "activities"
    },
    {
      title: "Categorias",
      img:
        "https://digital.practia.global/wp-content/uploads/2020/09/iconos-rrhh-63.png",
      link: "categories"
    },
    {
      title: "Testimonios",
      img: "https://cdn-icons-png.flaticon.com/512/2620/2620561.png",
      link: "testimonials"
    },
    {
      title: "Organizacion",
      img: "https://cdn-icons-png.flaticon.com/512/115/115905.png",
      link: "organization"
    },
    {
      title: "Slides",
      img:
        "https://e6.pngbyte.com/pngpicture/44820/png-computer-icons-slide-show-presentation_thumbnail.png",
      link: "slides"
    },
    {
      title: "Usuarios",
      img:
        "https://e6.pngbyte.com/pngpicture/44893/png-computer-icons-user-clip-art-user_thumbnail.png",
      link: "users"
    },
    {
      title: "Miembros",
      img:
        "https://3.bp.blogspot.com/-EsN2VxytQX0/UNS4iWHTl-I/AAAAAAAAMPw/PxpYiIYQ2-Y/s1600/iconos_usuario5.jpg",
      link: "members"
    }
  ];

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  return (
    <div className="container-dashboard">
      <div className="container-cards">
        <Grid
          container
          spacing={{ xs: 2, md: 0 }}
          columns={{ xs: 2, sm: 8, md: 16 }}
          justify="center"
        >
          {sectionData.map((data, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <Item>
                <CardMUI
                  key={index}
                  title={data.title}
                  img={data.img}
                  link={data.link}
                />
              </Item>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default ScreenDashboard;