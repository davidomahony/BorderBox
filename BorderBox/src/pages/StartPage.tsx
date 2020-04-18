import React from 'react';

import './StartPage.css';

import { menu, arrowBack, logoInstagram } from 'ionicons/icons'

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonButtons,
  IonCard,
  IonFooter,
  IonPage,
  IonCardContent,
  IonMenuButton,
  IonSlide,
  IonSlides,
  IonText,
  IonCol,
  IonRow,
  IonIcon,
  IonNav,
  IonCardHeader,
  IonCardTitle
} from "@ionic/react";
import Header from '../components/Header';
import Footer from '../components/Footer';
import HomeContent from '../components/HomeContent';
import FileUploadContent from '../components/FileUploadContent';
import SelectStyleContent from '../components/SelectStyleContent';
import CompleteContent from '../components/CompleteContent';
import SlidingPanel from 'react-sliding-side-panel'

type SelectedImage = {
    identifier: string,
    selectImagePath: string,
    croppedImagePath: string,
    quantity: number
  }

type State = {
    activeContent: string,
    activeStyle: string,
    availableContexts: string[],
    selectedStyle: string,
    selectedImages: SelectedImage[],
    numberOfImages: number,
    showCheckout: boolean,
}

export class Startpage extends React.Component<{}, State> {
    constructor(props: any) {
      super(props);
  
      this.state = {
        activeContent: "Home",
        activeStyle: "StyleOne",
        availableContexts: ['Home', 'FileUpload', 'SelectStyle', 'Complete'],
        selectedStyle: 'StyleOne',
        selectedImages: [],
        numberOfImages: 0,
        showCheckout : false
      }
  }

  ////////////                 Navigation 

  navigateForward = () => {
    let nextContentindex = this.state.availableContexts.indexOf(this.state.activeContent) + 1;
    this.setState({activeContent: this.state.availableContexts[nextContentindex]})
  }

  navigateBack = () => {
    let nextContentindex = this.state.availableContexts.indexOf(this.state.activeContent) - 1;
    this.setState({activeContent: this.state.availableContexts[nextContentindex]})
  }

  /////////////////////////////////////////////////////////////////

  /////////////////////////////////Style Page

  updateActiveStyle = (newStyle: string) => {
    this.setState({activeStyle: newStyle})
  }

  /////////////////////////////////////////

  ///////////////////////// Adding & Removing images


  addNewPhoto = (identifier: string, photoUrl: string) => {
    let count = this.state.numberOfImages;
    let newPhotoCollection = this.state.selectedImages;
    newPhotoCollection.push({identifier: `${count}`, selectImagePath: photoUrl, croppedImagePath: photoUrl, quantity: 1})
    this.setState({selectedImages: newPhotoCollection})
  }

  removePhoto = (identifier: string, photUrl: string) => {
    let newSelectedImages = this.state.selectedImages.filter(item => item.identifier !== identifier);
    this.setState({selectedImages: newSelectedImages})
  }

  updateFromCrop = (newImg: any, identifier: string) => {
    let imgToBeUpdated = this.state.selectedImages.find(img => img.identifier === identifier);
    if (imgToBeUpdated !== null && imgToBeUpdated !== undefined)
    {
      imgToBeUpdated.croppedImagePath = newImg;
      let newSelectedImages = this.state.selectedImages.filter(item => item.identifier !== identifier);
      newSelectedImages.push(imgToBeUpdated);
      this.setState({selectedImages: newSelectedImages})
      return;
    }
    console.log("Issue Updating Crop")
  }


  //////////////////////////////////////////////////////////////////

  SetContent(){
    if (this.state.activeContent === 'Home')
    {
      return <HomeContent/>
    }
    if (this.state.activeContent === 'FileUpload')
    {
      return <FileUploadContent 
      removePhoto={this.removePhoto} 
      activePhotos={this.state.selectedImages} 
      updateFromCrop={this.updateFromCrop}
      uploadPhoto={this.addNewPhoto}/>
    }
    if (this.state.activeContent === 'SelectStyle' || this.state.activeContent === 'Complete')
    {
      return <SelectStyleContent selectedImages={this.state.selectedImages} updateActiveStyle={this.updateActiveStyle}/>
    }
    // if (this.state.activeContent === 'Complete')
    // {
    //   return <CompleteContent activeStyle={this.state.activeStyle} selectedImages={this.state.selectedImages}/>
    // }
  }

  showCheckout()
  {
    return this.state.activeContent === 'Complete';
  }

  closeCheckout = () => {
    this.setState({activeContent: 'SelectStyle'})
  }

  render() {
    return(
      <IonPage className="maxWidth">
        {this.state.activeContent !== 'Home' ? <Header activeContent={this.state.activeContent} NavigateBack={this.navigateBack}></Header> : ""}
        <IonContent>
          {this.SetContent()}
        </IonContent>
        <Footer activeContent={this.state.activeContent} hasPhotosUploaded={this.state.selectedImages.length !== 0} NavigateForward={this.navigateForward}/>
        <SlidingPanel type={'bottom'}
          isOpen={this.showCheckout()}
          size={40}>
            <CompleteContent closeCheckout={this.closeCheckout} activeStyle={this.state.activeStyle} selectedImages={this.state.selectedImages}></CompleteContent>
        </SlidingPanel>
      </IonPage>
    )
 }
}

export default Startpage