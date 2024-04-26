import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from 'src/app/service/movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  @Input() 
  movie: any;
  showDetails: boolean = false;
  movieId!: number;
  errorMessage! : string
  
  constructor(private route: ActivatedRoute, private movieService: MovieService , private router : Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.movieId = +params['id'];

      if (!isNaN(this.movieId)) {
        this.movieService.getMovieDetails(this.movieId).subscribe(
          (data: any) => {
            this.movie = data;
           
            
          },
          (error: any) => {
            this.errorMessage = 'Error fetching movie details. Please try again later.';
            console.error('Error fetching movie details:', error);
          }
        );
      } else {
        this.errorMessage = 'Invalid movie ID'; 
        // console.error('Invalid movie ID');
      }
    });
  
  }
}
