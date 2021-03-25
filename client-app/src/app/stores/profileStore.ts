import { makeAutoObservable, reaction, runInAction } from "mobx";
import agent from "../api/agent";
import { Photo, Profile } from "../models/profile";
import { store } from "./store";

export default class ProfileStore {
    profile: Profile | null = null;
    loadingProfile = false;
    uploadingPhoto = false;
    loadingMainPhoto = false;
    waitDeleting = false;
    updatingProfile = false;
    loadingupdateFollowing = false;
    loadingFollowers = false;
    loadingFollowing = false;
    followings: Profile[] = [];
    activeTab = 0;

    constructor() {
        makeAutoObservable(this);

        reaction(() => this.activeTab,
            activeTab => {
                if(activeTab === 3 || activeTab === 4){
                    const predicate = activeTab === 3? 'followers' : 'following';
                    this.loadFollowings(predicate);
                }else{
                    this.followings=[];
                }
            }
        )
    }

    setActiviteTab = (activeTab:any)=>{
        this.activeTab = activeTab;
    }

    get isCurrentUser() {
        if (store.userStore.user && this.profile) {
            return store.userStore.user.userName === this.profile.username;
        }
        return false;
    }

    loadProfile = async (username: string) => {
        this.loadingProfile = true;

        try {
            const profile = await agent.Profiles.get(username);
            runInAction(() => {
                this.profile = profile;
                this.loadingProfile = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => this.loadingProfile = false);
        }
    }

    uploadPhoto = async (file: Blob) => {
        this.uploadingPhoto = true;
        try {
            const response = await agent.Profiles.uploadPhoto(file);
            const photo = response.data;
            runInAction(() => {
                if (this.profile) {
                    this.profile.photos?.push(photo);
                    if (photo.isMain && store.userStore.user) {
                        store.userStore.setImage(photo.url);
                        this.profile.image = photo.url;
                    }
                }
                this.uploadingPhoto = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => this.uploadingPhoto = false);
        }
    }

    setMainPhoto = async (photo: Photo) => {
        this.loadingMainPhoto = true;
        try {
            await agent.Profiles.setMainPhoto(photo.id);
            store.userStore.setImage(photo.url);
            runInAction(() => {
                if (this.profile && this.profile.photos) {
                    this.profile.photos.find(p => p.isMain)!.isMain = false;
                    this.profile.photos.find(p => p.id === photo.id)!.isMain = true;
                    this.profile.image = photo.url;
                    this.loadingMainPhoto = false;
                }
            })

        } catch (error) {
            runInAction(() => this.loadingMainPhoto = false);
            console.log(error);
        }
    }

    deletePhoto = async (photo: Photo) => {
        this.waitDeleting = true;
        try {
            await agent.Profiles.deletePhoto(photo.id);
            runInAction(() => {
                if (this.profile) {
                    this.profile.photos = this.profile.photos?.filter(p => p.id !== photo.id);
                    this.waitDeleting = false;
                }
            })
        } catch (error) {
            console.log(error);
            runInAction(() => this.waitDeleting = false);
        }
    }

    updateProfile = async (profile: Partial<Profile>) => {
        this.updatingProfile = true;
        try {
            await agent.Profiles.updateProfile(profile);
            runInAction(() => {
                if (profile.displayName && profile.displayName !== store.userStore.user?.displayName) {
                    store.userStore.setDisplayName(profile.displayName);
                }
                this.profile = { ...this.profile, ...profile as Profile };
                this.updatingProfile = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loadingProfile = false
            });
        }
    }

    updateFollowing = async (username: string, following: boolean) => {
        this.loadingupdateFollowing = true;
        try {
            await agent.Profiles.updateFollowing(username);
            store.activityStore.updateAttendeeFollowing(username);
            runInAction(() => {
                if (this.profile && this.profile.username !== store.userStore.user?.userName && this.profile.username === username) {
                    following ? this.profile.followersCount++ : this.profile.followersCount--;
                    this.profile.following = !this.profile.following;
                }
                if(this.profile && this.profile.username === store.userStore.user?.userName){
                    following?this.profile.followingCount++:this.profile.followingCount--;
                }
                this.followings.forEach(profile => {
                    if (profile.username === username) {
                        profile.following ? profile.followersCount-- : profile.followersCount++;
                        profile.following = !profile.following;
                    }
                })
                this.loadingupdateFollowing = false;

            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loadingupdateFollowing = false
            });
        }
    }

    loadFollowings = async (predicate: string) => {
        this.loadingFollowing = true;
        try {
            const followings = await agent.Profiles.listFollowing(this.profile!.username, predicate);
            runInAction(() => {
                this.followings = followings;
                this.loadingFollowing = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loadingFollowing = false
            });
        }
    }

}