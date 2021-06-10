import React from 'react';
import AppHeader from '../app-header';
import {
    MainPage,
    LoginPage,
    ListPage,
    RegisterPage,
    PostPage,
    EditorProfilePage,
    UserPostsPage,
    CreateEditPage,
    DragDropPage
} from '../pages';
import { Route, Switch } from 'react-router-dom';
import SocialShare from '../social-share';

export default function App() {
    return (
        <>
            <React.StrictMode>
                <AppHeader />
                <SocialShare />
                <Switch>
                    <Route path='/' exact component={MainPage} />
                    <Route path='/login' exact component={LoginPage} />
                    <Route path='/list/page:page?' exact component={ListPage} />
                    <Route path='/signUp' exact component={RegisterPage} />
                    <Route path='/post/:id' exact component={PostPage} />
                    <Route path='/editor-profile' exact component={EditorProfilePage} />
                    <Route path='/user-posts/:id' exact component={UserPostsPage} />
                    <Route path='/post-page/:id' exact component={CreateEditPage} />
                    <Route path='/post-page' exact component={CreateEditPage} />
                    <Route path='/drag-drop' exact component={DragDropPage} />
                </Switch>
            </React.StrictMode>
        </>
    );
}


