import React, { useState, useEffect } from "react";
import {
  Image,
  Segment,
  Header,
  Divider,
  Grid,
  Button,
  Card,
} from "semantic-ui-react";
import DropzoneInput from "./DropzoneInput";
import CropperInput from "./CropperInput";
import { toastr } from "react-redux-toastr";
import { uploadProfileImage } from "../../../../redux/actions";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

const query = ({ auth }) => {
  return [
    {
      collection: "users",
      doc: auth.uid,
      subcollections: [{ collection: "photos" }],
      storeAs: "photos",
    },
  ];
};

const PhotosPage = ({ loading, uploadProfileImage, photos }) => {
  const [files, setFiles] = useState([]);
  const [image, setImage] = useState(null);
  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);
  const handleUploadImage = async () => {
    try {
      await uploadProfileImage(image, files[0].path);
      handleCancelCrop();
      toastr.success("Success", "Photo has been uploaded");
    } catch (error) {
      console.log(error);
      toastr.error("Oops!!!", "Something went wrong");
    }
  };
  const handleCancelCrop = () => {
    setFiles([]);
    setImage(null);
  };
  return (
    <Segment>
      <Header dividing size="large" content="Your Photos" />
      <Grid>
        <Grid.Row />
        <Grid.Column width={4}>
          <Header color="teal" sub content="Step 1 - Add Photo" />
          <DropzoneInput setFiles={setFiles} />
        </Grid.Column>
        <Grid.Column width={1} />
        <Grid.Column width={4}>
          <Header sub color="teal" content="Step 2 - Resize image" />
          {files.length > 0 && (
            <CropperInput setImage={setImage} imagePreview={files[0].preview} />
          )}
        </Grid.Column>
        <Grid.Column width={1} />
        <Grid.Column width={4}>
          <Header sub color="teal" content="Step 3 - Preview & Upload" />

          {files.length > 0 && (
            <React.Fragment>
              <div
                className="img-preview"
                style={{
                  minHeight: "200px",
                  minWidth: "200px",
                  overflow: "hidden",
                }}
              />
              <Button.Group>
                <Button
                  loading={loading}
                  onClick={handleUploadImage}
                  style={{ width: "100px" }}
                  positive
                  icon="check"
                />
                <Button
                  onClick={handleCancelCrop}
                  style={{ width: "100px" }}
                  positive
                  icon="close"
                />
              </Button.Group>
            </React.Fragment>
          )}
        </Grid.Column>
      </Grid>

      <Divider />
      <Header sub color="teal" content="All Photos" />

      <Card.Group itemsPerRow={5}>
        <Card>
          <Image
            src="https://randomuser.me/api/portraits/men/20.jpg"
            style={{ minHeight: "80%" }}
          />
          <Button positive>Main Photo</Button>
        </Card>
        {photos &&
          photos.map((photo) => (
            <Card key={photo.id}>
              <Image src={photo.url} style={{ minHeight: "80%" }} />
              <div className="ui two buttons">
                <Button basic color="green">
                  Main
                </Button>
                <Button basic icon="trash" color="red" />
              </div>
            </Card>
          ))}
      </Card.Group>
    </Segment>
  );
};
const mapStateToProps = (state) => {
  return {
    loading: state.eventsReducer.loading,
    profile: state.firebase.profile,
    photos: state.firestore.ordered.photos,
  };
};
export default connect(mapStateToProps, { uploadProfileImage })(
  firestoreConnect((auth) => query(auth))(PhotosPage)
);
