import ImageGallery from './ImageGallery';
import Button from './Button'
import Searchbar from './Searchbar'
import Loader from './Loader';
import {MessageBlock} from './MessageBlock/MessageBlock.jsx';
import { Component } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { apiGetImages } from 'services/pixabay-api.js';

export class App extends Component {
  state = {
    imagesDataObj: [],
    currentPage: 1,
    query:"",
    error: null,
    status: 'idle', // 'pending' / 'resolve' / 'rejected'
  }
  
  searchbarSubmitHandler = query =>{
    this.setState({query: query})
  }

  onMoreLoad = () => {
    this.setState(prevState=>
       ({currentPage: prevState.currentPage + 1})
      )
  }

  componentDidUpdate(prevProps, prevState, snapshot){
    if(prevState.currentPage !== this.state.currentPage || prevState.query !== this.state.query){
        this.setState( { status: 'pending' } )
        apiGetImages(this.state.query, this.state.currentPage)
        .then(data => data.hits)
        .then(hits => {
          if(hits.length > 0){
            if(this.state.query !== prevState.query){
              this.setState(({imagesDataObj: [...hits]}))
            }else{
              this.setState(prevStave=>({imagesDataObj: [...prevState.imagesDataObj, ...hits]}))
            }
              this.setState({status:'resolve',error:""})
          }else{
              toast.error(`Something go wrong, we didn't find images with "${this.state.query}" query`)
            }
          }
        )
        .catch(errorMessage => {
          this.setState({status:'rejected', error: "Something go wrong, try again later..."});
          console.log("Error with: 404, Error Message: ", errorMessage.message)
      })
    }
  }
  render(){
    const{status, imagesDataObj, error} = this.state;
    return( 
      <> 
        <Searchbar onSubmitProps={this.searchbarSubmitHandler}/>
        {status ==='rejected' && <MessageBlock>{error}</MessageBlock>}
        {status ==='idle' && <MessageBlock>Give me a query...</MessageBlock>}
        {imagesDataObj && <ImageGallery imagesData={imagesDataObj}/>}
        {status ==='pending' && <Loader/>}
        {status ==='resolve' && <Button nextPage={this.onMoreLoad}>Load more</Button>}
        <ToastContainer 
              position="top-right" 
              autoClose={2000} 
              hideProgressBar={false} 
              newestOnTop={false}
              />
      </>
    );
  }
};