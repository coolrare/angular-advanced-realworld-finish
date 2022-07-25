import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from '../../post.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  post = this.formBuilder.group({
    title: this.formBuilder.control('', Validators.required),
    description: this.formBuilder.control(''),
    body: this.formBuilder.control('', [Validators.required, Validators.minLength(10)]),
    tags: this.formBuilder.array([
      this.formBuilder.control('Angular'),
      this.formBuilder.control('HTML'),
      this.formBuilder.control('CSS')
    ])
  });

  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  addTag(tag: string): void {
    this.post.controls.tags.push(this.formBuilder.control(tag));
  }

  removeTag(index: number): void {
    this.post.controls.tags.removeAt(index);
  }

  createPost(): void {
    const article = {
      title: this.post.value.title || '',
      description: this.post.value.description || '',
      body: this.post.value.body || '',
      tagList: <Array<string>>(this.post.value.tags || []).filter(tag => !!tag)
    };
    this.postService.createArticle(article).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
