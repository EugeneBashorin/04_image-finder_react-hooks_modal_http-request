import ImageGallery from './ImageGallery';
import Button from './Button'
import Searchbar from './Searchbar'
import Loader from './Loader';
import {MessageBlock} from './MessageBlock/MessageBlock.jsx';
import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { apiGetImages } from 'services/pixabay-api.js';
import { usePreviousData } from 'hooks/hooks.jsx';

export const App = () => {
  const[imagesDataObj, setImagesDataObj] = useState([]);
  const[currentPage, setCurrentPage] = useState(1);
  const[query, setQuery] = useState("");
  const[error, setError] = useState(null);
  const[status, setStatus] = useState('idle');

  const searchbarSubmitHandler = query =>{
    setQuery(query);
    setCurrentPage(1);
  }

  const onMoreLoad = () => {
    setCurrentPage(prevState => (prevState + 1))
  }

  //get previos state
  const previosQuery = usePreviousData(query);

  //componentDidUpdate
  useEffect(() => {
    if(query === ""){
      setStatus('idle');
      return;
    }
    setStatus('pending');

    apiGetImages(query, currentPage)
    .then(data => data.hits)
    .then(hits => {
      if(hits.length === 0){
        toast.error(`We didn't find images with "${query}" query`)
      }
      if(query !== previosQuery){
        setImagesDataObj([...hits]);
      }else{
        setImagesDataObj( prevState =>([...prevState, ...hits]))
        }
        setStatus('resolve');
        setError("");
        }
      )
    .catch(errorMessage => {
    setStatus('rejected');
    setError("Something go wrong, try again later...");
    console.log("Error with: 404, Error Message: ", errorMessage.message)
    })    
  },[currentPage, query])

  return( 
    <> 
      <Searchbar onSubmitProps={searchbarSubmitHandler}/>
      {status ==='rejected' && <MessageBlock>{error}</MessageBlock>}
      {status ==='idle' && <MessageBlock>Give me a query...</MessageBlock>}
      {imagesDataObj && <ImageGallery imagesData={imagesDataObj}/>}
      {status ==='pending' && <Loader/>}
      {status ==='resolve' && <Button nextPage={onMoreLoad}>Load more</Button>}
      <ToastContainer 
        position="top-right" 
        autoClose={2000} 
        hideProgressBar={false} 
        newestOnTop={false}
      />
    </>
  );
};