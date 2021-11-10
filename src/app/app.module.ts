import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TimeDisplayPipe } from './pipes/time-display.pipe';
import { AppHeaderComponent } from './cmps/layout/app-header/app-header.component';
import { ChooseUserComponent } from './cmps/choose-user/choose-user.component';
import { FormsModule } from '@angular/forms';
import { CommentsPageComponent } from './pages/comments-page/comments-page.component';
import { CommentListComponent } from './cmps/comment-list/comment-list.component';
import { CommentPreviewComponent } from './cmps/comment-preview/comment-preview.component';
import { AddCommentComponent } from './cmps/add-comment/add-comment.component';
import { ScreenComponent } from './cmps/screen/screen.component';

@NgModule({
  declarations: [
    AppComponent,
    TimeDisplayPipe,
    AppHeaderComponent,
    ChooseUserComponent,
    CommentsPageComponent,
    CommentListComponent,
    CommentPreviewComponent,
    AddCommentComponent,
    ScreenComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
