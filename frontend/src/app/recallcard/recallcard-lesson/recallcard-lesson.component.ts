import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Lesson, RecallcardService } from '../recallcard.service';

@Component({
  selector: 'app-recallcard-lesson',
  templateUrl: './recallcard-lesson.component.html',
  styleUrls: ['./recallcard-lesson.component.scss']
})
export class RecallcardLessonComponent implements OnInit {
  lessonId: number;
  currentPlayMode: string;

  lesson: Lesson;
  message = '';
  playMode: string;

  constructor(private route: ActivatedRoute, private recallcardService: RecallcardService) {}

  ngOnInit(): void {
    this.lessonId = parseInt(this.route.snapshot.paramMap.get('lessonId'), 10);
    this.currentPlayMode = this.route.snapshot.paramMap.get('playMode');
    this.playMode = this.currentPlayMode;
    this.recallcardService.getLesson(this.lessonId).subscribe((res) => {
      if (res.success) {
        this.lesson = res.data;
      } else {
        this.message = res.cause;
      }
      console.log(res);
    });
  }
}
