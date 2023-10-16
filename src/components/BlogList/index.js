import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import BlogItem from '../BlogItem'
import './index.css'

class BlogList extends Component {
  state = {
    blogItemList: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getBlogList()
  }

  getBlogList = async () => {
    const response = await fetch('https://apis.ccbp.in/blogs')
    const data = await response.json()
    console.log(data)

    const updatedList = data.map(eachObject => ({
      id: eachObject.id,
      imageUrl: eachObject.image_url,
      avatarUrl: eachObject.avatar_url,
      title: eachObject.title,
      author: eachObject.author,
      topic: eachObject.topic,
    }))
    this.setState({blogItemList: updatedList, isLoading: false})
  }

  render() {
    const {blogItemList, isLoading} = this.state
    return (
      <div className="blog-list-container">
        {isLoading ? (
          <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
        ) : (
          blogItemList.map(item => <BlogItem blogData={item} key={item.id} />)
        )}
      </div>
    )
  }
}

export default BlogList
