import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  post = this.formBuilder.group({
    title: this.formBuilder.control(''),
    description: this.formBuilder.control(''),
    body: this.formBuilder.control(''),
    tags: this.formBuilder.array([
      this.formBuilder.control('Angular'),
      this.formBuilder.control('HTML'),
      this.formBuilder.control('CSS')
    ])
  });

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  addTag(tag: string): void {
    this.post.controls.tags.push(this.formBuilder.control(tag));
  }

  removeTag(index: number): void {
    this.post.controls.tags.removeAt(index);
  }

  createPost(): void {
    console.log(this.post.value);
  }
}
