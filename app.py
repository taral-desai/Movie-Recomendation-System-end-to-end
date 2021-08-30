import pandas as pd
import numpy as np
import model
import json
import requests
from tmdbv3api import TMDb
tmdb = TMDb()
tmdb.api_key = 'your TMBD API'
from tmdbv3api import Movie
movie = Movie()




from flask import Flask, render_template
app = Flask(__name__)

@app.route("/")
def homepage():
    """View function for Home Page."""
    return render_template("index.html")


@app.route("/<movie_title>")
def recommendation(movie_title):
    
    recommend = [movie_title] + model.get_recommendations(movie_title)
    
    doc = []
    
    for e in recommend:   

        result = movie.search(e)
       
        movie_id = result[0].id
       
        response = requests.get('https://api.themoviedb.org/3/movie/{}?api_key={}'.format(movie_id,tmdb.api_key))
       
        data_json = response.json()

        doc.append(data_json)
    
    data = json.dumps(doc)
    




    return data

    
    
    


    




    
    

if __name__ == "__main__":
    app.run(debug=False)