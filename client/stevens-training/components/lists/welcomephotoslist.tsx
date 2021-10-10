import React from 'react';
import { View } from 'react-native';

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       display: 'flex',
//       flexWrap: 'wrap',
//       overflow: 'hidden',
//       textAlign: "center",
//       alignContent: "center",
//       backgroundColor: "#191919", 
//       width: "100%",
   
//     },
//     imageList: {
//       "&::-webkit-scrollbar": {
//         width: 20,
//       },
//       "&::-webkit-scrollbar-track": {
//         boxShadow: `inset 0 0 6px rgba(0, 0, 0, 0.6)`,
//       },
//       "&::-webkit-scrollbar-thumb": {
//         backgroundColor: "#303030",
//         outline: `1px solid #191919`,
//         borderRadius: "15px"
//       },
//       width: "100%",
//       height: "100vh"
//     },
//   }),
// );
export default function BasicImageList() {
  const numRows = 5;
  return (
    <View style={{}}>
      {/* <ImageList rowHeight={500} className={classes.imageList} cols={1}>
          <ImageListItem key={"ace"} cols={1}>
            <img src={require('./banner.jpg')} alt={"title"} />
          </ImageListItem>
          <ImageListItem key={"base"} cols={1}>
            <img src={require('./banner.jpg')} alt={"title"} />
          </ImageListItem>
          <ImageListItem key={"case"} cols={1}>
            <img src={require('./banner.jpg')} alt={"title"} />
          </ImageListItem>
          <ImageListItem key={"case"} cols={1}>
            <img src={require('./banner.jpg')} alt={"title"} />
          </ImageListItem>
      </ImageList> */}
    </View>
  );
}