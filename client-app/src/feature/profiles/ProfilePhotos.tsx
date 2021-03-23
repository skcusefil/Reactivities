import { observer } from "mobx-react-lite"
import { SyntheticEvent, useState } from "react"
import { Button, Card, Grid, Header, Image, Tab } from "semantic-ui-react"
import PhotoUploadWidget from "../../app/common/ImageUpload/PhotoUploadWidget"
import { Photo, Profile } from "../../app/models/profile"
import { useStore } from "../../app/stores/store"

interface Props {
    profile: Profile;
}

export default observer(function ProfilePhotos({ profile }: Props) {
    const { profileStore: { isCurrentUser, uploadPhoto, uploadingPhoto,
        loadingMainPhoto, setMainPhoto, deletePhoto, waitDeleting } } = useStore();
    const [addPHotoMode, setAddPhotoMode] = useState(false);
    const [target, setTarget] = useState('');

    function handlePhotoUpload(file: Blob) {
        uploadPhoto(file).then(() => setAddPhotoMode(false));
    }

    function handleSetMainPhoto(photo: Photo, e: SyntheticEvent<HTMLButtonElement>) {
        setTarget(e.currentTarget.name);
        setMainPhoto(photo);
    }


    function handleDeletePhoto(photo: Photo, e: SyntheticEvent<HTMLButtonElement>) {
        setTarget(e.currentTarget.name);
        deletePhoto(photo);
    }

    return (
        <Tab.Pane>
            <Grid>
                <Grid.Column width={16}>
                    <Header floated='left' icon='image' content='Photos' />
                    {isCurrentUser && (
                        <Button floated='right'
                            basic
                            content={addPHotoMode ? 'Cancel' : 'Add Photo'}
                            onClick={() => setAddPhotoMode(!addPHotoMode)}
                        />
                    )}
                </Grid.Column>
                <Grid.Column width={16}>
                    {addPHotoMode ? (
                        <PhotoUploadWidget uploadPhoto={handlePhotoUpload} uploadingPhoto={uploadingPhoto} />
                    ) : (
                        <Card.Group itemsPerRow={5}>
                            {profile.photos?.map(photo => (
                                <Card key={photo.url}>
                                    <Image src={photo.url}/>
                                    {isCurrentUser && (
                                        <Button.Group fluid width={2}>
                                            <Button
                                                basic
                                                color='green'
                                                content='Main'
                                                name={'main'+photo.id}
                                                disabled={photo.isMain}
                                                loading={target === 'main'+photo.id && loadingMainPhoto}
                                                onClick={e => handleSetMainPhoto(photo, e)}
                                            />
                                            <Button
                                                basic
                                                color='red'
                                                icon='trash'
                                                loading={target === photo.id && waitDeleting}
                                                onClick={e => handleDeletePhoto(photo, e)}
                                                disabled={photo.isMain}
                                                name={photo.id}
                                            />
                                        </Button.Group>
                                    )}
                                </Card>
                            ))}
                        </Card.Group>
                    )}
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    )
})