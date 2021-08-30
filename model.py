import pandas as pd
import numpy as np
import pickle
data = pd.read_csv('dataset.csv')

with open('cosine_sim.pickle', 'rb') as f:
            cosine_sim = pickle.load(f)

with open('indices.pickle', 'rb') as f:
            indices = pickle.load(f)

# Function that takes in movie title as input and outputs most similar movies
def get_recommendations(movie_title, cosine_sim=cosine_sim):
    # Get the index of the movie that matches the title
    idx = indices[movie_title.lower()]

    # Get the pairwsie similarity scores of all movies with that movie
    sim_scores = list(enumerate(cosine_sim[idx]))

    # Sort the movies based on the similarity scores
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

    # Get the scores of the 10 most similar movies
    sim_scores = sim_scores[1:11]

    # Get the movie indices
    movie_indices = [i[0] for i in sim_scores]

    # Return the top 10 most similar movies
    return data['movie_title'].iloc[movie_indices].to_list()

print(get_recommendations('avatar'))

