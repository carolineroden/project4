import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import _ from 'lodash';



class ArticlesIndex extends React.Component{
  state = {
    articles: [],
    search: 'all'
  }


  componentDidMount(){
    axios.get('/api/articles')
      .then(res => this.setState({ articles: res.data }));
  }


  handleChange = ({ target: { value } }) => {
    this.setState({ search: value });
  }

  filteredArticles = () => {
    if(this.state.search === 'all') return this.state.articles;
    return _.filter(this.state.articles, article => article.translatedInto.includes(this.state.search));
  }


  render(){
    return(
      <div>
        <SearchBar
          handleChange={this.handleChange}
          data={this.state}
        />
        <div className="articles">
          <div className="columns is-multiline">
            {this.filteredArticles().length === 0 && <p>No articles yet!</p>}
            {this.filteredArticles().map(article =>
              <div className="column is-one-third-desktop is-half-tablet" key={article._id}>
                <div className="card">
                  <div className="card-image"
                    style={{ backgroundImage: `url(${article.translations[0].image})` }}>
                  </div>

                  <div className="card-content">
                    <div className="media">
                      <div className="media-content">
                        <p className="title is-4 index-title">{article.translations[0].title}</p>
                        <p className="subtitle is-6 index-subtitle">{article.translations[0].tagline}</p>
                      </div>
                    </div>


                    {article.translatedInto.map(language =>
                      <Link className="button is-rounded index-language-button" key={language} to={`/articles/${article._id}/${language}`}>
                        {language}<i className="fa-xs fas fa-search"></i>
                      </Link>
                    )}
                  </div>

                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ArticlesIndex;
