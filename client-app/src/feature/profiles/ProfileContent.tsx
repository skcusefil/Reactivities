import { observer } from "mobx-react-lite";
import { Tab } from "semantic-ui-react";
import { Profile } from "../../app/models/profile";
import ProfilePhotos from "./ProfilePhotos";
import ProfileDetails from "./ProfileDetails";
import ProfileFollowings from "./ProfileFollowings";
import { useStore } from "../../app/stores/store";

interface Props{
    profile: Profile;
}

export default observer( function ProfileContent({profile}: Props) {
    const panes = [
        { menuItem: 'About', render: () => <ProfileDetails /> },
        { menuItem: 'Photos', render: () => <ProfilePhotos profile={profile}/> },
        { menuItem: 'Events', render: () => <Tab.Pane>Events</Tab.Pane> },
        { menuItem: 'Followers', render: () =><ProfileFollowings /> },
        { menuItem: 'Following', render: () => <ProfileFollowings/> },
    ];

    const {profileStore} = useStore();

    return (
        <Tab
            menu={{ fluid: true, vertical: true }}
            menuPosition='right'
            panes={panes}
            onTabChange={(e,data)=>profileStore.setActiviteTab(data.activeIndex)}
        />
    )
})