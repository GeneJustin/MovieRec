from flask import Flask, render_template, jsonify
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd

app = Flask(__name__)

df = pd.read_csv('movies_100.csv')
df['genre_text'] = df['genres'].str.replace('|',' ', regex=False)
tfid = TfidfVectorizer()
genre = tfid.fit_transform(df['genre_text'])
similarity = cosine_similarity(genre)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/list')
def getlist():
    return jsonify(df.to_dict('records'))

@app.route('/page/<int:movie_id>')
def page(movie_id):
    return render_template('page.html')

@app.route('/api/movie/<int:movie_id>')
def rec(movie_id):
    data = df[df['movie_id'] == movie_id].iloc[0]
    index = data.name
    scores = list(enumerate(similarity[index]))
    rec10 = sorted(scores,key=lambda x:x[1], reverse=True)[0:11]
    rec = df.iloc[[i[0] for i in rec10 if i[0]!= index]].to_dict('records')

    return jsonify({
        'movie':data.to_dict(),
        'recommendation': rec
    })


if __name__ == '__main__':
    app.run(debug=True)
