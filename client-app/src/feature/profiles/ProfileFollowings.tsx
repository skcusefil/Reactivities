import { observer } from "mobx-react-lite";
import { Card, Grid, Header, Tab } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import ProfileCard from "./ProfileCard";

interface Props {
    predicate: string;
}

export default observer(function ProfileFollowings() {

    const { profileStore } = useStore();
    const { loadingFollowing, profile, followings, activeTab } = profileStore;

    return (

        <Tab.Pane loading={loadingFollowing}>
            <Grid>
                <Grid.Column width={16}>
                    <Header
                        floated='left'
                        icon='user'
                        content={activeTab === 3 ? 
                            `${profile?.displayName} has ${profile?.followersCount} followers` 
                            : 
                            `${profile?.displayName} follows ${profile?.followingCount} people` 
                        }
                    />

                </Grid.Column>
                <Grid.Column width={16}>
                    <Card.Group itemsPerRow={4}>
                        {followings.map(profile => (
                            <ProfileCard key={profile.username} profile={profile} />
                        ))}

                    </Card.Group>
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    )
})