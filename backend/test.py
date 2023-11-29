# %%
import pandas as pd # data processing, CSV file I/O (e.g. pd.read_csv)
import random
import math

# %%
books = pd.read_csv("./data/books.csv", sep=";", 
                   on_bad_lines="skip", encoding="latin-1")
ratings = pd.read_csv("./data/ratings.csv", sep=";", 
                   on_bad_lines="skip", encoding="latin-1")
users = pd.read_csv("./data/users.csv", sep=";", 
                   on_bad_lines="skip", encoding="latin-1")

# %%
books.columns = ['ISBN', 'bookTitle', 'bookAuthor', 'yearOfPublication', 'publisher', 
                 'imageUrlS', 'imageUrlM', 'imageUrlL']

users.columns = ['userID', 'Location', 'Age']

ratings.columns = ['userID', 'ISBN', 'bookRating']
print(books.head())

# %%
print(ratings.head())

# %%
print(users.head())

# %%
print(books.shape)

# %%
books.info()

# %%
books.yearOfPublication.unique()

# %%


books.loc[books.yearOfPublication == 'Gallimard',:]

# %%
books.loc[books.yearOfPublication == 'DK Publishing Inc',:]

# %%
books = books[(books.yearOfPublication != 'DK Publishing Inc')
              & (books.yearOfPublication != 'Gallimard')]

# %%
books.yearOfPublication = books.yearOfPublication.astype('int16')
books.dtypes

# %%
books = books.dropna(subset=['publisher'])
books.publisher.isnull().sum()

# %%
print(books.loc[books.yearOfPublication >=2024,:])

# %%
print(books.loc[books.yearOfPublication == 0,:])

# %%
books = books[(books.yearOfPublication <=2024)
              & (books.yearOfPublication >= 1000)]

# %%
print(books.loc[books.yearOfPublication == 0,:])

# %%
books.duplicated(subset='bookTitle').sum() # 29,225

# %%
books = books.drop_duplicates(subset='bookTitle')

# %%
books.duplicated(subset='bookTitle').sum()


# %%
ratings_new = ratings[ratings.ISBN.isin(books.ISBN)]
x = ratings['userID'].value_counts() > 200
y = x[x].index
ratings = ratings[ratings['userID'].isin(y)]
rating_with_books = ratings.merge(books, on='ISBN')
rating_with_books

# %%
number_rating = rating_with_books.groupby('bookTitle')['bookRating'].count().reset_index()
number_rating.rename(columns= {'bookRating':'number_of_ratings'}, inplace=True)
number_rating

# %%
avg_ratings = rating_with_books[rating_with_books['bookRating'] >0].groupby('bookTitle')['bookRating'].mean().reset_index()
print(avg_ratings[avg_ratings['bookTitle']=="Harry Potter and the Sorcerer's Stone (Harry Potter (Paperback))"])
avg_ratings['bookRating'] = ((avg_ratings['bookRating'] - avg_ratings['bookRating'].min())/(avg_ratings['bookRating'].max()-avg_ratings['bookRating'].min()))*5
print(avg_ratings[avg_ratings['bookTitle']=="Harry Potter and the Sorcerer's Stone (Harry Potter (Paperback))"])

# %%
final_rating = rating_with_books.merge(number_rating, on='bookTitle')

# %%
final_rating = final_rating[final_rating['number_of_ratings'] >= 80]
final_rating.drop_duplicates(['userID','bookTitle'], inplace=True)

# %%
final_rating

# %%
list_of_distinct_users = list(final_rating['userID'].unique())
print(len(list_of_distinct_users))

# %%

df = books[books.ISBN.isin(final_rating.ISBN)]

df = df.reset_index()
df = df.drop('index',axis=1)
sampleBooks = df.copy()

# %%
sampleBooks

# %%
sampleBooks =sampleBooks.merge(avg_ratings,on='bookTitle')
sampleBooks['bookRating'] =round(sampleBooks['bookRating'],1)
sampleBooks['bookAuthor'] = sampleBooks['bookAuthor'].str.lower().str.title()

# %% [markdown]
# ## РЕКОМЕНДАЦИЯ ПО РЕЙТИНГУ ЮЗЕРОВ

# %%
from surprise import Reader, Dataset, SVD

# %%

reader = Reader(rating_scale=(1, 10))
data   = Dataset.load_from_df(final_rating[['userID','bookTitle','bookRating']], reader)
trainset = data.build_full_trainset()
model = SVD(n_factors=50, n_epochs=10, lr_all=0.005, reg_all= 0.2)
model.fit(trainset)
testset = trainset.build_anti_testset()
predictions = model.test(testset)
predictions_df = pd.DataFrame(predictions)

# %%
def generate_recommendationsSVD(userID=277427, get_recommend =20):
    

    # get the top get_recommend predictions for userID
    
    predictions_userID = predictions_df[predictions_df['uid'] == userID].\
                         sort_values(by="est", ascending = False).head(get_recommend)
    recommendations = []
    recommendations.append(list(predictions_userID['iid']))
    recommendations = recommendations[0]
    rec_books = sampleBooks[sampleBooks.bookTitle.isin(recommendations)]
    return(rec_books.sample(frac=1).to_dict('records'))

# %%
from surprise.model_selection import cross_validate
cross_validate(model, data, measures=['RMSE', 'MAE'], cv=3, verbose=True)

# %%
recommendationsSVD = generate_recommendationsSVD(userID=241980, get_recommend =30)


# %% [markdown]
# ## РЕКОМЕНДАЦИЯ ПО НАЗВАНИЮ, АВТОРУ И ИЗДАТЕЛЮ

# %%
def clean_text(author):
    result = str(author).lower()
    return(result.replace(' ',''))

# %%
df['bookAuthor'] = df['bookAuthor'].apply(clean_text)

# %%
print(sampleBooks['bookTitle'].head())

# %%
df['bookTitle'] = df['bookTitle'].str.lower()
df['publisher'] = df['publisher'].str.lower()

# %%
# combine all strings:
df2 = df.drop(['ISBN','imageUrlS','imageUrlM','imageUrlL','yearOfPublication'],axis=1)

df2['data'] = df2[df2.columns[0:]].apply(
    lambda x: ' '.join(x.dropna().astype(str)),
    axis=1
)

df2

# %%
df2['data'][2]

# %%
from sklearn.feature_extraction.text import CountVectorizer

vectorizer = CountVectorizer()
vectorized = vectorizer.fit_transform(df2['data'])

# %%
from sklearn.metrics.pairwise import cosine_similarity

similarities = cosine_similarity(vectorized)

# %%
print(similarities)

# %%
df = pd.DataFrame(similarities, columns=df['bookTitle'], index=df['bookTitle']).reset_index()

df


# %%
booksDict = sampleBooks.to_dict('records')


# %%
def get_RecBooks_COSIAN(title):
    recBooks = []

    recommendations = pd.DataFrame(df.nlargest(21,title.lower())['bookTitle'])
    recommendations = recommendations[recommendations['bookTitle']!=title.lower()]
    recList = recommendations['bookTitle'].values.tolist()
    for i in range(len(recList)):
        recBooks.append(sampleBooks[sampleBooks['bookTitle'].str.lower() ==recList[i]].to_dict('records')[0])

    return recBooks


# %%
amount_of_books = 12

# %%
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'




# %%
@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/books')
@cross_origin()
def books():
    page = request.args.get('page')
    query = request.args.get('query')
    if query:
        query = query.replace('+',' ').lower()
    booksDict = sampleBooks[sampleBooks['bookTitle'].str.lower().str.contains(query or '')].to_dict('records')
    amount = len(booksDict)
    pages =math.ceil(amount/amount_of_books)
    if page == '0':
        return jsonify({'error':'error'}),404
    if pages == 0:
        return jsonify({'books':[],'pages':1,'page':1}),200
    if not page:
        return jsonify({'books':booksDict[0:amount_of_books],'pages':pages,'page':1}),200
    if (int(page)) >pages:
        return jsonify({'error':'error'}),404
    
    return jsonify({'books':booksDict[(int(page)-1)*amount_of_books:(int(page))*amount_of_books],'pages':pages,'page':int(page)}),200



@app.route('/books/<id>')
@cross_origin()
def get_one_book(id):
    book = sampleBooks[sampleBooks.ISBN == str(id)].to_dict('records')
    if not book:
        return jsonify({'error':'not found','status':404}),404
    
    return jsonify({'book':book[0],'status':200}),200



@app.route('/rec_book')
@cross_origin()
def reccomendation_for_book():
    ISBN = request.args.get('title')
    book =sampleBooks[sampleBooks.ISBN == str(ISBN)].to_dict('records')
    print(book[0]['bookTitle'])
    if not ISBN:
        return jsonify({'error':'not found','status':404}),404
    elif not book:
        return jsonify({'error':'not found','status':404}),404
    
    recBooks = get_RecBooks_COSIAN(book[0]['bookTitle'])
    
    return jsonify({'rec_books':recBooks,'status':200}),200


@app.route('/rec_user')
@cross_origin()
def reccomendation_for_user():
    userID = random.randint(0,len(list_of_distinct_users))
    if not int(list_of_distinct_users[userID]) in list_of_distinct_users:
        return jsonify({'error':'not found','status':404}),404
    
    recBooks = generate_recommendationsSVD(int(list_of_distinct_users[userID]))
   
    return jsonify({'rec_books':recBooks}),200

# %%

if __name__ == '__main__':
    
    app.run(host='0.0.0.0', port=8000, debug=False)


