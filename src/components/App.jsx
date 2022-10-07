import { Component } from "react";
import ImageGallery from "./ImageGallery/ImageGallery";
import Searchbar from "./Searchbar/Searchbar";
import * as api from "../services/fetcher";
import Loader from "./Loader/Loader";
import Button from "./Button/Button";
import Modal from "./Modal/Modal";

export class App extends Component {
  state = {
    images: [],
    searchedValue: '',
    page: 1,
    isLoading: false,
    error: null,
    largeImageURL: null,
  }

  setStartParams = searchedValue => {
      if (searchedValue === "") {
        return alert(`Please enter what you want to find ☺`);
      }
      if (searchedValue === this.state.searchedValue) {
        return;
      }

      this.setState({
        images: [],
        searchedValue,
        page: 1
      });
  };
// rendering gallery
  showImages = async (searchedValue, page) => {
    this.setState({isLoading: true});

    try {
      const images = await api.fetchImg(searchedValue, page);
      const {hits: newImages} = images;

      this.setState(prevState => ({
        images: [...prevState.images, ...newImages],
      }));

    } catch (error) {
      this.setState({ error })
    } finally {
      this.setState({ isLoading: false });
    };
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page || prevState.searchedValue !== this.state.searchedValue) {
      this.showImages(this.state.searchedValue, this.state.page)
    }
  }
// Button Load More
  loadMore = () => {
    const prevPage = this.state.page;
    const newPage = prevPage + 1;
    this.setState({page: newPage});
  }
// Modal

  openModal = (src, alt) => {
    this.setState(state => ({...state, largeImageURL: {src, alt}}))
  }

  closeModal = (e) => {
    this.setState({largeImageURL: null})
  }

  render() {
    const {images, error, isLoading, largeImageURL} = this.state;
    return (
    <div>
      <Searchbar onSubmit = {this.setStartParams}/>
      {error && <p>It's something wrong, check it: {error.message}</p>}
      {isLoading && <Loader/>}


      <ImageGallery images = {images} openModal={this.openModal}/>
      {images.length !== 0 && <Button loadMore={this.loadMore}/>}

      {largeImageURL && <Modal data={largeImageURL} closeModal={this.closeModal}/>}
    </div>)
  };
};
