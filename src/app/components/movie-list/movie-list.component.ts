import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { MovieService } from 'src/app/service/movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  movies: any[] = [];


  constructor(private movieService: MovieService , private router : Router) { }

  ngOnInit(): void {
    this.movieService.getPopularMovies().subscribe(data => {
      this.movies = data.results;      
      this.router.navigateByUrl('/');
    });
  }
  navigate(movieId:any){
    this.router.navigate([`/movie/${movieId}`])
  }
  
}
